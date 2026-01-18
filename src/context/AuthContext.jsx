
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../client/supabaseClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) fetchProfile(session.user);
      else setLoading(false);
    });

    // 2. Listen for changes (Login, Logout, Auto-refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        // If we already have a user and the IDs match, we might not need to fetch, 
        // but fetching ensures roles and BLOCK STATUS are up to date.
        fetchProfile(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (authUser) => {
    try {
      // --- RETRY LOGIC FOR PROFILE (Race Condition Fix) ---
      let profile = null;
      let attempts = 0;
      const maxAttempts = 3;

      while (!profile && attempts < maxAttempts) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .maybeSingle();

        if (error) {
          console.error("Profile Fetch Error:", error);
          break; 
        }

        if (data) {
          profile = data;
        } else {
          // Wait 300ms if trigger hasn't finished creating the row
          await new Promise(resolve => setTimeout(resolve, 300));
          attempts++;
        }
      }

      // --- CRITICAL: CHECK IF BLOCKED ---
      // If the profile exists and is_blocked is true, deny access immediately.
      if (profile?.is_blocked) {
        console.warn("User is blocked. Logging out.");
        await supabase.auth.signOut();
        setUser(null);
        alert("Your account has been suspended. Please contact support.");
        return; // Stop execution here
      }

      // --- FETCH ADDRESS ---
      const { data: address } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', authUser.id)
        .eq('is_default', true)
        .maybeSingle();

      // --- MERGE DATA ---
      const mergedUser = {
        ...authUser,                 
        role: profile?.role || 'customer', // Default to customer if null
        profile: profile || {},      
        address: address || {}
      };

      setUser(mergedUser);

    } catch (error) {
      console.error("Critical Auth Error:", error);
      // Ensure we don't leave the app in a loading state if error occurs
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, profileData, addressData) => {
    // 1. Sign Up (Trigger creates Profile)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { 
          first_name: profileData.firstName, 
          last_name: profileData.lastName, 
          phone: profileData.phone, 
          dob: profileData.dob 
        }
      }
    });

    if (error) throw error;

    // 2. Insert Address (Optional but recommended to handle separately)
    if (data.user && addressData) {
      try {
        // Short delay to ensure Profile Trigger has finished (Foreign Key constraint)
        await new Promise(r => setTimeout(r, 500)); 

        const { error: addrError } = await supabase.from('addresses').insert({
          user_id: data.user.id,
          street_address: addressData.streetAddress,
          city: addressData.city,
          state: addressData.state,
          zip_code: addressData.zipCode,
          is_default: true
        });

        if (addrError) console.error("Signup Address Save Failed:", addrError);
      } catch (err) {
        console.error("Address Logic Error:", err);
      }
    }
    return data;
  };

  const login = async (email, password) => {
    // Note: This will succeed even if blocked, because 'profiles' is a separate table.
    // The 'onAuthStateChange' listener will catch the login, fire 'fetchProfile', 
    // and THEN kick the user out if they are blocked.
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateProfile = async (updates) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    if (error) throw error;

    // Refresh local state (this will also re-check block status)
    fetchProfile(user); 
  };

  const refreshProfile = () => {
    if (user) fetchProfile(user);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      signup, 
      login, 
      logout, 
      updateProfile, 
      refreshProfile, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
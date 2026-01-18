
// // import React, { createContext, useContext, useEffect, useState } from 'react';
// // import { supabase } from '../client/supabaseClient';

// // const AuthContext = createContext();

// // export const useAuth = () => useContext(AuthContext);

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     // Check for active session on mount
// //     supabase.auth.getSession().then(({ data: { session } }) => {
// //       if (session) fetchProfile(session.user);
// //       else setLoading(false);
// //     });

// //     // Listen for auth changes
// //     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
// //       if (session) fetchProfile(session.user);
// //       else {
// //         setUser(null);
// //         setLoading(false);
// //       }
// //     });

// //     return () => subscription.unsubscribe();
// //   }, []);

// //   const fetchProfile = async (authUser) => {
// //     const { data } = await supabase
// //       .from('profiles')
// //       .select('*')
// //       .eq('id', authUser.id)
// //       .single();
// //     setUser({ ...authUser, profile: data });
// //     setLoading(false);
// //   };

// //   const signup = async (email, password, firstName, lastName, phone, dob) => {
// //     const { data, error } = await supabase.auth.signUp({
// //       email,
// //       password,
// //       options: {
// //         data: { first_name: firstName, last_name: lastName, phone, dob }
// //       }
// //     });
// //     if (error) throw error;
// //     return data;
// //   };

// //   const login = async (email, password) => {
// //     const { data, error } = await supabase.auth.signInWithPassword({ email, password });
// //     if (error) throw error;
// //     return data;
// //   };

// //   const logout = () => supabase.auth.signOut();

// //   return (
// //     <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
// //       {!loading && children}
// //     </AuthContext.Provider>
// //   );
// // };
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { supabase } from '../client/supabaseClient';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check for active session on mount
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       if (session) fetchProfile(session.user);
//       else setLoading(false);
//     });

//     // Listen for auth changes
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       if (session) fetchProfile(session.user);
//       else {
//         setUser(null);
//         setLoading(false);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   // const fetchProfile = async (authUser) => {
//   //   // Fetch profile
//   //   const { data: profile } = await supabase
//   //     .from('profiles')
//   //     .select('*')
//   //     .eq('id', authUser.id)
//   //     .maybeSingle();

//   //   // Fetch default address
//   //   const { data: address } = await supabase
//   //     .from('addresses')
//   //     .select('*')
//   //     .eq('user_id', authUser.id)
//   //     .eq('is_default', true)
//   //     .maybeSingle();

//   //   setUser({ ...authUser, profile, address });
//   //   setLoading(false);
//   // };

//   const fetchProfile = async (authUser) => {
//     try {
//       console.log("1. Auth User Found:", authUser.email);
//       console.log("Auth user Id", authUser.id);
//       console.log("Auth user Metadata", authUser);
//       // 1. GET PROFILE (Role is here!)
//       const { data: profile, error: profileError } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('id', authUser.id)
//         .maybeSingle();

//         console.log("profile data", profile);
//       if (profileError) console.error("Profile Fetch Error:", profileError);
      
//       console.log("2. DB Profile Found:", profile); // Check your console, 'role' should be here

//       // 2. GET ADDRESS
//       const { data: address } = await supabase
//         .from('addresses')
//         .select('*')
//         .eq('user_id', authUser.id)
//         .eq('is_default', true)
//         .maybeSingle();

//       // 3. MERGE (The Critical Step)
//       const mergedUser = {
//         ...authUser,                 // Contains email, metadata (name, phone)
//         role: profile?.role || 'customer', // <--- PULLS ROLE FROM DB
//         profile: profile || {},      // Contains full profile row
//         address: address || {}
//       };

//       console.log("3. Final Merged User:", mergedUser); // This is what your app uses
//       setUser(mergedUser);

//     } catch (error) {
//       console.error("Critical Auth Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   // const signup = async (email, password, profileData, addressData) => {
//   //   // 1. Create Auth User (Trigger handles Profile creation)
//   //   const { data, error } = await supabase.auth.signUp({
//   //     email,
//   //     password,
//   //     options: {
//   //       data: { 
//   //         first_name: profileData.firstName, 
//   //         last_name: profileData.lastName, 
//   //         phone: profileData.phone, 
//   //         dob: profileData.dob 
//   //       }
//   //     }
//   //   });

//   //   if (error) throw error;

//   //   // 2. Insert Address into public.addresses table
//   //   if (data.user && addressData) {
//   //     const { error: addrError } = await supabase
//   //       .from('addresses')
//   //       .insert({
//   //         user_id: data.user.id,
//   //         street_address: addressData.streetAddress,
//   //         city: addressData.city,
//   //         state: addressData.state,
//   //         zip_code: addressData.zipCode,
//   //         is_default: true
//   //       });
      
//   //     if (addrError) {
//   //       // Optional: Log error, but don't fail signup entirely if address fails
//   //       console.error("Failed to save address:", addrError);
//   //     }
//   //   }
    
//   //   return data;
//   // };


//   const signup = async (email, password, profileData, addressData) => {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: { 
//           first_name: profileData.firstName, 
//           last_name: profileData.lastName, 
//           phone: profileData.phone, 
//           dob: profileData.dob 
//         }
//       }
//     });

//     if (error) throw error;

//     if (data.user && addressData) {
//       await supabase.from('addresses').insert({
//         user_id: data.user.id,
//         street_address: addressData.streetAddress,
//         city: addressData.city,
//         state: addressData.state,
//         zip_code: addressData.zipCode,
//         is_default: true
//       });
//     }
//     return data;
//   };

//   const login = async (email, password) => {
//     const { data, error } = await supabase.auth.signInWithPassword({ email, password });
//     if (error) throw error;
//     return data;
//   };

//   const logout = () => supabase.auth.signOut();

//   return (
//     <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { supabase } from '../client/supabaseClient';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check for active session on mount
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       if (session) fetchProfile(session.user);
//       else setLoading(false);
//     });

//     // Listen for auth changes
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       if (session) fetchProfile(session.user);
//       else {
//         setUser(null);
//         setLoading(false);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   const fetchProfile = async (authUser) => {
//     try {
//       // 1. GET PROFILE WITH RETRY LOGIC
//       // Triggers can be slow. We try 3 times with a small delay to ensure the row exists.
//       let profile = null;
//       let attempts = 0;
//       const maxAttempts = 3;

//       while (!profile && attempts < maxAttempts) {
//         const { data, error } = await supabase
//           .from('profiles')
//           .select('*')
//           .eq('id', authUser.id)
//           .maybeSingle();

//         if (error) {
//           console.error("Profile Fetch Error:", error);
//           break; // Stop retrying if there is a permission/SQL error
//         }

//         if (data) {
//           profile = data;
//         } else {
//           // If null, wait 300ms before trying again
//           console.log(`Profile not found, retrying... (${attempts + 1}/${maxAttempts})`);
//           await new Promise(resolve => setTimeout(resolve, 300));
//           attempts++;
//         }
//       }

//       // 2. GET ADDRESS
//       const { data: address } = await supabase
//         .from('addresses')
//         .select('*')
//         .eq('user_id', authUser.id)
//         .eq('is_default', true)
//         .maybeSingle();

//       // 3. MERGE
//       const mergedUser = {
//         ...authUser,                 
//         role: profile?.role || 'customer',
//         profile: profile || {},      
//         address: address || {}
//       };

//       setUser(mergedUser);

//     } catch (error) {
//       console.error("Critical Auth Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signup = async (email, password, profileData, addressData) => {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: { 
//           first_name: profileData.firstName, 
//           last_name: profileData.lastName, 
//           phone: profileData.phone, 
//           dob: profileData.dob 
//         }
//       }
//     });

//     if (error) throw error;

//     // Note: We don't insert into 'profiles' here because we expect the 
//     // Supabase DB Trigger to handle it using the metadata above.

//     if (data.user && addressData) {
//       // Wait a moment to ensure the user ID is registered in DB constraints
//       await new Promise(r => setTimeout(r, 500)); 
      
//       const { error: addrError } = await supabase.from('addresses').insert({
//         user_id: data.user.id,
//         street_address: addressData.streetAddress,
//         city: addressData.city,
//         state: addressData.state,
//         zip_code: addressData.zipCode,
//         is_default: true
//       });
      
//       if (addrError) console.error("Address Error:", addrError);
//     }
//     return data;
//   };

//   const login = async (email, password) => {
//     const { data, error } = await supabase.auth.signInWithPassword({ email, password });
//     if (error) throw error;
//     return data;
//   };

//   const logout = () => supabase.auth.signOut();

//   return (
//     <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { supabase } from '../client/supabaseClient';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // 1. Check active session
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       if (session) fetchProfile(session.user);
//       else setLoading(false);
//     });

//     // 2. Listen for changes (Login, Logout, Auto-refresh)
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       if (session) {
//         // If we already have a user and the IDs match, we might not need to fetch, 
//         // but fetching ensures roles are up to date.
//         fetchProfile(session.user);
//       } else {
//         setUser(null);
//         setLoading(false);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   const fetchProfile = async (authUser) => {
//     try {
//       // --- RETRY LOGIC FOR PROFILE (Race Condition Fix) ---
//       let profile = null;
//       let attempts = 0;
//       const maxAttempts = 3;

//       while (!profile && attempts < maxAttempts) {
//         const { data, error } = await supabase
//           .from('profiles')
//           .select('*')
//           .eq('id', authUser.id)
//           .maybeSingle();

//         if (error) {
//           console.error("Profile Fetch Error:", error);
//           break; 
//         }

//         if (data) {
//           profile = data;
//         } else {
//           // Wait 300ms if trigger hasn't finished creating the row
//           await new Promise(resolve => setTimeout(resolve, 300));
//           attempts++;
//         }
//       }

//       // --- FETCH ADDRESS ---
//       const { data: address } = await supabase
//         .from('addresses')
//         .select('*')
//         .eq('user_id', authUser.id)
//         .eq('is_default', true)
//         .maybeSingle();

//       // --- MERGE DATA ---
//       const mergedUser = {
//         ...authUser,                 
//         role: profile?.role || 'customer', // Default to customer if null
//         profile: profile || {},      
//         address: address || {}
//       };

//       setUser(mergedUser);

//     } catch (error) {
//       console.error("Critical Auth Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signup = async (email, password, profileData, addressData) => {
//     // 1. Sign Up (Trigger creates Profile)
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: { 
//           first_name: profileData.firstName, 
//           last_name: profileData.lastName, 
//           phone: profileData.phone, 
//           dob: profileData.dob 
//         }
//       }
//     });

//     if (error) throw error;

//     // 2. Insert Address (Optional but recommended to handle separately)
//     if (data.user && addressData) {
//       try {
//         // Short delay to ensure Profile Trigger has finished (Foreign Key constraint)
//         await new Promise(r => setTimeout(r, 500)); 

//         const { error: addrError } = await supabase.from('addresses').insert({
//           user_id: data.user.id,
//           street_address: addressData.streetAddress,
//           city: addressData.city,
//           state: addressData.state,
//           zip_code: addressData.zipCode,
//           is_default: true
//         });

//         if (addrError) console.error("Signup Address Save Failed:", addrError);
//       } catch (err) {
//         console.error("Address Logic Error:", err);
//         // Don't throw here; allow the user to proceed as "Signed Up" even if address failed
//       }
//     }
//     return data;
//   };

//   const login = async (email, password) => {
//     const { data, error } = await supabase.auth.signInWithPassword({ email, password });
//     if (error) throw error;
//     return data;
//   };

//   const logout = async () => {
//     await supabase.auth.signOut();
//     setUser(null);
//   };

//   // --- NEW: Helper to update profile details ---
//   const updateProfile = async (updates) => {
//     if (!user) return;
    
//     const { error } = await supabase
//       .from('profiles')
//       .update(updates)
//       .eq('id', user.id);

//     if (error) throw error;

//     // Refresh local state
//     fetchProfile(user); 
//   };

//   // --- NEW: Helper to force refresh user data ---
//   const refreshProfile = () => {
//     if (user) fetchProfile(user);
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       signup, 
//       login, 
//       logout, 
//       updateProfile, // Exported
//       refreshProfile, // Exported
//       loading 
//     }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

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
      {!loading && children}
    </AuthContext.Provider>
  );
};
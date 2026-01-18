
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { cartApi } from '../api/cartApi';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(true); // Added loading state
  const [deliveryConfig, setDeliveryConfig] = useState({ min_order_value: 0, shipping_fee: 0 });

  // --- INIT CART ---
  // useEffect(() => {
  //   let isMounted = true;

  //   const initCart = async () => {
  //     setCartLoading(true);
  //     try {
  //       // Parallel Fetch for speed
  //       const [config, dbItems] = await Promise.all([
  //         cartApi.getDeliveryConfig(),
  //         user ? cartApi.fetchCart(user.id) : Promise.resolve([])
  //       ]);

  //       if (isMounted) {
  //         if (config) setDeliveryConfig(config);
  //         // Store RAW DB items. Do not filter nulls here; Cart.jsx handles "Hard Deletes"
  //         setCartItems(dbItems || []); 
  //       }
  //     } catch (err) {
  //       console.error("Cart Init Error:", err);
  //     } finally {
  //       if (isMounted) setCartLoading(false);
  //     }
  //   };

  //   initCart();

  //   return () => { isMounted = false; };
  // }, [user]);
  // Start this immediately on mount
useEffect(() => {
  const fetchConfig = async () => {
    try {
      const config = await cartApi.getDeliveryConfig();
      if (config) setDeliveryConfig(config);
    } catch (err) {
      console.error("Config Fetch Error:", err);
    }
  };
  fetchConfig();
}, []); // Empty dependency array means it runs once at startup

useEffect(() => {
  let isMounted = true;

  const loadUserCart = async () => {
    if (!user) {
      setCartItems([]);
      setCartLoading(false);
      return;
    }

    setCartLoading(true);
    try {
      const dbItems = await cartApi.fetchCart(user.id);
      if (isMounted) {
        setCartItems(dbItems || []);
      }
    } catch (err) {
      console.error("Cart Fetch Error:", err);
    } finally {
      if (isMounted) setCartLoading(false);
    }
  };

  loadUserCart();
  return () => { isMounted = false; };
}, [user]); // Only re-runs when the user object changes

  // --- ADD TO CART ---
  const addToCart = async (product, quantity, selections, variantId, variantPrice) => {
    // 1. Build Legacy Description (Optional, for debugging or legacy views)
    const flavorName = selections["Flavor"] || 'Standard';

    // 2. Construct Optimistic Item 
    // We mock the DB structure perfectly so Cart.jsx can render it immediately
    const tempItem = {
      id: `temp-${Date.now()}`,
      user_id: user?.id,
      variant_id: variantId,
      product_id: product.id,
      quantity: quantity,
      flavor_name: flavorName,
      created_at: new Date().toISOString(),
      // Mock Nested Relations
      products: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        image_color: product.image_color,
        cover_image_url: product.cover_image_url,
        is_active: true // Optimistically assume active
      },
      product_variants: {
        id: variantId,
        price: variantPrice,
        stock_quantity: 999, // Optimistically assume stock
        is_active: true,
        variant_selection_map: Object.entries(selections).map(([type, name]) => ({
          variant_options: { name, type: { name: type } }
        }))
      }
    };

    // 3. Optimistic UI Update
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.variant_id === variantId);
      
      if (existingIdx > -1) {
        // Update existing quantity
        const updated = [...prev];
        updated[existingIdx] = {
            ...updated[existingIdx],
            quantity: updated[existingIdx].quantity + quantity
        };
        return updated;
      }
      // Add new
      return [tempItem, ...prev];
    });

    // 4. DB Sync
    if (user) {
      try {
        // The API now returns the FULL nested object
        const savedItem = await cartApi.addToCart(user.id, product.id, variantId, flavorName, quantity);
        
        // Replace the temp item with the real DB item (to get the real ID)
        setCartItems(prev => prev.map(item => 
          item.id === tempItem.id ? savedItem : item
        ));
      } catch (err) {
        console.error("Cart Sync Error:", err);
        // Revert on error (removing the temp item)
        setCartItems(prev => prev.filter(item => item.id !== tempItem.id));
        alert("Failed to add to cart. Please try again.");
      }
    }
  };

  // --- UPDATE QUANTITY ---
  const updateQuantity = async (itemId, newQty) => {
    if (newQty < 1) return;

    // Optimistic
    setCartItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity: newQty } : item
    ));

    // DB Sync
    if (user && !itemId.toString().startsWith('temp')) {
      try {
        await cartApi.updateQuantity(itemId, newQty);
      } catch (err) {
        console.error("Qty Update Error:", err);
      }
    }
  };

  // --- REMOVE ITEM ---
  const removeFromCart = async (itemId) => {
    // Optimistic
    setCartItems(prev => prev.filter(item => item.id !== itemId));

    // DB Sync
    if (user && !itemId.toString().startsWith('temp')) {
      try {
        await cartApi.removeItem(itemId);
      } catch (err) {
        console.error("Remove Error:", err);
      }
    }
  };

  // --- CLEAR CART ---
  const clearCart = async () => {
    setCartItems([]);
    if (user) {
      await cartApi.clearCart(user.id);
    }
  };

  // --- REFRESH (Helper for Checkout) ---
  const refreshCart = async () => {
    if (!user) return;
    setCartLoading(true);
    const items = await cartApi.fetchCart(user.id);
    setCartItems(items);
    setCartLoading(false);
  };

  // --- GETTERS ---
  // Safe reducers that ignore "Hard Deleted" items (where variant is null)
  
  const getCartCount = () => {
    return cartItems.reduce((total, item) => {
      // Only count if data exists
      if (!item.products || !item.product_variants) return total;
      return total + (item.quantity || 0);
    }, 0);
  };
  
  const getSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      // Don't sum price for broken items (blocking issues)
      if (!item.products || !item.product_variants) return acc;
      // Don't sum price for archived/soft-deleted items (optional choice, usually safe to exclude)
      if (item.products.is_active === false || item.product_variants.is_active === false) return acc;
      
      return acc + (Number(item.product_variants.price || 0) * item.quantity);
    }, 0);
  };
  
  const getShipping = () => {
    const sub = getSubtotal();
    if (sub === 0) return 0;
    return sub >= (deliveryConfig?.min_order_value || 0) ? 0 : (deliveryConfig?.shipping_fee || 0);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      cartLoading, // Exposed for UI spinners
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      refreshCart,
      getCartCount, 
      getSubtotal, 
      getShipping, 
      deliveryConfig 
    }}>
      {children}
    </CartContext.Provider>
  );
};
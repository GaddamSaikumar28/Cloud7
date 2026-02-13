
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, ArrowRight, Truck, Trash2, Plus, Minus, 
  AlertTriangle, XCircle, AlertCircle 
} from 'lucide-react';
import CheckoutModal from '../components/checkout/CheckoutModal';
import { useCart } from '../context/CartContext';

const EmptyCartView = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-32 pb-20">
    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 animate-pulse">
      <ShoppingBag size={40} className="text-slate-500" />
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your cart is empty</h2>
    <p className="text-slate-400 text-lg mb-10 max-w-md text-center leading-relaxed">
      Looks like you haven't added anything yet. Explore our collection to find your edge.
    </p>
    <Link 
      to="/shop" 
      className="group px-8 py-4 bg-brand-glow text-dark-900 font-bold rounded-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
    >
      START SHOPPING
    </Link>
  </div>
);

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartLoading } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // --- CART CALCULATIONS ---
  
  // 1. Identify issues with items
  // Safe map: defaults to [] if cartItems is somehow undefined
  const analyzedItems = (cartItems || []).map(item => {
    const product = item.products;
    const variant = item.product_variants;
    
    // Status Flags
    // Hard Delete: DB record is gone (Foreign key is null)
    const isHardDeleted = !product || !variant; 
    
    // Soft Delete: Record exists but marked inactive
    const isArchived = (product && !product.is_active) || (variant && !variant.is_active); 
    
    // Stock Logic
    const stock = variant?.stock_quantity || 0;
    const isOutOfStock = !isHardDeleted && !isArchived && stock <= 0;
    const isInsufficientStock = !isHardDeleted && !isArchived && !isOutOfStock && item.quantity > stock;

    // A "Blocking" issue prevents checkout
    const isBlocking = isHardDeleted || isArchived || isOutOfStock;

    return {
      ...item,
      stock,
      isHardDeleted,
      isArchived,
      isOutOfStock,
      isInsufficientStock,
      isBlocking
    };
  });

  const hasBlockingIssues = analyzedItems.some(i => i.isBlocking);

  // 2. Financials (Only count valid, non-blocking items)
  const subtotal = analyzedItems.reduce((acc, item) => {
    if (item.isBlocking) return acc; // Don't charge for unavailable items
    return acc + (Number(item.product_variants?.price || 0) * item.quantity);
  }, 0);

  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (cartLoading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-dark-900">
        <div className="animate-spin w-8 h-8 border-2 border-brand-glow border-t-transparent rounded-full"/>
      </div>
    );
  }
console.log('analyzedItems', analyzedItems);
console.log('subtotal', subtotal);
console.log(cartItems);
  if (analyzedItems.length === 0) return <EmptyCartView />;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-dark-900 relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT COLUMN: Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-normal text-white uppercase tracking-tighter">Your Cart</h1>
            <span className="text-slate-400 font-normal text-sm">{analyzedItems.length} ITEMS</span>
          </div>

          <AnimatePresence mode="popLayout">
            {analyzedItems.map((item) => {
               // Safe Data Access with Fallbacks
               const product = item.products || {};
               const variant = item.product_variants || {};
               const productName = product.name || 'Unknown Product';
               
               // Robust Variant Name Construction
               const variantName = variant.variant_selection_map
                 ?.map(v => v.variant_options?.name)
                 .join(' / ') || item.flavor_name || 'Standard';

               return (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className={`relative flex gap-6 p-4 rounded-2xl border transition-all ${
                    item.isBlocking 
                      ? 'bg-red-900/10 border-red-500/20 opacity-80' 
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Image */}
                  <div className="w-24 h-24 rounded-xl bg-dark-950 border border-white/5 overflow-hidden shrink-0 relative">
                    {/* Only render Link/Image if product exists and isn't hard deleted */}
                    {product.slug && !item.isHardDeleted ? (
                      <Link to={`/product/${product.slug}`}>
                        <img 
                          // FIX: Check for productName existence before calling substring to prevent crash
                          // src={product.image_color && productName ? 
                          //   "https://via.placeholder.com/150/1a1a1a/ffffff?text=" + productName.substring(0,3) : 
                          //   "https://via.placeholder.com/150"
                          // } 
                          src = {product.cover_image_url || "https://via.placeholder.com/150/1a1a1a/ffffff?text=" + productName.substring(0,3)}
                          alt={productName} 
                          loading="lazy"
                          className={`w-full h-full object-cover ${item.isBlocking ? 'grayscale opacity-50' : ''}`} 
                        />
                      </Link>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-700">
                        <ShoppingBag size={24} />
                      </div>
                    )}
                    
                    {/* Status Overlays */}
                    {item.isOutOfStock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                         <span className="text-[10px] font-bold text-red-400 uppercase text-center px-1">Out of Stock</span>
                      </div>
                    )}
                    {item.isArchived && (
                       <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-slate-400 uppercase text-center px-1">Discontinued</span>
                       </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                           <h3 className={`font-bold text-lg leading-tight ${item.isBlocking ? 'text-slate-500 line-through' : 'text-white'}`}>
                              {productName}
                           </h3>
                           <p className="text-sm text-slate-400 mt-1">{variantName}</p>
                        </div>
                        <p className={`font-mono font-bold ${item.isBlocking ? 'text-slate-600' : 'text-brand-glow'}`}>
                           ${(Number(variant.price || 0) * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Error Messages */}
                      {item.isBlocking ? (
                        <div className="mt-2 flex items-center gap-2 text-red-400 text-xs font-bold bg-red-500/10 p-2 rounded-lg self-start inline-flex">
                          <XCircle size={14} />
                          {item.isHardDeleted ? "Item removed from store" :
                           item.isArchived ? "Product no longer available" : 
                           "Currently Out of Stock"}
                        </div>
                      ) : item.isInsufficientStock ? (
                        <div className="mt-2 flex items-center gap-2 text-orange-400 text-xs font-bold">
                           <AlertCircle size={14} />
                           Only {item.stock} left in stock!
                        </div>
                      ) : null}
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-dark-950 rounded-lg border border-white/10 h-10">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          disabled={item.isBlocking || item.quantity <= 1}
                          className="w-10 h-full flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                        >
                          <Minus size={14}/>
                        </button>
                        <span className={`w-8 text-center text-sm font-bold ${item.isBlocking ? 'text-slate-600' : 'text-white'}`}>
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.isBlocking || item.quantity >= item.stock}
                          className="w-10 h-full flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                        >
                          <Plus size={14}/>
                        </button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        title="Remove Item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Summary */}
        <aside className="lg:col-span-1">
            <div className="sticky top-32 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-slate-400 text-sm">
                        <span>Subtotal</span>
                        <span className="text-white font-mono">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-sm">
                        <span>Shipping</span>
                        <span className="text-white font-mono">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    {shipping === 0 && (
                      <div className="text-xs text-emerald-400 flex items-center gap-1">
                        <Truck size={12} /> Free shipping applied
                      </div>
                    )}
                    <div className="h-px bg-white/10 my-4" />
                    <div className="flex justify-between items-end">
                      <span className="text-white font-bold text-lg uppercase">Total</span>
                      <div className="text-right">
                        <span className="text-xs text-slate-500 block mb-1">USD</span>
                        <div className="text-3xl font-black text-brand-glow font-mono tracking-tight flex items-start gap-1">
                          <span className="text-lg mt-1">$</span>
                          <span>{total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                </div>

                {hasBlockingIssues && (
                  <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
                    <div className="text-xs text-red-200">
                      <p className="font-bold mb-1">Checkout Unavailable</p>
                      Some items in your cart are out of stock or no longer available. Please remove them to proceed.
                    </div>
                  </div>
                )}

                <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    disabled={hasBlockingIssues || total <= 0}
                    className={`w-full py-5 font-black rounded-2xl flex items-center justify-center gap-3 uppercase text-sm tracking-widest shadow-[0_10px_30px_rgba(255,255,255,0.05)] group transition-all ${
                      hasBlockingIssues || total <= 0
                      ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50'
                      : 'bg-white text-dark-900 hover:bg-brand-glow hover:scale-[1.02] active:scale-95'
                    }`}
                >
                    CHECKOUT NOW <ArrowRight size={20} className={hasBlockingIssues ? '' : 'group-hover:translate-x-1 transition-transform'}/>
                </button>

                <div className="mt-8 flex items-center justify-center gap-4 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
                  <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
                    <span className="text-[10px] font-black">SSL</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
                    <span className="text-[10px] font-black">24/7</span>
                  </div>
                </div>
            </div>
        </aside>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        total={total}
      />
    </div>
  );
};

export default Cart;
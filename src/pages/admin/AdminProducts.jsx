
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, Package, Filter, Loader2, Archive } from 'lucide-react';
import { getAdminProducts, deleteProduct } from '../../api/adminProductApi';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAdminProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    // UPDATED MESSAGE: Be clear it's archiving, not destroying data
    if (!window.confirm(`Archive "${name}"?\n\nThis will hide the product and all variants from the store, but keep order history intact.`)) return;
    
    try {
      await deleteProduct(id);
      // Optimistic Update: Remove from UI immediately
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert("Failed to archive product: " + err.message);
    }
  };

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.slug.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="h-[calc(100vh-200px)] flex items-center justify-center"><Loader2 className="animate-spin text-brand-glow" size={40} /></div>;

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 shrink-0">
        <div>
           <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Product Inventory</h1>
           <p className="text-slate-400 text-sm">Manage catalogs, stock levels, and SKUs.</p>
        </div>
        <Link to="/admin/products/new" className="px-6 py-3 bg-brand-glow text-dark-900 font-bold rounded-xl flex items-center gap-2 hover:brightness-110 transition-all hover:scale-105 active:scale-95">
           <Plus size={18} /> Add Product
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-dark-900 border border-white/10 rounded-2xl p-4 flex gap-4 shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or slug..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-dark-950 border border-white/10 rounded-xl py-2 pl-12 pr-4 text-white text-sm focus:border-brand-glow outline-none transition-all"
          />
        </div>
        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
          <Filter size={18} /> Filter
        </button>
      </div>

      {/* Table Container */}
      <div className="flex-1 bg-dark-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl relative flex flex-col">
        <div className="overflow-y-auto custom-scrollbar flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-dark-900 shadow-sm">
              <tr className="border-b border-white/5 text-xs uppercase tracking-widest text-slate-400 font-bold">
                <th className="p-4 bg-white/5">Product</th>
                <th className="p-4 bg-white/5">Category</th>
                <th className="p-4 bg-white/5">Price Range</th>
                <th className="p-4 bg-white/5">Stock</th>
                <th className="p-4 bg-white/5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-slate-500">
                    <Package className="mx-auto mb-2 opacity-20" size={40} />
                    No products found.
                  </td>
                </tr>
              ) : filtered.map(product => {
                //  const prices = product.product_variants?.map(v => v.price) || [];
                //  const minPrice = prices.length ? Math.min(...prices) : 0;
                //  const maxPrice = prices.length ? Math.max(...prices) : 0;
                //  const totalStock = product.product_variants?.reduce((sum, v) => sum + v.stock_quantity, 0) || 0;
                const activeVariants = product.product_variants?.filter(v => v.is_active !== false) || [];
                 
                 const prices = activeVariants.map(v => v.price);
                 const minPrice = prices.length ? Math.min(...prices) : 0;
                 const maxPrice = prices.length ? Math.max(...prices) : 0;
                 const totalStock = activeVariants.reduce((sum, v) => sum + v.stock_quantity, 0);
                 return (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-dark-800 border border-white/10 overflow-hidden shrink-0">
                          {product.cover_image_url ? (
                            <img  laoding="lazy" src={product.cover_image_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600"><Package size={20}/></div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm truncate max-w-[200px]">{product.name}</p>
                          <p className="text-xs text-slate-500 font-mono">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-300">{product.category?.name}</td>
                    <td className="p-4 text-sm text-brand-glow font-mono font-bold">
                       {minPrice === maxPrice ? `$${minPrice}` : `$${minPrice} - $${maxPrice}`}
                    </td>
                    <td className="p-4 text-sm">
                       <span className={`px-2 py-1 rounded-md text-xs font-bold border ${totalStock < 10 ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                          {totalStock} Units
                       </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          to={`/admin/products/edit/${product.slug}`} 
                          className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 border border-blue-500/20 transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(product.id, product.name)} 
                          className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 border border-red-500/20 transition-colors"
                          title="Archive Product"
                        >
                          <Archive size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                 );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
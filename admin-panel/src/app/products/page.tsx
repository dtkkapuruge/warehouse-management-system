'use client';

import { useState, useEffect } from 'react';
import AdminGuard from '@/components/AdminGuard';
import { Plus, Edit2, Trash2, X, Search, Package } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  warehouse?: { _id: string; name: string };
  supplier?: { _id: string; name: string };
}

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', sku: '', category: '', price: '', stock: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (query = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products${query ? `?search=${query}` : ''}`, { credentials: 'include' });
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) fetchProducts();
    } catch (error) {
      alert('Failed to delete');
    }
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingId(product._id);
      setFormData({
        name: product.name,
        sku: product.sku,
        category: product.category,
        price: product.price.toString(),
        stock: product.stock.toString()
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', sku: '', category: '', price: '', stock: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/products/${editingId}` : '/api/products';
    const method = editingId ? 'PUT' : 'POST';
    
    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        })
      });
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      alert('Failed to save product');
    }
  };

  return (
    <AdminGuard>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Products</h2>
            <p className="text-slate-500">Manage your warehouse inventory</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center transition-colors shadow-lg shadow-blue-500/30"
          >
            <Plus className="w-5 h-5 mr-2" /> Add Product
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex items-center">
          <Search className="w-5 h-5 text-slate-400 ml-2 mr-3" />
          <input 
            type="text" 
            placeholder="Search products by name..." 
            className="flex-1 bg-transparent border-none focus:outline-none text-slate-900"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              fetchProducts(e.target.value);
            }}
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 text-sm font-semibold text-slate-600">Product</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Category</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Price</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Stock</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Loading...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">No products found.</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="bg-blue-50 p-2 rounded-lg mr-3"><Package className="w-5 h-5 text-blue-600" /></div>
                        <div>
                          <p className="font-bold text-slate-900">{product.name}</p>
                          <p className="text-xs text-slate-500">SKU: {product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">{product.category}</span>
                    </td>
                    <td className="p-4 font-medium text-slate-900">${product.price.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`font-bold ${product.stock < 100 ? 'text-red-500' : 'text-emerald-600'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => openModal(product)} className="text-blue-500 hover:text-blue-700 p-2"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-700 p-2 ml-2"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-700">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                <input type="text" required className="w-full px-4 py-2 border rounded-xl text-slate-900" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">SKU</label>
                  <input type="text" required className="w-full px-4 py-2 border rounded-xl text-slate-900" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                  <input type="text" required className="w-full px-4 py-2 border rounded-xl text-slate-900" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Price ($)</label>
                  <input type="number" step="0.01" required className="w-full px-4 py-2 border rounded-xl text-slate-900" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Stock</label>
                  <input type="number" required className="w-full px-4 py-2 border rounded-xl text-slate-900" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl mt-6">
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminGuard>
  );
}

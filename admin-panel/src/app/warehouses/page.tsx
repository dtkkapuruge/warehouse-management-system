'use client';

import { useState, useEffect } from 'react';
import AdminGuard from '@/components/AdminGuard';
import { Plus, Edit2, Trash2, X, Boxes } from 'lucide-react';

interface Warehouse {
  _id: string;
  name: string;
  location: string;
  capacity: number;
  currentStock: number;
}

export default function WarehousesManager() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', location: '', capacity: '', currentStock: '' });

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/warehouses', { credentials: 'include' });
      const data = await res.json();
      if (data.success) setWarehouses(data.data);
    } catch (error) {
      console.error('Failed to fetch warehouses', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this warehouse?')) return;
    try {
      const res = await fetch(`/api/warehouses/${id}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) fetchWarehouses();
    } catch (error) {
      alert('Failed to delete');
    }
  };

  const openModal = (warehouse?: Warehouse) => {
    if (warehouse) {
      setEditingId(warehouse._id);
      setFormData({
        name: warehouse.name, location: warehouse.location,
        capacity: warehouse.capacity.toString(), currentStock: warehouse.currentStock.toString()
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', location: '', capacity: '', currentStock: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/warehouses/${editingId}` : '/api/warehouses';
    const method = editingId ? 'PUT' : 'POST';
    
    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          capacity: Number(formData.capacity),
          currentStock: Number(formData.currentStock)
        })
      });
      setIsModalOpen(false);
      fetchWarehouses();
    } catch (error) {
      alert('Failed to save warehouse');
    }
  };

  return (
    <AdminGuard>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Warehouses</h2>
            <p className="text-slate-500">Manage your storage locations</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center transition-colors shadow-lg shadow-indigo-500/30"
          >
            <Plus className="w-5 h-5 mr-2" /> Add Warehouse
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 text-sm font-semibold text-slate-600">Location Name</th>
                <th className="p-4 text-sm font-semibold text-slate-600">City / Region</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Capacity Utilization</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading...</td></tr>
              ) : warehouses.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">No warehouses found.</td></tr>
              ) : (
                warehouses.map((wh) => (
                  <tr key={wh._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="bg-indigo-50 p-2 rounded-lg mr-3"><Boxes className="w-5 h-5 text-indigo-600" /></div>
                        <p className="font-bold text-slate-900">{wh.name}</p>
                      </div>
                    </td>
                    <td className="p-4 text-slate-700 font-medium">{wh.location}</td>
                    <td className="p-4">
                      <div className="w-full bg-slate-200 rounded-full h-2.5 mb-1 max-w-[200px]">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${Math.min(100, (wh.currentStock / wh.capacity) * 100)}%` }}></div>
                      </div>
                      <span className="text-xs font-semibold text-slate-500">{wh.currentStock} / {wh.capacity} units</span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => openModal(wh)} className="text-blue-500 hover:text-blue-700 p-2"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(wh._id)} className="text-red-500 hover:text-red-700 p-2 ml-2"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-700">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">{editingId ? 'Edit Warehouse' : 'Add New Warehouse'}</h3>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                <input type="text" required className="w-full px-4 py-2 border rounded-xl text-slate-900" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Location</label>
                <input type="text" required className="w-full px-4 py-2 border rounded-xl text-slate-900" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Total Capacity</label>
                  <input type="number" required className="w-full px-4 py-2 border rounded-xl text-slate-900" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Current Stock</label>
                  <input type="number" required className="w-full px-4 py-2 border rounded-xl text-slate-900" value={formData.currentStock} onChange={e => setFormData({...formData, currentStock: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl mt-6">
                Save Warehouse
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminGuard>
  );
}

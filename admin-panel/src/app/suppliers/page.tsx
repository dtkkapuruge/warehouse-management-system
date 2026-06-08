'use client';

import { useState, useEffect } from 'react';
import AdminGuard from '@/components/AdminGuard';
import { Plus, Edit2, Trash2, X, Users, Mail, Phone } from 'lucide-react';

interface Supplier {
  _id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
}

export default function SuppliersManager() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', contactPerson: '', email: '', phone: '', address: ''
  });

  useEffect(() => { fetchSuppliers(); }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/suppliers', { credentials: 'include' });
      const data = await res.json();
      if (data.success) setSuppliers(data.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this supplier?')) return;
    await fetch(`/api/suppliers/${id}`, { method: 'DELETE', credentials: 'include' });
    fetchSuppliers();
  };

  const openModal = (supplier?: Supplier) => {
    if (supplier) {
      setEditingId(supplier._id);
      setFormData({ name: supplier.name, contactPerson: supplier.contactPerson, email: supplier.email, phone: supplier.phone, address: supplier.address });
    } else {
      setEditingId(null);
      setFormData({ name: '', contactPerson: '', email: '', phone: '', address: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/suppliers/${editingId}` : '/api/suppliers';
    const method = editingId ? 'PUT' : 'POST';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData)
    });
    setIsModalOpen(false);
    fetchSuppliers();
  };

  return (
    <AdminGuard>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Suppliers</h2>
            <p className="text-slate-500">Manage your vendor and partner network</p>
          </div>
          <button onClick={() => openModal()} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center transition-colors shadow-lg shadow-emerald-500/30">
            <Plus className="w-5 h-5 mr-2" /> Add Supplier
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {loading ? (
            <div className="col-span-full flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : suppliers.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-100 text-slate-500">No suppliers found.</div>
          ) : (
            suppliers.map((s) => (
              <div key={s._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-emerald-50 p-3 rounded-xl">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex space-x-1">
                    <button onClick={() => openModal(s)} className="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(s._id)} className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{s.name}</h3>
                <p className="text-sm font-medium text-slate-500 mb-4">Contact: {s.contactPerson}</p>
                <div className="space-y-2 mt-auto pt-4 border-t border-slate-100">
                  <div className="flex items-center text-sm text-slate-600">
                    <Mail className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{s.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Phone className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" />
                    <span>{s.phone}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">{editingId ? 'Edit Supplier' : 'Add New Supplier'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              {[
                { label: 'Company Name', key: 'name', type: 'text' },
                { label: 'Contact Person', key: 'contactPerson', type: 'text' },
                { label: 'Email', key: 'email', type: 'email' },
                { label: 'Phone', key: 'phone', type: 'text' },
                { label: 'Address', key: 'address', type: 'text' },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>
                  <input
                    type={type} required
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    value={formData[key as keyof typeof formData]}
                    onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                  />
                </div>
              ))}
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl mt-2 transition-colors">
                Save Supplier
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminGuard>
  );
}

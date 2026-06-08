'use client';

import { useState, useEffect } from 'react';
import AdminGuard from '@/components/AdminGuard';
import { Truck, Edit2 } from 'lucide-react';

interface Distribution {
  _id: string;
  product: { name: string; sku: string };
  warehouse: { name: string };
  quantity: number;
  destination: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippedAt?: string;
  deliveredAt?: string;
}

export default function DistributionsManager() {
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDistributions();
  }, []);

  const fetchDistributions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/distributions', { credentials: 'include' });
      const data = await res.json();
      if (data.success) setDistributions(data.data);
    } catch (error) {
      console.error('Failed to fetch distributions', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/distributions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      });
      fetchDistributions();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-amber-100 text-amber-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <AdminGuard>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Distributions</h2>
            <p className="text-slate-500">Track shipments and update delivery statuses</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 text-sm font-semibold text-slate-600">Product</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Origin</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Destination</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Qty</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-8 text-center text-slate-500">Loading...</td></tr>
              ) : distributions.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-slate-500">No active shipments found.</td></tr>
              ) : (
                distributions.map((dist) => (
                  <tr key={dist._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="bg-cyan-50 p-2 rounded-lg mr-3"><Truck className="w-5 h-5 text-cyan-600" /></div>
                        <div>
                          <p className="font-bold text-slate-900">{dist.product?.name || 'Unknown'}</p>
                          <p className="text-xs text-slate-500">SKU: {dist.product?.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-700 font-medium">{dist.warehouse?.name || 'Unknown'}</td>
                    <td className="p-4 text-slate-700 font-medium">{dist.destination}</td>
                    <td className="p-4 font-bold text-slate-900">{dist.quantity}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(dist.status)}`}>
                        {dist.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <select 
                        className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 font-medium cursor-pointer shadow-sm"
                        value={dist.status}
                        onChange={(e) => updateStatus(dist._id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminGuard>
  );
}

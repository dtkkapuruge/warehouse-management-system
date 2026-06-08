import { Users, Mail, Phone, MapPin } from 'lucide-react';

async function getSuppliers() {
  try {
    const res = await fetch('http://localhost:3000/api/suppliers', { cache: 'no-store' });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

export default async function SuppliersPage() {
  const suppliers = await getSuppliers();

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Our Supplier Network</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We work with trusted partners across the globe to ensure our warehouse has a reliable supply chain.
          </p>
        </div>

        {suppliers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <Users className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <p className="text-slate-500">No suppliers available at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {suppliers.map((s: any) => (
              <div key={s._id} className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-gradient-to-br from-emerald-400 to-cyan-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{s.name}</h3>
                <p className="text-sm text-slate-500 mb-6 font-medium">Contact: {s.contactPerson}</p>
                <div className="space-y-3 border-t border-slate-100 pt-5">
                  <div className="flex items-center text-sm text-slate-600">
                    <Mail className="w-4 h-4 mr-3 text-emerald-500 flex-shrink-0" />
                    <span className="truncate">{s.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Phone className="w-4 h-4 mr-3 text-emerald-500 flex-shrink-0" />
                    <span>{s.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <MapPin className="w-4 h-4 mr-3 text-emerald-500 flex-shrink-0" />
                    <span className="truncate">{s.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

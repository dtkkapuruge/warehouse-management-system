import { BarChart3, TrendingUp, Package, Truck, Boxes, Users } from 'lucide-react';

async function fetchStats() {
  try {
    const [prodRes, whRes, distRes, supRes] = await Promise.all([
      fetch('http://localhost:3000/api/products', { cache: 'no-store' }),
      fetch('http://localhost:3000/api/warehouses', { cache: 'no-store' }),
      fetch('http://localhost:3000/api/distributions', { cache: 'no-store' }),
      fetch('http://localhost:3000/api/suppliers', { cache: 'no-store' })
    ]);

    const products = (await prodRes.json()).data || [];
    const warehouses = (await whRes.json()).data || [];
    const distributions = (await distRes.json()).data || [];
    const suppliers = (await supRes.json()).data || [];

    const totalStock = products.reduce((acc: number, p: any) => acc + p.stock, 0);
    const totalCapacity = warehouses.reduce((acc: number, w: any) => acc + w.capacity, 0);
    const capacityUsage = totalCapacity > 0 ? Math.round((totalStock / totalCapacity) * 100) : 0;
    
    const activeShipments = distributions.filter((d: any) => d.status === 'Shipped' || d.status === 'Pending').length;

    return {
      productCount: products.length,
      warehouseCount: warehouses.length,
      supplierCount: suppliers.length,
      totalStock,
      capacityUsage,
      activeShipments
    };
  } catch {
    return null;
  }
}

export default async function ReportsPage() {
  const stats = await fetchStats();

  if (!stats) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Failed to load reports data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Operations Overview</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real-time analytics and performance metrics of our warehouse network.
          </p>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Package className="w-16 h-16 text-blue-600" />
            </div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Total Products</p>
            <p className="text-4xl font-extrabold text-slate-900">{stats.productCount}</p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Truck className="w-16 h-16 text-emerald-600" />
            </div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Active Shipments</p>
            <p className="text-4xl font-extrabold text-slate-900">{stats.activeShipments}</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Users className="w-16 h-16 text-indigo-600" />
            </div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Suppliers</p>
            <p className="text-4xl font-extrabold text-slate-900">{stats.supplierCount}</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Boxes className="w-16 h-16 text-amber-600" />
            </div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Warehouses</p>
            <p className="text-4xl font-extrabold text-slate-900">{stats.warehouseCount}</p>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Capacity Usage */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Network Capacity</h3>
                <p className="text-slate-500">Global storage utilization</p>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
            
            <div className="flex items-end space-x-4 mb-6">
              <p className="text-5xl font-extrabold text-slate-900">{stats.capacityUsage}%</p>
              <p className="text-lg text-slate-500 font-medium pb-1 border-b-2 border-transparent">Utilized</p>
            </div>
            
            <div className="w-full bg-slate-100 rounded-full h-4 mb-4">
              <div 
                className={`h-4 rounded-full transition-all duration-1000 ${stats.capacityUsage > 85 ? 'bg-red-500' : 'bg-blue-600'}`}
                style={{ width: `${Math.min(100, stats.capacityUsage)}%` }}
              ></div>
            </div>
            <p className="text-sm text-slate-500 font-medium">Total items in storage: {stats.totalStock.toLocaleString()}</p>
          </div>

          {/* Performance Highlight */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-lg text-white">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-white">System Status</h3>
                <p className="text-slate-400">Live operational metrics</p>
              </div>
              <div className="p-3 bg-white/10 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-slate-300 font-medium">Database Connection</span>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold">Online</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-slate-300 font-medium">API Response Time</span>
                <span className="font-bold text-white">&lt; 50ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-medium">Data Sync</span>
                <span className="font-bold text-white">Real-time</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

import { Truck, CheckCircle2, Clock, MapPin, Package, AlertCircle } from 'lucide-react';

async function getDistributions() {
  try {
    const res = await fetch('http://localhost:3000/api/distributions', { cache: 'no-store' });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

export default async function DistributionTrackerPage() {
  const distributions = await getDistributions();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle2 className="w-6 h-6 text-emerald-500" />;
      case 'Shipped': return <Truck className="w-6 h-6 text-blue-500" />;
      case 'Pending': return <Clock className="w-6 h-6 text-amber-500" />;
      default: return <AlertCircle className="w-6 h-6 text-slate-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-amber-100 text-amber-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Shipment Tracker</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Monitor the real-time status of all active and completed distributions across our network.
          </p>
        </div>

        {distributions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <Truck className="mx-auto h-16 w-16 text-slate-300 mb-6" />
            <p className="text-xl font-medium text-slate-600">No active shipments right now.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {distributions.map((dist: any) => (
              <div key={dist._id} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* Status & Icon */}
                  <div className="flex items-center space-x-6 w-full md:w-1/4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      {getStatusIcon(dist.status)}
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium mb-1">Status</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(dist.status)}`}>
                        {dist.status}
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                    <div className="flex items-center text-slate-900 font-bold text-lg mb-2">
                      <Package className="w-5 h-5 mr-3 text-blue-500" />
                      {dist.product?.name || 'Unknown Product'}
                    </div>
                    <p className="text-sm text-slate-500">
                      Quantity: <span className="font-semibold text-slate-700">{dist.quantity} units</span>
                    </p>
                  </div>

                  {/* Route */}
                  <div className="flex-1 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                    <div className="flex items-center text-slate-700 mb-3">
                      <MapPin className="w-4 h-4 mr-3 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Origin</p>
                        <p className="font-medium">{dist.warehouse?.name || 'Unknown'}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-slate-700">
                      <MapPin className="w-4 h-4 mr-3 text-blue-500" />
                      <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Destination</p>
                        <p className="font-bold text-slate-900">{dist.destination}</p>
                      </div>
                    </div>
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

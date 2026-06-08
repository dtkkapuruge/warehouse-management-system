import AdminGuard from "@/components/AdminGuard";
import { Package, Truck, Boxes, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <AdminGuard>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Dashboard Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Inventory</h3>
              <div className="p-2 bg-blue-50 rounded-lg"><Package className="w-5 h-5 text-blue-600" /></div>
            </div>
            <p className="text-2xl font-bold text-slate-900">Manage Products</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Logistics</h3>
              <div className="p-2 bg-cyan-50 rounded-lg"><Truck className="w-5 h-5 text-cyan-600" /></div>
            </div>
            <p className="text-2xl font-bold text-slate-900">Track Shipments</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Locations</h3>
              <div className="p-2 bg-indigo-50 rounded-lg"><Boxes className="w-5 h-5 text-indigo-600" /></div>
            </div>
            <p className="text-2xl font-bold text-slate-900">View Warehouses</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Partners</h3>
              <div className="p-2 bg-emerald-50 rounded-lg"><Users className="w-5 h-5 text-emerald-600" /></div>
            </div>
            <p className="text-2xl font-bold text-slate-900">Manage Suppliers</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Welcome to WDMS Admin</h3>
            <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
              Use the sidebar to navigate through the different management sections. You can add, edit, and delete products, manage suppliers, monitor warehouse capacities, and track ongoing distributions.
            </p>
          </div>
          {/* Decorative background element */}
          <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4">
            <Package className="w-96 h-96" />
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}

import Link from 'next/link';
import { ArrowRight, Boxes, Truck, ShieldCheck, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900 opacity-90 z-0" />
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              Next-Generation Warehouse Management
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
              Streamline your supply chain, track inventory in real-time, and manage global distribution from a single, powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/products" className="group flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-blue-500/50 w-full sm:w-auto">
                Explore Inventory
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="flex items-center justify-center bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all w-full sm:w-auto">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to scale</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Our platform is designed to handle complex logistics while keeping the interface intuitive and lightning fast.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-50 rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-slate-100 shadow-sm hover:shadow-xl">
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Boxes className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Inventory Tracking</h3>
              <p className="text-slate-600 leading-relaxed">Monitor stock levels across multiple warehouses in real-time with automated low-stock alerts.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-slate-100 shadow-sm hover:shadow-xl">
              <div className="bg-cyan-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Truck className="h-7 w-7 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Global Distribution</h3>
              <p className="text-slate-600 leading-relaxed">Manage shipments and coordinate with logistics partners seamlessly from dispatch to delivery.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-slate-100 shadow-sm hover:shadow-xl">
              <div className="bg-indigo-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Advanced Analytics</h3>
              <p className="text-slate-600 leading-relaxed">Generate detailed reports on inventory turnover, distribution efficiency, and supplier performance.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-50 rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-slate-100 shadow-sm hover:shadow-xl">
              <div className="bg-emerald-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Secure Operations</h3>
              <p className="text-slate-600 leading-relaxed">Role-based access controls ensure that your sensitive business data is only accessible to authorized personnel.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to optimize your supply chain?</h2>
          <p className="text-lg text-slate-600 mb-8">Join the growing number of businesses relying on WDMS for their daily operations.</p>
          <Link href="/contact" className="inline-block bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-lg">
            Get in touch today
          </Link>
        </div>
      </section>
    </div>
  );
}

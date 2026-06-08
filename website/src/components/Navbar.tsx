import Link from 'next/link';
import { Package, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-400" />
            <Link href="/" className="text-xl font-bold tracking-tight text-white hover:text-blue-300 transition-colors">
              WDMS
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-sm font-medium hover:text-blue-400 transition-colors">Home</Link>
            <Link href="/products" className="text-sm font-medium hover:text-blue-400 transition-colors">Products</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-blue-400 transition-colors">Contact</Link>
            <Link href="http://localhost:3001" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-all shadow-lg hover:shadow-blue-500/30">
              Admin Portal
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-gray-300 hover:text-white">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

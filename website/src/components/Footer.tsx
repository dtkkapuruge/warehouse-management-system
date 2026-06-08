import { Package } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 py-10 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Package className="h-6 w-6 text-blue-500" />
            <span className="text-lg font-semibold text-white tracking-wide">Warehouse & Distribution</span>
          </div>
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</a>
          </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} WDMS. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

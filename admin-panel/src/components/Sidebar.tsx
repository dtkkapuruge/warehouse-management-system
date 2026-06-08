'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, LayoutDashboard, Boxes, Users, Truck, MessageSquare, LogOut } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    window.location.href = '/login';
  };

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Warehouses', href: '/warehouses', icon: Boxes },
    { name: 'Suppliers', href: '/suppliers', icon: Users },
    { name: 'Distributions', href: '/distributions', icon: Truck },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col fixed left-0 top-0 shadow-2xl z-50">
      <div className="p-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          WDMS Admin
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 mb-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Package, MapPin, Search } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  description: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  warehouse: { name: string; location: string };
  supplier: { name: string };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (searchQuery = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products${searchQuery ? `?search=${searchQuery}` : ''}`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(search);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Products Catalog</h1>
            <p className="text-slate-500 mt-1">Browse our real-time inventory</p>
          </div>
          
          <form onSubmit={handleSearch} className="w-full md:w-96 relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            <button type="submit" className="hidden" />
          </form>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200">
                <Package className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-medium text-slate-900">No products found</h3>
                <p className="text-slate-500">Try adjusting your search criteria.</p>
              </div>
            ) : (
              products.map((product) => (
                <div key={product._id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                        {product.category}
                      </span>
                      <span className="text-lg font-bold text-slate-900">${product.price.toFixed(2)}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="space-y-2 mt-auto">
                      <div className="flex items-center text-sm text-slate-600">
                        <Package className="h-4 w-4 mr-2 text-slate-400" />
                        <span className="font-medium">Stock:</span>
                        <span className={`ml-2 ${product.stock < 100 ? 'text-red-500 font-bold' : 'text-emerald-600 font-bold'}`}>
                          {product.stock} units
                        </span>
                      </div>
                      
                      {product.warehouse && (
                        <div className="flex items-center text-sm text-slate-600">
                          <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                          <span className="truncate">{product.warehouse.name} ({product.warehouse.location})</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                    <span>SKU: {product.sku}</span>
                    <span className="truncate ml-4">{product.supplier?.name}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

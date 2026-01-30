
import React from 'react';
import { MoreHorizontal, Plus, Search, Filter, Download, ArrowUpDown } from 'lucide-react';

const ProductManager: React.FC = () => {
  const products = [
    { id: 'PROD-001', name: 'Kaos Polos Premium', price: 'Rp 85.000', stock: 45, sold: 120, status: 'Aktif' },
    { id: 'PROD-002', name: 'Jaket Bomber Navy', price: 'Rp 210.000', stock: 12, sold: 45, status: 'Stok Menipis' },
    { id: 'PROD-003', name: 'Sepatu Sneakers White', price: 'Rp 350.000', stock: 0, sold: 89, status: 'Habis' },
    { id: 'PROD-004', name: 'Topi Baseball Black', price: 'Rp 45.000', stock: 112, sold: 230, status: 'Aktif' },
    { id: 'PROD-005', name: 'Tas Ransel Outdoor', price: 'Rp 450.000', stock: 8, sold: 12, status: 'Aktif' },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
           <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari produk..." 
              className="pl-11 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-green-100 focus:border-green-400 outline-none w-full md:w-80 transition-all shadow-sm"
            />
          </div>
          <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 text-slate-600 transition-colors shadow-sm">
            <Filter size={20} />
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-3 bg-[#00aa5b] text-white rounded-2xl text-sm font-bold hover:bg-[#039651] transition-all shadow-lg shadow-green-100">
            <Plus size={18} strokeWidth={3} />
            <span>Tambah Produk</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Produk</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Harga</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Stok</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Terjual</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                        <img src={`https://picsum.photos/seed/${p.id}/100`} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{p.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 tracking-tight uppercase">{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-slate-700">{p.price}</td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-600">{p.stock} pcs</td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-600">{p.sold}</td>
                  <td className="px-6 py-5">
                    <span className={`
                      px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest
                      ${p.status === 'Aktif' ? 'bg-green-100 text-green-700' : 
                        p.status === 'Stok Menipis' ? 'bg-orange-100 text-orange-700' : 
                        'bg-red-100 text-red-700'}
                    `}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-white transition-all">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400">Menampilkan 5 dari 124 Produk</p>
          <div className="flex space-x-2">
             <button className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-white transition-colors">Sebelumnya</button>
             <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm">Berikutnya</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManager;

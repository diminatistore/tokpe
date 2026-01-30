
import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
}

const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  const titles: Record<string, string> = {
    dashboard: 'Ringkasan Toko',
    products: 'Manajemen Produk',
    orders: 'Daftar Pesanan',
    'ai-research': 'AI Product Research',
    'smart-stock': 'Manajemen Stok Cerdas'
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{titles[activeTab] || 'Dashboard'}</h2>
        <p className="text-xs font-medium text-slate-400 hidden md:block">Kelola bisnis marketplace Anda dengan mudah.</p>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden lg:flex items-center bg-slate-100 border-none px-4 py-2.5 rounded-2xl w-80 group focus-within:ring-2 focus-within:ring-green-100 transition-all">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari pesanan atau produk..." 
            className="bg-transparent border-none focus:outline-none text-sm ml-3 w-full text-slate-700"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl relative transition-all">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>
          
          <button className="flex items-center space-x-3 pl-2 group">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden group-hover:ring-2 group-hover:ring-green-400 transition-all">
              <img src="https://ui-avatars.com/api/?name=Admin+TokPee&background=00aa5b&color=fff" alt="User" />
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-bold text-slate-900">Admin TokPee</p>
              <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Premium Seller</p>
            </div>
            <ChevronDown size={14} className="text-slate-400 hidden md:block" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

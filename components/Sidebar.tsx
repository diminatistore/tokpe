
import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Zap, 
  Settings,
  Store,
  Boxes
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Ringkasan', icon: LayoutDashboard },
    { id: 'products', label: 'Produk', icon: Package },
    { id: 'orders', label: 'Pesanan', icon: ShoppingCart },
    { id: 'smart-stock', label: 'Stok Cerdas', icon: Boxes },
    { id: 'ai-research', label: 'AI Research', icon: Zap },
  ];

  return (
    <aside className="w-20 md:w-64 bg-white border-r border-slate-200 flex flex-col z-30 transition-all duration-300">
      <div className="p-6 flex items-center space-x-3 overflow-hidden">
        <div className="tokpee-gradient p-2 rounded-xl text-white shadow-lg shadow-green-100 flex-shrink-0">
          <Store size={22} strokeWidth={2.5} />
        </div>
        <h1 className="hidden md:block text-xl font-extrabold text-slate-800 tracking-tight">
          Tok<span className="text-[#00aa5b]">Pee</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 py-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`
              w-full flex items-center p-3.5 rounded-2xl transition-all duration-200 group
              ${activeTab === item.id 
                ? 'bg-green-50 text-[#00aa5b] shadow-sm font-semibold' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
            `}
          >
            <item.icon className={`w-6 h-6 md:w-5 md:h-5 ${activeTab === item.id ? 'text-[#00aa5b]' : 'text-slate-400'}`} />
            <span className="hidden md:block ml-3 text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="hidden md:block bg-slate-900 p-5 rounded-2xl text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:scale-125 transition-transform">
             <Zap size={40} className="text-yellow-400" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">PRO ACCESS</p>
          <p className="text-sm font-bold mb-4">Optimasi Toko 10x Lebih Cepat</p>
          <button className="w-full bg-[#00aa5b] hover:bg-[#039651] py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-green-900/20">
            Upgrade Plan
          </button>
        </div>
        <button className="md:hidden flex items-center justify-center w-full p-3 text-slate-400 hover:text-slate-900 transition-colors">
          <Settings size={22} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;


import React from 'react';
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  PackageCheck, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const data = [
  { name: 'Sen', sales: 4000, orders: 240 },
  { name: 'Sel', sales: 3000, orders: 198 },
  { name: 'Rab', sales: 2000, orders: 150 },
  { name: 'Kam', sales: 2780, orders: 390 },
  { name: 'Jum', sales: 1890, orders: 480 },
  { name: 'Sab', sales: 2390, orders: 380 },
  { name: 'Min', sales: 3490, orders: 430 },
];

const StatCard = ({ title, value, change, isPositive, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
      <div className={`flex items-center space-x-1 text-xs font-bold ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
        <span>{isPositive ? '+' : '-'}{change}%</span>
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
      </div>
    </div>
    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</h3>
    <p className="text-2xl font-black text-slate-900">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Penjualan" 
          value="Rp 45.2M" 
          change="12.5" 
          isPositive={true} 
          icon={TrendingUp} 
          color="bg-green-600" 
        />
        <StatCard 
          title="Pesanan Baru" 
          value="1,284" 
          change="8.2" 
          isPositive={true} 
          icon={PackageCheck} 
          color="bg-blue-600" 
        />
        <StatCard 
          title="Pelanggan" 
          value="8.4K" 
          change="2.4" 
          isPositive={false} 
          icon={Users} 
          color="bg-purple-600" 
        />
        <StatCard 
          title="Tingkat Konversi" 
          value="3.2%" 
          change="4.1" 
          isPositive={true} 
          icon={CreditCard} 
          color="bg-orange-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Performa Penjualan</h3>
              <p className="text-xs text-slate-400 font-medium">Data transaksi dalam 7 hari terakhir.</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 outline-none">
              <option>Minggu Ini</option>
              <option>Bulan Lalu</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00aa5b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#00aa5b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#00aa5b" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Produk Terpopuler</h3>
          <p className="text-xs text-slate-400 font-medium mb-8">Berdasarkan volume penjualan unit.</p>
          
          <div className="space-y-6">
            {[
              { name: 'Kemeja Oversize XL', sold: 452, trend: 12, img: 'shirt' },
              { name: 'Sepatu Running Pro', sold: 389, trend: 8, img: 'shoes' },
              { name: 'Hoodie Minimalist', sold: 321, trend: -3, img: 'hoodie' },
              { name: 'Celana Chino Slim', sold: 298, trend: 15, img: 'pants' },
            ].map((prod, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-50 group-hover:scale-105 transition-transform">
                    <img src={`https://picsum.photos/seed/${prod.img}/100`} alt={prod.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{prod.name}</p>
                    <p className="text-[11px] font-medium text-slate-400">{prod.sold} Terjual</p>
                  </div>
                </div>
                <div className={`text-xs font-bold ${prod.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {prod.trend > 0 ? '+' : ''}{prod.trend}%
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-10 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-2xl transition-all border border-slate-100">
            Lihat Semua Produk
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

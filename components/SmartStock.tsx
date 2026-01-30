
import React, { useState, useMemo } from 'react';
import { 
  AlertTriangle, 
  TrendingUp, 
  Calendar, 
  Box, 
  RefreshCcw, 
  Brain, 
  ArrowRight,
  ChevronRight,
  Sparkles,
  Zap,
  Info,
  ShieldCheck,
  Truck,
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';
import { GoogleGenAI } from "@google/genai";

const COLORS = ['#00aa5b', '#00894a', '#22c55e', '#4ade80', '#86efac'];

const inventoryData = [
  { name: 'W1', stock: 450, forecast: 420 },
  { name: 'W2', stock: 380, forecast: 350 },
  { name: 'W3', stock: 300, forecast: 280 },
  { name: 'W4', stock: 210, forecast: 200 },
  { name: 'W5', stock: 550, forecast: 500 }, // Simulated restock
  { name: 'W6', stock: 480, forecast: 440 },
];

const mockProducts = [
  { 
    id: '1', 
    name: 'Kaos Polos Premium', 
    stock: 12, 
    avgSoldPerDay: 4.5, 
    leadTime: 3, 
    safetyStock: 10,
    status: 'Critical' 
  },
  { 
    id: '2', 
    name: 'Hoodie Minimalist', 
    stock: 45, 
    avgSoldPerDay: 2.1, 
    leadTime: 5, 
    safetyStock: 15,
    status: 'Healthy' 
  },
  { 
    id: '3', 
    name: 'Celana Chino Slim', 
    stock: 22, 
    avgSoldPerDay: 3.2, 
    leadTime: 4, 
    safetyStock: 12,
    status: 'Warning' 
  },
  { 
    id: '4', 
    name: 'Sepatu Sneakers Pro', 
    stock: 2, 
    avgSoldPerDay: 0.8, 
    leadTime: 7, 
    safetyStock: 5,
    status: 'Critical' 
  },
];

const SmartStock: React.FC = () => {
  const [isPredicting, setIsPredicting] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0]);

  const calculations = useMemo(() => {
    const leadTimeDemand = Math.round(selectedProduct.avgSoldPerDay * selectedProduct.leadTime);
    const reorderPoint = leadTimeDemand + selectedProduct.safetyStock;
    const daysLeft = Math.floor(selectedProduct.stock / selectedProduct.avgSoldPerDay);
    
    return {
      leadTimeDemand,
      reorderPoint,
      daysLeft,
      recommendedOrder: Math.max(0, (selectedProduct.avgSoldPerDay * 30) - selectedProduct.stock + selectedProduct.safetyStock)
    };
  }, [selectedProduct]);

  const handleAiPredict = async () => {
    setIsPredicting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analisis parameter stok ini: 
      Produk: ${selectedProduct.name}
      Stok Sekarang: ${selectedProduct.stock}
      Penjualan Harian: ${selectedProduct.avgSoldPerDay}
      Lead Time: ${selectedProduct.leadTime} hari
      Safety Stock: ${selectedProduct.safetyStock}
      
      Berikan 2 kalimat strategi restock yang spesifik menggunakan angka-angka tersebut dalam Bahasa Indonesia.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: "Anda adalah pakar Logistik E-commerce. Berikan instruksi restock yang tepat."
        }
      });
      setAiInsight(response.text || "Insight tidak tersedia.");
    } catch (err) {
      setAiInsight("Koneksi AI terputus. Silakan coba sesaat lagi.");
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Stok Cerdas <span className="text-[#00aa5b]">AI</span></h2>
          <p className="text-slate-500 font-medium">Automasi manajemen inventaris berbasis data penjualan real-time.</p>
        </div>
        <div className="flex items-center space-x-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          <button className="px-4 py-2 bg-[#00aa5b] text-white rounded-xl text-xs font-bold shadow-md shadow-green-100">Ringkasan</button>
          <button className="px-4 py-2 text-slate-400 hover:text-slate-600 rounded-xl text-xs font-bold">Laporan Detail</button>
        </div>
      </div>

      {/* Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:border-[#00aa5b]/30 transition-all">
          <div className="w-10 h-10 bg-green-50 text-[#00aa5b] rounded-xl flex items-center justify-center mb-4">
            <Activity size={20} />
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.15em]">Avg. Sales / Day</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{selectedProduct.avgSoldPerDay} <span className="text-xs text-slate-400 font-bold uppercase">pcs</span></p>
          <div className="mt-2 text-[10px] text-green-600 font-bold flex items-center">
             <TrendingUp size={10} className="mr-1" /> Stabil di 30 hari terakhir
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <Truck size={20} />
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.15em]">Lead Time Demand</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{calculations.leadTimeDemand} <span className="text-xs text-slate-400 font-bold uppercase">pcs</span></p>
          <p className="mt-2 text-[10px] text-slate-400 font-bold">Estimasi terjual selama pengiriman ({selectedProduct.leadTime} hari)</p>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
            <ShieldCheck size={20} />
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.15em]">Safety Stock</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{selectedProduct.safetyStock} <span className="text-xs text-slate-400 font-bold uppercase">pcs</span></p>
          <p className="mt-2 text-[10px] text-slate-400 font-bold">Stok cadangan untuk lonjakan pesanan</p>
        </div>

        <div className="bg-[#00aa5b] p-6 rounded-[2rem] text-white shadow-xl shadow-green-100">
          <div className="w-10 h-10 bg-white/20 text-white rounded-xl flex items-center justify-center mb-4">
            <Zap size={20} className="fill-white" />
          </div>
          <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.15em]">Reorder Point (ROP)</p>
          <p className="text-2xl font-black text-white mt-1">{calculations.reorderPoint} <span className="text-xs text-white/60 font-bold uppercase">pcs</span></p>
          <p className="mt-2 text-[10px] text-white/80 font-bold">Waktu restock: <span className="underline">saat stok menyentuh {calculations.reorderPoint}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Predictive Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center">
                Forecast Stock <Sparkles size={18} className="ml-2 text-yellow-500 fill-yellow-500" />
              </h3>
              <p className="text-xs font-medium text-slate-400">Proyeksi ketersediaan barang untuk 6 minggu ke depan.</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Status Prediksi</span>
              <span className="px-3 py-1 bg-green-50 text-[#00aa5b] rounded-full text-[10px] font-black uppercase">98.2% Akurat</span>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={inventoryData}>
                <defs>
                  <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00aa5b" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00aa5b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="stock" name="Stok Aktual" stroke="#00aa5b" strokeWidth={4} fillOpacity={1} fill="url(#colorStock)" />
                <Area type="monotone" dataKey="forecast" name="Prediksi AI" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 flex items-center justify-center space-x-8">
            <div className="flex items-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
               <div className="w-3 h-3 bg-[#00aa5b] rounded-full mr-2"></div> Stok Riil
            </div>
            <div className="flex items-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
               <div className="w-3 h-1 bg-slate-300 rounded-full mr-2"></div> Target Aman
            </div>
          </div>
        </div>

        {/* AI Inventory Strategist */}
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-[#00aa5b] opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity"></div>
          
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-[#00aa5b] rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
              <Brain size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg">AI Stock Strategist</h3>
              <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Powered by Gemini 3.0</p>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Produk Terpilih</p>
              <select 
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-[#00aa5b] transition-all"
                value={selectedProduct.id}
                onChange={(e) => {
                  const p = mockProducts.find(prod => prod.id === e.target.value);
                  if (p) {
                    setSelectedProduct(p);
                    setAiInsight(null);
                  }
                }}
              >
                {mockProducts.map(p => (
                  <option key={p.id} value={p.id} className="bg-slate-900">{p.name}</option>
                ))}
              </select>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estimasi Habis</span>
                <span className={`text-sm font-black ${calculations.daysLeft < 5 ? 'text-red-400' : 'text-green-400'}`}>{calculations.daysLeft} Hari Lagi</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${calculations.daysLeft < 5 ? 'bg-red-500' : 'bg-[#00aa5b]'}`}
                  style={{ width: `${Math.min(100, (calculations.daysLeft / 30) * 100)}%` }}
                ></div>
              </div>
            </div>

            {aiInsight && (
              <div className="bg-[#00aa5b]/10 border border-[#00aa5b]/20 p-5 rounded-2xl animate-in zoom-in-95 duration-300">
                <div className="flex items-center space-x-2 mb-3 text-green-400">
                  <Sparkles size={14} className="fill-green-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Rekomendasi Strategis</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  {aiInsight}
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center bg-white/5 p-4 rounded-2xl border border-white/5">
               <Info size={16} className="text-blue-400 mr-3 shrink-0" />
               <p className="text-[11px] text-slate-400 leading-snug">
                 Saran: Pesan <span className="text-white font-bold">{Math.round(calculations.recommendedOrder)} unit</span> hari ini untuk stok 30 hari ke depan.
               </p>
            </div>
            <button 
              onClick={handleAiPredict}
              disabled={isPredicting}
              className={`
                w-full py-4 rounded-2xl flex items-center justify-center space-x-3 transition-all font-black text-sm uppercase tracking-widest
                ${isPredicting 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-[#00aa5b] hover:bg-[#039651] text-white shadow-xl shadow-green-900/50'}
              `}
            >
              {isPredicting ? <RefreshCcw size={20} className="animate-spin" /> : <span>Dapatkan Strategi</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid - Stock Attention */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center space-x-3">
             <div className="p-2.5 bg-red-50 text-red-600 rounded-xl">
                <AlertTriangle size={20} />
             </div>
             <div>
               <h3 className="text-lg font-black text-slate-900">Health Check Inventaris</h3>
               <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Perhitungan Berdasarkan Lead Time & Safety Stock</p>
             </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/50">
                <th className="px-8 py-5">Informasi Produk</th>
                <th className="px-6 py-5">Stock Aktual</th>
                <th className="px-6 py-5">ROP (Batas Aman)</th>
                <th className="px-6 py-5">Health Score</th>
                <th className="px-8 py-5 text-right">Aksi Cepat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockProducts.map((p) => {
                const rop = Math.round((p.avgSoldPerDay * p.leadTime) + p.safetyStock);
                const isUnderRop = p.stock <= rop;
                
                return (
                  <tr key={p.id} className={`group hover:bg-slate-50/80 transition-all cursor-pointer ${selectedProduct.id === p.id ? 'bg-green-50/50' : ''}`} onClick={() => setSelectedProduct(p)}>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                           <img src={`https://picsum.photos/seed/${p.id}/100`} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800">{p.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Lead Time: {p.leadTime} Hari</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900">{p.stock} pcs</span>
                        <span className="text-[10px] font-bold text-slate-400">Tersedia di Gudang</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col">
                        <span className={`text-sm font-black ${isUnderRop ? 'text-red-600' : 'text-slate-900'}`}>{rop} pcs</span>
                        <span className="text-[10px] font-bold text-slate-400">Titik Pesan Kembali</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-3">
                         <div className="flex-1 h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-500 ${isUnderRop ? 'bg-red-500' : 'bg-[#00aa5b]'}`}
                              style={{ width: `${Math.min(100, (p.stock / rop) * 100)}%` }}
                            ></div>
                         </div>
                         <span className={`text-[10px] font-black uppercase ${isUnderRop ? 'text-red-500' : 'text-green-600'}`}>
                           {isUnderRop ? 'BUTUH RESTOCK' : 'AMAN'}
                         </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className={`
                        px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all
                        ${isUnderRop ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}
                      `}>
                         {isUnderRop ? 'BUAT PESANAN' : 'DETAIL'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SmartStock;

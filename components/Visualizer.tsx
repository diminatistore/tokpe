
import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { LayoutGrid, BarChart3, LineChart as LineIcon, PieChart as PieIcon, Settings2, Download, MousePointer2 } from 'lucide-react';
import { Dataset } from '../types';

interface VisualizerProps {
  dataset: Dataset;
}

const COLORS = ['#2563eb', '#7c3aed', '#db2777', '#ea580c', '#16a34a', '#0891b2', '#4f46e5', '#be123c'];

const Visualizer: React.FC<VisualizerProps> = ({ dataset }) => {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area' | 'pie'>('bar');
  const [xAxis, setXAxis] = useState(dataset.columns[0]);
  const [yAxis, setYAxis] = useState(dataset.columns[1] || dataset.columns[0]);

  const numericColumns = dataset.columns.filter(col => 
    dataset.data.some(row => typeof row[col] === 'number')
  );

  const chartData = useMemo(() => {
    // Basic aggregation: if x-axis repeats, average the y-axis values
    const map = new Map();
    dataset.data.forEach(row => {
      const xVal = row[xAxis];
      const yVal = Number(row[yAxis]) || 0;
      if (!map.has(xVal)) {
        map.set(xVal, { count: 1, sum: yVal });
      } else {
        const existing = map.get(xVal);
        map.set(xVal, { count: existing.count + 1, sum: existing.sum + yVal });
      }
    });

    return Array.from(map.entries()).map(([name, data]) => ({
      name: String(name),
      value: parseFloat((data.sum / data.count).toFixed(2))
    })).slice(0, 15); // Limit to 15 entries for readability
  }, [dataset, xAxis, yAxis]);

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 20, right: 30, left: 20, bottom: 20 },
    };

    switch (chartType) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
              cursor={{ fill: '#f8fafc' }}
            />
            <Legend />
            <Bar dataKey="value" name={yAxis} fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
            <Legend />
            <Line type="monotone" dataKey="value" name={yAxis} stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
            <Legend />
            <Area type="monotone" dataKey="value" name={yAxis} stroke="#2563eb" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
          </AreaChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
              label={({ name }) => name}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
            <Legend />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Controls Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 text-slate-800">
            <Settings2 size={18} className="text-blue-600" />
            <h3 className="font-bold">Konfigurasi Grafik</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Tipe Visualisasi</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'bar', icon: BarChart3 },
                  { id: 'line', icon: LineIcon },
                  { id: 'area', icon: LayoutGrid },
                  { id: 'pie', icon: PieIcon },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setChartType(type.id as any)}
                    className={`
                      flex items-center justify-center p-3 rounded-xl border transition-all
                      ${chartType === type.id 
                        ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm ring-2 ring-blue-50' 
                        : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-300'}
                    `}
                  >
                    <type.icon size={20} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sumbu X (Kategori)</label>
              <select 
                value={xAxis}
                onChange={(e) => setXAxis(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              >
                {dataset.columns.map(col => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sumbu Y (Nilai)</label>
              <select 
                value={yAxis}
                onChange={(e) => setYAxis(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              >
                {numericColumns.length > 0 ? (
                  numericColumns.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))
                ) : (
                  dataset.columns.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))
                )}
              </select>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-100">
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
              <Download size={16} />
              <span>Unduh Grafik</span>
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-xl shadow-blue-100">
          <div className="flex items-center space-x-2 mb-3">
            <MousePointer2 size={16} className="text-blue-200" />
            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-100">Insight Cepat</h4>
          </div>
          <p className="text-sm font-medium leading-relaxed opacity-90">
            Grafik ini menunjukkan nilai rata-rata dari <span className="font-bold underline">{yAxis}</span> untuk setiap kategori <span className="font-bold underline">{xAxis}</span>.
          </p>
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="text-[10px] uppercase font-bold text-blue-200">Tip AI</div>
            <p className="text-[11px] mt-1 opacity-80">Gunakan chart tipe area untuk melihat tren akumulasi yang lebih dramatis.</p>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="lg:col-span-3">
        <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col min-h-[500px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Visualisasi Data</h3>
              <p className="text-sm text-slate-500">{yAxis} berdasarkan {xAxis}</p>
            </div>
            <div className="flex items-center space-x-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
              <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 bg-white shadow-sm">Real-time</button>
              <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-slate-600">Static</button>
            </div>
          </div>
          
          <div className="flex-1 w-full min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart() || (
                <div className="flex items-center justify-center h-full text-slate-400 font-medium">
                  Pilih kolom data untuk menampilkan grafik
                </div>
              )}
            </ResponsiveContainer>
          </div>

          <div className="mt-8 flex items-center justify-between text-[11px] text-slate-400 font-medium border-t border-slate-50 pt-4">
            <div className="flex items-center space-x-4">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> {dataset.name}</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span> Aggregated: Average</span>
            </div>
            <span>Diperbarui pada {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;

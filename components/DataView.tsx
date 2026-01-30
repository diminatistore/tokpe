
import React, { useState } from 'react';
import { Search, Download, Filter, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { Dataset } from '../types';

interface DataViewProps {
  dataset: Dataset;
}

const DataView: React.FC<DataViewProps> = ({ dataset }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const filteredData = dataset.data.filter(row => 
    Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Dataset Navigator</h2>
          <p className="text-sm text-slate-500">Menampilkan {dataset.data.length} baris data dari {dataset.name}</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari dalam data..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl bg-white text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none w-full md:w-64"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600">
            <Filter size={18} />
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors">
            <Download size={16} />
            <span className="hidden sm:inline">Ekspor CSV</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {dataset.columns.map(col => (
                  <th key={col} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {col}
                  </th>
                ))}
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                  {dataset.columns.map(col => (
                    <td key={col} className="px-6 py-4 text-sm text-slate-600 max-w-[200px] truncate">
                      {String(row[col])}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <button className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-600 rounded">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <p className="text-xs font-medium text-slate-500">
            Menampilkan <span className="text-slate-900">{page * rowsPerPage + 1}</span> - <span className="text-slate-900">{Math.min((page + 1) * rowsPerPage, filteredData.length)}</span> dari <span className="text-slate-900">{filteredData.length}</span>
          </p>
          <div className="flex items-center space-x-2">
            <button 
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
              className="p-1.5 border border-slate-200 rounded-lg hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent text-slate-600 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center space-x-1">
              {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${page === i ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'hover:bg-white text-slate-600'}`}
                >
                  {i + 1}
                </button>
              ))}
              {totalPages > 5 && <span className="text-slate-400 text-xs px-1">...</span>}
            </div>
            <button 
              disabled={page >= totalPages - 1}
              onClick={() => setPage(p => p + 1)}
              className="p-1.5 border border-slate-200 rounded-lg hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent text-slate-600 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataView;

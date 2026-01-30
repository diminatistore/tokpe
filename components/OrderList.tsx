
import React from 'react';
import { ShoppingBag, Eye, CheckCircle, Clock, XCircle } from 'lucide-react';

const OrderList: React.FC = () => {
  const orders = [
    { id: '#TP-9021', customer: 'Andi Wijaya', total: 'Rp 450.000', status: 'Selesai', date: 'Hari ini, 14:20' },
    { id: '#TP-9020', customer: 'Siti Rahma', total: 'Rp 1.200.000', status: 'Diproses', date: 'Hari ini, 12:45' },
    { id: '#TP-9019', customer: 'Budi Santoso', total: 'Rp 85.000', status: 'Selesai', date: 'Kemarin, 21:10' },
    { id: '#TP-9018', customer: 'Dewi Lestari', total: 'Rp 210.000', status: 'Dibatalkan', date: 'Kemarin, 19:30' },
    { id: '#TP-9017', customer: 'Rian Hidayat', total: 'Rp 350.000', status: 'Dikirim', date: '24 Jan 2024' },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl">
                 <ShoppingBag size={22} />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Transaksi Terbaru</h3>
           </div>
           <button className="text-xs font-bold text-[#00aa5b] hover:underline">Download Laporan (.pdf)</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                <th className="pb-5">Order ID</th>
                <th className="pb-5">Pembeli</th>
                <th className="pb-5">Total</th>
                <th className="pb-5">Status</th>
                <th className="pb-5">Waktu</th>
                <th className="pb-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orders.map((order) => (
                <tr key={order.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 text-sm font-bold text-slate-900">{order.id}</td>
                  <td className="py-5">
                     <p className="text-sm font-bold text-slate-700">{order.customer}</p>
                  </td>
                  <td className="py-5 text-sm font-black text-slate-900">{order.total}</td>
                  <td className="py-5">
                    <div className={`
                      flex items-center space-x-2 px-3 py-1.5 rounded-full w-fit
                      ${order.status === 'Selesai' ? 'bg-green-50 text-green-600' : 
                        order.status === 'Diproses' ? 'bg-blue-50 text-blue-600' : 
                        order.status === 'Dikirim' ? 'bg-orange-50 text-orange-600' : 
                        'bg-red-50 text-red-600'}
                    `}>
                       {order.status === 'Selesai' ? <CheckCircle size={14} /> : 
                        order.status === 'Diproses' ? <Clock size={14} /> : 
                        order.status === 'Dikirim' ? <Clock size={14} /> : 
                        <XCircle size={14} />}
                       <span className="text-[10px] font-extrabold uppercase tracking-widest">{order.status}</span>
                    </div>
                  </td>
                  <td className="py-5 text-xs font-medium text-slate-400">{order.date}</td>
                  <td className="py-5 text-right">
                    <button className="p-2 text-slate-400 hover:bg-white hover:text-slate-900 hover:shadow-sm rounded-xl transition-all">
                       <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;

import React from 'react';

const approvals = [
  { id: '1', village: 'Rampur', vid: '#V-2045', district: 'Rampur Block', title: 'Solar Street Light Installation', budget: '₹2,50,000', priority: 'High', date: 'Oct 24, 2023' },
  { id: '2', village: 'Madhupur', vid: '#V-2044', district: 'Kalyan District', title: 'Community Hall Renovation', budget: '₹5,00,000', priority: 'Medium', date: 'Oct 23, 2023' },
  { id: '3', village: 'Sitapur', vid: '#V-2041', district: 'North Zone', title: 'Water Pump Repair', budget: '₹45,000', priority: 'Low', date: 'Oct 22, 2023' },
];

export const Approvals = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div className="flex flex-col gap-1">
            <h2 className="text-slate-900 text-3xl font-bold tracking-tight">Village Proposal Approvals</h2>
            <p className="text-slate-500 text-base">Review and manage pending development initiatives.</p>
         </div>
         <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm">
            <span className="material-symbols-outlined text-[20px]">download</span> Export Report
         </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
         {[
           { label: 'Total Pending', val: '42', tag: 'High Load', tagColor: 'bg-yellow-50 text-yellow-700', trend: '+5%', trendColor: 'text-emerald-600' },
           { label: 'Approved Today', val: '15', trend: '+12%', trendColor: 'text-emerald-600' },
           { label: 'Rejected Today', val: '3', trend: '-2%', trendColor: 'text-red-600' }
         ].map((stat, i) => (
           <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col gap-1">
              <div className="flex justify-between items-start">
                 <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                 {stat.tag && <span className={`${stat.tagColor} text-xs px-2 py-0.5 rounded-full font-medium`}>{stat.tag}</span>}
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                 <p className="text-slate-900 text-3xl font-bold">{stat.val}</p>
                 <p className={`${stat.trendColor} text-sm font-medium flex items-center`}>
                    <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span> {stat.trend}
                 </p>
              </div>
           </div>
         ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
         <div className="flex flex-col md:flex-row gap-4 p-4 border-b border-slate-100">
            <div className="flex-1 relative">
               <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400">search</span>
               <input className="block w-full pl-10 pr-3 py-2.5 border-none bg-slate-50 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary-500 transition-colors" placeholder="Search by Village Name..." type="text" />
            </div>
            <div className="flex gap-2">
               <button className="flex items-center gap-2 bg-slate-50 text-slate-700 hover:bg-slate-100 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                  <span className="material-symbols-outlined text-[20px]">filter_list</span> More Filters
               </button>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                     <th className="p-4 w-12"><input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" /></th>
                     <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Village</th>
                     <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">District</th>
                     <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Proposal</th>
                     <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Budget</th>
                     <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Priority</th>
                     <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Submitted</th>
                     <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {approvals.map((row) => (
                     <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4"><input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" /></td>
                        <td className="p-4">
                           <div className="flex flex-col">
                              <span className="text-sm font-semibold text-slate-900">{row.village}</span>
                              <span className="text-xs text-slate-500">ID: {row.vid}</span>
                           </div>
                        </td>
                        <td className="p-4 text-sm text-slate-700">{row.district}</td>
                        <td className="p-4 text-sm font-medium text-slate-900">{row.title}</td>
                        <td className="p-4 text-sm text-slate-700">{row.budget}</td>
                        <td className="p-4">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row.priority === 'High' ? 'bg-red-100 text-red-800' : row.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-slate-100 text-slate-800'}`}>{row.priority}</span>
                        </td>
                        <td className="p-4 text-sm text-slate-500">{row.date}</td>
                        <td className="p-4 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button className="size-8 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors" title="Approve"><span className="material-symbols-outlined text-lg">check</span></button>
                              <button className="size-8 flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors" title="Reject"><span className="material-symbols-outlined text-lg">close</span></button>
                           </div>
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
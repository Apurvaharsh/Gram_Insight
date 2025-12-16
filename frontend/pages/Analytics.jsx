import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const data = [
  { name: 'Jan', completed: 40, pending: 24, amt: 2400 },
  { name: 'Feb', completed: 30, pending: 13, amt: 2210 },
  { name: 'Mar', completed: 20, pending: 58, amt: 2290 },
  { name: 'Apr', completed: 27, pending: 39, amt: 2000 },
  { name: 'May', completed: 18, pending: 48, amt: 2181 },
  { name: 'Jun', completed: 23, pending: 38, amt: 2500 },
  { name: 'Jul', completed: 34, pending: 43, amt: 2100 },
];

const resourceData = [
  { name: 'Water', allocated: 4000, utilized: 2400 },
  { name: 'Roads', allocated: 3000, utilized: 1398 },
  { name: 'Elec', allocated: 2000, utilized: 9800 },
  { name: 'School', allocated: 2780, utilized: 3908 },
  { name: 'Health', allocated: 1890, utilized: 4800 },
];

export const Analytics = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Analytics Dashboard</h2>
          <p className="text-sm text-slate-500">Overview of rural development initiatives and trends.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium hover:bg-slate-50 text-slate-900 shadow-sm">
             <span className="material-symbols-outlined text-[18px]">calendar_today</span>
             <span>Last 6 Months</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Trend Chart */}
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[400px]">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Project Completion Trends</h3>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                  <Area type="monotone" dataKey="completed" stroke="#16a34a" fillOpacity={1} fill="url(#colorCompleted)" strokeWidth={2} />
                  <Area type="monotone" dataKey="pending" stroke="#f59e0b" fillOpacity={1} fill="url(#colorPending)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
         </div>

         {/* Resource Allocation */}
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[400px]">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Resource Allocation vs Utilization</h3>
            <div className="flex-1 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={resourceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                    <Legend />
                    <Bar dataKey="allocated" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="utilized" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
         <h3 className="text-lg font-bold text-slate-900 mb-4">Detailed Metrics</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-50 rounded-xl">
               <p className="text-sm text-slate-500 font-medium">Funds Disbursed</p>
               <h4 className="text-2xl font-bold text-slate-900 mt-1">₹45.2 Lakh</h4>
               <p className="text-xs text-green-600 font-bold mt-2">+12% vs last month</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
               <p className="text-sm text-slate-500 font-medium">Active Workers</p>
               <h4 className="text-2xl font-bold text-slate-900 mt-1">1,204</h4>
               <p className="text-xs text-slate-400 font-bold mt-2">Across 12 sites</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
               <p className="text-sm text-slate-500 font-medium">Material Stock</p>
               <h4 className="text-2xl font-bold text-slate-900 mt-1">Adequate</h4>
               <p className="text-xs text-blue-600 font-bold mt-2">Restocked 2 days ago</p>
            </div>
         </div>
      </div>
    </div>
  );
};
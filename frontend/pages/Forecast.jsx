import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Q1', actual: 30, projected: 30 },
  { name: 'Q2', actual: 52, projected: 48 },
  { name: 'Q3', actual: 74, projected: 70 },
  { name: 'Q4 (Est)', actual: null, projected: 92 },
];

export const Forecast = () => {
  const { id } = useParams();
  const [timeRange, setTimeRange] = useState('1 Year');

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Shivpur Development Forecast</h2>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
             <span className="font-semibold text-slate-700">ID: {id || 'IND-UP-883'}</span>
             <span className="w-1 h-1 rounded-full bg-slate-300"></span>
             <span>Last Updated: 2 Hours ago by System AI</span>
             <span className="ml-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
               <span className="material-symbols-outlined text-[16px]">verified</span> AI Confidence: 85%
             </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="hidden md:flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              {['6 Months', '1 Year', '5 Years'].map((range) => (
                 <button 
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${timeRange === range ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                    {range}
                 </button>
              ))}
           </div>
           <button className="flex items-center gap-2 h-10 px-5 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
              <span className="material-symbols-outlined text-[20px]">print</span> Export Report
           </button>
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex items-start gap-4 shadow-sm">
         <div className="bg-white p-2.5 rounded-full shadow-sm text-blue-600 shrink-0 mt-0.5">
           <span className="material-symbols-outlined">auto_awesome</span>
         </div>
         <div>
           <h4 className="text-slate-900 font-bold text-base mb-1">Key AI Insight</h4>
           <p className="text-slate-700 text-sm leading-relaxed">
              Based on current acceleration in road infrastructure projects, Shivpur is projected to meet its "Smart Village" connectivity criteria <strong>2 weeks ahead of schedule</strong>. However, water sanitation goals are lagging by 12% due to delayed material procurement.
           </p>
         </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden">
            <div className="flex justify-between items-start z-10">
               <p className="text-slate-500 text-xs font-bold uppercase tracking-wide">Projected Budget</p>
               <span className="material-symbols-outlined text-green-500">trending_up</span>
            </div>
            <div className="z-10">
               <p className="text-4xl font-extrabold text-slate-900">₹12.5L</p>
               <p className="text-xs text-green-600 font-bold mt-2 inline-flex items-center gap-1">
                  <span className="bg-green-100 px-1.5 py-0.5 rounded text-[10px]">+5%</span> vs initial allocation
               </p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
               <span className="material-symbols-outlined text-9xl">attach_money</span>
            </div>
         </div>
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden">
            <div className="flex justify-between items-start z-10">
               <p className="text-slate-500 text-xs font-bold uppercase tracking-wide">Est. Completion</p>
               <span className="material-symbols-outlined text-blue-600">event</span>
            </div>
            <div className="z-10">
               <p className="text-4xl font-extrabold text-slate-900">Nov 2024</p>
               <p className="text-xs text-slate-500 font-bold mt-2">On track for Phase 2</p>
            </div>
             <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
               <span className="material-symbols-outlined text-9xl">calendar_month</span>
            </div>
         </div>
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden">
            <div className="flex justify-between items-start z-10">
               <p className="text-slate-500 text-xs font-bold uppercase tracking-wide">Beneficiary Impact</p>
               <span className="material-symbols-outlined text-purple-500">groups</span>
            </div>
            <div className="z-10">
               <p className="text-4xl font-extrabold text-slate-900">1,240</p>
               <p className="text-xs text-slate-500 font-bold mt-2">Households covered</p>
            </div>
             <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
               <span className="material-symbols-outlined text-9xl">diversity_3</span>
            </div>
         </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Chart Section */}
         <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-lg text-slate-900">Development Metrics Projection</h3>
               <button className="text-blue-600 text-sm font-bold hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors">View Details</button>
            </div>
            <div className="flex-1 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                     <Tooltip 
                        contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '12px'}}
                        itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
                     />
                     <Legend wrapperStyle={{paddingTop: '20px'}} />
                     <Line type="monotone" name="Actual Progress" dataKey="actual" stroke="#2563eb" strokeWidth={3} dot={{r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                     <Line type="monotone" name="Projected Target" dataKey="projected" stroke="#93c5fd" strokeWidth={3} strokeDasharray="5 5" dot={{r: 4, fill: '#93c5fd', strokeWidth: 2, stroke: '#fff'}} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Resource Allocation */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
            <h3 className="font-bold text-lg text-slate-900 mb-8">Resource Allocation</h3>
            <div className="flex flex-col gap-8">
               {/* Funds */}
               <div>
                  <div className="flex justify-between items-end mb-2">
                     <span className="text-sm font-bold text-slate-700">Funds Utilized</span>
                     <span className="text-sm font-bold text-blue-600">65%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-600 rounded-full shadow-sm" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 text-right font-medium">₹8.1L / ₹12.5L</p>
               </div>

               {/* Manpower */}
               <div>
                  <div className="flex justify-between items-end mb-2">
                     <span className="text-sm font-bold text-slate-700">Manpower Active</span>
                     <span className="text-sm font-bold text-green-600">82%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-green-500 rounded-full shadow-sm" style={{ width: '82%' }}></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 text-right font-medium">38 / 45 Workers</p>
               </div>

               {/* Material Stock */}
               <div>
                  <div className="flex justify-between items-end mb-2">
                     <span className="text-sm font-bold text-slate-700">Material Stock</span>
                     <span className="text-sm font-bold text-red-500">Low (30%)</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-red-400 rounded-full shadow-sm" style={{ width: '30%' }}></div>
                  </div>
                  <p className="text-xs text-red-400 mt-1.5 text-right font-bold">Requires Restock</p>
               </div>
            </div>
            
            <div className="mt-auto pt-6 border-t border-slate-100">
               <button className="w-full py-3 rounded-lg border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">inventory_2</span> Manage Resources
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};
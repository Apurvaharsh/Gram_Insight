import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { analyticsAPI } from '../utils/api';

export const Analytics = () => {
  const [summary, setSummary] = useState(null);
  const [amenitiesStatus, setAmenitiesStatus] = useState(null);
  const [priorityRanking, setPriorityRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [summaryRes, amenitiesRes, rankingRes] = await Promise.all([
          analyticsAPI.getSummary(),
          analyticsAPI.getAmenitiesStatus(),
          analyticsAPI.getPriorityRanking(),
        ]);

        if (summaryRes.success) setSummary(summaryRes.data);
        if (amenitiesRes.success) setAmenitiesStatus(amenitiesRes.data.result);
        if (rankingRes.success) setPriorityRanking(rankingRes.data.villages || []);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading analytics...</div>;
  }

  const data = [
    { name: 'Jan', completed: 40, pending: 24, amt: 2400 },
    { name: 'Feb', completed: 30, pending: 13, amt: 2210 },
    { name: 'Mar', completed: 20, pending: 58, amt: 2290 },
    { name: 'Apr', completed: 27, pending: 39, amt: 2000 },
    { name: 'May', completed: 18, pending: 48, amt: 2181 },
    { name: 'Jun', completed: 23, pending: 38, amt: 2500 },
    { name: 'Jul', completed: 34, pending: 43, amt: 2100 },
  ];

  const resourceData = amenitiesStatus ? [
    { name: 'Water', missing: amenitiesStatus.waterSupplyMissing || 0 },
    { name: 'Electricity', missing: amenitiesStatus.electricityMissing || 0 },
    { name: 'Roads', missing: amenitiesStatus.roadConnectivityMissing || 0 },
    { name: 'Healthcare', missing: amenitiesStatus.healthcareMissing || 0 },
    { name: 'School', missing: amenitiesStatus.schoolMissing || 0 },
    { name: 'Toilets', missing: amenitiesStatus.toiletsMissing || 0 },
    { name: 'Internet', missing: amenitiesStatus.internetMissing || 0 },
  ] : [];
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

         {/* Amenities Missing */}
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[400px]">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Missing Amenities by Category</h3>
            <div className="flex-1 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={resourceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                    <Bar dataKey="missing" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
         <h3 className="text-lg font-bold text-slate-900 mb-4">Summary Statistics</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-50 rounded-xl">
               <p className="text-sm text-slate-500 font-medium">Total Villages</p>
               <h4 className="text-2xl font-bold text-slate-900 mt-1">{summary?.totalVillages || 0}</h4>
               <p className="text-xs text-slate-400 font-bold mt-2">Registered villages</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
               <p className="text-sm text-slate-500 font-medium">Approved Villages</p>
               <h4 className="text-2xl font-bold text-slate-900 mt-1">{summary?.approvedVillages || 0}</h4>
               <p className="text-xs text-green-600 font-bold mt-2">{summary?.pendingVillages || 0} pending</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
               <p className="text-sm text-slate-500 font-medium">Avg Priority Score</p>
               <h4 className="text-2xl font-bold text-slate-900 mt-1">{summary?.averagePrioriyScore?.toFixed(1) || 0}</h4>
               <p className="text-xs text-blue-600 font-bold mt-2">Across all villages</p>
            </div>
         </div>
      </div>

      {priorityRanking.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <h3 className="text-lg font-bold text-slate-900 mb-4">Top Priority Villages</h3>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                       <th className="p-4 text-xs font-bold uppercase text-slate-500">Rank</th>
                       <th className="p-4 text-xs font-bold uppercase text-slate-500">Village</th>
                       <th className="p-4 text-xs font-bold uppercase text-slate-500">District</th>
                       <th className="p-4 text-xs font-bold uppercase text-slate-500">Priority Score</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {priorityRanking.map((v, idx) => (
                       <tr key={v._id} className="hover:bg-slate-50">
                          <td className="p-4 font-bold text-slate-900">#{idx + 1}</td>
                          <td className="p-4 font-medium text-slate-900">{v.villageName}</td>
                          <td className="p-4 text-slate-600">{v.district}</td>
                          <td className="p-4">
                             <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-red-100 text-red-700">
                                {v.priorityScore?.toFixed(1) || 0}
                             </span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}
    </div>
  );
};
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const mockVillages = [
  { id: 'V-1024', name: 'Rampur', district: 'Varanasi', block: 'Sewapuri', population: 2450, scPopulationPct: 35, priorityScore: 85, status: 'Pending', image: 'https://picsum.photos/seed/rampur/100/100' },
  { id: 'V-1025', name: 'Kishanpur', district: 'Jaunpur', block: 'Marihu', population: 1820, scPopulationPct: 12, priorityScore: 42, status: 'Approved', image: 'https://picsum.photos/seed/kishanpur/100/100' },
  { id: 'V-1026', name: 'Chandpur', district: 'Varanasi', block: 'Cholapur', population: 3105, scPopulationPct: 28, priorityScore: 68, status: 'In Review', image: 'https://picsum.photos/seed/chandpur/100/100' },
  { id: 'V-1027', name: 'Lalpur', district: 'Ghazipur', block: 'Sadar', population: 945, scPopulationPct: 5, priorityScore: 15, status: 'Approved', image: 'https://picsum.photos/seed/lalpur/100/100' },
  { id: 'V-1028', name: 'Belwa', district: 'Varanasi', block: 'Pindra', population: 5602, scPopulationPct: 45, priorityScore: 92, status: 'Pending', image: 'https://picsum.photos/seed/belwa/100/100' },
];

export const VillageList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVillages = mockVillages.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'text-orange-600 bg-white ring-orange-500/30 ring-1';
      case 'Approved': return 'text-primary-600 bg-white ring-primary-600/30 ring-1';
      case 'In Review': return 'text-slate-600 bg-white ring-slate-300 ring-1';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getPriorityColor = (score) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 50) return 'text-orange-500';
    return 'text-primary-600';
  };

  const getPriorityLabel = (score) => {
    if (score >= 80) return 'Critical';
    if (score >= 50) return 'High';
    return 'Normal';
  };

  const getPriorityBarColor = (score) => {
    if (score >= 80) return 'bg-red-500';
    if (score >= 50) return 'bg-orange-500';
    return 'bg-primary-500';
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Village Directory</h2>
          <p className="text-sm font-medium text-slate-500">Manage development status and prioritize resources.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-primary-600 transition-all">
            <span className="material-symbols-outlined text-lg">download</span> Export
          </button>
          <Link to="/villages/new" className="flex items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-600/20 hover:bg-primary-700 transition-all">
            <span className="material-symbols-outlined text-lg">add</span> Add New Village
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-3 md:grid-cols-12 md:items-center shadow-sm">
        <div className="col-span-1 md:col-span-4 lg:col-span-5">
           <div className="relative flex items-center">
             <span className="material-symbols-outlined absolute left-4 text-slate-400">search</span>
             <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all outline-none" placeholder="Search by name, ID..." type="text" />
           </div>
        </div>
        <div className="col-span-1 flex flex-wrap gap-2 md:col-span-8 lg:col-span-7 md:justify-end">
           {/* Filters mockup */}
           <button className="flex h-12 min-w-[140px] items-center justify-between rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 hover:border-primary-500 hover:text-primary-600 hover:bg-green-50/30 transition-all">
              <span>District: All</span>
              <span className="material-symbols-outlined text-lg">expand_more</span>
           </button>
           <button className="flex h-12 min-w-[140px] items-center justify-between rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 hover:border-primary-500 hover:text-primary-600 hover:bg-green-50/30 transition-all">
              <span>Status: All</span>
              <span className="material-symbols-outlined text-lg">expand_more</span>
           </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
           <table className="w-full min-w-[1000px] table-auto text-left">
              <thead className="border-b border-slate-200 bg-slate-50/50">
                 <tr>
                    {['Village Name', 'District', 'Block', 'Population', 'Priority Score', 'Status', 'Actions'].map((header) => (
                       <th key={header} className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-slate-500">
                          {header}
                       </th>
                    ))}
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                 {filteredVillages.map((village) => (
                    <tr key={village.id} className="group hover:bg-primary-50/30 transition-colors">
                       <td className="px-6 py-4">
                          <Link to={`/villages/${village.id}`} className="flex items-center gap-3">
                             <div className="h-10 w-10 rounded-lg bg-slate-200 shadow-sm border border-white bg-cover bg-center" style={{ backgroundImage: `url(${village.image})` }}></div>
                             <div>
                                <span className="font-bold text-slate-900 block group-hover:text-primary-700 transition-colors">{village.name}</span>
                                <span className="text-xs text-slate-400">ID: {village.id}</span>
                             </div>
                          </Link>
                       </td>
                       <td className="px-6 py-4 text-slate-600">{village.district}</td>
                       <td className="px-6 py-4 text-slate-600">{village.block}</td>
                       <td className="px-6 py-4">
                          <div className="font-bold text-slate-800">{village.population.toLocaleString()}</div>
                          <div className="text-xs text-slate-400">SC: {village.scPopulationPct}%</div>
                       </td>
                       <td className="px-6 py-4">
                          <div className="flex w-32 flex-col gap-1.5">
                             <div className="flex justify-between text-xs">
                                <span className={`font-bold ${getPriorityColor(village.priorityScore)}`}>{getPriorityLabel(village.priorityScore)}</span>
                                <span className="text-slate-400">{village.priorityScore}%</span>
                             </div>
                             <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                                <div className={`h-full rounded-full ${getPriorityBarColor(village.priorityScore)}`} style={{ width: `${village.priorityScore}%` }}></div>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${getStatusColor(village.status)}`}>
                             <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${village.status === 'Approved' ? 'bg-primary-500' : village.status === 'Pending' ? 'bg-orange-500' : 'bg-slate-400'}`}></span>
                             {village.status}
                          </span>
                       </td>
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                             <Link to={`/villages/${village.id}`} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-white hover:text-primary-600 hover:shadow-sm transition-all">
                                <span className="material-symbols-outlined text-lg">visibility</span>
                             </Link>
                             <button className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-white hover:text-red-500 hover:shadow-sm transition-all">
                                <span className="material-symbols-outlined text-lg">delete</span>
                             </button>
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
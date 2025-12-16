import React from 'react';
import { useParams, Link } from 'react-router-dom';

export const VillageDetail = () => {
  const { id } = useParams();

  // Mock data for detail view
  const village = {
    name: 'Rampur Village',
    id: id || 'V-1024',
    created: 'Oct 12, 2023',
    district: 'Northern Hills',
    status: 'Development Pending',
    population: '2,540',
    area: '4.2 km²',
    literacy: '78%',
    description: 'Rampur is located in the fertile plains of the northern district. It has a primarily agricultural economy with a growing small-scale textile industry. The village has shown 12% population growth in the last census.',
    image: 'https://picsum.photos/seed/rampur_detail/600/400'
  };

  const amenities = [
    { name: 'Water Supply', status: 'Good', value: '92% Coverage', icon: 'water_drop', color: 'green', width: '92%' },
    { name: 'Electricity', status: 'Stable', value: '22 hrs/day', icon: 'electric_bolt', color: 'green', width: '88%' },
    { name: 'Road Connectivity', status: 'Critical', value: 'Poor Condition', icon: 'add_road', color: 'red', width: '35%' },
    { name: 'Healthcare', status: 'Warning', value: 'Staff Shortage', icon: 'medical_services', color: 'orange', width: '60%' },
    { name: 'Education', status: 'Good', value: '3 Schools', icon: 'school', color: 'green', width: '100%' },
    { name: 'Sanitation', status: 'Improving', value: '85% ODF', icon: 'cleaning_services', color: 'green', width: '85%' },
  ];

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
           <div className="flex items-center gap-3">
              <h2 className="text-slate-900 text-3xl md:text-4xl font-extrabold tracking-tight">{village.name}</h2>
              <span className="bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">{village.status}</span>
           </div>
           <div className="flex items-center gap-4 text-slate-500 text-sm">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">fingerprint</span> ID: {village.id}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span>Created: {village.created}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span>District: {village.district}</span>
           </div>
        </div>
        <div className="flex items-center gap-3">
           <Link to={`/villages/${id}/ai-plan`} className="flex items-center justify-center h-10 px-6 rounded-full bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-all shadow-md shadow-green-200">
             <span className="material-symbols-outlined text-[20px] mr-2">psychology</span>
             AI Plan
           </Link>
           <button className="hidden md:flex items-center justify-center h-10 px-6 rounded-full border border-slate-200 bg-white text-slate-900 text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
             Export Data
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
           {/* Overview Card */}
           <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col justify-between gap-4">
                 <div>
                    <h3 className="text-slate-900 text-lg font-bold mb-2">Village Overview</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{village.description}</p>
                 </div>
                 <div className="flex gap-6 mt-2">
                    <div>
                       <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Population</p>
                       <p className="text-slate-900 text-xl font-bold">{village.population}</p>
                    </div>
                    <div>
                       <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Area</p>
                       <p className="text-slate-900 text-xl font-bold">{village.area}</p>
                    </div>
                    <div>
                       <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Literacy</p>
                       <p className="text-slate-900 text-xl font-bold">{village.literacy}</p>
                    </div>
                 </div>
                 <div className="pt-2">
                    <button className="text-primary-700 text-sm font-bold flex items-center gap-1 hover:underline">
                       View Full Census Data <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                 </div>
              </div>
              <div className="w-full md:w-64 aspect-video md:aspect-square lg:aspect-video bg-slate-100 rounded-lg bg-cover bg-center relative overflow-hidden group shadow-inner" style={{ backgroundImage: `url(${village.image})` }}>
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                 <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-slate-900">Lat: 24.5° N, Long: 78.2° E</div>
              </div>
           </div>

           {/* Amenities */}
           <div>
              <h3 className="text-slate-900 text-lg font-bold mb-4 flex items-center gap-2">
                 <span className="material-symbols-outlined text-primary-600">grid_view</span> Amenities Status
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                 {amenities.map((item) => (
                    <div key={item.name} className={`bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow ${item.color === 'red' ? 'border-l-4 border-l-red-500' : item.color === 'orange' ? 'border-l-4 border-l-orange-400' : ''}`}>
                       <div className="flex justify-between items-start">
                          <div className={`p-2 rounded-lg ${item.color === 'green' ? 'bg-green-50 text-green-700' : item.color === 'red' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}>
                             <span className="material-symbols-outlined">{item.icon}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.color === 'green' ? 'bg-green-100 text-green-800' : item.color === 'red' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}`}>{item.status}</span>
                       </div>
                       <div>
                          <p className="text-slate-500 text-xs font-medium">{item.name}</p>
                          <p className="text-slate-900 text-lg font-bold">{item.value}</p>
                       </div>
                       <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${item.color === 'green' ? 'bg-green-500' : item.color === 'red' ? 'bg-red-500' : 'bg-orange-400'}`} style={{ width: item.width }}></div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           {/* Forecast Card */}
           <div className="bg-slate-900 rounded-xl p-6 shadow-lg text-white relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-500 opacity-20 blur-3xl rounded-full group-hover:opacity-30 transition-opacity"></div>
              <div className="relative z-10 flex flex-col gap-4">
                 <div className="size-10 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-400">trending_up</span>
                 </div>
                 <div>
                    <h3 className="text-lg font-bold mb-1">Forecast Analysis</h3>
                    <p className="text-slate-400 text-sm">View projected development metrics for the next 5 years.</p>
                 </div>
                 <Link to={`/villages/${id}/forecast`} className="mt-2 w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-4 rounded-full transition-colors">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                    View Forecast
                 </Link>
              </div>
           </div>

           {/* Management Actions */}
           <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-slate-900 text-base font-bold mb-4">Management Actions</h3>
              <div className="flex flex-col gap-3">
                 <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-primary-200 transition-all text-left group">
                    <span className="material-symbols-outlined text-slate-500 group-hover:text-primary-600">edit_document</span>
                    <span className="text-slate-900 text-sm font-medium">Edit Village Details</span>
                 </button>
                 <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-200 hover:bg-red-50 hover:border-red-200 transition-all text-left group">
                    <span className="material-symbols-outlined text-red-500">delete</span>
                    <span className="text-red-600 text-sm font-medium">Delete Record</span>
                 </button>
              </div>
           </div>

           {/* Activity Log */}
           <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-slate-900 text-base font-bold mb-4">Recent Activity</h3>
              <div className="relative pl-4 border-l border-slate-200 space-y-6">
                 <div className="relative">
                    <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-primary-500 ring-4 ring-white"></div>
                    <p className="text-slate-900 text-xs font-bold">New Survey Data Added</p>
                    <p className="text-slate-500 text-[10px] mt-0.5">Today, 10:23 AM • By Officer Raj</p>
                 </div>
                 <div className="relative">
                    <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-slate-300 ring-4 ring-white"></div>
                    <p className="text-slate-900 text-xs font-bold">Water Quality Test: Pass</p>
                    <p className="text-slate-500 text-[10px] mt-0.5">Yesterday • By Lab Tech</p>
                 </div>
              </div>
              <button className="mt-4 w-full text-center text-xs text-primary-700 font-bold hover:underline">View All History</button>
           </div>
        </div>
      </div>
    </div>
  );
};
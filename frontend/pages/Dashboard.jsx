import React from 'react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, subValue, icon, trend, trendUp, colorClass, iconBgClass }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${iconBgClass} group-hover:scale-110 transition-transform duration-300`}>
        <span className={`material-symbols-outlined ${colorClass} fill`}>{icon}</span>
      </div>
      {trend && (
        <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${trendUp ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-amber-700 bg-amber-50 border-amber-100'}`}>
          {trendUp && <span className="material-symbols-outlined text-sm">trending_up</span>}
          {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <div className="flex items-baseline gap-1">
        <h3 className="text-3xl font-extrabold text-slate-900">{value}</h3>
        {subValue && <span className="text-sm text-slate-400 font-medium">{subValue}</span>}
      </div>
    </div>
  </div>
);

const activities = [
  { id: '1', type: 'Approval', title: 'Project Approved', desc: "'Solar Grid' initiative for Ramgarh has been approved.", time: '2h ago', icon: 'check_circle', colorClass: 'text-primary-600 bg-primary-50' },
  { id: '2', type: 'Alert', title: 'Sanitation Alert', desc: "Sitapur reported critical sanitation levels.", time: '5h ago', icon: 'warning', colorClass: 'text-amber-600 bg-amber-50' },
  { id: '3', type: 'Registration', title: 'New Registration', desc: "Sarpanch registered for village Lakhanpur.", time: 'Yesterday', icon: 'person_add', colorClass: 'text-blue-600 bg-blue-50' },
  { id: '4', type: 'Upload', title: 'Budget Uploaded', desc: "Q3 Financial Report for District A uploaded.", time: '2d ago', icon: 'upload_file', colorClass: 'text-purple-600 bg-purple-50' },
];

export const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Villages" value="1,240" icon="holiday_village" trend="+12%" trendUp={true} colorClass="text-blue-600" iconBgClass="bg-blue-50" />
        <StatCard title="Pending Approvals" value="8" icon="pending_actions" trend="Action Required" trendUp={false} colorClass="text-amber-600" iconBgClass="bg-amber-50" />
        <StatCard title="Avg Priority Score" value="7.2" subValue="/10" icon="analytics" trend="Stable" trendUp={true} colorClass="text-slate-600" iconBgClass="bg-slate-100" />
        
        {/* Featured Stat */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-6 rounded-2xl shadow-lg shadow-green-200 text-white relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 bg-white/10 rounded-full size-32 blur-2xl"></div>
          <div className="relative z-10 flex justify-between items-start mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined fill">water_drop</span>
            </div>
            <span className="text-xs font-bold text-white bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">Monthly Goal</span>
          </div>
          <div className="relative z-10">
            <p className="text-green-100 text-sm font-medium mb-1">Amenity Coverage</p>
            <h3 className="text-3xl font-bold text-white">68%</h3>
          </div>
          <div className="relative z-10 w-full bg-black/20 h-1.5 rounded-full mt-4 overflow-hidden">
             <div className="bg-white h-full rounded-full w-[68%] shadow-sm"></div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Quick Actions */}
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-600">bolt</span>
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link to="/villages/new" className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-primary-600 text-white shadow-lg shadow-green-200 hover:bg-primary-700 hover:-translate-y-1 transition-all group">
                <div className="p-2 bg-white/20 rounded-full">
                  <span className="material-symbols-outlined">add</span>
                </div>
                <span className="text-sm font-bold">New Village</span>
              </Link>
              <button className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-primary-600 hover:border-primary-200 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className="p-2 bg-amber-50 rounded-full text-amber-600 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">fact_check</span>
                </div>
                <span className="text-sm font-semibold">Verify Data</span>
              </button>
              <Link to="/analytics" className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-primary-600 hover:border-primary-200 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className="p-2 bg-blue-50 rounded-full text-blue-600 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <span className="text-sm font-semibold">Reports</span>
              </Link>
              <button className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-primary-600 hover:border-primary-200 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className="p-2 bg-purple-50 rounded-full text-purple-600 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">group_add</span>
                </div>
                <span className="text-sm font-semibold">Add Officer</span>
              </button>
            </div>
          </section>

          {/* Map/Heatmap Placeholder */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 h-[400px] flex flex-col overflow-hidden">
             <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
                <div className="flex items-center gap-2">
                   <div className="bg-blue-100 p-1.5 rounded-lg text-primary-600">
                      <span className="material-symbols-outlined text-sm">map</span>
                   </div>
                   <h3 className="text-base font-bold text-slate-900">Priority Heatmap</h3>
                </div>
                <select className="text-xs font-bold text-slate-700 bg-slate-50 border-none rounded-lg py-1 pl-2 pr-6 cursor-pointer outline-none">
                   <option>All Priorities</option>
                   <option>Urgent Only</option>
                </select>
             </div>
             <div className="relative flex-1 bg-slate-100 group overflow-hidden">
                 <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("https://picsum.photos/seed/map/800/400")', filter: 'grayscale(20%) contrast(1.1)' }}></div>
                 {/* Map Pins */}
                 <div className="absolute top-[35%] left-[28%] flex flex-col items-center group/pin cursor-pointer">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
                    <div className="h-4 w-4 bg-red-500 rounded-full border-[3px] border-white shadow-lg relative z-10"></div>
                     <div className="absolute bottom-6 opacity-0 group-hover/pin:opacity-100 transition-all duration-200 transform translate-y-2 group-hover/pin:translate-y-0">
                        <div className="bg-white px-3 py-2 rounded-lg shadow-xl text-xs font-bold text-slate-900 border border-slate-100">Sitapur (Urgent)</div>
                     </div>
                 </div>
                 <div className="absolute top-[55%] left-[60%] flex flex-col items-center group/pin cursor-pointer">
                    <div className="h-4 w-4 bg-amber-500 rounded-full border-[3px] border-white shadow-lg relative z-10"></div>
                 </div>
                 <div className="absolute top-[45%] left-[45%] flex flex-col items-center group/pin cursor-pointer">
                    <div className="h-4 w-4 bg-green-500 rounded-full border-[3px] border-white shadow-lg relative z-10"></div>
                 </div>
             </div>
          </section>
        </div>

        {/* Sidebar Right: Recent Activity */}
        <div className="flex flex-col h-full">
           <section className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                 <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
                 <button className="text-primary-600 hover:bg-primary-50 p-1.5 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-lg">tune</span>
                 </button>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                 {activities.map((activity) => (
                    <div key={activity.id} className="flex gap-4 p-4 hover:bg-slate-50 rounded-xl transition-all cursor-pointer group border border-transparent hover:border-slate-100">
                       <div className="mt-1 flex-shrink-0">
                          <div className={`size-10 rounded-full flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform ${activity.colorClass}`}>
                             <span className="material-symbols-outlined text-lg fill">{activity.icon}</span>
                          </div>
                       </div>
                       <div className="flex-1">
                          <div className="flex justify-between items-start">
                             <p className="text-sm text-slate-900 font-bold">{activity.title}</p>
                             <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{activity.time}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{activity.desc}</p>
                       </div>
                    </div>
                 ))}
              </div>
              <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                 <button className="w-full py-2.5 text-sm font-bold text-primary-600 hover:text-white hover:bg-primary-600 border border-primary-200 hover:border-primary-600 rounded-lg transition-all shadow-sm">
                    View All Activity
                 </button>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};
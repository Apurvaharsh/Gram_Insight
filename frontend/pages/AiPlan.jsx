import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const AiPlan = () => {
   const { id } = useParams();
   const [village, setVillage] = useState(null);
   const [aiPlan, setAiPlan] = useState("");
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const token = localStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };

            // Fetch Village Details
            const villageRes = await fetch(`http://localhost:3000/api/villages/${id}`, { headers });
            const villageData = await villageRes.json();
            if (villageData.success) {
               setVillage(villageData.data.village);
            }

            // Fetch AI Plan
            const aiRes = await fetch(`http://localhost:3000/api/villages/${id}/ai-plan`, { headers });
            const aiData = await aiRes.json();
            if (aiData.success) {
               setAiPlan(aiData.data.plan);
            }
         } catch (error) {
            console.error("Error fetching data:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [id]);

   if (loading || !village) {
      return <div className="p-10 text-center">Loading plan...</div>;
   }

   // Derive Action Items from Amenities
   const actionItems = [];
   if (village.amenities.waterSupply === "Not Available") {
      actionItems.push({ item: 'Install Solar Water Pumps', sector: 'Water Supply', prio: 'High', cost: '₹5,00,000', color: 'red' });
   }
   if (village.amenities.roadConnectivity === "Poor") {
      actionItems.push({ item: 'Resurface Main Roads', sector: 'Infrastructure', prio: 'High', cost: '₹15,00,000', color: 'red' });
   }
   if (village.amenities.electricity === "Not Available") {
      actionItems.push({ item: 'Solar Grid Installation', sector: 'Energy', prio: 'High', cost: '₹8,00,000', color: 'orange' });
   }
   if (village.amenities.school === "Not Available") {
      actionItems.push({ item: 'Construct Primary School', sector: 'Education', prio: 'Medium', cost: '₹12,00,000', color: 'orange' });
   }
   if (village.amenities.healthcare === "Not Available") {
      actionItems.push({ item: 'Mobile Health Clinic Setup', sector: 'Healthcare', prio: 'Critical', cost: '₹4,00,000', color: 'red' });
   }
   // Default item if all good
   if (actionItems.length === 0) {
      actionItems.push({ item: 'Maintenance & Monitoring', sector: 'General', prio: 'Low', cost: '₹1,00,000', color: 'green' });
   }


   return (
      <div className="flex flex-col gap-8 pb-10">
         {/* Header */}
         <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex flex-col gap-1">
               <h1 className="text-slate-900 text-3xl md:text-4xl font-extrabold tracking-tight">Integrated Development Roadmap: <br /><span className="text-primary-700">{village.villageName}</span></h1>
               <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mt-1">
                  <span className="material-symbols-outlined text-[18px] text-green-600">smart_toy</span>
                  <span>Generated for {village.district} District</span>
               </div>
            </div>
            <div className="flex gap-3 mt-2 md:mt-0">
               <button className="flex items-center gap-2 h-11 px-5 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">share</span> Share
               </button>
               <button className="flex items-center gap-2 h-11 px-5 rounded-lg bg-green-500 text-white font-bold text-sm hover:bg-green-600 transition-colors shadow-lg shadow-green-200">
                  <span className="material-symbols-outlined text-[20px]">download</span> Download Report
               </button>
            </div>
         </div>

         {/* Stats Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Budget */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft flex flex-col justify-between h-40 group hover:shadow-md transition-all">
               <div className="flex justify-between items-start">
                  <p className="text-green-800 text-xs font-bold uppercase tracking-wide opacity-70">Total Estimated Budget</p>
                  <div className="bg-green-50 p-2 rounded-lg text-green-600 group-hover:scale-110 transition-transform">
                     <span className="material-symbols-outlined text-2xl">payments</span>
                  </div>
               </div>
               <div>
                  <div className="flex items-center gap-2">
                     <p className="text-3xl font-extrabold text-slate-900">₹{actionItems.length * 5},00,000</p>
                     <span className="bg-green-100 text-green-700 text-[10px] font-black px-1.5 py-0.5 rounded">Est.</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium mt-2">Based on standard unit costs</p>
               </div>
            </div>

            {/* Completion */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft flex flex-col justify-between h-40 group hover:shadow-md transition-all">
               <div className="flex justify-between items-start">
                  <p className="text-green-800 text-xs font-bold uppercase tracking-wide opacity-70">Projected Completion</p>
                  <div className="bg-blue-50 p-2 rounded-lg text-blue-500 group-hover:scale-110 transition-transform">
                     <span className="material-symbols-outlined text-2xl">schedule</span>
                  </div>
               </div>
               <div>
                  <div className="flex items-center gap-2">
                     <p className="text-3xl font-extrabold text-slate-900">{6 + actionItems.length * 2} Months</p>
                  </div>
                  <p className="text-xs text-slate-400 font-medium mt-2">Based on current contractor availability</p>
               </div>
            </div>

            {/* Beneficiaries */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft flex flex-col justify-between h-40 group hover:shadow-md transition-all">
               <div className="flex justify-between items-start">
                  <p className="text-green-800 text-xs font-bold uppercase tracking-wide opacity-70">Impacted Beneficiaries</p>
                  <div className="bg-green-50 p-2 rounded-lg text-green-600 group-hover:scale-110 transition-transform">
                     <span className="material-symbols-outlined text-2xl">groups</span>
                  </div>
               </div>
               <div>
                  <div className="flex items-baseline gap-2">
                     <p className="text-3xl font-extrabold text-slate-900">{village.population}</p>
                     <span className="text-sm font-bold text-slate-500">Residents</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium mt-2">100% of village population</p>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Main Column */}
            <div className="lg:col-span-8 flex flex-col gap-8">
               {/* AI Strategy */}
               <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-soft">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="size-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 shadow-sm">
                        <span className="material-symbols-outlined text-3xl">auto_awesome</span>
                     </div>
                     <h3 className="text-xl font-bold text-slate-900">AI Executive Strategy</h3>
                  </div>
                  <div className="text-slate-600 leading-relaxed text-base whitespace-pre-wrap">
                     {aiPlan || "Generating development strategy based on village amenities and demographic data..."}
                  </div>
               </div>

               {/* Action Items Table */}
               <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-end px-2">
                     <h3 className="text-xl font-bold text-slate-900">Prioritized Action Items</h3>
                     <button className="text-green-600 text-sm font-bold hover:bg-green-50 px-3 py-1 rounded-lg transition-colors">View All</button>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-soft">
                     <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                           <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase text-xs font-bold tracking-wider">
                              <tr>
                                 <th className="px-6 py-5">Action Item</th>
                                 <th className="px-6 py-5">Sector</th>
                                 <th className="px-6 py-5">Priority</th>
                                 <th className="px-6 py-5 text-right">Est. Cost</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-slate-50">
                              {actionItems.map((row, idx) => (
                                 <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 font-bold text-slate-900">{row.item}</td>
                                    <td className="px-6 py-4 text-slate-500 group-hover:text-green-700 transition-colors">{row.sector}</td>
                                    <td className="px-6 py-4">
                                       <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${row.color === 'red' ? 'bg-red-50 text-red-600' : row.color === 'orange' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>{row.prio}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-700 font-mono">{row.cost}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-8">
               {/* Implementation Phases */}
               <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-soft h-auto">
                  <h3 className="text-lg font-bold text-slate-900 mb-8">Implementation Phases</h3>
                  <div className="relative border-l-2 border-slate-200 ml-3 space-y-10">
                     {/* Phase 1 */}
                     <div className="relative pl-8">
                        <div className="absolute -left-[9px] top-1 size-4 rounded-full bg-green-500 ring-4 ring-white shadow-sm"></div>
                        <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Phase 1 • Months 1-3</p>
                        <h4 className="text-base font-bold text-slate-900">Immediate Relief</h4>
                        <p className="text-sm text-slate-500 mt-2 leading-snug">Address critical gaps in {actionItems[0]?.sector || "Infrastructure"}.</p>
                     </div>
                     {/* Phase 2 */}
                     <div className="relative pl-8">
                        <div className="absolute -left-[9px] top-1 size-4 rounded-full bg-white border-[3px] border-green-500 ring-4 ring-white shadow-sm"></div>
                        <p className="text-[10px] font-black text-green-700 uppercase tracking-widest mb-1 opacity-70">Phase 2 • Months 4-9</p>
                        <h4 className="text-base font-bold text-slate-900">Structural Upgrades</h4>
                        <p className="text-sm text-slate-500 mt-2 leading-snug">Permanent facility construction and grid expansion.</p>
                     </div>
                     {/* Phase 3 */}
                     <div className="relative pl-8">
                        <div className="absolute -left-[9px] top-1 size-4 rounded-full bg-slate-200 ring-4 ring-white"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Phase 3 • Months 10-18</p>
                        <h4 className="text-base font-bold text-slate-900">Sustainability</h4>
                        <p className="text-sm text-slate-500 mt-2 leading-snug">Maintenance protocols and community training.</p>
                     </div>
                  </div>
               </div>

               {/* Budget Allocation */}
               <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-soft">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Budget Allocation</h3>
                  <div className="space-y-5">
                     {[
                        { label: 'Infrastructure', pct: '60%', val: 60, color: 'bg-green-500' },
                        { label: 'Labor Costs', pct: '25%', val: 25, color: 'bg-blue-500' },
                        { label: 'Contingency', pct: '15%', val: 15, color: 'bg-orange-400' }
                     ].map((b, i) => (
                        <div key={i}>
                           <div className="flex justify-between text-sm mb-2">
                              <span className="font-bold text-slate-700">{b.label}</span>
                              <span className="text-slate-500 font-mono font-medium">{b.pct}</span>
                           </div>
                           <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${b.color} rounded-full`} style={{ width: b.pct }}></div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
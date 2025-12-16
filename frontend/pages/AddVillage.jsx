import React from 'react';

export const AddVillage = () => {
  return (
    <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="flex flex-col gap-2">
          <h1 className="text-slate-900 text-3xl md:text-4xl font-extrabold tracking-tight">Add New Village</h1>
          <p className="text-slate-500 text-base max-w-2xl">Enter details to register a new village in GramInsight.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-500 font-bold text-sm hover:bg-slate-50 hover:text-slate-900 transition-colors bg-white shadow-sm">Cancel</button>
          <button className="px-6 py-2.5 rounded-lg bg-primary-600 text-white font-bold text-sm hover:bg-primary-700 transition-all shadow-md flex items-center gap-2">
             <span className="material-symbols-outlined text-[20px]">save</span> Save Draft
          </button>
        </div>
      </div>

      <form className="flex flex-col gap-8">
        <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
          <div className="flex items-start gap-4 mb-8">
             <div className="size-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 shadow-sm">
                <span className="material-symbols-outlined text-[28px]">info</span>
             </div>
             <div>
                <h2 className="text-slate-900 text-xl font-bold">Basic Information</h2>
                <p className="text-slate-500 text-sm mt-1">Primary identification details.</p>
             </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
             <label className="flex flex-col gap-2">
                <span className="text-slate-900 text-sm font-bold ml-1">Village Name <span className="text-red-500">*</span></span>
                <input className="w-full h-12 px-4 rounded-lg bg-slate-50 border border-transparent focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all font-medium outline-none" placeholder="Enter village name" required type="text" />
             </label>
             <label className="flex flex-col gap-2">
                <span className="text-slate-900 text-sm font-bold ml-1">Census Code <span className="text-red-500">*</span></span>
                <input className="w-full h-12 px-4 rounded-lg bg-slate-50 border border-transparent focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all font-medium outline-none" placeholder="e.g. 123456" required type="text" />
             </label>
             <label className="flex flex-col gap-2">
                <span className="text-slate-900 text-sm font-bold ml-1">District <span className="text-red-500">*</span></span>
                <div className="relative">
                   <select className="w-full h-12 px-4 rounded-lg bg-slate-50 border border-transparent focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 appearance-none transition-all outline-none font-medium cursor-pointer" defaultValue="">
                      <option disabled value="">Select District</option>
                      <option>District A</option>
                      <option>District B</option>
                   </select>
                   <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                </div>
             </label>
             <label className="flex flex-col gap-2">
                <span className="text-slate-900 text-sm font-bold ml-1">Block / Tehsil <span className="text-red-500">*</span></span>
                <div className="relative">
                   <select className="w-full h-12 px-4 rounded-lg bg-slate-50 border border-transparent focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 appearance-none transition-all outline-none font-medium cursor-pointer" defaultValue="">
                      <option disabled value="">Select Block</option>
                      <option>Block 1</option>
                      <option>Block 2</option>
                   </select>
                   <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                </div>
             </label>
          </div>
        </section>

        <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
           <div className="flex items-start gap-4 mb-8">
              <div className="size-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 shadow-sm">
                 <span className="material-symbols-outlined text-[28px]">groups</span>
              </div>
              <div>
                 <h2 className="text-slate-900 text-xl font-bold">Demographics</h2>
                 <p className="text-slate-500 text-sm mt-1">Latest census data.</p>
              </div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Total Population', 'SC/ST Population', 'Number of Households'].map((label, i) => (
                 <label key={i} className="flex flex-col gap-2 group">
                    <span className="text-slate-900 text-sm font-bold ml-1">{label}</span>
                    <div className="relative">
                       <input className="w-full h-12 pl-4 pr-10 rounded-lg bg-slate-50 border border-transparent focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all font-medium outline-none" placeholder="0" type="number" />
                       <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">person</span>
                    </div>
                 </label>
              ))}
           </div>
        </section>

        <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <div className="flex items-start gap-4 mb-8">
               <div className="size-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">water_drop</span>
               </div>
               <div>
                  <h2 className="text-slate-900 text-xl font-bold">Amenities Status</h2>
                  <p className="text-slate-500 text-sm mt-1">Current status of public services.</p>
               </div>
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-200">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="p-5 font-bold text-xs uppercase tracking-wider text-slate-500 w-1/4">Amenity</th>
                        <th className="p-5 font-bold text-xs uppercase tracking-wider text-slate-500 w-1/3">Availability</th>
                        <th className="p-5 font-bold text-xs uppercase tracking-wider text-slate-500 w-1/3">Condition</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                     {['Water Supply', 'Electricity', 'Road Connectivity'].map((amenity, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                           <td className="p-5 font-semibold text-slate-900">{amenity}</td>
                           <td className="p-5">
                              <div className="flex gap-2">
                                 {['Available', 'Partial', 'None'].map(opt => (
                                    <label key={opt} className="cursor-pointer">
                                       <input className="peer sr-only" name={`${amenity}_avail`} type="radio" />
                                       <div className="px-4 py-2 rounded-full border border-slate-200 text-slate-500 bg-white peer-checked:bg-green-100 peer-checked:text-green-800 peer-checked:border-green-500 font-bold text-xs transition-all shadow-sm hover:bg-slate-50">{opt}</div>
                                    </label>
                                 ))}
                              </div>
                           </td>
                           <td className="p-5">
                              <div className="flex gap-2">
                                 {['Good', 'Average', 'Poor'].map(opt => (
                                    <label key={opt} className="cursor-pointer">
                                       <input className="peer sr-only" name={`${amenity}_cond`} type="radio" />
                                       <div className="px-4 py-2 rounded-full border border-slate-200 text-slate-500 bg-white peer-checked:bg-emerald-50 peer-checked:text-emerald-700 peer-checked:border-emerald-500 font-bold text-xs transition-all shadow-sm hover:bg-slate-50">{opt}</div>
                                    </label>
                                 ))}
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
        </section>

        <div className="flex flex-col md:flex-row justify-end items-center gap-4 pt-4">
           <button className="w-full md:w-auto px-8 py-3.5 rounded-lg border border-slate-200 text-slate-900 font-bold hover:bg-slate-50 transition-colors bg-white shadow-sm" type="button">Discard Changes</button>
           <button className="w-full md:w-auto px-10 py-3.5 rounded-lg bg-primary-700 text-white font-bold hover:bg-primary-800 transition-all shadow-lg flex items-center justify-center gap-2" type="button">
              <span className="material-symbols-outlined text-[20px]">check_circle</span> Submit Village Data
           </button>
        </div>
      </form>
    </div>
  );
};
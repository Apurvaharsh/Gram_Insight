import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { villageAPI } from '../utils/api';

export const AddVillage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    villageName: '',
    district: '',
    block: '',
    population: '',
    scPopulation: '',
    amenities: {
      waterSupply: 'Not Available',
      electricity: 'Not Available',
      roadConnectivity: 'Poor',
      healthcare: 'Not Available',
      school: 'Not Available',
      toilets: 'Not Available',
      internet: 'Not Available',
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const villageData = {
        ...formData,
        population: parseInt(formData.population),
        scPopulation: parseInt(formData.scPopulation),
        amenities: formData.amenities, // Use correct spelling
      };
      
      const response = await villageAPI.create(villageData);
      if (response.success) {
        navigate('/villages');
      }
    } catch (error) {
      console.error('Error creating village:', error);
      alert('Failed to create village. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityChange = (amenity, field, value) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: value,
      },
    }));
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="flex flex-col gap-2">
          <h1 className="text-slate-900 text-3xl md:text-4xl font-extrabold tracking-tight">Add New Village</h1>
          <p className="text-slate-500 text-base max-w-2xl">Enter details to register a new village in GramInsight.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/villages')} className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-500 font-bold text-sm hover:bg-slate-50 hover:text-slate-900 transition-colors bg-white shadow-sm">Cancel</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
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
                <input className="w-full h-12 px-4 rounded-lg bg-slate-50 border border-transparent focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all font-medium outline-none" placeholder="Enter village name" required type="text" value={formData.villageName} onChange={(e) => handleInputChange('villageName', e.target.value)} />
             </label>
             <label className="flex flex-col gap-2">
                <span className="text-slate-900 text-sm font-bold ml-1">District <span className="text-red-500">*</span></span>
                <input className="w-full h-12 px-4 rounded-lg bg-slate-50 border border-transparent focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all font-medium outline-none" placeholder="Enter district name" required type="text" value={formData.district} onChange={(e) => handleInputChange('district', e.target.value)} />
             </label>
             <label className="flex flex-col gap-2">
                <span className="text-slate-900 text-sm font-bold ml-1">Block / Tehsil <span className="text-red-500">*</span></span>
                <input className="w-full h-12 px-4 rounded-lg bg-slate-50 border border-transparent focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all font-medium outline-none" placeholder="Enter block/tehsil name" required type="text" value={formData.block} onChange={(e) => handleInputChange('block', e.target.value)} />
             </label>
             <label className="flex flex-col gap-2">
                <span className="text-slate-900 text-sm font-bold ml-1">Total Population <span className="text-red-500">*</span></span>
                <input className="w-full h-12 px-4 rounded-lg bg-slate-50 border border-transparent focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all font-medium outline-none" placeholder="Enter population" required type="number" value={formData.population} onChange={(e) => handleInputChange('population', e.target.value)} />
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
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2 group">
                 <span className="text-slate-900 text-sm font-bold ml-1">SC/ST Population <span className="text-red-500">*</span></span>
                 <div className="relative">
                    <input className="w-full h-12 pl-4 pr-10 rounded-lg bg-slate-50 border border-transparent focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all font-medium outline-none" placeholder="0" type="number" value={formData.scPopulation} onChange={(e) => handleInputChange('scPopulation', e.target.value)} required />
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">person</span>
                 </div>
              </label>
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
                        <th className="p-5 font-bold text-xs uppercase tracking-wider text-slate-500 w-1/3">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                     {[
                        { key: 'waterSupply', label: 'Water Supply', options: ['Available', 'Partial', 'Not Available'] },
                        { key: 'electricity', label: 'Electricity', options: ['Available', 'Partial', 'Not Available'] },
                        { key: 'roadConnectivity', label: 'Road Connectivity', options: ['Good', 'Average', 'Poor'] },
                        { key: 'healthcare', label: 'Healthcare', options: ['Available', 'Partial', 'Not Available'] },
                        { key: 'school', label: 'School', options: ['Available', 'Not Available'] },
                        { key: 'toilets', label: 'Toilets', options: ['Available', 'Not Available'] },
                        { key: 'internet', label: 'Internet', options: ['Available', 'Not Available'] },
                     ].map((amenity) => (
                        <tr key={amenity.key} className="hover:bg-slate-50 transition-colors">
                           <td className="p-5 font-semibold text-slate-900">{amenity.label}</td>
                           <td className="p-5">
                              <div className="flex gap-2 flex-wrap">
                                 {amenity.options.map(opt => (
                                    <label key={opt} className="cursor-pointer">
                                       <input 
                                          className="peer sr-only" 
                                          name={amenity.key} 
                                          type="radio" 
                                          value={opt}
                                          checked={formData.amenities[amenity.key] === opt}
                                          onChange={() => handleAmenityChange(amenity.key, 'status', opt)}
                                       />
                                       <div className="px-4 py-2 rounded-full border border-slate-200 text-slate-500 bg-white peer-checked:bg-green-100 peer-checked:text-green-800 peer-checked:border-green-500 font-bold text-xs transition-all shadow-sm hover:bg-slate-50">{opt}</div>
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
           <button onClick={() => navigate('/villages')} className="w-full md:w-auto px-8 py-3.5 rounded-lg border border-slate-200 text-slate-900 font-bold hover:bg-slate-50 transition-colors bg-white shadow-sm" type="button">Discard Changes</button>
           <button disabled={loading} className="w-full md:w-auto px-10 py-3.5 rounded-lg bg-primary-700 text-white font-bold hover:bg-primary-800 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" type="submit">
              <span className="material-symbols-outlined text-[20px]">check_circle</span> {loading ? 'Submitting...' : 'Submit Village Data'}
           </button>
        </div>
      </form>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { villageAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

export const VillageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [village, setVillage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVillage = async () => {
      try {
        const response = await villageAPI.getById(id);
        if (response && response.success && response.data && response.data.village) {
          setVillage(response.data.village);
        } else {
          console.error('Invalid response format:', response);
          setVillage(null);
        }
      } catch (error) {
        console.error('Error fetching village:', error);
        setVillage(null);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchVillage();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this village?')) return;
    
    try {
      await villageAPI.delete(id);
      navigate('/villages');
    } catch (error) {
      console.error('Error deleting village:', error);
      alert('Failed to delete village. You may not have permission.');
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading village details...</div>;
  }

  if (!village) {
    return <div className="p-10 text-center">Village not found</div>;
  }

  const amenities = [
    { name: 'Water Supply', value: village.amenities?.waterSupply || 'Not Available', icon: 'water_drop', key: 'waterSupply' },
    { name: 'Electricity', value: village.amenities?.electricity || 'Not Available', icon: 'electric_bolt', key: 'electricity' },
    { name: 'Road Connectivity', value: village.amenities?.roadConnectivity || 'Poor', icon: 'add_road', key: 'roadConnectivity' },
    { name: 'Healthcare', value: village.amenities?.healthcare || 'Not Available', icon: 'medical_services', key: 'healthcare' },
    { name: 'School', value: village.amenities?.school || 'Not Available', icon: 'school', key: 'school' },
    { name: 'Toilets', value: village.amenities?.toilets || 'Not Available', icon: 'cleaning_services', key: 'toilets' },
    { name: 'Internet', value: village.amenities?.internet || 'Not Available', icon: 'wifi', key: 'internet' },
  ];

  const getAmenityColor = (value) => {
    if (value === 'Available' || value === 'Good') return 'green';
    if (value === 'Partial' || value === 'Average') return 'orange';
    return 'red';
  };

  const getAmenityWidth = (value) => {
    if (value === 'Available' || value === 'Good') return '100%';
    if (value === 'Partial' || value === 'Average') return '50%';
    return '20%';
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
           <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                 <h2 className="text-slate-900 text-3xl md:text-4xl font-extrabold tracking-tight">{village.villageName}</h2>
                 <span className={`${village.status === 'approved' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'} border text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>{village.status || 'pending'}</span>
              </div>
              <div className="flex items-center gap-4 text-slate-500 text-sm">
                 <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">fingerprint</span> ID: {village._id?.slice(-8)}</span>
                 <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                 <span>District: {village.district}</span>
                 <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                 <span>Block: {village.block}</span>
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
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {village.villageName} is located in {village.district} district, {village.block} block. 
                      The village has a population of {village.population?.toLocaleString()} with {village.scPopulation?.toLocaleString()} 
                      ({Math.round((village.scPopulation / village.population) * 100)}%) belonging to Scheduled Caste communities.
                    </p>
                 </div>
                 <div className="flex gap-6 mt-2">
                    <div>
                       <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Total Population</p>
                       <p className="text-slate-900 text-xl font-bold">{village.population?.toLocaleString()}</p>
                    </div>
                    <div>
                       <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">SC Population</p>
                       <p className="text-slate-900 text-xl font-bold">{village.scPopulation?.toLocaleString()}</p>
                    </div>
                    <div>
                       <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Priority Score</p>
                       <p className="text-slate-900 text-xl font-bold">{village.priorityScore?.toFixed(1) || 0}</p>
                    </div>
                 </div>
              </div>
              <div className="w-full md:w-64 aspect-video md:aspect-square lg:aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg relative overflow-hidden group shadow-inner flex items-center justify-center">
                 <span className="material-symbols-outlined text-primary-400 text-6xl">location_on</span>
              </div>
           </div>

           {/* Amenities */}
           <div>
              <h3 className="text-slate-900 text-lg font-bold mb-4 flex items-center gap-2">
                 <span className="material-symbols-outlined text-primary-600">grid_view</span> Amenities Status
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                 {amenities.map((item) => {
                   const color = getAmenityColor(item.value);
                   const width = getAmenityWidth(item.value);
                   return (
                    <div key={item.key} className={`bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow ${color === 'red' ? 'border-l-4 border-l-red-500' : color === 'orange' ? 'border-l-4 border-l-orange-400' : ''}`}>
                       <div className="flex justify-between items-start">
                          <div className={`p-2 rounded-lg ${color === 'green' ? 'bg-green-50 text-green-700' : color === 'red' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}>
                             <span className="material-symbols-outlined">{item.icon}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${color === 'green' ? 'bg-green-100 text-green-800' : color === 'red' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}`}>{item.value}</span>
                       </div>
                       <div>
                          <p className="text-slate-500 text-xs font-medium">{item.name}</p>
                          <p className="text-slate-900 text-lg font-bold">{item.value}</p>
                       </div>
                       <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${color === 'green' ? 'bg-green-500' : color === 'red' ? 'bg-red-500' : 'bg-orange-400'}`} style={{ width }}></div>
                       </div>
                    </div>
                 );
                 })}
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
           {isAdmin() && (
             <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-slate-900 text-base font-bold mb-4">Management Actions</h3>
                <div className="flex flex-col gap-3">
                   <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-primary-200 transition-all text-left group">
                      <span className="material-symbols-outlined text-slate-500 group-hover:text-primary-600">edit_document</span>
                      <span className="text-slate-900 text-sm font-medium">Edit Village Details</span>
                   </button>
                   <button onClick={handleDelete} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-200 hover:bg-red-50 hover:border-red-200 transition-all text-left group">
                      <span className="material-symbols-outlined text-red-500">delete</span>
                      <span className="text-red-600 text-sm font-medium">Delete Record</span>
                   </button>
                </div>
             </div>
           )}

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
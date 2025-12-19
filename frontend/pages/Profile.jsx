import React, { useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authAPI.getMe();
        setUser(response);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading profile...</div>;
  }

  if (!user) {
    return <div className="p-10 text-center">Failed to load profile</div>;
  }
  return (
    <div className="max-w-[1000px] mx-auto flex flex-col gap-6 py-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
         <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="relative group cursor-pointer">
               <div className="bg-center bg-no-repeat bg-cover rounded-full h-24 w-24 border-4 border-slate-50 shadow-md" style={{ backgroundImage: 'url("https://picsum.photos/seed/user1/200/200")' }}></div>
               <div className="absolute bottom-0 right-0 bg-primary-600 text-white rounded-full p-1.5 shadow-sm hover:bg-primary-700 transition-colors">
                  <span className="material-symbols-outlined text-[16px] block">edit</span>
               </div>
            </div>
            <div className="flex flex-col items-center md:items-start flex-1 gap-1 text-center md:text-left">
               <h2 className="text-slate-900 text-xl font-bold">{user.name}</h2>
               <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-primary-700 text-xs font-semibold px-2 py-0.5 rounded border border-blue-200">{user.role || 'Officer'}</span>
                  <span className="text-slate-500 text-sm">• ID: {user._id?.slice(-8)}</span>
               </div>
               <p className="text-slate-500 text-sm mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">mail</span> {user.email}
               </p>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="border-b border-slate-200 px-6">
            <div className="flex gap-8 overflow-x-auto">
               <button className="border-b-[3px] border-primary-600 text-primary-600 pb-3 pt-4 px-1 text-sm font-bold">Personal Info</button>
               <button className="border-b-[3px] border-transparent text-slate-500 hover:text-slate-900 pb-3 pt-4 px-1 text-sm font-bold">Security</button>
               <button className="border-b-[3px] border-transparent text-slate-500 hover:text-slate-900 pb-3 pt-4 px-1 text-sm font-bold">Notifications</button>
            </div>
         </div>
         <div className="p-6 md:p-8">
            <form className="flex flex-col gap-8">
               <div className="flex flex-col gap-4">
                  <h3 className="text-slate-900 text-lg font-bold pb-2 border-b border-dashed border-slate-200">Identity Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium text-slate-900">Full Name</span>
                        <input className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none" type="text" defaultValue={user.name} readOnly />
                     </label>
                     <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium text-slate-900">Official Email</span>
                        <input className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none" type="email" defaultValue={user.email} readOnly />
                     </label>
                  </div>
               </div>
               <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm font-bold hover:bg-slate-50" type="button">Cancel</button>
                  <button className="px-6 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 flex items-center gap-2 shadow-sm" type="button">
                     <span className="material-symbols-outlined text-[18px]">save</span> Save Changes
                  </button>
               </div>
            </form>
         </div>
      </div>
    </div>
  );
};
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { villageAPI } from '../utils/api';

export const AiPlanList = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const villagesRes = await villageAPI.getAll();
        if (villagesRes.success) {
          const villages = villagesRes.data.villages || [];
          setPlans(villages.map(v => ({
            id: v._id,
            villageName: v.villageName,
            district: v.district,
            modelVersion: 'v2.4',
            totalBudget: 'TBD',
            estimatedDuration: 'TBD',
            beneficiaries: v.population || 0,
            priorityItems: Object.values(v.amenities || {}).filter(val => val === 'Not Available' || val === 'Poor').length,
            generatedOn: new Date(v.createdAt).toLocaleDateString(),
            status: v.status === 'approved' ? 'Active' : 'Pending',
          })));
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const filteredPlans = useMemo(() => {
    return plans.filter((p) => {
      const matchesSearch =
        p.villageName.toLowerCase().includes(search.toLowerCase()) ||
        p.district.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
          ? p.status === "Active"
          : p.status !== "Active";
      return matchesSearch && matchesStatus;
    });
  }, [plans, search, statusFilter]);

  if (loading) {
    return <div className="p-10 text-center">Loading AI plans...</div>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Completed':
        return 'bg-blue-100 text-blue-700';
      case 'Pending':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="flex h-full flex-col overflow-auto bg-slate-50">
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary-600">psychology</span>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">AI Development Plans</h1>
            </div>
            <p className="text-slate-600">AI-generated integrated development roadmaps</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-500">filter_list</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                placeholder="Search village or district"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-50 rounded-xl">
                <span className="material-symbols-outlined text-purple-600">description</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Total Plans</p>
                <p className="text-2xl font-bold text-slate-900">{plans.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-50 rounded-xl">
                <span className="material-symbols-outlined text-green-600">play_circle</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Active Plans</p>
                <p className="text-2xl font-bold text-slate-900">3</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <span className="material-symbols-outlined text-blue-600">groups</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Total Beneficiaries</p>
                <p className="text-2xl font-bold text-slate-900">4,360</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-50 rounded-xl">
                <span className="material-symbols-outlined text-amber-600">account_balance_wallet</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Total Budget</p>
                <p className="text-2xl font-bold text-slate-900">₹1.56Cr</p>
              </div>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredPlans.map((plan) => (
            <Link
              key={plan.id}
              to={`/villages/${plan.id}/ai-plan`}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all group overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-5 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{plan.villageName}</h3>
                    <p className="text-primary-100 text-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">location_on</span>
                      {plan.district} District
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(plan.status)}`}>
                    {plan.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs font-medium text-slate-600 mb-1">Total Budget</p>
                    <p className="text-lg font-bold text-slate-900">₹{plan.totalBudget}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs font-medium text-slate-600 mb-1">Duration</p>
                    <p className="text-lg font-bold text-slate-900">{plan.estimatedDuration}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">groups</span>
                      Beneficiaries
                    </p>
                    <p className="text-base font-bold text-slate-900">{plan.beneficiaries.toLocaleString()} Families</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">priority_high</span>
                      Priority Items
                    </p>
                    <p className="text-base font-bold text-slate-900">{plan.priorityItems} Actions</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-600">AI Model {plan.modelVersion}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Generated on {plan.generatedOn}</p>
                  </div>
                  <button className="text-sm font-semibold text-primary-600 group-hover:text-primary-700 flex items-center gap-1">
                    View Plan
                    <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

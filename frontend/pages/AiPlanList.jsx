import React from 'react';
import { Link } from 'react-router-dom';

export const AiPlanList = () => {
  // Mock data - replace with actual API call
  const plans = [
    {
      id: 1,
      villageName: 'Rampur',
      district: 'Rampur',
      modelVersion: 'v2.4',
      totalBudget: '45,00,000',
      estimatedDuration: '18 Months',
      beneficiaries: 1240,
      priorityItems: 3,
      generatedOn: 'Oct 24, 2023',
      status: 'Active'
    },
    {
      id: 2,
      villageName: 'Shivpur',
      district: 'Kanpur',
      modelVersion: 'v2.4',
      totalBudget: '32,50,000',
      estimatedDuration: '14 Months',
      beneficiaries: 890,
      priorityItems: 4,
      generatedOn: 'Nov 12, 2023',
      status: 'Active'
    },
    {
      id: 3,
      villageName: 'Ganeshpur',
      district: 'Etawah',
      modelVersion: 'v2.3',
      totalBudget: '28,00,000',
      estimatedDuration: '12 Months',
      beneficiaries: 650,
      priorityItems: 2,
      generatedOn: 'Sep 8, 2023',
      status: 'Completed'
    },
    {
      id: 4,
      villageName: 'Laxmipur',
      district: 'Rampur',
      modelVersion: 'v2.4',
      totalBudget: '51,20,000',
      estimatedDuration: '20 Months',
      beneficiaries: 1580,
      priorityItems: 5,
      generatedOn: 'Oct 30, 2023',
      status: 'Active'
    }
  ];

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
            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
              <span className="material-symbols-outlined text-lg">filter_list</span>
              Filter
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-200 hover:bg-primary-700 transition-all">
              <span className="material-symbols-outlined text-lg">add</span>
              Generate Plan
            </button>
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
          {plans.map((plan) => (
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

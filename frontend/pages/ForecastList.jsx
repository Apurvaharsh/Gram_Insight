import React from 'react';
import { Link } from 'react-router-dom';

export const ForecastList = () => {
  // Mock data - replace with actual API call
  const forecasts = [
    {
      id: 1,
      villageName: 'Shivpur',
      district: 'Rampur',
      confidence: 85,
      estimatedCompletion: 'Nov 2024',
      projectedBudget: '12.5L',
      status: 'On Track',
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      villageName: 'Ganeshpur',
      district: 'Kanpur',
      confidence: 72,
      estimatedCompletion: 'Feb 2025',
      projectedBudget: '18.2L',
      status: 'Delayed',
      lastUpdated: '5 hours ago'
    },
    {
      id: 3,
      villageName: 'Ramgarh',
      district: 'Etawah',
      confidence: 91,
      estimatedCompletion: 'Dec 2024',
      projectedBudget: '9.8L',
      status: 'Ahead',
      lastUpdated: '1 day ago'
    },
    {
      id: 4,
      villageName: 'Laxmipur',
      district: 'Rampur',
      confidence: 68,
      estimatedCompletion: 'Mar 2025',
      projectedBudget: '15.4L',
      status: 'At Risk',
      lastUpdated: '3 hours ago'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Track':
        return 'bg-green-100 text-green-700';
      case 'Ahead':
        return 'bg-blue-100 text-blue-700';
      case 'Delayed':
        return 'bg-amber-100 text-amber-700';
      case 'At Risk':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-green-600 bg-green-50';
    if (confidence >= 60) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="flex h-full flex-col overflow-auto bg-slate-50">
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary-600">trending_up</span>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Development Forecasts</h1>
            </div>
            <p className="text-slate-600">AI-powered development timeline predictions</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
              <span className="material-symbols-outlined text-lg">filter_list</span>
              Filter
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-200 hover:bg-primary-700 transition-all">
              <span className="material-symbols-outlined text-lg">refresh</span>
              Refresh All
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <span className="material-symbols-outlined text-blue-600">analytics</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Total Forecasts</p>
                <p className="text-2xl font-bold text-slate-900">{forecasts.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-50 rounded-xl">
                <span className="material-symbols-outlined text-green-600">check_circle</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">On Track</p>
                <p className="text-2xl font-bold text-slate-900">2</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-50 rounded-xl">
                <span className="material-symbols-outlined text-amber-600">schedule</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Confidence</p>
                <p className="text-2xl font-bold text-slate-900">79%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-50 rounded-xl">
                <span className="material-symbols-outlined text-purple-600">payments</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Total Budget</p>
                <p className="text-2xl font-bold text-slate-900">₹55.9L</p>
              </div>
            </div>
          </div>
        </div>

        {/* Forecasts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {forecasts.map((forecast) => (
            <Link
              key={forecast.id}
              to={`/villages/${forecast.id}/forecast`}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                    {forecast.villageName}
                  </h3>
                  <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-base">location_on</span>
                    {forecast.district}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(forecast.status)}`}>
                  {forecast.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs font-medium text-slate-600 mb-1">AI Confidence</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getConfidenceColor(forecast.confidence).split(' ')[1]}`}
                        style={{ width: `${forecast.confidence}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-bold ${getConfidenceColor(forecast.confidence).split(' ')[0]}`}>
                      {forecast.confidence}%
                    </span>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs font-medium text-slate-600 mb-1">Estimated Completion</p>
                  <p className="text-sm font-bold text-slate-900">{forecast.estimatedCompletion}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-600">Projected Budget</p>
                  <p className="text-lg font-bold text-slate-900">₹{forecast.projectedBudget}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Updated {forecast.lastUpdated}</p>
                  <button className="mt-1 text-sm font-semibold text-primary-600 group-hover:text-primary-700 flex items-center gap-1">
                    View Details
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

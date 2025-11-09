import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, highRisk: 0, recoveryRate: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/borrowers/dash');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-2">
            Dashboard
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            Real-time borrower analytics and insights
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Total Borrowers Card */}
          <div className="group relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    ACTIVE
                  </div>
                </div>
              </div>
              <h2 className="text-lg font-bold text-slate-700 mb-2">Total Borrowers</h2>
              <p className="text-3xl lg:text-4xl font-black text-blue-600 mb-1">{stats.total.toLocaleString()}</p>
              <p className="text-sm text-slate-500 font-medium">Registered accounts</p>
            </div>
          </div>

          {/* High Risk Card */}
          <div className="group relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-rose-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                    ALERT
                  </div>
                </div>
              </div>
              <h2 className="text-lg font-bold text-slate-700 mb-2">High Risk Accounts</h2>
              <p className="text-3xl lg:text-4xl font-black text-red-500 mb-1">{stats.highRisk.toLocaleString()}</p>
              <p className="text-sm text-slate-500 font-medium">Require attention</p>
            </div>
          </div>

          {/* Recovery Rate Card */}
          <div className="group relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 md:col-span-2 xl:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    SUCCESS
                  </div>
                </div>
              </div>
              <h2 className="text-lg font-bold text-slate-700 mb-2">Recovery Rate</h2>
              <div className="flex items-baseline gap-1 mb-2">
                <p className="text-3xl lg:text-4xl font-black text-green-500">{stats.recoveryRate}</p>
                <span className="text-2xl font-bold text-green-500">%</span>
              </div>
              <p className="text-sm text-slate-500 font-medium">Collection performance</p>
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-slate-400 text-sm font-medium">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Live data updates
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const Reminders = () => {
  const [borrowers, setBorrowers] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/borrowers')
      .then((res) => {
        setBorrowers(res.data);

        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        const dueSoon = res.data.filter(borrower => {
          const due = new Date(borrower.dueDate);
          return due >= today && due <= nextWeek && borrower.status === 'Pending';
        });

        setUpcoming(dueSoon);
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to fetch borrowers');
      });
  }, []);

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (daysUntilDue) => {
    if (daysUntilDue <= 1) return 'red';
    if (daysUntilDue <= 3) return 'orange';
    return 'yellow';
  };

  const getUrgencyBadge = (daysUntilDue) => {
    if (daysUntilDue === 0) return 'DUE TODAY';
    if (daysUntilDue === 1) return 'DUE TOMORROW';
    if (daysUntilDue <= 3) return 'URGENT';
    return 'UPCOMING';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-8 lg:mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-pink-600">
                Upcoming Loan Reminders
              </h1>
              <p className="text-slate-600 text-lg font-medium mt-1">
                Track due dates and manage payment reminders
              </p>
            </div>
          </div>
          
          {/* Summary Stats */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 shadow-sm">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-slate-700">
                {upcoming.length} Upcoming Dues
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 shadow-sm">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm font-semibold text-slate-700">
                Next 7 Days
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {upcoming.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl p-12 shadow-xl max-w-md mx-auto">
              <div className="mb-6">
                <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg inline-block">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">All Clear!</h3>
              <p className="text-slate-600 text-lg font-medium">
                No upcoming dues in the next 7 days.
              </p>
              <p className="text-slate-500 text-sm mt-2">
                Your borrowers are up to date with their payments.
              </p>
            </div>
          </div>
        ) : (
          /* Reminders List */
          <div className="space-y-4 lg:space-y-6">
            {upcoming.map((b) => {
              const daysUntilDue = getDaysUntilDue(b.dueDate);
              const urgencyColor = getUrgencyColor(daysUntilDue);
              const urgencyBadge = getUrgencyBadge(daysUntilDue);
              
              return (
                <div
                  key={b._id}
                  className="group relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Urgency Indicator */}
                  <div className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl ${
                    urgencyColor === 'red' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                    urgencyColor === 'orange' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                    'bg-gradient-to-r from-yellow-500 to-yellow-600'
                  }`}></div>
                  
                  {/* Hover Effect */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    urgencyColor === 'red' ? 'bg-gradient-to-br from-red-500/5 to-red-600/5' :
                    urgencyColor === 'orange' ? 'bg-gradient-to-br from-orange-500/5 to-orange-600/5' :
                    'bg-gradient-to-br from-yellow-500/5 to-yellow-600/5'
                  }`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                      {/* Borrower Info */}
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl shadow-lg ${
                          urgencyColor === 'red' ? 'bg-gradient-to-br from-red-500 to-red-600' :
                          urgencyColor === 'orange' ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                          'bg-gradient-to-br from-yellow-500 to-yellow-600'
                        }`}>
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">{b.name}</h3>
                          <p className="text-sm text-slate-500 font-medium">Borrower ID: {b._id.slice(-8)}</p>
                        </div>
                      </div>
                      
                      {/* Urgency Badge */}
                      <div className={`text-xs font-bold px-3 py-1 rounded-full ${
                        urgencyColor === 'red' ? 'text-red-700 bg-red-100' :
                        urgencyColor === 'orange' ? 'text-orange-700 bg-orange-100' :
                        'text-yellow-700 bg-yellow-100'
                      }`}>
                        {urgencyBadge}
                      </div>
                    </div>
                    
                    {/* Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {/* Loan Amount */}
                      <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 border border-slate-100">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          <span className="text-sm font-semibold text-slate-600">Loan Amount</span>
                        </div>
                        <p className="text-2xl font-black text-green-600">₹{b.loanAmount.toLocaleString()}</p>
                      </div>
                      
                      {/* Due Date */}
                      <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 border border-slate-100">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm font-semibold text-slate-600">Due Date</span>
                        </div>
                        <p className="text-lg font-bold text-blue-600">{new Date(b.dueDate).toLocaleDateString()}</p>
                        <p className="text-sm text-slate-500 mt-1">
                          {daysUntilDue === 0 ? 'Due today' : 
                           daysUntilDue === 1 ? 'Due tomorrow' : 
                           `${daysUntilDue} days remaining`}
                        </p>
                      </div>
                      
                      {/* Status */}
                      <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 border border-slate-100">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-semibold text-slate-600">Status</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                          <p className="text-lg font-bold text-orange-600">{b.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-slate-400 text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Reminders updated in real-time
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reminders;
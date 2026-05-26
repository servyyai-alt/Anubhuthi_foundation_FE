import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { FaBook, FaCalendar, FaHeart, FaUsers, FaEnvelope, FaBriefcase, FaArrowRight } from 'react-icons/fa';
import { analyticsAPI } from '../../services/api';
import { Spinner } from '../../components/common';

const COLORS = ['#e8821a', '#8B5E3C', '#4a7c59', '#d99e1a', '#cc650f', '#2f5238'];

function StatCard({ icon: Icon, label, value, color = 'saffron', link }) {
  const colors = {
    saffron: 'bg-saffron-50 text-saffron-600 border-saffron-200',
    earth: 'bg-earth-50 text-earth-600 border-earth-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    red: 'bg-red-50 text-red-600 border-red-200',
  };
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4"
    >
      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${colors[color]}`}>
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <div className="text-gray-400 text-sm">{label}</div>
        <div className="font-serif text-2xl font-bold text-gray-800">{value ?? '—'}</div>
      </div>
      {link && (
        <Link to={link} className="text-gray-300 hover:text-saffron-500 transition-colors">
          <FaArrowRight size={14} />
        </Link>
      )}
    </motion.div>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsAPI.overview()
      .then(res => setData(res.data.data))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyData = data?.monthlyDonations?.map(d => ({
    name: monthNames[d._id.month - 1],
    amount: d.total,
    count: d.count
  })) || [];

  const purposeData = data?.donationsByPurpose
    ? Object.entries(data.donationsByPurpose).map(([name, value]) => ({ name: name.replace(/-/g, ' '), value }))
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back. Here's what's happening at Anubhuthi Foundation.</p>
      </div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <StatCard icon={FaBook} label="Programs" value={data?.programs} color="saffron" link="/admin/programs" />
        <StatCard icon={FaCalendar} label="Events" value={data?.events} color="blue" link="/admin/events" />
        <StatCard icon={FaHeart} label="Donations" value={data?.donationCount} color="red" link="/admin/donations" />
        <StatCard icon={FaUsers} label="Volunteers" value={data?.volunteers} color="green" link="/admin/volunteers" />
        <StatCard icon={FaEnvelope} label="Messages" value={data?.contacts} color="earth" link="/admin/contacts" />
        <StatCard icon={FaHeart} label="Total Raised" value={data?.totalDonations ? `₹${(data.totalDonations/1000).toFixed(0)}K` : '₹0'} color="saffron" link="/admin/donations" />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly donations */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-serif text-lg font-bold text-gray-800 mb-5">Monthly Donations (₹)</h2>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Amount']} />
                <Bar dataKey="amount" fill="#e8821a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-60 flex items-center justify-center text-gray-300 text-sm">No donation data yet</div>
          )}
        </div>

        {/* Donations by purpose */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-serif text-lg font-bold text-gray-800 mb-5">Donations by Purpose</h2>
          {purposeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={purposeData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                  {purposeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={v => [`₹${v.toLocaleString()}`]} />
                <Legend iconType="circle" iconSize={10} formatter={v => <span style={{ fontSize: 12 }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-60 flex items-center justify-center text-gray-300 text-sm">No donation data yet</div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-serif text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Add Program', path: '/admin/programs', icon: '📿' },
            { label: 'Add Event', path: '/admin/events', icon: '📅' },
            { label: 'Add Retreat', path: '/admin/retreats', icon: '🏔️' },
            { label: 'Add Career', path: '/admin/careers', icon: '💼' },
          ].map(action => (
            <Link key={action.label} to={action.path}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-saffron-50 transition-colors text-sm font-medium text-gray-700 hover:text-saffron-700"
            >
              <span className="text-xl">{action.icon}</span>
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaOm, FaTachometerAlt, FaBook, FaMountain, FaCalendar, FaUsers,
  FaHeart, FaBriefcase, FaComment, FaEnvelope, FaImages, FaBars,
  FaTimes, FaSignOutAlt, FaChevronRight
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.jsx';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: FaTachometerAlt, exact: true },
  { label: 'Programs', path: '/admin/programs', icon: FaBook },
  { label: 'Retreats', path: '/admin/retreats', icon: FaMountain },
  { label: 'Events', path: '/admin/events', icon: FaCalendar },
  { label: 'Careers', path: '/admin/careers', icon: FaBriefcase },
  { label: 'Volunteers', path: '/admin/volunteers', icon: FaUsers },
  { label: 'Donations', path: '/admin/donations', icon: FaHeart },
  { label: 'Testimonials', path: '/admin/testimonials', icon: FaComment },
  { label: 'Contact Messages', path: '/admin/contacts', icon: FaEnvelope },
  { label: 'Media', path: '/admin/media', icon: FaImages },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 72 }}
        className="bg-earth-900 flex flex-col overflow-hidden flex-shrink-0 transition-all"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-5 border-b border-earth-800">
          <div className="w-9 h-9 bg-saffron-500 rounded-full flex items-center justify-center flex-shrink-0">
            <FaOm className="text-white text-sm" />
          </div>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-w-0">
              <div className="font-serif font-bold text-white text-sm truncate">Anubhuthi</div>
              <div className="text-saffron-400 text-xs">Admin Panel</div>
            </motion.div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto text-earth-400 hover:text-white transition-colors flex-shrink-0"
          >
            {sidebarOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <NavLink key={item.path} to={item.path} end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-sm ${
                  isActive ? 'bg-saffron-500 text-white' : 'text-earth-300 hover:bg-earth-800 hover:text-white'
                }`
              }
            >
              <item.icon size={16} className="flex-shrink-0" />
              {sidebarOpen && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-earth-800">
          {sidebarOpen ? (
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 bg-saffron-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-xs font-medium truncate">{user?.name}</div>
                <div className="text-earth-400 text-xs capitalize">{user?.role}</div>
              </div>
              <button onClick={handleLogout} className="text-earth-400 hover:text-red-400 transition-colors">
                <FaSignOutAlt size={14} />
              </button>
            </div>
          ) : (
            <button onClick={handleLogout} className="w-full flex justify-center p-2 text-earth-400 hover:text-red-400 transition-colors">
              <FaSignOutAlt size={16} />
            </button>
          )}
        </div>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

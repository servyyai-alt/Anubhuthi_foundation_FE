import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaBars, FaBook, FaCalendar, FaComment, FaEnvelope, FaHeart, FaImages,
  FaMountain, FaSignOutAlt, FaTachometerAlt, FaTimes, FaUsers, FaBriefcase,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.jsx';
import logo from '../../assets/logo-1.png';

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLogout = () => {
    logout?.();
    localStorage.removeItem('adminToken');
    window.location.href = '/';
  };

  const Sidebar = ({ mobile = false }) => (
    <div className="flex h-full flex-col bg-earth-900">
      <div className={`flex items-center border-b border-earth-800 ${mobile ? 'gap-3 p-4' : 'gap-2 px-3 py-2.5'}`}>
        {(sidebarOpen || mobile) && (
          <>
            <img
              src={logo}
              alt="Anubhuthi Foundation"
              className={`${mobile ? 'h-10 w-10' : 'h-9 w-9'} flex-shrink-0 object-contain`}
            />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-w-0">
              <div className="truncate font-serif text-sm font-bold leading-tight text-white">Anubhuthi</div>
              <div className="text-xs text-saffron-400">Admin Panel</div>
            </motion.div>
          </>
        )}

        <button
          onClick={() => (mobile ? setMobileOpen(false) : setSidebarOpen((value) => !value))}
          className={`text-earth-400 transition-colors hover:text-white ${sidebarOpen || mobile ? 'ml-auto' : 'mx-auto'}`}
          aria-label="Toggle sidebar"
        >
          {mobile || sidebarOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
        </button>
      </div>

      <nav className={`flex-1 space-y-1 ${mobile ? 'overflow-y-auto p-3' : 'overflow-hidden px-2 py-2'}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            onClick={() => setMobileOpen(false)}
            title={sidebarOpen || mobile ? undefined : item.label}
            className={({ isActive }) =>
              `flex items-center rounded-xl px-3 ${mobile ? 'py-2.5 text-sm' : 'py-2 text-[13px]'} transition-colors ${
                isActive ? 'bg-saffron-500 text-white' : 'text-earth-300 hover:bg-earth-800 hover:text-white'
              } ${sidebarOpen || mobile ? 'gap-3' : 'justify-center'}`
            }
          >
            <item.icon size={16} className="flex-shrink-0" />
            {(sidebarOpen || mobile) && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className={`border-t border-earth-800 ${mobile ? 'p-3' : 'px-2 py-2'}`}>
        {(sidebarOpen || mobile) ? (
          <div className={`flex items-center ${mobile ? 'gap-3 px-3 py-2' : 'gap-2 px-2 py-1.5'}`}>
            <div className={`flex flex-shrink-0 items-center justify-center rounded-full bg-saffron-500 text-xs font-bold text-white ${mobile ? 'h-8 w-8' : 'h-7 w-7'}`}>
              {user?.name?.[0] || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-medium text-white">{user?.name}</div>
              <div className="truncate text-xs capitalize text-earth-400">{user?.role}</div>
            </div>
            <button onClick={handleLogout} className="text-earth-400 transition-colors hover:text-red-400" aria-label="Logout">
              <FaSignOutAlt size={14} />
            </button>
          </div>
        ) : (
          <button onClick={handleLogout} className="flex w-full justify-center p-2 text-earth-400 transition-colors hover:text-red-400" aria-label="Logout">
            <FaSignOutAlt size={16} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              aria-label="Close menu"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-y-0 left-0 z-50 w-72 shadow-2xl lg:hidden"
            >
              <Sidebar mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 88 }}
        className="hidden h-screen flex-shrink-0 overflow-hidden bg-earth-900 transition-all lg:flex"
      >
        <Sidebar />
      </motion.aside>

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-gray-50/95 px-4 py-3 backdrop-blur lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-xl border border-gray-200 bg-white p-2 text-earth-800 shadow-sm"
            aria-label="Open menu"
          >
            <FaBars size={18} />
          </button>
          <div className="flex items-center gap-2">
            <img src={logo} alt="Anubhuthi Foundation" className="h-9 w-9 object-contain" />
            <span className="text-sm font-semibold text-earth-800">Admin</span>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}

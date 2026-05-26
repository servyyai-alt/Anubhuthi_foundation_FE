import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaOm, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Philosophy', path: '/philosophy',
    children: [
      { label: 'Anubhuthi Philosophy', path: '/philosophy' },
      { label: 'DNI Academy', path: '/dni-academy' },
    ]
  },
  {
    label: 'Programs', path: '/programs',
    children: [
      { label: 'All Programs', path: '/programs' },
      { label: 'Himalayan Retreats', path: '/retreats' },
      { label: 'Temple Restoration', path: '/temple-restoration' },
    ]
  },
  { label: 'Events', path: '/events' },
  {
    label: 'Get Involved', path: '#',
    children: [
      { label: 'Careers', path: '/careers' },
      { label: 'Volunteer & Intern', path: '/volunteer' },
      { label: 'Donate', path: '/donate' },
    ]
  },
  { label: 'Media', path: '/media' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setOpen(false); setDropdown(null); }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-warm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-saffron-500 rounded-full flex items-center justify-center shadow-saffron group-hover:scale-110 transition-transform">
              <FaOm className="text-white text-lg" />
            </div>
            <div>
              <div className="font-serif font-bold text-earth-700 text-lg leading-tight">Anubhuthi</div>
              <div className="text-xs text-saffron-600 font-medium tracking-wider uppercase">Foundation</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <div key={link.label} className="relative"
                onMouseEnter={() => setDropdown(link.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <NavLink to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? 'text-saffron-600' : scrolled ? 'text-earth-700 hover:text-saffron-600' : 'text-earth-800 hover:text-saffron-600'
                    }`
                  }
                >
                  {link.label}
                  {link.children && <FaChevronDown className="text-xs" />}
                </NavLink>
                {link.children && dropdown === link.label && (
                  <div className="absolute top-full left-0 bg-white shadow-warm-lg rounded-xl overflow-hidden min-w-48 border border-saffron-100">
                    {link.children.map(child => (
                      <NavLink key={child.path} to={child.path}
                        className="block px-4 py-3 text-sm text-earth-700 hover:bg-saffron-50 hover:text-saffron-600 transition-colors"
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/donate"
              className="px-5 py-2.5 bg-saffron-500 text-white rounded-full text-sm font-semibold hover:bg-saffron-600 transition-all shadow-saffron hover:shadow-lg hover:-translate-y-0.5"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-earth-700">
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-saffron-100 shadow-warm-lg"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <div key={link.label}>
                  <NavLink to={link.path}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive ? 'bg-saffron-50 text-saffron-600' : 'text-earth-700 hover:bg-saffron-50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                  {link.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.children.map(child => (
                        <NavLink key={child.path} to={child.path}
                          className="block px-4 py-2 rounded-lg text-sm text-earth-600 hover:bg-saffron-50"
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link to="/donate" className="block mt-4 px-4 py-3 bg-saffron-500 text-white rounded-full text-center text-sm font-semibold">
                Donate Now 🙏
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

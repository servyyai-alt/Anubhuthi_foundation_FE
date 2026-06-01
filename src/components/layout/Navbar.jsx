import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo-1.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  {
    label: "Philosophy",
    path: "/philosophy",
    children: [
      { label: "Anubhuthi Philosophy", path: "/philosophy" },
      { label: "DNI Academy", path: "/dni-academy" },
    ],
  },
  {
    label: "Programs",
    path: "/programs",
    children: [
      { label: "All Programs", path: "/programs" },
      { label: "Himalayan Retreats", path: "/retreats" },
      { label: "Temple Restoration", path: "/temple-restoration" },
    ],
  },
  { label: "Events", path: "/events" },
  {
    label: "Get Involved",
    path: "#",
    children: [
      { label: "Careers", path: "/careers" },
      { label: "Volunteer", path: "/volunteer" },
      { label: "Donate", path: "/donate" },
    ],
  },
  { label: "Media", path: "/media" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const hoverTimerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setDropdown(null);
    setMobileDropdown(null);
  }, [location]);

  const isRouteActive = (path) =>
    path !== "#" &&
    (location.pathname === path || location.pathname.startsWith(`${path}/`));

  const isLinkActive = (link) =>
    isRouteActive(link.path) ||
    link.children?.some((child) => isRouteActive(child.path));

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  const handleDropdownEnter = (label) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    hoverTimerRef.current = setTimeout(() => {
      setDropdown(label);
    }, 180);
  };

  const handleDropdownLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    hoverTimerRef.current = setTimeout(() => {
      setDropdown(null);
    }, 220);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="logo"
              className="w-20 h-20 object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(link.label)}
                onMouseLeave={handleDropdownLeave}
              >
                {link.children ? (
                  <button
                    type="button"
                    onClick={() =>
                      setDropdown((current) =>
                        current === link.label ? null : link.label
                      )
                    }
                    className={`flex items-center gap-1 text-sm font-medium transition ${
                      isLinkActive(link)
                        ? "text-orange-500"
                        : "text-gray-700 hover:text-orange-500"
                    }`}
                  >
                    {link.label}
                    <FaChevronDown
                      size={10}
                      className={`transition-transform ${
                        dropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-1 text-sm font-medium transition ${
                        isActive
                          ? "text-orange-500"
                          : "text-gray-700 hover:text-orange-500"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )}

                {/* Dropdown */}
                {dropdown === link.label && link.children && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-0 z-10 pt-2"
                  >
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden min-w-[220px] border border-orange-100">
                      {link.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className="block px-5 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Donate Button */}
          <div className="hidden lg:block">
            <Link
              to="/donate"
              className="bg-orange-500 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-600"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden"
          >
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="bg-white border-t"
          >
            <div className="p-5 space-y-3">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileDropdown((current) =>
                            current === link.label ? null : link.label
                          )
                        }
                        className={`flex w-full items-center justify-between py-2 text-left ${
                          isLinkActive(link)
                            ? "text-orange-500"
                            : "text-gray-700 hover:text-orange-500"
                        }`}
                      >
                        <span>{link.label}</span>
                        <FaChevronDown
                          size={12}
                          className={`transition-transform ${
                            mobileDropdown === link.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {mobileDropdown === link.label && (
                        <div className="mt-2 space-y-2 border-l border-orange-100 pl-4">
                          {link.children.map((child) => (
                            <NavLink
                              key={child.path}
                              to={child.path}
                              className={({ isActive }) =>
                                `block py-2 text-sm ${
                                  isActive
                                    ? "text-orange-500"
                                    : "text-gray-600 hover:text-orange-500"
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `block py-2 ${
                          isActive
                            ? "text-orange-500"
                            : "text-gray-700 hover:text-orange-500"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  )}
                </div>
              ))}

              <Link
                to="/donate"
                className="block text-center bg-orange-500 text-white py-3 rounded-full"
              >
                Donate Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

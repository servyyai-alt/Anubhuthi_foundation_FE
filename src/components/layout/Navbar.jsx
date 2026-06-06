// import React, { useState, useEffect } from 'react';
// import { Link, NavLink, useLocation } from 'react-router-dom';
// import { FaBars, FaTimes, FaOm, FaChevronDown } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';
// import logo from "../../assets/logo-1.png";

// const navLinks = [
//   { label: 'Home', path: '/' },
//   { label: 'About', path: '/about' },
//   {
//     label: 'Philosophy', path: '/philosophy',
//     children: [
//       { label: 'Anubhuthi Philosophy', path: '/philosophy' },
//       { label: 'DNI Academy', path: '/dni-academy' },
//     ]
//   },
//   {
//     label: 'Programs', path: '/programs',
//     children: [
//       { label: 'All Programs', path: '/programs' },
//       { label: 'Himalayan Retreats', path: '/retreats' },
//       { label: 'Temple Restoration', path: '/temple-restoration' },
//     ]
//   },
//   { label: 'Events', path: '/events' },
//   {
//     label: 'Get Involved', path: '#',
//     children: [
//       { label: 'Careers', path: '/careers' },
//       { label: 'Volunteer & Intern', path: '/volunteer' },
//       { label: 'Donate', path: '/donate' },
//     ]
//   },
//   { label: 'Media', path: '/media' },
//   { label: 'Contact', path: '/contact' },
// ];

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [dropdown, setDropdown] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => { setOpen(false); setDropdown(null); }, [location]);

//   return (
//     <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//       scrolled ? 'bg-white/95 backdrop-blur-md shadow-warm' : 'bg-transparent'
//     }`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-3 group">
//           <img
//    src={logo}
//    alt="logo"
//    className="w-16 h-16"
// />
           
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden lg:flex items-center gap-1">
//             {navLinks.map(link => (
//               <div key={link.label} className="relative"
//                 onMouseEnter={() => setDropdown(link.label)}
//                 onMouseLeave={() => setDropdown(null)}
//               >
//                 <NavLink to={link.path}
//                   className={({ isActive }) =>
//                     `flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//                       isActive ? 'text-saffron-600' : scrolled ? 'text-earth-700 hover:text-saffron-600' : 'text-earth-800 hover:text-saffron-600'
//                     }`
//                   }
//                 >
//                   {link.label}
//                   {link.children && <FaChevronDown className="text-xs" />}
//                 </NavLink>
//                 {link.children && dropdown === link.label && (
//                   <div className="absolute top-full left-0 bg-white shadow-warm-lg rounded-xl overflow-hidden min-w-48 border border-saffron-100">
//                     {link.children.map(child => (
//                       <NavLink key={child.path} to={child.path}
//                         className="block px-4 py-3 text-sm text-earth-700 hover:bg-saffron-50 hover:text-saffron-600 transition-colors"
//                       >
//                         {child.label}
//                       </NavLink>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* CTA */}
//           <div className="hidden lg:flex items-center gap-3">
//             <Link to="/donate"
//               className="px-5 py-2.5 bg-saffron-500 text-white rounded-full text-sm font-semibold hover:bg-saffron-600 transition-all shadow-saffron hover:shadow-lg hover:-translate-y-0.5"
//             >
//               Donate Now
//             </Link>
//           </div>

//           {/* Mobile Toggle */}
//           <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-earth-700">
//             {open ? <FaTimes size={20} /> : <FaBars size={20} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {open && (
//           <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
//             className="lg:hidden bg-white border-t border-saffron-100 shadow-warm-lg"
//           >
//             <div className="px-4 py-4 space-y-1">
//               {navLinks.map(link => (
//                 <div key={link.label}>
//                   <NavLink to={link.path}
//                     className={({ isActive }) =>
//                       `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
//                         isActive ? 'bg-saffron-50 text-saffron-600' : 'text-earth-700 hover:bg-saffron-50'
//                       }`
//                     }
//                   >
//                     {link.label}
//                   </NavLink>
//                   {link.children && (
//                     <div className="ml-4 mt-1 space-y-1">
//                       {link.children.map(child => (
//                         <NavLink key={child.path} to={child.path}
//                           className="block px-4 py-2 rounded-lg text-sm text-earth-600 hover:bg-saffron-50"
//                         >
//                           {child.label}
//                         </NavLink>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//               <Link to="/donate" className="block mt-4 px-4 py-3 bg-saffron-500 text-white rounded-full text-center text-sm font-semibold">
//                 Donate Now 
//               </Link>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }

import React, { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setDropdown(null);
    setMobileDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80); // trigger scroll state after 80px scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isRouteActive = (path) =>
    path !== "#" &&
    (location.pathname === path || location.pathname.startsWith(`${path}/`));

  const isLinkActive = (link) =>
    isRouteActive(link.path) ||
    link.children?.some((child) => isRouteActive(child.path));

  // Determine if the current route has a dark hero header where the transparent navbar overlay is appropriate
  const isDarkHeroPage = 
    location.pathname === '/' ||
    location.pathname === '/philosophy' ||
    location.pathname === '/dni-academy' ||
    location.pathname === '/programs' ||
    location.pathname.startsWith('/programs/') ||
    location.pathname === '/retreats' ||
    location.pathname === '/temple-restoration' ||
    location.pathname === '/events' ||
    location.pathname === '/careers' ||
    location.pathname === '/volunteer' ||
    location.pathname === '/media' ||
    location.pathname === '/contact' ||
    location.pathname === '/donate' ||
    location.pathname === '/legal';

  const showDarkNavbar = scrolled || !isDarkHeroPage;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      showDarkNavbar 
        ? "bg-[#07284A] shadow-[0_4px_20px_rgba(0,0,0,0.12)] border-b border-[#C58A2B]/15" 
        : "bg-transparent shadow-none"
    }`}>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex h-18 items-center justify-between sm:h-20">

          {/* Logo */}
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2.5 sm:gap-3"
          >
            <img
              src={logo}
              alt="logo"
              className="h-11 w-11 object-contain transition-all duration-300 sm:h-14 sm:w-14"
            />
            <div className="flex min-w-0 flex-col justify-center leading-none">
              <span className="truncate text-base font-sans font-bold tracking-wide text-white transition-colors duration-300 sm:text-xl">
                ANUBHUTHI
              </span>
              <span className="mt-0.5 truncate text-[9px] font-sans font-semibold tracking-[0.2em] text-white transition-colors duration-300 sm:text-[10px] sm:tracking-[0.25em]">
                FOUNDATION
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}

          <div className="hidden lg:flex items-center gap-5 xl:gap-6">

            {navLinks.map((link) => (

              <div
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  link.children && setDropdown(link.label)
                }
                onMouseLeave={() =>
                  setDropdown(null)
                }
              >
                {link.children ? (
                  <button
                    type="button"
                    onClick={() =>
                      setDropdown((current) =>
                        current === link.label ? null : link.label
                      )
                    }
                    className={`relative pb-1 flex items-center gap-1 text-sm font-medium transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full ${
                      isLinkActive(link)
                        ? "text-orange-400 after:w-full after:bg-orange-400"
                        : "text-white hover:text-orange-400 after:bg-orange-400"
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
                      `relative pb-1 flex items-center gap-1 text-sm font-medium transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full ${
                        isActive
                          ? "text-orange-400 after:w-full after:bg-orange-400"
                          : "text-white hover:text-orange-400 after:bg-orange-400"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )}

                {/* Dropdown */}

                {dropdown === link.label &&
                  link.children && (

                    <div className="
                    absolute
                    top-full
                    left-0
                    z-10
                    pt-2
                    ">

                      <div className="
                      bg-white
                      shadow-lg
                      rounded-xl
                      overflow-hidden
                      min-w-[220px]
                      border border-orange-100
                      ">

                        {link.children.map((child) => (

                          <NavLink
                            key={child.path}
                            to={child.path}
                            className="
                            block
                            px-5
                            py-3
                            text-sm
                            text-gray-700
                            hover:bg-orange-50
                            hover:text-orange-500
                            "
                          >
                            {child.label}
                          </NavLink>

                        ))}

                      </div>

                    </div>

                  )}

              </div>

            ))}

          </div>

          {/* Donate Button */}

          <div className="hidden lg:block">

            <Link
              to="/donate?modal=true"
              className="
              inline-block
              bg-orange-500
              text-white
              px-6
              py-3
              rounded-full
              font-medium
              transition-all
              duration-300
              hover:bg-orange-600
              hover:-translate-y-0.5
              hover:scale-[1.03]
              hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]
              "
            >
              Donate Now
            </Link>

          </div>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setOpen(!open)}
            className="rounded-xl p-2 text-white transition-colors duration-300 hover:text-orange-400 lg:hidden"
          >
            {open ? (
              <FaTimes size={22} />
            ) : (
              <FaBars size={22} />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="border-t border-[#C58A2B]/20 bg-[#07284A] text-white lg:hidden"
          >

            <div className="max-h-[calc(100vh-72px)] overflow-y-auto p-4 sm:p-5">

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
                            ? "text-orange-400 font-semibold"
                            : "text-white hover:text-orange-400"
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
                                    ? "text-orange-400 font-semibold"
                                    : "text-white/80 hover:text-orange-400"
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
                            ? "text-orange-400 font-semibold"
                            : "text-white hover:text-orange-400"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  )}
                </div>

              ))}

              <Link
                to="/donate?modal=true"
                className="
                block
                text-center
                bg-orange-500
                text-white
                py-3
                rounded-full
                transition-all
                duration-300
                hover:bg-orange-600
                hover:-translate-y-0.5
                hover:scale-[1.03]
                hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]
                "
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

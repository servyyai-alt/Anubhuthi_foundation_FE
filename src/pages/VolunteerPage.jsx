import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';
import { volunteersAPI } from '../services/api';
import volunteerBg from '../assets/volunteer.png';

// Inline SVGs matching the reference image style (gold outline, consistent stroke width, identical sizing)

// VOLUNTEER OPPORTUNITY ICONS (6 categories)
const EventsIcon = () => (
  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="#C58A2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19.5c-4.5-4.5-7.5-7.5-7.5-10.5A3.5 3.5 0 018 5.5c1.4 0 2.8.9 3.5 2.1.7-1.2 2.1-2.1 3.5-2.1a3.5 3.5 0 013.5 3.5c0 3-3 6-7.5 10.5z" />
    <path d="M12 2v2M4.5 4.5l1.5 1.5M19.5 4.5l-1.5 1.5M2 10h2M20 10h2" />
  </svg>
);

const RetreatsIcon = () => (
  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="#C58A2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="6" r="2.5" />
    <path d="M12 9.5c-2.5 0-4.5 1.5-4.5 4v3.5l-2.5.8c-.5.1-.8.6-.8 1.1s.4.9.9.9h13.8c.5 0 .9-.4.9-.9s-.3-1-.8-1.1l-2.5-.8v-3.5c0-2.5-2-4-4.5-4z" />
    <path d="M8 13.5h8" />
    <path d="M6 14.5c2 1 5 1.5 6 1.5s4-.5 6-1.5" />
    <path d="M6 11.5a6 6 0 0112 0" strokeDasharray="2 2" />
  </svg>
);

const TeachingSupportIcon = () => (
  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="#C58A2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="14" height="10" rx="1.5" />
    <path d="M5 13v6M13 13v6M9 13v3" />
    <circle cx="19.5" cy="8" r="2" />
    <path d="M16 13.5v3M19.5 10c-1.5 0-3 1-3 2.5v3.5" />
    <path d="M16.5 12h-2.5" />
    <path d="M5 6h8M5 9h5" />
  </svg>
);

const EnvironmentalRestorationIcon = () => (
  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="#C58A2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 14c1.5 2 4 3 6.5 3 2.5 0 4-1.5 6-1.5s3.5 1.5 6 1.5 5-1 6.5-3" />
    <path d="M12 15V8.5" />
    <path d="M12 11c1.5-1 3-1 3.5-2.5s-1-2.5-2.5-1.5c-1 .7-1 1.5-1 4z" />
    <path d="M12 12.5c-1.5-1-3-1-3.5-2.5s1-2.5 2.5-1.5c1 .7 1 1.5 1 4z" />
  </svg>
);

const SocialMediaOutreachIcon = () => (
  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="#C58A2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8.5h3.5L14 3v15L6.5 12.5H3a1 1 0 01-1-1v-2a1 1 0 011-1z" />
    <path d="M8.5 12.5v4.5A1.5 1.5 0 017 18.5c-.8 0-1.5-.5-1.5-1.5v-4.5" />
    <path d="M17.5 7.5a4.5 4.5 0 010 6M20.5 4.5a8.5 8.5 0 010 12" />
  </svg>
);

const CommunityDevelopmentIcon = () => (
  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="#C58A2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="7" r="2.5" />
    <path d="M8 15a4 4 0 018 0v2H8v-2z" />
    <circle cx="6" cy="9" r="2" />
    <path d="M3.5 16a2.5 2.5 0 015 0" />
    <circle cx="18" cy="9" r="2" />
    <path d="M15.5 16a2.5 2.5 0 015 0" />
    <path d="M6 18.5h12" strokeDasharray="2 2" />
  </svg>
);

// INTERNSHIP CATEGORY ICONS (6 categories)
const StudentsIcon = () => (
  <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="#C58A2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ResearchersIcon = () => (
  <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="#C58A2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12.5V18c0 1.5 2.5 2.5 6 2.5s6-1 6-2.5v-5.5" />
  </svg>
);

const FieldProfessionalsIcon = () => (
  <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="#C58A2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5.5a2.5 2.5 0 00-4.5 1.5c0 2 3.5 4.5 4.5 5 1-.5 4.5-3 4.5-5a2.5 2.5 0 00-4.5-1.5z" />
    <path d="M2 13c1 2 2.5 3 5 3s3.5-1 5.5-1 3 1 5 1 4-1 5.5-3" />
    <path d="M6 16v3.5a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5V16" />
  </svg>
);

const SocialWorkersIcon = () => (
  <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="#C58A2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="11" rx="2" />
    <path d="M2 19h20M2 19a1 1 0 001 1h16a1 1 0 001-1" />
  </svg>
);

const NGOsActivistsIcon = () => (
  <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="#C58A2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 16v-1a3 3 0 00-3-3H11a3 3 0 00-3 3v1" />
    <circle cx="12" cy="7" r="2.5" />
    <path d="M12 2.5L13 4h2l-1.5 1 1 2-2.5-1-2.5 1 1-2-1.5-1h2z" />
    <path d="M3.5 8L4.5 9h2l-1.5 1 1 2-2.5-1-2.5 1 1-2-1.5-1h2z" transform="translate(1, 3)" />
    <path d="M17.5 8L18.5 9h2l-1.5 1 1 2-2.5-1-2.5 1 1-2-1.5-1h2z" transform="translate(-1, 3)" />
  </svg>
);

const PortfolioLeadersIcon = () => (
  <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="#C58A2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="14" rx="2" />
    <path d="M7 7h10M7 11h6" />
    <circle cx="16" cy="16" r="3" />
    <path d="M15 19l-1 3 2-1 2 1-1-3" />
  </svg>
);

export default function VolunteerPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    location: '',
    areas: [],
    motivation: '',
    availability: ''
  });
  const [errors, setErrors] = useState({});

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleToggleArea = (area) => {
    setForm((prev) => {
      const selected = prev.areas.includes(area)
        ? prev.areas.filter((a) => a !== area)
        : [...prev.areas, area];
      return { ...prev, areas: selected };
    });
    if (errors.areas) {
      setErrors((prev) => ({ ...prev, areas: '' }));
    }
  };

  const calculateAge = (dobString) => {
    if (!dobString) return null;
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email Address is invalid';
    }
    if (!form.phone.trim()) newErrors.phone = 'Phone Number is required';
    if (!form.dob) newErrors.dob = 'Date of Birth is required';
    if (!form.gender) newErrors.gender = 'Gender selection is required';
    if (!form.location.trim()) newErrors.location = 'Location is required';
    if (form.areas.length === 0) newErrors.areas = 'Select at least one Area of Interest';
    if (!form.motivation.trim()) newErrors.motivation = 'Please tell us why you want to serve';
    if (!form.availability) newErrors.availability = 'Availability selection is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fill in all required fields correctly.');
      return;
    }

    setLoading(true);
    try {
      // Split location into city and country
      let city = form.location.trim();
      let country = 'India';
      if (form.location.includes(',')) {
        const parts = form.location.split(',');
        city = parts[0].trim();
        country = parts[parts.length - 1].trim();
      }

      const calculatedAge = calculateAge(form.dob);

      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        age: calculatedAge,
        city: city,
        country: country,
        availability: form.availability,
        experience: `Availability Option: ${form.availability}`,
        motivation: form.motivation,
        areas: form.areas,
        skills: form.areas, // map areas of interest to skills array in db for redundancy
        type: 'volunteer',
        notes: `Gender: ${form.gender} | DOB: ${form.dob}`
      };

      await volunteersAPI.submit(payload);
      setSubmitted(true);
      toast.success('Application submitted successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      location: '',
      areas: [],
      motivation: '',
      availability: ''
    });
    setErrors({});
    setSubmitted(false);
    setIsOpen(false);
  };

  const opportunities = [
    { label: 'Events', icon: <EventsIcon /> },
    { label: 'Retreats', icon: <RetreatsIcon /> },
    { label: 'Teaching Support', icon: <TeachingSupportIcon /> },
    { label: 'Environmental Restoration', icon: <EnvironmentalRestorationIcon /> },
    { label: 'Social Media & Outreach', icon: <SocialMediaOutreachIcon /> },
    { label: 'Community Development', icon: <CommunityDevelopmentIcon /> },
  ];

  const internships = [
    { label: 'Students', icon: <StudentsIcon /> },
    { label: 'Researchers', icon: <ResearchersIcon /> },
    { label: 'Field Professionals', icon: <FieldProfessionalsIcon /> },
    { label: 'Social Workers', icon: <SocialWorkersIcon /> },
    { label: 'NGOs & Activists', icon: <NGOsActivistsIcon /> },
    { label: 'Portfolio for Social Sector Leaders', icon: <PortfolioLeadersIcon /> },
  ];

  return (
    <>
      <Helmet>
        <title>Volunteer & Internship Programs — Anubhuthi Foundation</title>
        <meta name="description" content="Support our mission by volunteering your time, skills, and passion to create a better world." />
      </Helmet>

      {/* Main Container */}
      <div 
        className="relative min-h-screen flex flex-col justify-between bg-[#07284A]"
        style={{
          backgroundImage: `url(${volunteerBg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Transparent dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        {/* Outer content container */}
        <div className="relative z-10 w-full flex flex-col flex-1">
          
          {/* Hero Content Section */}
          <section className="w-full pt-36 pb-6">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-sans font-bold text-white text-5xl md:text-6xl lg:text-[72px] tracking-tight mb-4 leading-none uppercase"
              >
                BECOME A VOLUNTEER
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="text-white text-lg md:text-xl lg:text-[22px] max-w-2xl leading-relaxed opacity-95 font-medium"
              >
                Support our mission by volunteering your time,<br className="hidden md:inline" />
                skills, and passion to create a better world.
              </motion.p>

              {/* Opportunity Icons grid */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 lg:gap-8 max-w-5xl mx-auto justify-items-center text-center"
              >
                {opportunities.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center text-white group">
                    <div className="mb-3 p-1 rounded-xl transform transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </div>
                    <span className="text-sm md:text-base font-semibold tracking-wide leading-snug">
                      {item.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Floating Internship Programs Section */}
          <section className="w-full max-w-[92%] lg:max-w-7xl mx-auto mt-2 mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="bg-[#FAF7F0] rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] w-full overflow-hidden p-8 md:p-10 lg:p-12 text-center"
            >
              <h2 className="font-sans font-bold text-2xl md:text-3xl lg:text-4xl text-[#07284A] tracking-wider mb-2 uppercase">
                INTERNSHIP PROGRAMS
              </h2>
              <p className="text-gray-600 text-base md:text-lg font-medium tracking-wide mb-8">
                Available for:
              </p>

              {/* Sub cards inside */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                {internships.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white rounded-2xl border border-gray-150 p-6 flex flex-col items-center text-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md h-full min-h-[170px]"
                  >
                    <div className="mb-4 transform transition-transform duration-300 hover:scale-110">
                      {item.icon}
                    </div>
                    <span className="text-sm md:text-base font-bold text-gray-800 leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Join as Volunteer Button floating over background at bottom */}
          <section className="text-center mt-4 mb-24 z-10">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              onClick={() => setIsOpen(true)}
              className="bg-[#C58A2B] hover:bg-[#b07821] text-white font-bold text-base md:text-lg px-12 py-4 rounded-[12px] transition-all duration-300 shadow-[0_8px_30px_rgba(197,138,43,0.3)] hover:shadow-[0_15px_40px_rgba(197,138,43,0.5)] transform hover:-translate-y-0.5 uppercase tracking-widest"
            >
              JOIN AS VOLUNTEER
            </motion.button>
          </section>

        </div>

        {/* Navy Bottom Strip */}
        <div className="relative z-10 bg-[#07284A] py-6 w-full text-center border-t border-[#C58A2B]/10">
          <p className="text-[#C58A2B] font-medium tracking-wide text-sm md:text-base">
            One Purpose • One Humanity • One Journey • One Evolution
          </p>
        </div>
      </div>

      {/* Center Modal Popup with Blur and Animation */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark semi-transparent backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={resetForm}
              className="fixed inset-0 bg-black/60 backdrop-blur-[8px]"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-100">
                <h2 className="font-sans font-bold text-2xl text-gray-800 tracking-wide">
                  APPLY TO SERVE
                </h2>
                <button 
                  onClick={resetForm}
                  className="w-9 h-9 bg-gray-150 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <FaTimes size={16} />
                </button>
              </div>

              {submitted ? (
                /* Success State inside modal */
                <div className="p-12 text-center">
                  <div className="text-7xl mb-6">✅</div>
                  <h3 className="font-sans font-bold text-2xl text-gray-800 mb-3">Application Submitted!</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                    Thank you for your willingness to serve. We will review your application and get in touch with you shortly.
                  </p>
                  <button
                    onClick={resetForm}
                    className="bg-[#C58A2B] hover:bg-[#b07821] text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              ) : (
                /* Form Fields */
                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                  
                  {/* Row 1: Name and Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#C58A2B] focus:border-transparent outline-none transition-all text-gray-800 font-medium`}
                        placeholder="Your Name"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#C58A2B] focus:border-transparent outline-none transition-all text-gray-800 font-medium`}
                        placeholder="you@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Row 2: Phone and DOB */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#C58A2B] focus:border-transparent outline-none transition-all text-gray-800 font-medium`}
                        placeholder="+91..."
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.dob ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#C58A2B] focus:border-transparent outline-none transition-all text-gray-800 font-medium`}
                      />
                      {errors.dob && <p className="text-red-500 text-xs mt-1 font-medium">{errors.dob}</p>}
                    </div>
                  </div>

                  {/* Row 3: Gender and Location */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Gender *</label>
                      <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.gender ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#C58A2B] focus:border-transparent outline-none transition-all text-gray-800 font-medium bg-white`}
                      >
                        <option value="">Select Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                      {errors.gender && <p className="text-red-500 text-xs mt-1 font-medium">{errors.gender}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Location *</label>
                      <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.location ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#C58A2B] focus:border-transparent outline-none transition-all text-gray-800 font-medium`}
                        placeholder="e.g. Bangalore, India"
                      />
                      {errors.location && <p className="text-red-500 text-xs mt-1 font-medium">{errors.location}</p>}
                    </div>
                  </div>

                  {/* Areas of Interest Multi-select checkboxes */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Areas of Interest *</label>
                    <div className="flex flex-wrap gap-2">
                      {['Events', 'Retreats', 'Teaching Support', 'Environmental Restoration', 'Social Media & Outreach', 'Community Development'].map((area) => {
                        const isSelected = form.areas.includes(area);
                        return (
                          <button
                            key={area}
                            type="button"
                            onClick={() => handleToggleArea(area)}
                            className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                              isSelected
                                ? 'bg-[#C58A2B] border-[#C58A2B] text-white shadow-sm'
                                : 'bg-white border-gray-300 text-gray-700 hover:border-[#C58A2B] hover:text-[#C58A2B]'
                            }`}
                          >
                            {area}
                          </button>
                        );
                      })}
                    </div>
                    {errors.areas && <p className="text-red-500 text-xs mt-1 font-medium">{errors.areas}</p>}
                  </div>

                  {/* Availability Dropdown */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Availability *</label>
                    <select
                      name="availability"
                      value={form.availability}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border ${errors.availability ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#C58A2B] focus:border-transparent outline-none transition-all text-gray-800 font-medium bg-white`}
                    >
                      <option value="">Select availability</option>
                      <option value="full-time">Full-time (40 hrs/week)</option>
                      <option value="part-time">Part-time (15-20 hrs/week)</option>
                      <option value="weekends">Weekends only</option>
                      <option value="remote">Remote / Online only</option>
                      <option value="flexible">Flexible</option>
                    </select>
                    {errors.availability && <p className="text-red-500 text-xs mt-1 font-medium">{errors.availability}</p>}
                  </div>

                  {/* Why do you want to volunteer with us? Textarea */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Why do you want to volunteer with us? *</label>
                    <textarea
                      name="motivation"
                      rows={4}
                      value={form.motivation}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border ${errors.motivation ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#C58A2B] focus:border-transparent outline-none transition-all text-gray-800 font-medium`}
                      placeholder="What draws you to Anubhuthi Foundation and this work..."
                    />
                    {errors.motivation && <p className="text-red-500 text-xs mt-1 font-medium">{errors.motivation}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#C58A2B] hover:bg-[#b07821] disabled:bg-gray-400 text-white font-bold py-3.5 rounded-xl transition-colors duration-300 text-center tracking-wider uppercase"
                    >
                      {loading ? 'SUBMITTING APPLICATION...' : 'SUBMIT APPLICATION'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

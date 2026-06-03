import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaTimes, FaRegCheckCircle, FaMapMarkerAlt, FaBriefcase as FaBriefcaseSolid, FaClock } from 'react-icons/fa';
import { FiHome, FiTrendingUp, FiGlobe, FiBriefcase, FiAward } from 'react-icons/fi';
import { Button, FormInput, FormTextarea, LoadingPage } from '../components/common';
import { careersAPI } from '../services/api';
import careersBg from '../assets/careers.png';

function ApplicationModal({ career, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', coverLetter: '', resumeUrl: '', linkedIn: '', experience: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error('Name and email required'); return; }
    setLoading(true);
    try {
      await careersAPI.apply(career._id, form);
      setSubmitted(true);
      toast.success('Application submitted!');
    } catch {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="font-serif text-xl font-bold text-gray-800">Apply: {career.title}</h2>
            <p className="text-gray-500 text-sm">{career.department} · {career.type}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
            <FaTimes size={14} />
          </button>
        </div>
        {submitted ? (
          <div className="p-12 text-center">
            <div className="text-7xl mb-4">✅</div>
            <h3 className="font-serif text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
            <p className="text-gray-500 mb-6">We'll review your application and get back to you within 7 days.</p>
            <Button onClick={onClose} variant="outline">Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput name="name" label="Full Name *" placeholder="Your name" value={form.name} onChange={handleChange} required />
              <FormInput name="email" type="email" label="Email *" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput name="phone" label="Phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
              <FormInput name="experience" label="Years of Experience" placeholder="e.g. 3 years" value={form.experience} onChange={handleChange} />
            </div>
            <FormInput name="resumeUrl" label="Resume Link (Google Drive / Dropbox)" placeholder="https://drive.google.com/..." value={form.resumeUrl} onChange={handleChange} />
            <FormInput name="linkedIn" label="LinkedIn Profile" placeholder="https://linkedin.com/in/..." value={form.linkedIn} onChange={handleChange} />
            <FormTextarea name="coverLetter" label="Cover Letter" placeholder="Tell us why you want to join Anubhuthi Foundation..." rows={5} value={form.coverLetter} onChange={handleChange} />
            <div className="flex gap-3 pt-2">
              <Button type="submit" loading={loading} size="lg" className="flex-1 !bg-[#C58A2B] hover:!bg-[#b07821] !text-white !border-none">Submit Application</Button>
              <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}

export default function CareersPage() {
  const [selected, setSelected] = useState(null);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    careersAPI.getAll()
      .then(res => setCareers(res.data.data || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const generalCareer = {
    _id: 'general-application',
    title: 'General Application',
    department: 'Foundation',
    type: 'Full-Time / Part-Time'
  };

  return (
    <>
      <Helmet>
        <title>Careers & Opportunities — Anubhuthi Foundation</title>
        <meta name="description" content="Work with Purpose. Join our passionate team contributing to humanity." />
      </Helmet>

      {/* Main wrapper */}
      <div 
        className="relative min-h-screen flex flex-col bg-[#07284A]"
        style={{
          backgroundImage: `url(${careersBg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Subtle dark overlay for the entire background */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        
        {/* HERO SECTION */}
        <section className="relative z-10 w-full pt-32 pb-48 lg:pt-40 lg:pb-72">
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-sans font-bold text-white text-5xl md:text-6xl lg:text-[72px] tracking-tight mb-4"
            >
              WORK WITH PURPOSE
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-white text-lg md:text-xl lg:text-[22px] max-w-2xl leading-relaxed opacity-95 font-medium"
            >
              We are looking for passionate individuals who want to make a real difference while contributing to humanity.
            </motion.p>
          </div>
        </section>

        {/* MAIN CAREERS CARD OVERLAPPING */}
        <section className="relative z-20 -mt-32 lg:-mt-48 max-w-[92%] lg:max-w-4xl mx-auto mb-20 lg:mb-28 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="bg-[#FAF7F0] rounded-[20px] shadow-[0_20px_80px_-15px_rgba(0,0,0,0.4)] w-full overflow-hidden"
          >
            <div className="p-6 md:p-8 lg:p-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8">
                
                {/* ROW 1 */}
                {/* Column 1 - Open Roles */}
                <div className="md:pr-12 md:border-r border-gray-300/60 pb-8 md:pb-10 border-b border-gray-300/60">
                  <h3 className="font-sans font-bold text-xl md:text-[22px] tracking-wide text-[#1A1A1A] mb-5 uppercase">
                    OPEN ROLES
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Retreat Coordinators",
                      "Travel & Retreat Executives",
                      "Content Creators",
                      "Social Media Managers",
                      "Teaching Support Facilitators"
                    ].map((role, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-[17px] font-medium text-[#1A1A1A]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C58A2B] flex-shrink-0"></div>
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2 - Open Roles continued */}
                <div className="md:pl-12 pb-8 md:pb-10 border-b border-gray-300/60 flex flex-col justify-end">
                  <ul className="space-y-3 pt-6 md:pt-8">
                    {[
                      "Human Resource Coordinators",
                      "Tech & Community Team",
                      "Event & Outreach Specialists",
                      "Content & Media Team"
                    ].map((role, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-[17px] font-medium text-[#1A1A1A]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C58A2B] flex-shrink-0"></div>
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ROW 2 */}
                {/* Column 1 - Ideal Candidates */}
                <div className="md:pr-12 pt-8 md:pt-10 md:border-r border-gray-300/60">
                  <h3 className="font-sans font-bold text-xl md:text-[22px] tracking-wide text-[#1A1A1A] mb-5 uppercase">
                    IDEAL CANDIDATES
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Great communication skills",
                      "English/Hindi/Bilingual language fluency",
                      "Positive personality",
                      "Team player mindset",
                      "Passion for awareness and human growth",
                      "Discipline and integrity"
                    ].map((trait, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[17px] font-medium text-[#1A1A1A]">
                        <FaRegCheckCircle className="text-[#C58A2B] text-lg flex-shrink-0 mt-1" />
                        <span>{trait}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2 - Benefits */}
                <div className="md:pl-12 pt-8 md:pt-10">
                  <h3 className="font-sans font-bold text-xl md:text-[22px] tracking-wide text-[#1A1A1A] mb-5 uppercase">
                    BENEFITS
                  </h3>
                  <ul className="space-y-3">
                    {[
                      { text: "Stay & Food Provided", icon: FiHome },
                      { text: "Training & Personal Growth", icon: FiTrendingUp },
                      { text: "Purpose-Driven Environment", icon: FiGlobe },
                      { text: "Meaningful Work Experience", icon: FiBriefcase },
                      { text: "Career Development Opportunities", icon: FiAward }
                    ].map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-4 text-[17px] font-medium text-[#1A1A1A]">
                        <benefit.icon className="text-[#C58A2B] text-[22px] flex-shrink-0" />
                        <span>{benefit.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* APPLY NOW BUTTON */}
              <div className="mt-12 text-center">
                <button
                  onClick={() => setSelected(generalCareer)}
                  className="bg-[#C58A2B] hover:bg-[#b07821] text-white font-medium text-[17px] px-16 py-3.5 rounded-[12px] transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
                >
                  APPLY NOW
                </button>
              </div>

            </div>
          </motion.div>
        </section>

        {/* CURRENT OPPORTUNITIES SECTION */}
        <section className="relative z-20 w-full max-w-[92%] lg:max-w-6xl mx-auto mb-20 lg:mb-32 flex-1">
          <div className="text-center mb-12">
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-white tracking-wide mb-4">
              Current Opportunities
            </h2>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Explore the latest opportunities available within Anubhuthi Foundation.
            </p>
          </div>

          {loading ? (
            <div className="bg-white/5 backdrop-blur-md rounded-[20px] p-8 md:p-12 text-center shadow-lg border border-white/10">
              <LoadingPage />
            </div>
          ) : error ? (
            <div className="bg-white/5 backdrop-blur-md rounded-[20px] p-8 md:p-12 text-center shadow-lg border border-white/10">
              <p className="text-white text-lg font-medium">Unable to load opportunities at the moment.</p>
            </div>
          ) : careers.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-md rounded-[20px] p-8 md:p-12 text-center shadow-lg border border-white/10">
              <p className="text-white text-lg font-medium">No opportunities are currently available. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {careers.map((career) => (
                <div key={career._id} className="bg-[#FAF7F0] rounded-[16px] shadow-lg p-7 flex flex-col h-full hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex-1">
                    <h3 className="font-sans font-bold text-xl text-[#1A1A1A] mb-4">{career.title}</h3>
                    <div className="flex flex-col gap-2.5 text-[15px] font-medium text-gray-700 mb-6">
                      {career.department && <span className="flex items-center gap-2.5"><FaBriefcaseSolid className="text-[#C58A2B] text-lg" /> {career.department}</span>}
                      {career.location && <span className="flex items-center gap-2.5"><FaMapMarkerAlt className="text-[#C58A2B] text-lg" /> {career.location}</span>}
                      {career.type && <span className="flex items-center gap-2.5"><FaClock className="text-[#C58A2B] text-lg" /> {career.type}</span>}
                    </div>
                    {career.description && (
                      <p className="text-gray-600 text-[15px] leading-relaxed mb-6 line-clamp-4">
                        {career.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setSelected(career)}
                    className="w-full mt-4 bg-transparent border-2 border-[#C58A2B] text-[#C58A2B] hover:bg-[#C58A2B] hover:text-white font-semibold py-3 rounded-xl transition-colors duration-300 text-[15px] uppercase tracking-wide"
                  >
                    View Details & Apply
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* BOTTOM MOTTO STRIP */}
        <div className="relative z-20 bg-[#07284A] py-6 w-full text-center border-t border-[#C58A2B]/10 mt-auto">
          <p className="text-[#C58A2B] font-medium tracking-wide text-[15px] md:text-[17px]">
            One Purpose • One Humanity • One Journey • One Evolution
          </p>
        </div>

      </div>

      <AnimatePresence>
        {selected && <ApplicationModal career={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}

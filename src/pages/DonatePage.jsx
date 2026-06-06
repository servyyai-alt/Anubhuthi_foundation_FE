import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FormInput } from '../components/common';
import { donationsAPI } from '../services/api';
import { useLocation } from 'react-router-dom';

// Assets
import heroImage from '../assets/tree.png';
import templeImage from '../assets/hero-temple-image.png.png';

const donationOptions = [
  {
    title: "One Time\nDonation",
    icon: (
      <svg className="w-12 h-12 text-[#b07c46] stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    )
  },
  {
    title: "Monthly\nSupport",
    icon: (
      <svg className="w-12 h-12 text-[#b07c46] stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    )
  },
  {
    title: "Sponsor\nA Program",
    icon: (
      <svg className="w-12 h-12 text-[#b07c46] stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    title: "Temple\nRestoration\nSupport",
    icon: (
      <svg className="w-12 h-12 text-[#b07c46] stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        <path strokeWidth="1.5" d="M12 7v5" />
        <path strokeWidth="1.5" d="M9 10h6" />
        {/* Added hands icon effect below */}
        <path d="M8 21v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2" />
      </svg>
    )
  },
  {
    title: "Student\nScholarship",
    icon: (
      <svg className="w-12 h-12 text-[#b07c46] stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M4 11v8" />
        <path d="M12 3l8 4.5-8 4.5-8-4.5z" />
        <path d="M20 11v8" />
        <path d="M6 13v4a6 6 0 0 0 12 0v-4" />
      </svg>
    )
  },
  {
    title: "Retreat\nSponsorship",
    icon: (
      <svg className="w-12 h-12 text-[#b07c46] stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="7" r="3" />
        <path d="M12 22c-3 0-5.5-2-6-5l2-4h8l2 4c-.5 3-3 5-6 5z" />
        <path d="M8 10l-3 4" />
        <path d="M16 10l3 4" />
      </svg>
    )
  }
];

const contributionCards = [
  {
    title: "Human Awareness Programs",
    desc: "Spreading deep inner wisdom and holistic living practices to communities across the globe.",
    icon: (
      <svg className="w-8 h-8 text-[#b07c46] stroke-current mb-4" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
    )
  },
  {
    title: "Educational Initiatives",
    desc: "Providing quality education and spiritual grounding for underprivileged children and youth.",
    icon: (
      <svg className="w-8 h-8 text-[#b07c46] stroke-current mb-4" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    )
  },
  {
    title: "Temple Restoration Projects",
    desc: "Preserving and reviving ancient sacred spaces to maintain our rich cultural heritage.",
    icon: (
      <svg className="w-8 h-8 text-[#b07c46] stroke-current mb-4" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-5a3 3 0 0 1 6 0v5" />
      </svg>
    )
  },
  {
    title: "Retreat Sponsorship Support",
    desc: "Enabling seekers with limited means to experience transformative spiritual retreats.",
    icon: (
      <svg className="w-8 h-8 text-[#b07c46] stroke-current mb-4" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="7" r="4" />
        <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
      </svg>
    )
  }
];

export default function DonatePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('modal') === 'true') {
      setIsModalOpen(true);
    }
  }, [location.search]);
  
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    offeringType: 'One Time',
    donationCategory: 'General Fund',
    amount: '',
    purpose: '',
    message: '',
    agreed: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!form.email.trim()) newErrors.email = 'Email Address is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email address';
    if (!form.phone.trim()) newErrors.phone = 'Phone Number is required';
    if (!form.country.trim()) newErrors.country = 'Country is required';
    if (!form.amount || Number(form.amount) <= 0) newErrors.amount = 'Valid amount is required';
    if (!form.purpose.trim()) newErrors.purpose = 'Purpose is required';
    if (!form.agreed) newErrors.agreed = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const mapCategoryToPurpose = (category) => {
    switch (category) {
      case 'General Fund':
        return 'general';
      case 'Temple Restoration':
        return 'temple-restoration';
      case 'Sponsor A Program':
        return 'programs';
      case 'Student Scholarship':
        return 'retreat-scholarship';
      case 'Retreat Sponsorship':
        return 'retreat-scholarship';
      default:
        return 'general';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please correct the highlighted errors.');
      return;
    }
    
    setLoading(true);
    try {
      const donationAmount = parseInt(form.amount);
      const orderRes = await donationsAPI.createOrder({ amount: donationAmount });
      const { order, key } = orderRes.data;

      // Construct a combined message so that both the user note and the specified purpose are stored
      const combinedMessage = form.purpose 
        ? `Purpose: ${form.purpose}${form.message ? ` | Notes: ${form.message}` : ''}`
        : form.message;

      if (window.Razorpay && key && key !== 'rzp_test_demo') {
        const options = {
          key,
          amount: order.amount,
          currency: order.currency || 'INR',
          name: 'Anubhuthi Foundation',
          description: `Donation: ${form.donationCategory}`,
          order_id: order.id,
          handler: async (response) => {
            try {
              await donationsAPI.verify({
                donorName: form.fullName,
                email: form.email,
                phone: form.phone,
                amount: donationAmount,
                purpose: mapCategoryToPurpose(form.donationCategory),
                donationCategory: form.donationCategory,
                offeringType: form.offeringType,
                country: form.country,
                message: combinedMessage,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id
              });
              toast.success('Thank you! Your offering has been received.');
              setIsModalOpen(false);
              setForm({
                fullName: '', email: '', phone: '', country: '', offeringType: 'One Time',
                donationCategory: 'General Fund', amount: '', purpose: '', message: '', agreed: false
              });
              setErrors({});
            } catch (err) {
              toast.error('Verification failed. Please contact support.');
            }
          },
          prefill: { name: form.fullName, email: form.email, contact: form.phone },
          theme: { color: '#b07c46' }
        };
        new window.Razorpay(options).open();
      } else {
        await donationsAPI.verify({
          donorName: form.fullName,
          email: form.email,
          phone: form.phone,
          amount: donationAmount,
          purpose: mapCategoryToPurpose(form.donationCategory),
          donationCategory: form.donationCategory,
          offeringType: form.offeringType,
          country: form.country,
          message: combinedMessage,
          paymentId: `mock_pay_${Date.now()}`,
          orderId: order?.id || `mock_ord_${Date.now()}`
        });
        toast.success('Thank you! Your offering has been received.');
        setIsModalOpen(false);
        setForm({
          fullName: '', email: '', phone: '', country: '', offeringType: 'One Time',
          donationCategory: 'General Fund', amount: '', purpose: '', message: '', agreed: false
        });
        setErrors({});
      }
    } catch (err) {
      toast.error('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  return (
    <div className="font-sans text-earth-800 bg-[#fbf9f4]">
      <Helmet>
        <title>Donate & Support — Anubhuthi Foundation</title>
        <meta name="description" content="Support Anubhuthi Foundation's mission of spiritual awakening, temple restoration, and community service." />
      </Helmet>
      
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />

      {/* Hero Section */}
      <section className="relative flex min-h-[100svh] w-full items-center pt-28 pb-12 md:pt-36 md:pb-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Support Human Evolution" 
            className="w-full h-full object-cover object-right"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-xl text-white drop-shadow-md">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-sans tracking-wide drop-shadow-lg">
              SUPPORT HUMAN EVOLUTION
            </h1>
            <p className="text-lg md:text-xl font-medium text-white leading-relaxed drop-shadow-lg">
              Your support helps us create awareness, empower individuals, 
              uplift society, and expand human evolution programs.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Options Section */}
      <section className="py-20 bg-[#fbf9f4]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0a1e35] mb-16 tracking-wider">
            DONATION OPTIONS
          </h2>
          
          <div className="grid grid-cols-2 gap-6 px-2 sm:px-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-8">
            {donationOptions.map((opt, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="mb-6 transform transition-transform group-hover:scale-110">
                  {opt.icon}
                </div>
                <h3 className="font-medium text-sm md:text-base text-[#0a1e35] whitespace-pre-line text-center">
                  {opt.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="w-full flex flex-col md:flex-row items-stretch relative min-h-[450px]">
        <div className="w-full md:w-1/2 bg-[#f4ebd9] relative z-10 flex items-center p-12 md:p-24 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#f4ebd9] before:via-[#f4ebd9] before:to-transparent before:z-[-1]">
          <div className="max-w-lg ml-auto mr-0 md:mr-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1e35] mb-6">
              TRANSPARENCY
            </h2>
            <p className="text-gray-700 text-lg mb-10 leading-relaxed font-medium">
              Anubhuthi Foundation is committed to transparency, accountability, 
              and trust. All donations are utilized directly for 
              non-profit humanitarian and awareness programs.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#c27c2e] hover:bg-[#b07c46] transition-colors text-white font-medium py-3 px-8 rounded-sm shadow-md tracking-wide"
            >
              DONATE SECURELY
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 relative min-h-[350px] md:min-h-full">
           <div className="absolute inset-0 bg-gradient-to-r from-[#f4ebd9] to-transparent w-1/3 z-10 md:block hidden"></div>
           <img 
            src={templeImage} 
            alt="Temple Restoration" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Why Your Contribution Matters Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0a1e35] tracking-wide mb-4">
              WHY YOUR CONTRIBUTION MATTERS
            </h2>
            <div className="w-24 h-1 bg-[#b07c46] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {contributionCards.map((card, idx) => (
              <div key={idx} className="bg-[#fbf9f4] p-8 rounded-xl shadow-sm border border-[#e8dfc9] hover:shadow-md transition-shadow">
                <div className="flex justify-center">{card.icon}</div>
                <h3 className="text-lg font-bold text-[#0a1e35] mb-4 text-center">{card.title}</h3>
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-[8px]"
              onClick={() => !loading && setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-xl shadow-2xl relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white/90 backdrop-blur-sm px-8 py-5 border-b border-gray-100 flex justify-between items-center z-20">
                <h2 className="text-2xl font-bold text-[#0a1e35]">YOUR OFFERING</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  disabled={loading}
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500 font-bold">*</span></label>
                    <input type="text" name="fullName" value={form.fullName} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[#b07c46] focus:border-transparent outline-none`} />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500 font-bold">*</span></label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[#b07c46] focus:border-transparent outline-none`} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500 font-bold">*</span></label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[#b07c46] focus:border-transparent outline-none`} />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country <span className="text-red-500 font-bold">*</span></label>
                    <input type="text" name="country" value={form.country} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[#b07c46] focus:border-transparent outline-none`} />
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Offering Type <span className="text-red-500 font-bold">*</span></label>
                    <select name="offeringType" value={form.offeringType} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b07c46] focus:border-transparent outline-none bg-white">
                      <option value="One Time">One Time</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Donation Category <span className="text-red-500 font-bold">*</span></label>
                    <select name="donationCategory" value={form.donationCategory} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b07c46] focus:border-transparent outline-none bg-white">
                      <option value="General Fund">General Fund</option>
                      <option value="Temple Restoration">Temple Restoration</option>
                      <option value="Sponsor A Program">Sponsor A Program</option>
                      <option value="Student Scholarship">Student Scholarship</option>
                      <option value="Retreat Sponsorship">Retreat Sponsorship</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Offering Amount (₹) <span className="text-red-500 font-bold">*</span></label>
                    <input type="number" min="1" name="amount" value={form.amount} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[#b07c46] focus:border-transparent outline-none`} />
                    {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Purpose of Contribution <span className="text-red-500 font-bold">*</span></label>
                    <input type="text" name="purpose" value={form.purpose} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.purpose ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[#b07c46] focus:border-transparent outline-none`} />
                    {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message / Notes</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b07c46] focus:border-transparent outline-none resize-none"></textarea>
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="agreed" name="agreed" checked={form.agreed} onChange={handleChange} className="w-4 h-4 text-[#b07c46] focus:ring-[#b07c46] border-gray-300 rounded" />
                    <label htmlFor="agreed" className="text-sm text-gray-600 cursor-pointer">
                      I agree to the foundation's donation terms.
                    </label>
                  </div>
                  {errors.agreed && <p className="text-red-500 text-xs mt-1">{errors.agreed}</p>}
                </div>

                <div className="flex justify-stretch border-t border-gray-100 pt-4 sm:justify-end">
                  <button 
                    type="submit" 
                    disabled={loading || !form.agreed}
                    className={`w-full bg-[#0a1e35] text-white px-6 py-3 rounded-md font-medium tracking-wide transition-colors flex items-center justify-center sm:min-w-[200px] sm:w-auto
                      ${loading || !form.agreed ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#153457]'}`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                         </svg>
                         PROCESSING...
                      </span>
                    ) : 'SUBMIT OFFERING'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer Tagline */}
      <div className="bg-[#0a1e35] py-4 border-t border-white/10 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-[#c27c2e] font-medium tracking-wide text-sm md:text-base">
            One Purpose &nbsp;•&nbsp; One Humanity &nbsp;•&nbsp; One Journey &nbsp;•&nbsp; One Evolution
          </p>
        </div>
      </div>
    </div>
  );
}

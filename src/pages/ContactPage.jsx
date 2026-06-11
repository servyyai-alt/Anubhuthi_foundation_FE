import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaChevronRight,
  FaTimes,
  FaSpinner,
  FaArrowRight
} from 'react-icons/fa';

import { contactAPI } from '../services/api';
import { animationVariants, transitionConfig, useReducedMotion, useIsMobile } from '../utils/animations';

// Image assets (generated and copied during execution)
import contactHeroGuide from '../assets/contact_hero_guide.png';
import contactFounderPortrait from '../assets/contact_founder_portrait.png';
import contactCtaBg from '../assets/contact_cta_bg.png';

const AwarenessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8.5a3.5 3.5 0 1 0 3.5 3.5" strokeLinecap="round" />
    <path d="M12 4v2M20 12h-2M12 20v-2M4 12h2" strokeLinecap="round" />
  </svg>
);

const RetreatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 18h18" strokeLinecap="round" />
    <path d="m5 18 5-8 3 4 2-3 4 7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.5 6.5 18 5l1.5 1.5L18 8l-1.5-1.5Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const VolunteerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
    <path d="M7.5 13.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM16.5 13.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    <path d="M3.5 19c.6-2.3 2.4-3.5 4-3.5 1.7 0 3.4 1.2 4 3.5M12.5 19c.6-2.3 2.3-3.5 4-3.5 1.6 0 3.4 1.2 4 3.5" strokeLinecap="round" />
  </svg>
);

const AcademyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
    <path d="m4 9 8-4 8 4-8 4-8-4Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 10.5V15c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TempleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
    <path d="M5 20h14M7 20v-7h10v7M6 13h12M8.5 9h7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m12 4 4 3H8l4-3Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SupportIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 19s-6-3.8-6-8.3A3.7 3.7 0 0 1 9.8 7c1 0 1.8.4 2.2 1.1.4-.7 1.2-1.1 2.2-1.1A3.7 3.7 0 0 1 18 10.7C18 15.2 12 19 12 19Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ContactPage() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  
  // Carousel states and handlers
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragMoved, setDragMoved] = useState(false);

  const onMouseDown = (e) => {
    setIsDragging(true);
    setDragMoved(false);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    if (containerRef.current) {
      containerRef.current.style.scrollSnapType = 'none';
    }
  };

  const onMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (containerRef.current) {
        containerRef.current.style.scrollSnapType = 'x mandatory';
      }
    }
  };

  const onMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (containerRef.current) {
        containerRef.current.style.scrollSnapType = 'x mandatory';
      }
    }
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setDragMoved(true);
    }
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    const children = container.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (!child.classList.contains('carousel-card-wrapper')) continue;
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    
    if (closestIndex !== activeIndex && closestIndex >= 0 && closestIndex < connectCards.length) {
      setActiveIndex(closestIndex);
    }
  };

  const handleLinkClick = (e) => {
    if (dragMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [errors, setErrors] = useState({});

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleOpenModal = (inquiryType = 'general', subjectText = '') => {
    setForm({
      name: '',
      email: '',
      phone: '',
      subject: subjectText,
      message: '',
      type: inquiryType
    });
    setSubmitted(false);
    setErrors({});
    setModalOpen(true);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
      newErrors.name = 'Name must contain letters and spaces only';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please correct the highlighted errors');
      return;
    }
    
    setLoading(true);
    try {
      await contactAPI.submit(form);
      setSubmitted(true);
      toast.success('Message sent! We will get back to you soon.');
      // Reset form
      setForm({ name: '', email: '', phone: '', subject: '', message: '', type: 'general' });
      setErrors({});
    } catch (err) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Connect cards details
  const connectCards = [
    {
      icon: FaMapMarkerAlt,
      title: 'Registered Office',
      details: (
        <span className="block leading-relaxed">
          Anubhuthi Foundation<br />
          Door No : 3/37B, Vadamalaipatti<br />
          Musiri Taluk, Thathiengarpet Post<br />
          Tiruchirappalli District – 621214<br />
          Tamil Nadu, India
        </span>
      ),
      link: 'https://www.google.com/maps/search/?api=1&query=Anubhuthi+Foundation,+Door+No+:+3/37B,+Vadamalaipatti,+Musiri+Taluk,Thathiengarpet+post,+Tiruchirappalli+District-621214,+Tamilnadu,+INDIA'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: 'admin@anubhuthi.org',
      link: 'mailto:admin@anubhuthi.org'
    },
    {
      icon: FaPhone,
      title: 'Phone',
      details: '6381586747',
      link: 'tel:6381586747',
      displayDetails: '+91 63815 86747'
    },
    {
      icon: FaGlobe,
      title: 'Website',
      details: 'www.anubhuthi.org',
      link: 'http://www.anubhuthi.org'
    }
  ];

  // Auto scroll effect
  useEffect(() => {
    if (isDragging) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % connectCards.length;
        if (containerRef.current) {
          const container = containerRef.current;
          const card = container.children[nextIndex];
          if (card) {
            container.scrollTo({
              left: card.offsetLeft - container.clientWidth / 2 + card.clientWidth / 2,
              behavior: 'smooth'
            });
          }
        }
        return nextIndex;
      });
    }, 2500); // 2.5 seconds rotation for faster transition

    return () => clearInterval(interval);
  }, [isDragging, connectCards.length]);

  // How can we help cards details
  const helpCards = [
    {
      icon: AwarenessIcon,
      title: 'Join Awareness Programs',
      type: 'programs',
      desc: 'Participate in conscious awareness drives and community circles.'
    },
    {
      icon: RetreatIcon,
      title: 'Retreat Participation',
      type: 'retreats',
      desc: 'Embark on a life-changing inner journey in the silence of the Himalayas.'
    },
    {
      icon: VolunteerIcon,
      title: 'Volunteer Opportunities',
      type: 'volunteer',
      desc: 'Offer your skills and support to nurture human evolution.'
    },
    {
      icon: AcademyIcon,
      title: 'DNI Academy Training',
      type: 'programs',
      desc: 'Engage in profound spiritual and scientific training modules.'
    },
    {
      icon: TempleIcon,
      title: 'Temple Restoration Mission',
      type: 'general',
      desc: 'Participate in reviving ancient energy centers and sacred geometry.'
    },
    {
      icon: SupportIcon,
      title: 'Donation & Support',
      type: 'general',
      desc: 'Support our non-profit initiatives with your financial support.'
    }
  ];



  return (
    <>
      <Helmet>
        <title>Contact Us — Anubhuthi Foundation</title>
        <meta
          name="description"
          content="Get in touch with Anubhuthi Foundation. Begin a meaningful conversation regarding retreats, volunteering, academy training, and conscious evolution."
        />
      </Helmet>

      {/* SECTION 1 — HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center justify-center bg-[#011126] px-4 pt-28 pb-16 text-white overflow-hidden sm:px-6 sm:pt-36 md:pt-44">
        {/* Glowing Background Auras */}
        <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#e7ad43]/10 blur-[100px] -z-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-saffron-500/10 blur-[100px] -z-10" />
        
        {/* Subtle geometric grid line */}
        <div className="absolute inset-0 bg-hero-pattern opacity-10 -z-20" />

        <div className="max-w-7xl mx-auto px-0 lg:px-8 w-full">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={prefersReducedMotion ? {} : animationVariants.fadeUp}
              transition={transitionConfig}
              className="lg:col-span-7 text-left space-y-6"
            >
              <span className="text-orange-400 font-semibold tracking-[0.25em] text-xs uppercase flex items-center gap-2">
                  Let's Connect 
              </span>
              <h1 className="font-serif text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Let's Begin a <span className="text-orange-400">Meaningful</span> Conversation
              </h1>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl font-light">
                Whether you seek guidance, collaboration, volunteering opportunities, retreats, awareness programs, or wish to support our mission, we would be happy to hear from you.
              </p>
              
              <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:flex-wrap">
                <button
                  onClick={() => handleOpenModal('general', 'General Inquiry')}
                  className="px-8 py-4 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_4px_20px_rgba(249,115,22,0.3)]"
                >
                  Contact Us
                </button>
                <button
                  onClick={() => document.getElementById('how-we-help')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-transparent border-2 border-white/20 hover:border-orange-400 hover:text-orange-400 rounded-full font-semibold transition-all duration-300"
                >
                  Join The Movement
                </button>
              </div>
            </motion.div>

            {/* Right Image (Parallax + Silhouette) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-3xl blur-2xl -z-10" />
              
              {/* Outer decorative gold frame */}
              <div className="absolute inset-0 border border-[#e7ad43]/30 rounded-3xl translate-x-3 translate-y-3 -z-10" />
              
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative overflow-hidden rounded-3xl shadow-2xl bg-earth-900/40 p-2 border border-white/10"
              >
                <img
                  src={contactHeroGuide}
                  alt="Founder Guide Silhouette"
                  className="w-full h-[320px] sm:h-[400px] lg:h-[440px] object-cover rounded-2xl transform hover:scale-[1.03] transition-transform duration-700"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — CONNECT WITH US */}
      <section className="py-24 bg-cream overflow-hidden">
        <style>{`
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-none {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#C58A2B] font-semibold tracking-widest text-xs uppercase block mb-3"> Communication Points </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#021B3A]">
              Connect With Us
            </h2>
          </div>

          <div className="relative">
            {/* Scroll container with snap alignment */}
            <div
              ref={containerRef}
              onScroll={handleScroll}
              onMouseDown={onMouseDown}
              onMouseLeave={onMouseLeave}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none py-10 px-4 sm:gap-6 sm:px-[calc(50vw-170px)] md:px-[calc(50vw-210px)] lg:gap-8 lg:px-[calc(50vw-210px)] cursor-grab active:cursor-grabbing select-none"
              style={{ scrollBehavior: 'smooth' }}
            >
              {connectCards.map((card, i) => {
                const CardIcon = card.icon;
                const isActive = i === activeIndex;
                const cardContent = (
                  <motion.div
                    animate={{
                      scale: isActive ? 1.05 : 0.85,
                      opacity: isActive ? 1.0 : 0.5,
                      borderColor: isActive ? '#e7ad43' : 'rgba(216, 162, 74, 0.1)',
                      boxShadow: isActive 
                        ? '0 25px 60px rgba(2, 27, 58, 0.2)' 
                        : '0 4px 12px rgba(2, 27, 58, 0.03)',
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={`flex flex-row items-center gap-4 p-5 rounded-3xl min-h-[180px] md:min-h-[220px] w-[280px] sm:w-[340px] md:w-[420px] shrink-0 transition-colors duration-300 border-2 select-none
                      ${isActive 
                        ? 'bg-white border-[#e7ad43]' 
                        : 'bg-white/50 border-[#C58A2B]/10'
                      }`}
                  >
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shrink-0 transition-all duration-300
                      ${isActive ? 'bg-orange-500 text-white scale-110 shadow-lg' : 'bg-orange-50 text-orange-500'}`}>
                      <CardIcon size={24} />
                    </div>
                    <div className="flex flex-col text-left">
                      <h3 className="font-serif text-lg md:text-xl font-bold text-earth-800 mb-1.5">
                        {card.title}
                      </h3>
                      <div className="text-earth-500 text-xs md:text-sm font-light leading-relaxed">
                        {card.displayDetails || card.details}
                      </div>
                    </div>
                  </motion.div>
                );

                return (
                  <div
                    key={i}
                    className="carousel-card-wrapper shrink-0 snap-center pb-4"
                  >
                    {card.link ? (
                      <a 
                        href={card.link} 
                        onClick={handleLinkClick}
                        target={card.link.startsWith('http') ? '_blank' : undefined} 
                        rel="noopener noreferrer"
                        className="block focus:outline-none"
                      >
                        {cardContent}
                      </a>
                    ) : (
                      cardContent
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pagination dots progress indicator */}
            <div className="flex justify-center items-center gap-3 mt-8">
              {connectCards.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (containerRef.current) {
                      const container = containerRef.current;
                      const card = container.children[idx];
                      if (card) {
                        container.scrollTo({
                          left: card.offsetLeft - container.clientWidth / 2 + card.clientWidth / 2,
                          behavior: 'smooth'
                        });
                      }
                    }
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex 
                      ? 'bg-[#e7ad43] scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — FOUNDER MESSAGE */}
      <section className="py-24 bg-parchment relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={prefersReducedMotion ? {} : animationVariants.slideLeft}
              transition={transitionConfig}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative p-2 bg-white rounded-3xl shadow-2xl border border-orange-100/50 max-w-sm lg:max-w-full w-full">
                {/* Decorative border accent */}
                <div className="absolute inset-0 border-2 border-dashed border-[#C58A2B]/20 rounded-3xl -m-2 -z-10" />
                <img
                  src={contactFounderPortrait}
                  alt="Guru Nana Portrait"
                  className="w-full h-[400px] object-cover rounded-2xl transform hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </motion.div>

            {/* Right Message Box */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={prefersReducedMotion ? {} : animationVariants.fadeUp}
              transition={transitionConfig}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <span className="text-[#C58A2B] font-semibold tracking-widest text-xs uppercase block"> Leadership Wisdom </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-earth-800">
                A Message From Our Founder
              </h2>
              
              <div className="relative pt-8 pl-6 border-l-4 border-orange-500/30">
                <span className="absolute top-0 left-4 text-7xl font-serif text-orange-500/25 leading-none select-none">“</span>
                <p className="font-serif text-xl md:text-2xl italic text-earth-700 leading-relaxed">
                  Every meaningful transformation begins with a conversation.
                </p>
              </div>
              
              <p className="text-earth-500 font-light leading-relaxed text-base md:text-lg">
                We welcome individuals, families, organizations, and seekers who wish to contribute to human evolution. Let us join hands to restore nature, wisdom, and cosmic responsibility back into the center of human living.
              </p>
              
              <div className="pt-4">
                <div className="text-xl font-serif font-bold text-[#C58A2B]">Guru Nana</div>
                <div className="text-xs text-earth-400 uppercase tracking-widest mt-1">Founder, Anubhuthi Foundation</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW CAN WE HELP YOU? */}
      <section id="how-we-help" className="py-24 bg-cream scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#C58A2B] font-semibold tracking-widest text-xs uppercase block mb-3"> Support Pathways </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-earth-800">
              How Can We Help You?
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={prefersReducedMotion ? {} : animationVariants.staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {helpCards.map((card, i) => {
              const HelpIcon = card.icon;
              return (
                <motion.div
                  key={i}
                  variants={prefersReducedMotion ? {} : animationVariants.staggerItem}
                  transition={transitionConfig}
                  onClick={() => handleOpenModal(card.type, `${card.title} Inquiry`)}
                className="group relative overflow-hidden rounded-[28px] border border-[#eed9bc] bg-[linear-gradient(180deg,#fffdfa_0%,#fff6e8_100%)] p-8 shadow-[0_18px_40px_rgba(153,98,36,0.10)] transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-2 hover:border-[#d89d49]/45 hover:shadow-[0_24px_50px_rgba(153,98,36,0.16)]"
              >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#f4d58d] via-[#ef9d38] to-[#f6e1b1] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#f6c26b]/15 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                  
                  <div>
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#efc88c] bg-white/80 text-[#d27d1e] shadow-[0_12px_24px_rgba(210,125,30,0.12)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#d9801d] group-hover:text-white">
                      <HelpIcon />
                    </div>
                    <h3 className="font-serif text-[1.85rem] leading-tight font-bold text-earth-800 mb-3 transition-colors duration-300 group-hover:text-[#b76c17]">
                      {card.title}
                    </h3>
                    <p className="text-earth-600 text-base font-light leading-8">
                      {card.desc}
                    </p>
                  </div>
                  
                  <div className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#d9801d] transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#aa6214]">
                    Reach Out
                    <FaChevronRight size={10} className="transform group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — CONTACT FORM MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-[#011126]/85 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative z-10 flex w-full max-w-4xl flex-col overflow-y-auto rounded-3xl bg-cream shadow-2xl max-h-[95vh] md:max-h-[92vh] md:flex-row md:overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 md:bg-orange-50 md:hover:bg-orange-100 flex items-center justify-center text-white md:text-earth-800 transition-colors duration-300"
                aria-label="Close modal"
              >
                <FaTimes size={14} />
              </button>

              {/* Left Panel - Information Summary */}
              <div className="relative flex shrink-0 flex-col justify-between overflow-hidden bg-[#021B3A] p-6 text-white sm:p-8 md:w-5/12 md:p-10">
                {/* Mandala Decorative SVG Background */}
                <div className="absolute -bottom-20 -left-20 w-64 h-64 opacity-10 pointer-events-none select-none text-orange-400">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" />
                    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" fill="none" />
                    <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" fill="none" />
                    <path d="M50 0 L50 100 M0 50 L100 50 M15 15 L85 85 M15 85 L85 15" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                </div>

                <div className="space-y-6 relative z-10">
                  <span className="text-orange-400 font-semibold tracking-widest text-xs uppercase block">
                    ❈ Inner Call ❈
                  </span>
                  <h3 className="font-serif text-3xl font-bold leading-tight">
                    We Are Here To Listen
                  </h3>
                  <p className="text-gray-300 text-sm font-light leading-relaxed">
                    Every voice is valued, and every inquiry is answered with care. Let us know how we can walk this path of consciousness together.
                  </p>
                </div>

                <div className="mt-8 md:mt-0 space-y-4 text-xs font-light text-gray-300 relative z-10">
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-orange-400" />
                    <span>admin@anubhuthi.org</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-orange-400" />
                    <span>+91 63815 86747</span>
                  </div>
                </div>
              </div>

              {/* Right Panel - Form Submission */}
              <div className="flex flex-col justify-center bg-white p-5 sm:p-6 md:w-7/12 md:p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-6"
                  >
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-orange-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="font-serif text-2xl font-bold text-earth-800">
                      Message Received
                    </h4>
                    <p className="text-earth-500 font-light text-sm max-w-xs mx-auto leading-relaxed">
                      Thank you for reaching out. Guru Nana and our coordination team will respond within 2-3 business days.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-orange-500 text-white rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h4 className="font-serif text-2xl font-bold text-earth-800">
                      Send Inquiry
                    </h4>
                    
                    <div className="space-y-3">
                      {/* Name input */}
                      <div>
                        <label className="block text-[10px] font-semibold text-earth-600 uppercase tracking-widest mb-1">
                          Full Name <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={`w-full px-4 py-2.5 bg-white border ${errors.name ? 'border-red-500' : 'border-orange-100'} rounded-xl text-earth-800 placeholder-earth-300 focus:border-orange-500 outline-none transition-colors duration-200 text-sm`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                      </div>

                      {/* Grid for Email & Phone */}
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-semibold text-earth-600 uppercase tracking-widest mb-1">
                            Email Address <span className="text-red-500 font-bold">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@email.com"
                            className={`w-full px-4 py-2.5 bg-white border ${errors.email ? 'border-red-500' : 'border-orange-100'} rounded-xl text-earth-800 placeholder-earth-300 focus:border-orange-500 outline-none transition-colors duration-200 text-sm`}
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-earth-600 uppercase tracking-widest mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+91..."
                            className="w-full px-4 py-2.5 bg-white border border-orange-100 rounded-xl text-earth-800 placeholder-earth-300 focus:border-orange-500 outline-none transition-colors duration-200 text-sm"
                          />
                        </div>
                      </div>

                      {/* Subject input */}
                      <div>
                        <label className="block text-[10px] font-semibold text-earth-600 uppercase tracking-widest mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="What is this about?"
                          className="w-full px-4 py-2.5 bg-white border border-orange-100 rounded-xl text-earth-800 placeholder-earth-300 focus:border-orange-500 outline-none transition-colors duration-200 text-sm"
                        />
                      </div>

                      {/* Message textarea */}
                      <div>
                        <label className="block text-[10px] font-semibold text-earth-600 uppercase tracking-widest mb-1">
                          Message <span className="text-red-500 font-bold">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Write your thoughts..."
                          rows={3}
                          className={`w-full px-4 py-2.5 bg-white border ${errors.message ? 'border-red-500' : 'border-orange-100'} rounded-xl text-earth-800 placeholder-earth-300 focus:border-orange-500 outline-none transition-colors duration-200 resize-none text-sm`}
                        />
                        {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message}</p>}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-4 py-3 bg-[#021B3A] text-white hover:bg-orange-500 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed group text-sm"
                    >
                      {loading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <>
                          Send Message
                          <FaArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SECTION 6 — FINAL CTA BANNER */}
      <section className="py-24 bg-cream px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={prefersReducedMotion ? {} : animationVariants.fadeUp}
            transition={transitionConfig}
            className="relative py-24 px-6 md:px-12 text-center rounded-3xl overflow-hidden shadow-2xl bg-white border border-orange-100/50"
          >
            {/* Visual background image - full color, clear and bright */}
            <img
              src={contactCtaBg}
              alt="Himalayan Mountain Meditation"
              className="absolute inset-0 w-full h-full object-cover opacity-100 select-none pointer-events-none"
            />
            
            {/* Light soft overlay to ensure text legibility while keeping image clear */}
            <div className="absolute inset-0 bg-white/30" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="text-orange-500 font-semibold tracking-[0.25em] text-xs uppercase block">
                 Conscious Journey 
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-earth-800">
                Your Journey Starts With One Step
              </h2>
              <p className="text-earth-600 text-sm md:text-base leading-relaxed font-normal max-w-xl mx-auto">
                Connect with Anubhuthi Foundation and become part of a movement dedicated to awareness, responsibility, and conscious evolution.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button
                  onClick={() => handleOpenModal('general', 'Journey Step Inquiry')}
                  className="px-8 py-3.5 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 shadow-[0_4px_20px_rgba(249,115,22,0.3)] hover:-translate-y-0.5"
                >
                  Contact Us
                </button>
                <a
                  href="/programs"
                  className="px-8 py-3.5 bg-[#021B3A] text-white hover:bg-orange-600 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(2,27,58,0.15)]"
                >
                  Explore Programs
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


    </>
  );
}

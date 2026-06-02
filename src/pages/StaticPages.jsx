import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { PageHeader, SectionTitle, LotusDivider, LinkButton } from '../components/common';
import heroTempleImage from '../assets/hero-temple-image.png.png';
import beforeRestorationImage from '../assets/before-restoration.png.png';
import duringRestorationImage from '../assets/during-restoration.png.png';
import afterRestorationImage from '../assets/after-restoration.png.png';
import communityCultureImage from '../assets/community-culture.png.png';
import founderImage from '../assets/hero-section.png';
import dniBgImage from '../assets/dni-bg.png';
import whoJoinImage from '../assets/whojoin.png';
import trainingImage from '../assets/training.png';
import himalayaImage from '../assets/himalaya.png';

// --- Icons for About Page ---
const IconPurpose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);
const IconAwareness = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="10" r="2" />
    <path d="M7 16c0-2.2 2.2-4 5-4s5 1.8 5 4" />
    <circle cx="12" cy="5" r="1" fill="currentColor" />
  </svg>
);
const IconInnerIntelligence = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <circle cx="12" cy="6" r="2.5" />
    <path d="M8 14l-3 4s-1 1-1 2 1 2 3 2h12c2 0 3-1 3-2s-1-2-1-2l-3-4" />
    <path d="M12 11c-2 0-4 1.5-4 3.5v2h8v-2c0-2-2-3.5-4-3.5z" />
  </svg>
);
const IconEvolutionaryPotential = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <rect x="3" y="3" width="18" height="14" rx="3" />
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <path d="M7 12l3-3 2 2 4-4" />
    <path d="M16 7h3v3" />
  </svg>
);

// Icons for Core Values
const IconLotus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <path d="M12 22s-4-3-4-8c0-3 2-5 4-8 2 3 4 5 4 8 0 5-4 8-4 8z" />
    <path d="M12 22s-8-4-8-10c0-2.5 1.5-4 3-5 1 2.5 3 4 5 7" />
    <path d="M12 22s8-4 8-10c0-2.5-1.5-4-3-5-1 2.5-3 4-5 7" />
    <path d="M8 12c-1.5-1-3-1-5 0" />
    <path d="M16 12c1.5-1 3-1 5 0" />
  </svg>
);
const IconHeartHands = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M12 15s-2-2-2-4" />
    <path d="M12 15s2-2 2-4" />
  </svg>
);
const IconUpArrowCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16V8" />
    <path d="M8 12l4-4 4 4" />
  </svg>
);
const IconHumanity = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconNature = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 1 8.3C18.5 16.5 13.5 20 11 20Z" />
    <path d="M11 20v-5" />
    <path d="M11 15a5 5 0 0 1-5-5c0-1.5 1-3.5 2-5" />
    <path d="M8 10h3" />
  </svg>
);

// Small icons for bottom bar
const IconSmallSun = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>
);
const IconSmallPeople = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);
const IconSmallPath = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);
const IconSmallGrowth = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z"/>
    <path d="M8 14l4-4 4 4"/>
    <path d="M12 10v6"/>
  </svg>
);

// --- About Page ---
export function AboutPage() {
  const beliefs = [
    { name: 'Purpose', icon: <IconPurpose /> },
    { name: 'Awareness', icon: <IconAwareness /> },
    { name: 'Inner Intelligence', icon: <IconInnerIntelligence /> },
    { name: 'Evolutionary Potential', icon: <IconEvolutionaryPotential /> },
  ];

  const missionItems = [
    'To spread Natural Intelligence awareness globally',
    'To create conscious education systems',
    'To guide individuals toward self-realization',
    'To restore ancient wisdom and cultural heritage',
    'To conduct transformative retreats and trainings',
    'To support humanity through awareness-driven solutions'
  ];

  return (
    <>
      <Helmet><title>About Us - Anubhuthi Foundation</title></Helmet>
      <PageHeader title="About Us" subtitle="Our Story" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'About' }]} />
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section 1: Our Story */}
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl font-bold text-earth-800 mb-6 uppercase tracking-wider text-sm">About Anubhuthi Foundation</h2>
            <p className="text-earth-600 text-lg leading-relaxed mb-10 max-w-3xl mx-auto">
              Anubhuthi Foundation was established with a vision to help humanity rediscover the forgotten intelligence within themselves — Natural Intelligence.
            </p>
            <p className="text-earth-800 font-semibold mb-8">We believe every human being is born with:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
              {beliefs.map((b, i) => (
                <motion.div key={b.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-3 flex items-center justify-center bg-saffron-50 rounded-full border border-saffron-100 text-saffron-600">
                    {b.icon}
                  </div>
                  <span className="text-earth-700 font-medium text-sm">{b.name}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-earth-600 leading-relaxed max-w-3xl mx-auto">
              Through conscious guidance, meditation, travel, awareness training and self-realization practices, the Foundation aims to help individuals live meaningful and responsible lives.
            </p>
          </div>

          <LotusDivider />

          {/* Section 2 & 3: Vision and Mission */}
          <div className="grid sm:grid-cols-2 gap-8 mb-16">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 bg-parchment rounded-3xl">
              <h3 className="font-serif text-2xl font-bold text-earth-800 mb-6 uppercase tracking-wider text-sm">Our Vision</h3>
              <h4 className="font-serif text-xl font-bold text-earth-800 mb-4">To build a consciously evolved humanity.</h4>
              <p className="text-earth-600 mb-4">We envision a world where human beings:</p>
              <ul className="space-y-3">
                {['Understand themselves', 'Live responsibly', 'Fulfill their purpose', 'Evolve consciously', 'Contribute positively to humanity'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-saffron-500 mt-1">✦</span>
                    <span className="text-earth-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 bg-parchment rounded-3xl">
              <h3 className="font-serif text-2xl font-bold text-earth-800 mb-6 uppercase tracking-wider text-sm">Our Mission</h3>
              <ul className="space-y-4">
                {missionItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-saffron-500 mt-1">✦</span>
                    <span className="text-earth-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <LotusDivider />

          {/* Section 4: Founder Message */}
          <SectionTitle subtitle="Founder Message" title="Guru Nana (Nanu Nandakumar)" center />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-earth-900 to-earth-800 rounded-3xl overflow-hidden text-white flex flex-col sm:flex-row">
            <div className="sm:w-2/5 h-64 sm:h-auto">
              <img src={founderImage} alt="Guru Nana" className="w-full h-full object-cover object-top" />
            </div>
            <div className="sm:w-3/5 p-8 sm:p-12 flex flex-col justify-center">
              <p className="text-saffron-400 font-medium mb-6 uppercase tracking-wider text-sm">Founder & Chief Philosophical Guide</p>
              <blockquote className="font-serif text-xl sm:text-2xl leading-relaxed text-earth-50 italic">
                “Human evolution begins when a person understands who they truly are, why they are born, and how they must consciously live with responsibility, awareness and purpose.”
              </blockquote>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-[#021B3A] text-white pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10 border-b border-white/10 pb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-col items-center text-center px-4 pt-8 md:pt-0 group cursor-pointer">
              <div className="text-saffron-500 mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_8px_rgba(232,130,26,0.6)]"><IconLotus /></div>
              <h4 className="font-serif font-bold text-xl mb-3">Awareness</h4>
              <p className="text-sm text-white/70 leading-relaxed">Understanding self,<br />life and consciousness.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col items-center text-center px-4 pt-8 md:pt-0 group cursor-pointer">
              <div className="text-saffron-500 mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_8px_rgba(232,130,26,0.6)]"><IconHeartHands /></div>
              <h4 className="font-serif font-bold text-xl mb-3">Responsibility</h4>
              <p className="text-sm text-white/70 leading-relaxed">Living with discipline,<br />ethics and purpose.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col items-center text-center px-4 pt-8 md:pt-0 group cursor-pointer">
              <div className="text-saffron-500 mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_8px_rgba(232,130,26,0.6)]"><IconUpArrowCircle /></div>
              <h4 className="font-serif font-bold text-xl mb-3">Evolution</h4>
              <p className="text-sm text-white/70 leading-relaxed">Growing mentally,<br />emotionally and spiritually.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex flex-col items-center text-center px-4 pt-8 md:pt-0 group cursor-pointer">
              <div className="text-saffron-500 mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_8px_rgba(232,130,26,0.6)]"><IconHumanity /></div>
              <h4 className="font-serif font-bold text-xl mb-3">Humanity</h4>
              <p className="text-sm text-white/70 leading-relaxed">Serving people<br />beyond divisions.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="flex flex-col items-center text-center px-4 pt-8 md:pt-0 group cursor-pointer">
              <div className="text-saffron-500 mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_8px_rgba(232,130,26,0.6)]"><IconNature /></div>
              <h4 className="font-serif font-bold text-xl mb-3">Nature</h4>
              <p className="text-sm text-white/70 leading-relaxed">Reconnecting with<br />the intelligence of nature.</p>
            </motion.div>
          </div>

          <div className="pt-6">
            <div className="text-center font-sans text-base sm:text-[17px] tracking-wide text-saffron-500 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <span>One Purpose</span>
              <span className="text-white">●</span>
              <span>One Humanity</span>
              <span className="text-white">●</span>
              <span>One Journey</span>
              <span className="text-white">●</span>
              <span>One Evolution</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// --- Icons for Philosophy Page ---
const PhilIconHumanBirth = () => (<svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.5c-5.25 0-9.5-4.25-9.5-9.5 0-5.25 4.25-9.5 9.5-9.5 5.25 0 9.5 4.25 9.5 9.5 0 5.25-4.25 9.5-9.5 9.5z"/><path d="M12 13.5c-2.5 0-4.5 1.75-4.5 4v1h9v-1c0-2.25-2-4-4.5-4z"/><circle cx="12" cy="9" r="2.5"/><path d="M12 2v2M12 20v2M22 12h-2M4 12H2M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M19.07 19.07l-1.41-1.41M6.34 6.34L4.93 4.93"/></svg>);
const PhilIconAwareness = () => (<svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="2.5" /><path d="M12 11v6" /><path d="M12 13c-2 1-4 3-5 5" /><path d="M12 13c2 1 4 3 5 5" /><path d="M7 18c1.5 1.5 3.5 2 5 2s3.5-.5 5-2" /><path d="M9 4.5a4 4 0 0 1 6 0" /><path d="M6 7a8 8 0 0 1 12 0" /></svg>);
const PhilIconEmotion = () => (<svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18" /><path d="M5 7h14" /><path d="M5 7l-3 8a3 3 0 0 0 6 0l-3-8z" /><path d="M19 7l-3 8a3 3 0 0 0 6 0l-3-8z" /><path d="M8 21h8" /><circle cx="12" cy="4" r="1" /><path d="M3.5 13a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0" /><path d="M17.5 12.5c-.8 0-1.5.7-1.5 1.5 0 2 1.5 3 1.5 3s1.5-1 1.5-3c0-.8-.7-1.5-1.5-1.5z"/></svg>);
const PhilIconDNA = () => (<svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2c0 2.5-6 5.5-6 10s6 7.5 6 10" /><path d="M9 2c0 2.5 6 5.5 6 10s-6 7.5-6 10" /><path d="M10 6h4" /><path d="M9.5 9h5" /><path d="M9 12h6" /><path d="M9.5 15h5" /><path d="M10 18h4" /></svg>);
const PhilIconSensory = () => (<svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12C5.5 6.5 8.5 4 12 4s6.5 2.5 10 8c-3.5 5.5-6.5 8-10 8s-6.5-2.5-10-8z" /><circle cx="12" cy="12" r="3" /><path d="M12 2v1" /><path d="M12 21v1" /><path d="M2 12h1" /><path d="M21 12h1" /><path d="M5 5l1 1" /><path d="M18 18l1 1" /><path d="M19 5l-1 1" /><path d="M6 18l-1 1" /></svg>);
const PhilIconSelfRealization = () => (<svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="2.5" /><path d="M12 13v6" /><path d="M12 15c-2 1-4 2.5-5 4" /><path d="M12 15c2 1 4 2.5 5 4" /><path d="M7 19c1.5 1 3.5 1.5 5 1.5s3.5-.5 5-1.5" /><path d="M12 2v2M12 20v2M22 12h-2M4 12H2M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M19.07 19.07l-1.41-1.41M6.34 6.34L4.93 4.93"/></svg>);
const PhilIconPurpose = () => (<svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.7 0l-1.1 1-1.1-1a5.5 5.5 0 0 0-7.8 7.8l1 1 7.9 7.9 7.9-7.9 1-1a5.5 5.5 0 0 0 0-7.8z" /><path d="M12 15l-2-6 6 2-4 4z" /></svg>);

const PhilIconNaturalInt = () => (<svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.66 4.34a5.96 5.96 0 00-2.83 1.93M4 12a8 8 0 011.08-4.04M5.34 19.66a5.96 5.96 0 001.93 2.83M12 20a8 8 0 01-4.04-1.08M19.66 18.66a5.96 5.96 0 002.83-1.93M20 12a8 8 0 01-1.08 4.04M18.66 5.34a5.96 5.96 0 00-1.93-2.83M12 4a8 8 0 014.04 1.08M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>);
const PhilIconConsciousLiving = () => (<svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="6" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>);
const PhilIconRespRel = () => (<svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35zM7 10h10M12 7v6" /></svg>);
const PhilIconHumanEvo = () => (<svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>);

const PhilIconAwarenessThought = () => (<svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10a3 3 0 100-6 3 3 0 000 6zM8 20c0-3 2-6 4-6s4 3 4 6M4 20h16" /></svg>);
const PhilIconRespAction = () => (<svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35zM12 15s-4-2-4-5M12 15s4-2 4-5" /></svg>);
const PhilIconCompassion = () => (<svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8a4 4 0 11-8 0 4 4 0 018 0zM5 20a7 7 0 0114 0" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 14a3 3 0 100-6 3 3 0 000 6z" /></svg>);
const PhilIconHarmony = () => (<svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>);
const PhilIconInfinity = () => (<svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 8a4 4 0 100 8 4 4 0 000-8zm8 0a4 4 0 110 8 4 4 0 010-8zm-4 4l4-4M12 12l-4 4" /></svg>);

// --- Philosophy Page ---
export function PhilosophyPage() {
  return (
    <>
      <Helmet><title>Philosophy - Anubhuthi Foundation</title></Helmet>
      
      {/* Hero Section */}
      <section className="relative w-full bg-center bg-cover bg-no-repeat pt-32" style={{ backgroundImage: "url('/src/assets/philosophy-bg.png')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#021B3A]/90 via-transparent to-transparent pointer-events-none"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-0 text-center text-white">
          <nav className="mb-8 flex items-center gap-1.5 text-left font-sans text-sm text-white/60">
            <Link to="/" className="hover:text-[#D8A24A] transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white/85">Philosophy</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-wide">ANUBHUTHI PHILOSOPHY</h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-16 font-light">A conscious life philosophy for human evolution.</p>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-12 mb-6">
            <div className="flex flex-col items-center group cursor-pointer w-24">
              <div className="text-saffron-400 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_8px_rgba(232,130,26,0.6)]"><PhilIconHumanBirth /></div>
              <p className="text-xs md:text-sm text-white/80 font-medium">Human Birth</p>
            </div>
            <div className="flex flex-col items-center group cursor-pointer w-24">
              <div className="text-saffron-400 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_8px_rgba(232,130,26,0.6)]"><PhilIconAwareness /></div>
              <p className="text-xs md:text-sm text-white/80 font-medium">Awareness</p>
            </div>
            <div className="flex flex-col items-center group cursor-pointer w-24">
              <div className="text-saffron-400 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_8px_rgba(232,130,26,0.6)]"><PhilIconEmotion /></div>
              <p className="text-xs md:text-sm text-white/80 font-medium">Emotional<br/>Balance</p>
            </div>
            <div className="flex flex-col items-center group cursor-pointer w-24">
              <div className="text-saffron-400 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_8px_rgba(232,130,26,0.6)]"><PhilIconDNA /></div>
              <p className="text-xs md:text-sm text-white/80 font-medium">DNA<br/>Intelligence</p>
            </div>
            <div className="flex flex-col items-center group cursor-pointer w-24">
              <div className="text-saffron-400 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_8px_rgba(232,130,26,0.6)]"><PhilIconSensory /></div>
              <p className="text-xs md:text-sm text-white/80 font-medium">Sensory<br/>Experience</p>
            </div>
            <div className="flex flex-col items-center group cursor-pointer w-24">
              <div className="text-saffron-400 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_8px_rgba(232,130,26,0.6)]"><PhilIconSelfRealization /></div>
              <p className="text-xs md:text-sm text-white/80 font-medium">Self Realization</p>
            </div>
            <div className="flex flex-col items-center group cursor-pointer w-24">
              <div className="text-saffron-400 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_8px_rgba(232,130,26,0.6)]"><PhilIconPurpose /></div>
              <p className="text-xs md:text-sm text-white/80 font-medium">Purpose Oriented<br/>Living</p>
            </div>
          </div>
        </div>

        {/* List Overlay over the lower part of the image */}
        <div className="relative z-10 w-full pb-20 md:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 md:space-y-8 pl-4 sm:pl-10 lg:pl-20">
              <h3 className="text-xl md:text-2xl font-bold font-serif text-white mb-2">To live a meaningful life, understand:</h3>
              {[
                { n: 1, t: 'Their Body' },
                { n: 2, t: 'Their Mind' },
                { n: 3, t: 'Their Emotions' },
                { n: 4, t: 'Their Experiences' },
                { n: 5, t: 'Their Purpose' },
                { n: 6, t: 'Their Responsibility\nToward Humanity' },
              ].map((item) => (
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: item.n * 0.1 }} key={item.n} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#021B3A] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">{item.n}</div>
                  <p className="text-lg md:text-xl font-bold text-[#021B3A] whitespace-pre-line leading-snug">{item.t}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="bg-[#021B3A] text-white py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="CORE PRINCIPLES" center light />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10 mt-16 pb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-col items-center text-center px-4 group cursor-pointer pt-6 md:pt-0">
              <div className="text-saffron-400 mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_8px_rgba(232,130,26,0.6)]"><PhilIconNaturalInt /></div>
              <h4 className="font-serif font-bold text-xl mb-4 leading-tight">Natural<br />Intelligence</h4>
              <p className="text-sm text-white/70 leading-relaxed">The intelligence naturally<br />present within every<br />human being.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col items-center text-center px-4 group cursor-pointer pt-6 md:pt-0">
              <div className="text-saffron-400 mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_8px_rgba(232,130,26,0.6)]"><PhilIconConsciousLiving /></div>
              <h4 className="font-serif font-bold text-xl mb-4 leading-tight">Conscious<br />Living</h4>
              <p className="text-sm text-white/70 leading-relaxed">Living with awareness<br />rather than emotional<br />confusion.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col items-center text-center px-4 group cursor-pointer pt-6 md:pt-0">
              <div className="text-saffron-400 mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_8px_rgba(232,130,26,0.6)]"><PhilIconRespRel /></div>
              <h4 className="font-serif font-bold text-xl mb-4 leading-tight">Responsible<br />Relationships</h4>
              <p className="text-sm text-white/70 leading-relaxed">Building meaningful<br />and ethical human<br />relationships.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex flex-col items-center text-center px-4 group cursor-pointer pt-6 md:pt-0">
              <div className="text-saffron-400 mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_8px_rgba(232,130,26,0.6)]"><PhilIconSelfRealization /></div>
              <h4 className="font-serif font-bold text-xl mb-4 leading-tight">Self<br />Realization</h4>
              <p className="text-sm text-white/70 leading-relaxed">Understanding one's<br />true purpose.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="flex flex-col items-center text-center px-4 group cursor-pointer pt-6 md:pt-0">
              <div className="text-saffron-400 mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_8px_rgba(232,130,26,0.6)]"><PhilIconHumanEvo /></div>
              <h4 className="font-serif font-bold text-xl mb-4 leading-tight">Human<br />Evolution</h4>
              <p className="text-sm text-white/70 leading-relaxed">Continuous growth<br />toward a higher state<br />of awareness.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy in Action */}
      <section className="bg-parchment text-earth-800 py-20 mandala-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="PHILOSOPHY IN ACTION" center />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-16 mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-col items-center text-center group cursor-pointer">
              <div className="text-earth-800 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2"><PhilIconAwarenessThought /></div>
              <p className="text-sm font-medium">Awareness<br />in Every Thought</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col items-center text-center group cursor-pointer">
              <div className="text-earth-800 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2"><PhilIconRespAction /></div>
              <p className="text-sm font-medium">Responsibility<br />in Every Action</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col items-center text-center group cursor-pointer">
              <div className="text-earth-800 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2"><PhilIconCompassion /></div>
              <p className="text-sm font-medium">Compassion<br />in Every Interaction</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex flex-col items-center text-center group cursor-pointer">
              <div className="text-earth-800 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2"><PhilIconHarmony /></div>
              <p className="text-sm font-medium">Harmony<br />with Nature</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="flex flex-col items-center text-center group cursor-pointer">
              <div className="text-earth-800 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2"><PhilIconInfinity /></div>
              <p className="text-sm font-medium">Evolution<br />in Every Step</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Bar */}
      <div className="bg-[#021B3A] border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center font-sans text-base sm:text-[17px] tracking-wide text-saffron-500 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span>One Purpose</span>
            <span className="text-white">●</span>
            <span>One Humanity</span>
            <span className="text-white">●</span>
            <span>One Journey</span>
            <span className="text-white">●</span>
            <span>One Evolution</span>
          </div>
        </div>
      </div>
    </>
  );
}


// --- DNI Academy Page ---
const DniBrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M9 5a3 3 0 0 1 6 0 3.5 3.5 0 0 1 3 5.2A4 4 0 0 1 17 18h-1a3 3 0 0 1-6 0H9a4 4 0 0 1-1-7.8A3.5 3.5 0 0 1 11 5" />
    <path d="M12 8v8" />
    <path d="M9.5 10.5H12" />
    <path d="M12 13.5h2.5" />
  </svg>
);

const DniHeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" />
    <path d="M9.5 11.5h5" />
  </svg>
);

const DniRelationshipIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <circle cx="8" cy="8" r="2.5" />
    <circle cx="16" cy="8" r="2.5" />
    <path d="M4.5 18a4 4 0 0 1 7 0" />
    <path d="M12.5 18a4 4 0 0 1 7 0" />
    <path d="M10.5 11.5 13.5 14.5" />
  </svg>
);

const DniSelfIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <circle cx="12" cy="7" r="2.5" />
    <path d="M12 10.5v7" />
    <path d="M8.5 19c1-2.5 2.5-4 3.5-4s2.5 1.5 3.5 4" />
    <path d="M5 12c1.5-2.5 4-4 7-4s5.5 1.5 7 4" />
  </svg>
);

const DniLotusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M12 20c-2.5-1.2-4-3.5-4-6 0-2 1.2-3.8 4-6 2.8 2.2 4 4 4 6 0 2.5-1.5 4.8-4 6Z" />
    <path d="M12 20c-4-.8-6-3.2-6-6.5 0-1.4.5-2.8 1.5-4.1 1.6 1 3 2.6 4.5 4.8" />
    <path d="M12 20c4-.8 6-3.2 6-6.5 0-1.4-.5-2.8-1.5-4.1-1.6 1-3 2.6-4.5 4.8" />
  </svg>
);

const DniParentingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <circle cx="8" cy="8" r="2.5" />
    <circle cx="16.5" cy="9" r="2" />
    <path d="M4.5 18a4 4 0 0 1 7 0" />
    <path d="M13.5 18a3.5 3.5 0 0 1 6 0" />
    <path d="M11 10.5h2" />
  </svg>
);

const DniEvolutionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M6 18c2.5-1.5 4.5-4 6-7.5" />
    <path d="M12 10.5 10 8.5" />
    <path d="M12 10.5 15 9" />
    <path d="M12 18V4" />
    <path d="M12 4l-2 2" />
    <path d="M12 4l2 2" />
  </svg>
);

const DniCompassIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <circle cx="12" cy="12" r="8" />
    <path d="m14.8 9.2-2.1 5.6-5.5 2.1 2.1-5.6 5.5-2.1Z" />
    <circle cx="12" cy="12" r="1" />
  </svg>
);

const DniLeadershipIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <circle cx="12" cy="6.5" r="2.5" />
    <circle cx="6.5" cy="10" r="2" />
    <circle cx="17.5" cy="10" r="2" />
    <path d="M8.5 18c.7-2.2 2-3.5 3.5-3.5S14.8 15.8 15.5 18" />
    <path d="M3.8 18c.4-1.7 1.5-2.8 2.7-2.8S8.8 16.3 9.2 18" />
    <path d="M14.8 18c.4-1.7 1.5-2.8 2.7-2.8s2.3 1.1 2.7 2.8" />
  </svg>
);

const DniChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="m9 6 6 6-6 6" />
  </svg>
);

const DniWisdomIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v14H6.5A2.5 2.5 0 0 0 4 20.5z" />
    <path d="M4 6.5v14" />
    <path d="M12 7.5c1.2-1 2.5-1.5 4-1.5v9c-1.5 0-2.8.5-4 1.5-1.2-1-2.5-1.5-4-1.5V6c1.5 0 2.8.5 4 1.5Z" />
  </svg>
);

const DniMeditationSeatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
    <circle cx="12" cy="5.5" r="2.5" />
    <path d="M8 12c1.5-1 2.8-1.5 4-1.5s2.5.5 4 1.5" />
    <path d="M7 18c1.2-2.5 2.8-4 5-4s3.8 1.5 5 4" />
    <path d="M5 20h14" />
  </svg>
);

const DniNatureTravelIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
    <path d="M3 18h18" />
    <path d="M5 18 10 9l4 5 2-3 3 7" />
    <circle cx="7" cy="7" r="1.5" />
  </svg>
);

const DniCommunityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
    <circle cx="8" cy="8" r="2.5" />
    <circle cx="16" cy="8" r="2.5" />
    <circle cx="12" cy="13" r="2.5" />
    <path d="M3.5 19c.6-2.4 2.2-3.8 4.5-3.8S11.9 16.6 12.5 19" />
    <path d="M11.5 19c.6-2.4 2.2-3.8 4.5-3.8s3.9 1.4 4.5 3.8" />
  </svg>
);

const DniTargetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
    <circle cx="12" cy="12" r="7" />
    <circle cx="12" cy="12" r="3" />
    <path d="M16.5 7.5 21 3" />
    <path d="M15 4h6v6" />
  </svg>
);

const DniGlobalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
    <circle cx="12" cy="12" r="8" />
    <path d="M4 12h16" />
    <path d="M12 4a12 12 0 0 1 0 16" />
    <path d="M12 4a12 12 0 0 0 0 16" />
  </svg>
);

export function DNIAcademyPage() {
  const programs = [
    { title: 'Natural Intelligence', icon: <DniBrainIcon /> },
    { title: 'Emotional Awareness', icon: <DniHeartIcon /> },
    { title: 'Conscious Relationships', icon: <DniRelationshipIcon /> },
    { title: 'Self Realization', icon: <DniSelfIcon /> },
    { title: 'Meditation & Mindfulness', icon: <DniLotusIcon /> },
    { title: 'Conscious Parenting', icon: <DniParentingIcon /> },
    { title: 'Human Evolution', icon: <DniEvolutionIcon /> },
    { title: 'Life Purpose Discovery', icon: <DniCompassIcon /> },
    { title: 'Leadership Through Awareness', icon: <DniLeadershipIcon /> },
  ];

  const whoCanJoin = [
    'Students',
    'Professionals',
    'Couples',
    'Families',
    'Entrepreneurs',
    'Travelers',
    'Spiritual Seekers',
    'International Participants',
  ];

  const trainingFormats = [
    'Online Programs',
    'Residential Retreats',
    'Himalayan Awareness Camps',
    'Couple Transformation Retreats',
    'Meditation Programs',
    'Leadership Workshops',
    'Student Awareness Camps',
  ];

  const whyStudyItems = [
    { title: 'Ancient Wisdom Modern Education', icon: <DniWisdomIcon /> },
    { title: 'Experiential Learning', icon: <DniMeditationSeatIcon /> },
    { title: 'Nature & Travel Integration', icon: <DniNatureTravelIcon /> },
    { title: 'Community of Seekers', icon: <DniCommunityIcon /> },
    { title: 'Purpose Driven Programs', icon: <DniTargetIcon /> },
    { title: 'Global Participation', icon: <DniGlobalIcon /> },
  ];

  return (
    <>
      <Helmet><title>DNI Academy - Anubhuthi Foundation</title></Helmet>
      <div className="bg-[#F5EFE4]">
        <section
          className="relative overflow-hidden bg-[#021B3A] text-white"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(2,27,58,0.96) 0%, rgba(2,27,58,0.92) 42%, rgba(2,27,58,0.58) 70%, rgba(2,27,58,0.2) 100%), url(${dniBgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
            <div className="max-w-3xl">
              <nav className="mb-8 flex items-center gap-1.5 font-sans text-sm text-white/60">
                <Link to="/" className="hover:text-[#D8A24A] transition-colors">Home</Link>
                <span>›</span>
                <span className="text-white/85">DNI Academy</span>
              </nav>
              <h2 className="font-serif text-[44px] font-bold uppercase leading-[0.95] text-white sm:text-[56px] lg:text-[72px]">
                DNI Academy
              </h2>
              <p className="mt-4 font-serif text-2xl font-semibold text-[#D8A24A] sm:text-3xl">
                Decode of Natural Intelligence Academy
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
                DNI Academy is the educational and transformational division of Anubhuthi Foundation.
              </p>

              <div className="mt-10 max-w-2xl space-y-4">
                {programs.map((program, index) => (
                  <motion.div
                    key={program.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-[#D8A24A]">
                      {program.icon}
                    </span>
                    <p className="text-lg leading-snug text-white">{program.title}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <LinkButton to="/programs" variant="primary" size="lg" className="bg-[#D8A24A] hover:bg-[#C58F35]">
                  Explore Programs
                </LinkButton>
                <LinkButton to="/contact" variant="white" size="lg" className="bg-[#123260] text-white hover:bg-[#1A4178] hover:text-white">
                  Apply Now
                </LinkButton>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[28px] bg-[#F7F1E7] p-8 shadow-[0_18px_48px_rgba(15,23,42,0.08)]"
              >
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
                  <div>
                    <h3 className="font-sans text-[30px] font-bold uppercase tracking-[-0.03em] text-[#12264D] sm:text-[34px]">
                      Who Can Join?
                    </h3>
                    <div className="mt-8 space-y-4">
                      {whoCanJoin.map((item) => (
                        <div key={item} className="flex items-center gap-3 text-[#111827]">
                          <span className="text-[#D8A24A]"><DniChevronIcon /></span>
                          <span className="text-lg">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-[24px] border-4 border-white shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
                    <img src={whoJoinImage} alt="Students and participants gathered in a DNI Academy learning circle" className="h-full w-full object-cover" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-[28px] bg-[#F7F1E7] p-8 shadow-[0_18px_48px_rgba(15,23,42,0.08)]"
              >
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
                  <div>
                    <h3 className="font-sans text-[30px] font-bold uppercase tracking-[-0.03em] text-[#12264D] sm:text-[34px]">
                      Training Format
                    </h3>
                    <div className="mt-8 space-y-4">
                      {trainingFormats.map((item) => (
                        <div key={item} className="flex items-center gap-3 text-[#111827]">
                          <span className="text-[#D8A24A]"><DniChevronIcon /></span>
                          <span className="text-lg">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-[24px] border-4 border-white shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
                    <img src={trainingImage} alt="DNI Academy training session in a nature-facing classroom" className="h-full w-full object-cover" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-[#021B3A] py-14 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center font-serif text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
              Why Study at DNI Academy?
            </h3>
            <div className="mt-12 grid gap-8 md:grid-cols-3 xl:grid-cols-6">
              {whyStudyItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-5 text-[#D8A24A] transition-transform duration-300 hover:scale-110">
                    {item.icon}
                  </div>
                  <p className="text-lg leading-snug text-white/92">{item.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={himalayaImage} alt="Meditative mountain landscape" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F7F1E7]/95 via-[#F7F1E7]/82 to-[#021B3A]/20" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="max-w-2xl">
              <h3 className="font-serif text-4xl font-bold leading-tight text-[#12264D] sm:text-5xl">
                Education for Awareness.
              </h3>
              <p className="mt-2 font-serif text-3xl font-semibold text-[#D8A24A] sm:text-4xl">
                Awareness for Evolution.
              </p>
              <div className="mt-5 h-1 w-20 rounded-full bg-[#D8A24A]" />
              <p className="mt-6 text-lg leading-relaxed text-[#1F2937] sm:text-xl">
                Join DNI Academy and begin your journey to discover your Natural Intelligence and live a purposeful, conscious and fulfilling life.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <LinkButton to="/programs" variant="primary" size="lg" className="bg-[#D8A24A] hover:bg-[#C58F35]">
                  Explore Programs
                </LinkButton>
                <LinkButton to="/contact" size="lg" className="bg-[#123260] text-white hover:bg-[#0D2445]">
                  Apply Now
                </LinkButton>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-[#021B3A]">
          <div className="mx-auto w-full px-6 py-6 text-center font-sans text-[20px] font-medium tracking-[0.01em] text-[#D8A24A] sm:text-[24px]">
            One Purpose <span className="mx-2 text-white">•</span> One Humanity <span className="mx-2 text-white">•</span> One Journey <span className="mx-2 text-white">•</span> One Evolution
          </div>
        </div>
      </div>
    </>
  );
}

// --- Temple Restoration Page ---
export function TempleRestorationPage() {
  const objectives = [
    {
      title: 'Restore ancient temple structures',
      icon: (
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 20h16" />
          <path d="M6 20V10h12v10" />
          <path d="M3 10l9-6 9 6" />
          <path d="M10 20v-6h4v6" />
        </svg>
      ),
    },
    {
      title: 'Promote awareness through spiritual spaces',
      icon: (
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 20l16-16" />
          <path d="M14 4l6 6" />
          <path d="M4 10l4-4 3 3-4 4" />
          <path d="M10 20l4-4 3 3-4 4" />
        </svg>
      ),
    },
    {
      title: 'Support local communities',
      icon: (
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="8" cy="8" r="2.5" />
          <circle cx="16" cy="8" r="2.5" />
          <circle cx="12" cy="14" r="2.5" />
          <path d="M3.5 19c.6-2.5 2.5-4 4.5-4s3.9 1.5 4.5 4" />
          <path d="M11.5 19c.6-2.5 2.5-4 4.5-4s3.9 1.5 4.5 4" />
        </svg>
      ),
    },
    {
      title: 'Create meditation and learning centers',
      icon: (
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z" />
          <path d="M4 5.5v15" />
          <path d="M12 7h5" />
          <path d="M12 11h5" />
        </svg>
      ),
    },
    {
      title: 'Preserve cultural and philosophical heritage',
      icon: (
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 5c-4.5.2-8.5 2.8-10.4 6.8A7.7 7.7 0 0 0 7 15c0 3 2 5 5 5 1 0 2.1-.2 3.2-.7C19.2 17.5 21.8 13.5 22 9c-1.8 1.1-4 1.6-6.3 1.4-.2-2.3.3-4.5 1.3-6.4Z" />
          <path d="M4 20c3.5-1 6-3.5 7-7" />
        </svg>
      ),
    },
  ];

  const galleryCards = [
    {
      title: 'Before Restoration',
      image: beforeRestorationImage,
      alt: 'Ancient temple in a damaged state before restoration work',
    },
    {
      title: 'During Restoration',
      image: duringRestorationImage,
      alt: 'Temple restoration work with workers and scaffolding',
    },
    {
      title: 'After Restoration',
      image: afterRestorationImage,
      alt: 'Fully restored temple in warm daylight',
    },
    {
      title: 'Community & Culture',
      image: communityCultureImage,
      alt: 'Community gathering around a temple cultural activity',
    },
  ];

  return (
    <>
      <Helmet><title>Temple Restoration Mission - Anubhuthi Foundation</title></Helmet>
      
      <div className="bg-[#F5EFE4] pt-20">
        
        {/* Combined Hero + Objectives Grid Container */}
        <section className="bg-[#F5EFE4] relative overflow-hidden">
          <div 
            className="w-full grid grid-cols-1 lg:grid-cols-[45%_55%] lg:grid-rows-[auto_1fr] items-stretch relative"
          >
            {/* Left Content Column - Row 1: Hero Content Area */}
            <div 
              className="bg-[#021B3A]/80 lg:backdrop-blur-[3px] text-white py-12 px-6 lg:py-10 lg:pl-12 lg:pr-8 flex flex-col justify-center items-end lg:col-start-1 lg:row-start-1"
              style={{ zIndex: 20 }}
            >
              <div className="w-full max-w-[600px] text-left">
                {/* Breadcrumb */}
                <nav className="text-sm text-white/50 mb-4 flex items-center gap-1.5 font-sans">
                  <Link to="/" className="hover:text-[#D8A24A] transition-colors">Home</Link>
                  <span>›</span>
                  <span className="text-white/80">Temple Restoration</span>
                </nav>

                {/* Title */}
                <h1 className="font-sans text-[36px] font-bold uppercase leading-[0.98] tracking-[-0.03em] text-white sm:text-[48px] lg:text-[56px] xl:text-[60px]">
                  TEMPLE RESTORATION MISSION
                </h1>
                
                {/* Subtitle */}
                <p className="mt-3 font-serif text-xl font-semibold italic text-[#D8A24A] sm:text-2xl">
                  Reviving Ancient Wisdom
                </p>

                {/* Hero Paragraph */}
                <p className="mt-5 font-sans text-[16px] leading-[1.5] text-white opacity-90 sm:text-[18px] max-w-[550px]">
                  Anubhuthi Foundation works toward restoring ancient temples and spiritual heritage spaces with support from local communities.
                </p>

                {/* Aims Paragraph */}
                <p className="mt-4 font-sans text-[15px] leading-[1.5] text-white/80 max-w-[550px]">
                  The mission aims to: preserve heritage, revive cultural wisdom, create awareness centers, and support conscious community development.
                </p>
              </div>
            </div>

            {/* Left Content Column - Row 2: Objectives Content Area */}
            <div 
              className="bg-[#F5EFE4]/80 lg:backdrop-blur-[3px] text-[#111827] py-16 px-6 lg:py-12 lg:pl-12 lg:pr-8 lg:col-start-1 lg:row-start-2 border-t border-earth-100 flex flex-col justify-center items-end"
              style={{ zIndex: 20 }}
            >
              <div className="w-full max-w-[600px] text-left">
                <h2 className="font-sans text-[28px] font-bold uppercase tracking-[-0.03em] text-[#12264D] sm:text-[32px] mb-6">
                  OUR OBJECTIVES
                </h2>
                
                <div className="space-y-5">
                  {objectives.map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center text-[#D8A24A]">
                        {item.icon}
                      </div>
                      <p className="font-sans text-[16px] font-medium leading-[1.16] text-[#111827] sm:text-[18px]">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Background Temple Image spanning both columns and rows */}
            <div 
              className="absolute inset-0 lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-2 w-full h-full"
              style={{ zIndex: 1 }}
            >
              <img
                src={heroTempleImage}
                alt="Temple background"
                className="w-full h-full object-cover object-center lg:object-right"
              />
            </div>

          </div>
        </section>

        {/* Gallery Cards Section */}
        <section className="bg-[#F5EFE4] py-16 relative" style={{ zIndex: 20 }}>
          <div className="mx-auto w-full px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
              {galleryCards.map((card) => (
                <div
                  key={card.title}
                  className="overflow-hidden rounded-[20px] border-[3px] border-white bg-[#F7F1E7] shadow-[0_12px_34px_rgba(15,23,42,0.14)]"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-4 py-4 text-center">
                    <p className="font-sans text-[18px] font-medium leading-tight text-[#14213D] sm:text-[20px]">
                      {card.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Gold-Text Footer Bar */}
        <div className="bg-[#021B3A]">
          <div className="mx-auto w-full px-6 lg:px-12 py-6 text-center font-sans text-[20px] font-medium tracking-[0.01em] text-[#D8A24A] sm:text-[24px]">
            One Purpose <span className="mx-2 text-white">•</span> One Humanity <span className="mx-2 text-white">•</span> One Journey <span className="mx-2 text-white">•</span> One Evolution
          </div>
        </div>

      </div>
    </>
  );
}

// --- Legal Page ---
export function LegalPage() {
  return (
    <>
      <Helmet><title>Legal & Compliance - Anubhuthi Foundation</title></Helmet>
      <PageHeader title="Legal & Compliance" subtitle="Transparency" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Legal' }]} />
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {[
            { title: 'Registration & Legal Status', content: 'Anubhuthi Foundation is registered as a non-profit charitable trust under the Indian Trusts Act 1882. Registration No: [REG-2015-XXXX]. We are also registered under the Foreign Contribution Regulation Act (FCRA) and are eligible to receive international donations.' },
            { title: '80G Tax Exemption', content: 'All donations to Anubhuthi Foundation are eligible for tax deduction under Section 80G of the Income Tax Act, 1961. Donors will receive official receipts for all contributions above Rs 500.' },
            { title: 'Annual Reports & Audits', content: 'Our financial statements are audited annually by independent chartered accountants. Annual reports are available for public inspection and will be provided upon written request.' },
            { title: 'Privacy Policy', content: 'We are committed to protecting your personal information. We collect only the data necessary to serve you and do not sell or share your information with third parties. All payment processing is handled through secure, PCI-compliant payment gateways.' },
            { title: 'Refund Policy', content: 'Program fees are refundable up to 14 days before the program start date, minus a 10% administrative fee. Donations are non-refundable but may be redirected to another cause of your choice upon written request within 30 days.' },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="font-serif text-2xl font-bold text-earth-800 mb-3">{section.title}</h2>
              <p className="text-earth-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

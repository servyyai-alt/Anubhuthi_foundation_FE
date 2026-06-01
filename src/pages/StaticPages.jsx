import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { PageHeader, SectionTitle, LotusDivider, LinkButton } from '../components/common';

// --- About Page ---
export function AboutPage() {
  return (
    <>
      <Helmet><title>About Us - Anubhuthi Foundation</title></Helmet>
      <PageHeader title="About Us" subtitle="Our Story" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'About' }]} />
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-saffron-500 text-sm font-semibold tracking-widest uppercase mb-4">✦ Our Origin ✦</p>
            <h2 className="font-serif text-4xl font-bold text-earth-800 mb-6">Born from the Mountains, Rooted in Truth</h2>
            <p className="text-earth-600 text-lg leading-relaxed mb-6">
              Anubhuthi Foundation was born in the sacred atmosphere of Rishikesh in 2015, from the vision of our founder to create a living bridge between India's ancient spiritual wisdom and the modern world's desperate hunger for meaning, stillness, and transcendence.
            </p>
            <p className="text-earth-600 leading-relaxed mb-6">
              The word "Anubhuthi" (अनुभूति) means direct experience — not intellectual understanding, not second-hand belief, but the raw, immediate, unmediated experience of truth. This is our purpose: to create the conditions in which seekers can have that direct experience, whatever name they call it.
            </p>
            <p className="text-earth-600 leading-relaxed mb-8">
              Over the past decade, we have guided thousands of seekers through programs ranging from introductory meditation workshops to deep, multi-month immersions in Vedic philosophy. We have led pilgrimages to the most sacred sites in the Himalayas and have begun the vital work of restoring ancient temples that were falling into disrepair.
            </p>
          </div>
          <LotusDivider />
          <SectionTitle subtitle="Our People" title="Leadership & Faculty" />
          <div className="grid sm:grid-cols-2 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 bg-parchment rounded-2xl"
              >
                <div className="w-14 h-14 bg-saffron-200 rounded-full flex items-center justify-center font-serif text-2xl font-bold text-saffron-700 mb-4">
                  {member.name[0]}
                </div>
                <h3 className="font-serif text-xl font-bold text-earth-800 mb-1">{member.name}</h3>
                <p className="text-saffron-600 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-earth-500 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// --- Philosophy Page ---
export function PhilosophyPage() {
  const pillars = [
    { sanskrit: 'सत्', title: 'Sat — Being', desc: 'Existence itself is the foundation. Before all experience is pure being, the unchanging witness that underlies all phenomena.' },
    { sanskrit: 'चित्', title: 'Chit — Consciousness', desc: 'Awareness is not produced by the brain — it is the very nature of reality. The universe is a self-knowing intelligence.' },
    { sanskrit: 'आनंद', title: 'Ananda — Bliss', desc: 'Joy is not an emotion — it is our natural state when the obscurations are removed. Happiness is our birthright.' },
  ];

  return (
    <>
      <Helmet><title>Philosophy — Anubhuthi Foundation</title></Helmet>
      <PageHeader title="Anubhuthi Philosophy" subtitle="The View" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Philosophy' }]} />
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="sanskrit-text text-saffron-500 text-5xl mb-4">सत् चित् आनन्द</div>
            <p className="text-earth-500">Existence · Consciousness · Bliss</p>
          </div>
          <p className="text-earth-600 text-lg leading-relaxed mb-10 text-center max-w-3xl mx-auto">
            Our philosophy is rooted in the non-dual traditions of Advaita Vedanta and Kashmir Shaivism, while embracing the practical methodologies of classical yoga, tantra, and the wisdom of all authentic spiritual traditions.
          </p>
          <div className="space-y-6 mb-16">
            {pillars.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="flex gap-6 p-6 bg-parchment rounded-2xl"
              >
                <div className="sanskrit-text text-saffron-500 text-4xl flex-shrink-0">{p.sanskrit}</div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-earth-800 mb-2">{p.title}</h3>
                  <p className="text-earth-600 leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <LinkButton to="/dni-academy" variant="primary" size="lg">Explore DNI Academy</LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}

// --- DNI Academy Page ---
export function DNIAcademyPage() {
  const courses = [
    { title: 'Foundation Course in Vedanta', duration: '3 Months', level: 'Beginner', icon: '📿' },
    { title: 'Advanced Yoga Philosophy', duration: '6 Months', level: 'Intermediate', icon: '🧘' },
    { title: 'DNI Teacher Certification', duration: '1 Year', level: 'Advanced', icon: '🎓' },
    { title: 'Himalayan Immersion Training', duration: '21 Days', level: 'All', icon: '🏔️' },
  ];

  return (
    <>
      <Helmet><title>DNI Academy — Anubhuthi Foundation</title></Helmet>
      <PageHeader title="DNI Academy" subtitle="Divinity · Nature · Intelligence" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'DNI Academy' }]} />
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <p className="text-saffron-500 text-sm font-semibold tracking-widest uppercase mb-3">✦ Academic Excellence ✦</p>
              <h2 className="font-serif text-4xl font-bold text-earth-800 mb-5">A Living University of Ancient Wisdom</h2>
              <p className="text-earth-600 leading-relaxed mb-4">
                DNI Academy is our flagship educational initiative — a structured, rigorous, yet deeply experiential approach to studying and living the ancient sciences of consciousness.
              </p>
              <p className="text-earth-600 leading-relaxed mb-6">
                DNI stands for Divinity, Nature, and Intelligence — the three dimensions through which we explore reality. Our curriculum integrates textual study, contemplative practice, embodied inquiry, and seva (service) into a holistic transformative program.
              </p>
              <LinkButton to="/programs" variant="primary">Browse Courses</LinkButton>
            </div>
            <div className="bg-gradient-to-br from-earth-900 to-amber-950 rounded-3xl p-10 text-center text-white">
              <div className="sanskrit-text text-saffron-400 text-6xl mb-4">ॐ</div>
              <div className="font-serif text-2xl font-bold mb-2">DNI Academy</div>
              <p className="text-earth-300 text-sm">Divinity · Nature · Intelligence</p>
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                <div><div className="text-2xl font-bold text-saffron-400">500+</div><div className="text-xs text-earth-300">Graduates</div></div>
                <div><div className="text-2xl font-bold text-saffron-400">12</div><div className="text-xs text-earth-300">Courses</div></div>
                <div><div className="text-2xl font-bold text-saffron-400">8</div><div className="text-xs text-earth-300">Faculties</div></div>
              </div>
            </div>
          </div>

          <SectionTitle subtitle="Our Courses" title="DNI Academy Programs" center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-parchment rounded-2xl"
              >
                <div className="text-5xl mb-4">{c.icon}</div>
                <h3 className="font-serif font-bold text-earth-800 mb-2 leading-snug">{c.title}</h3>
                <p className="text-earth-400 text-sm mb-1">{c.duration}</p>
                <p className="text-saffron-500 text-xs font-medium">{c.level}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
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

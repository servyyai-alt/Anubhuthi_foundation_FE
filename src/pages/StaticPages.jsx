import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { PageHeader, SectionTitle, LotusDivider, LinkButton } from '../components/common';

// --- About Page ---
export function AboutPage() {
  const team = [
    { name: 'Swami Anubhav', role: 'Founder & Spiritual Director', bio: 'A realized master with 30+ years of Himalayan sadhana and study under the greatest living masters of our time.' },
    { name: 'Dr. Priya Vedanta', role: 'Academic Director, DNI Academy', bio: 'PhD in Indian Philosophy from BHU, with expertise in Advaita Vedanta and Kashmiri Shaivism.' },
    { name: 'Acharya Ramananda', role: 'Retreat Program Director', bio: 'A seasoned guide with 200+ Himalayan pilgrimages and deep connections with local temple lineages.' },
    { name: 'Sheila Krishnamurti', role: 'Community & Outreach Lead', bio: 'Former NGO leader passionate about making spiritual wisdom accessible to all sections of society.' },
  ];

  return (
    <>
      <Helmet><title>About Us — Anubhuthi Foundation</title></Helmet>
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
  return (
    <>
      <Helmet><title>Temple Restoration Mission — Anubhuthi Foundation</title></Helmet>
      <PageHeader title="Temple Restoration Mission" subtitle="Preserving Sacred Heritage" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Temple Restoration' }]} />
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-7xl mb-4">🕌</div>
            <h2 className="font-serif text-4xl font-bold text-earth-800 mb-5">Restoring India's Sacred Soul</h2>
            <p className="text-earth-600 text-lg leading-relaxed max-w-3xl mx-auto">
              Hundreds of ancient temples across the Himalayas lie in states of neglect — crumbling walls, broken idols, discontinued rituals. These are not merely buildings. They are living repositories of consciousness technology, built by enlightened beings to serve as portals of transformation.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { num: '15+', label: 'Temples Restored', icon: '🏛️' },
              { num: '₹50L+', label: 'Funds Mobilized', icon: '💛' },
              { num: '200+', label: 'Volunteers Engaged', icon: '🤝' },
            ].map(item => (
              <div key={item.label} className="text-center p-6 bg-saffron-50 rounded-2xl">
                <div className="text-4xl mb-2">{item.icon}</div>
                <div className="font-serif text-3xl font-bold text-saffron-600 mb-1">{item.num}</div>
                <div className="text-earth-600 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <LinkButton to="/donate?purpose=temple-restoration" variant="primary" size="lg">Support Temple Restoration</LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}

// --- Legal Page ---
export function LegalPage() {
  return (
    <>
      <Helmet><title>Legal & Compliance — Anubhuthi Foundation</title></Helmet>
      <PageHeader title="Legal & Compliance" subtitle="Transparency" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Legal' }]} />
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {[
            { title: 'Registration & Legal Status', content: 'Anubhuthi Foundation is registered as a non-profit charitable trust under the Indian Trusts Act 1882. Registration No: [REG-2015-XXXX]. We are also registered under the Foreign Contribution Regulation Act (FCRA) and are eligible to receive international donations.' },
            { title: '80G Tax Exemption', content: 'All donations to Anubhuthi Foundation are eligible for tax deduction under Section 80G of the Income Tax Act, 1961. Donors will receive official receipts for all contributions above ₹500.' },
            { title: 'Annual Reports & Audits', content: 'Our financial statements are audited annually by independent chartered accountants. Annual reports are available for public inspection and will be provided upon written request.' },
            { title: 'Privacy Policy', content: 'We are committed to protecting your personal information. We collect only the data necessary to serve you and do not sell or share your information with third parties. All payment processing is handled through secure, PCI-compliant payment gateways.' },
            { title: 'Refund Policy', content: 'Program fees are refundable up to 14 days before the program start date, minus a 10% administrative fee. Donations are non-refundable but may be redirected to another cause of your choice upon written request within 30 days.' },
          ].map(section => (
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

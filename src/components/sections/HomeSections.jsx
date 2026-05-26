import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLeaf, FaHeart, FaStar, FaMountain, FaBook, FaUsers, FaHandsHelping, FaOm } from 'react-icons/fa';
import { SectionTitle, LinkButton, Card } from '../common';

// --- About Section ---
export function AboutSection() {
  return (
    <section className="py-24 bg-parchment mandala-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-earth-200">
              <img
                src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80"
                alt="Meditation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-saffron-500 text-white p-6 rounded-2xl shadow-saffron">
              <div className="font-serif text-3xl font-bold">9+</div>
              <div className="text-sm">Years of Service</div>
            </div>
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-warm">
              <FaOm className="text-saffron-500 text-3xl" />
            </div>
          </div>

          {/* Content side */}
          <div>
            <SectionTitle
              subtitle="Who We Are"
              title="A Sacred Space for Inner Transformation"
              description="Anubhuthi Foundation is a spiritual organization dedicated to preserving and sharing the profound wisdom of India's ancient Vedic traditions in a way that speaks to the modern seeker."
            />
            <div className="space-y-4 mb-8">
              {[
                'Rooted in the living tradition of Sanatan Dharma',
                'Programs designed for both beginners and advanced practitioners',
                'Integrated approach combining meditation, yoga, philosophy, and service',
                'Committed to the preservation of Himalayan temples and sacred sites',
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-6 h-6 bg-saffron-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-saffron-500 rounded-full" />
                  </div>
                  <p className="text-earth-600">{item}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <LinkButton to="/about" variant="primary">Our Story</LinkButton>
              <LinkButton to="/philosophy" variant="outline">Our Philosophy</LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Core Values ---
const values = [
  { icon: FaOm, title: 'Sadhana', desc: 'Consistent spiritual practice as the foundation of growth and awakening.', color: 'saffron' },
  { icon: FaLeaf, title: 'Sattva', desc: 'Cultivating purity in mind, body, and action through disciplined living.', color: 'green' },
  { icon: FaHeart, title: 'Seva', desc: 'Selfless service as a path to liberation and community well-being.', color: 'red' },
  { icon: FaStar, title: 'Satya', desc: 'Unwavering commitment to truth in all dimensions of existence.', color: 'gold' },
  { icon: FaBook, title: 'Svadhyaya', desc: 'Self-study through scripture, inquiry, and inner observation.', color: 'blue' },
  { icon: FaUsers, title: 'Sangha', desc: 'The transformative power of community in the spiritual journey.', color: 'purple' },
];

export function CoreValuesSection() {
  const colors = {
    saffron: 'bg-saffron-50 text-saffron-600 border-saffron-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    gold: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
  };
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Our Foundation"
          title="The Six Pillars of Anubhuthi"
          description="Everything we do flows from these core values, each rooted in the ancient wisdom of the Vedic tradition."
          center
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((val, i) => (
            <motion.div key={val.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 h-full">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${colors[val.color]}`}>
                  <val.icon size={20} />
                </div>
                <h3 className="font-serif text-xl font-bold text-earth-800 mb-2">{val.title}</h3>
                <p className="text-earth-500 text-sm leading-relaxed">{val.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Featured Programs ---
const programs = [
  { icon: FaOm, category: 'Meditation', title: 'Advanced Vipassana Retreat', duration: '10 Days', level: 'Intermediate', price: 'Free', desc: 'A deep dive into the ancient practice of insight meditation as taught in the Theravada tradition.' },
  { icon: FaMountain, category: 'Retreat', title: 'Kedarnath Pilgrimage', duration: '7 Days', level: 'All Levels', price: '₹25,000', desc: 'Sacred journey to one of the most powerful Jyotirlingas in the Himalayas with guided spiritual practices.' },
  { icon: FaBook, category: 'Training', title: 'DNI Teacher Training', duration: '6 Months', level: 'Advanced', price: '₹85,000', desc: 'Comprehensive certification program in Vedic philosophy, yoga, and conscious leadership.' },
  { icon: FaHandsHelping, category: 'Workshop', title: 'Pranayama & Sound Healing', duration: '3 Days', level: 'Beginner', price: '₹8,000', desc: 'Explore the transformative power of breath and sacred sound to awaken dormant energies.' },
];

export function FeaturedProgramsSection() {
  return (
    <section className="py-24 bg-parchment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionTitle
            subtitle="Sacred Offerings"
            title="Featured Programs & Trainings"
          />
          <LinkButton to="/programs" variant="outline" size="sm">View All Programs</LinkButton>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog, i) => (
            <motion.div key={prog.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <div className="relative">
                  <div className="h-40 bg-gradient-to-br from-saffron-100 to-earth-100 flex items-center justify-center">
                    <prog.icon className="text-saffron-500 text-5xl" />
                  </div>
                  <span className="absolute top-3 left-3 bg-white text-saffron-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                    {prog.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-serif font-bold text-earth-800 mb-2 leading-snug">{prog.title}</h3>
                  <p className="text-earth-500 text-sm leading-relaxed mb-4 flex-1">{prog.desc}</p>
                  <div className="flex items-center justify-between text-xs text-earth-400 mb-4">
                    <span>⏱ {prog.duration}</span>
                    <span>• {prog.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-saffron-600">{prog.price}</span>
                    <Link to="/programs" className="text-earth-600 hover:text-saffron-600 text-sm font-medium transition-colors">
                      Learn More →
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Why Join Us ---
const reasons = [
  { title: 'Authentic Lineage', desc: 'Our teachings come from an unbroken chain of master-student transmission rooted in the Himalayan tradition.', icon: '🏔️' },
  { title: 'Transformative Community', desc: 'Join a global sangha of dedicated seekers supporting each other on the path.', icon: '🤝' },
  { title: 'Holistic Approach', desc: 'We integrate physical practices, mental training, emotional healing, and spiritual awakening.', icon: '☯️' },
  { title: 'Sacred Locations', desc: 'Our retreats and programs happen in the most powerful spiritual vortexes in India and beyond.', icon: '🕌' },
];

export function WhyJoinUsSection() {
  return (
    <section className="py-24 bg-earth-900 mandala-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-transparent to-amber-950/50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="The Anubhuthi Difference"
          title="Why Join Our Movement"
          description="We are not just another spiritual organization. We are a living ecosystem of transformation."
          center
          light
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <div className="text-5xl mb-4">{r.icon}</div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">{r.title}</h3>
              <p className="text-earth-300 text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12 flex flex-wrap gap-4 justify-center">
          <LinkButton to="/about" variant="primary" size="lg">Discover Our Story</LinkButton>
          <LinkButton to="/programs" variant="white" size="lg">Explore Programs</LinkButton>
        </div>
      </div>
    </section>
  );
}

// --- Testimonials Preview ---
export function TestimonialsPreview({ testimonials = [] }) {
  const defaults = [
    { name: 'Priya Sharma', designation: 'IT Professional', content: 'The 10-day retreat completely transformed my relationship with myself. I came back with clarity I had never experienced before.', rating: 5 },
    { name: 'Arjun Mehta', designation: 'Entrepreneur', content: 'DNI Academy gave me the philosophical framework and meditative tools to lead with consciousness. Truly life-changing.', rating: 5 },
    { name: 'Sunita Rao', designation: 'Teacher', content: 'The Kedarnath pilgrimage with Anubhuthi was not just a trek — it was an initiation into something much deeper.', rating: 5 },
  ];
  const items = testimonials.length ? testimonials : defaults;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="Voices of Transformation" title="What Seekers Say" center />
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {items.slice(0, 3).map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-8 bg-parchment rounded-2xl relative"
            >
              <div className="text-saffron-400 text-5xl font-serif leading-none mb-4">"</div>
              <p className="text-earth-600 italic leading-relaxed mb-6">{t.content}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-saffron-200 rounded-full flex items-center justify-center font-serif font-bold text-saffron-700">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-earth-800 text-sm">{t.name}</div>
                  <div className="text-earth-400 text-xs">{t.designation}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <LinkButton to="/testimonials" variant="outline">Read More Stories</LinkButton>
        </div>
      </div>
    </section>
  );
}

// --- CTA Banner ---
export function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-saffron-600 to-earth-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern opacity-20" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="sanskrit-text text-saffron-200 text-3xl mb-4">ॐ तत् सत्</div>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
          Begin Your Sacred Journey Today
        </h2>
        <p className="text-saffron-100 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Whether you are taking your first step on the spiritual path or deepening an existing practice, Anubhuthi Foundation is here to guide and support you.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <LinkButton to="/programs" variant="white" size="lg">Explore Programs</LinkButton>
          <LinkButton to="/contact" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold">
            Get in Touch
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaMountain, FaCalendar, FaUsers } from 'react-icons/fa';
import { PageHeader, Card, LinkButton, Badge, LoadingPage, EmptyState, SectionTitle } from '../components/common';
import { retreatsAPI } from '../services/api';

const himalayaFacts = [
  { icon: '🏔️', title: 'Sacred Himalayan Routes', desc: 'From Kedarnath to Gangotri, we traverse the most spiritually potent corridors on earth.' },
  { icon: '🌅', title: 'Expert Spiritual Guides', desc: 'Our experienced guides blend yogic knowledge with deep Himalayan expertise.' },
  { icon: '🕌', title: 'Temple Immersions', desc: 'Ritual access to ancient temples not typically open to ordinary tourists.' },
  { icon: '🌿', title: 'Holistic Wellbeing', desc: 'Satvic meals, morning practices, and evening satsangs throughout every retreat.' },
];

export default function RetreatsPage() {
  const [retreats, setRetreats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    retreatsAPI.getAll()
      .then(res => setRetreats(res.data.data || []))
      .catch(() => setRetreats([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Himalayan Retreats — Anubhuthi Foundation</title>
        <meta name="description" content="Sacred retreats in the Himalayas — Kedarnath, Gangotri, Badrinath, and beyond. Transform your inner landscape." />
      </Helmet>

      <PageHeader
        title="Himalayan Sacred Retreats"
        subtitle="Return to the Source"
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Retreats' }]}
      />

      {/* Why Himalaya */}
      <section className="py-16 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="The Himalayas Await" title="Why Retreat in the Sacred Mountains?" center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {himalayaFacts.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-white rounded-2xl shadow-warm"
              >
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-serif font-bold text-earth-800 mb-2">{f.title}</h3>
                <p className="text-earth-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Retreats listing */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Upcoming Journeys" title="Sacred Retreat Programs" />
          {loading ? <LoadingPage /> : retreats.length === 0 ? (
            <EmptyState icon="🏔️" title="Retreat Schedule Coming Soon"
              description="Our upcoming Himalayan retreats are being finalized. Contact us to register interest." />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {retreats.map((retreat, i) => (
                <motion.div key={retreat._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="h-full flex flex-col">
                    <div className="h-52 bg-gradient-to-br from-slate-700 to-earth-800 flex items-center justify-center relative overflow-hidden">
                      <FaMountain className="text-white/20 text-[120px] absolute" />
                      <span className="text-white font-serif text-2xl font-bold relative z-10 text-center px-4">{retreat.title}</span>
                      {retreat.isFeatured && (
                        <div className="absolute top-3 right-3">
                          <Badge color="saffron">Featured</Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-sm text-earth-400 mb-3">
                        <FaMountain size={12} />
                        <span>{retreat.location}</span>
                        <span className="ml-auto capitalize text-earth-500">{retreat.difficulty}</span>
                      </div>
                      <p className="text-earth-500 text-sm leading-relaxed flex-1 mb-4">
                        {retreat.shortDescription || retreat.description?.slice(0, 150)}...
                      </p>
                      <div className="grid grid-cols-3 gap-2 mb-5 text-xs text-center">
                        <div className="bg-earth-50 rounded-lg p-2">
                          <span className="text-earth-400 block">Duration</span>
                          <span className="font-medium text-earth-700">{retreat.duration || 'TBD'}</span>
                        </div>
                        <div className="bg-earth-50 rounded-lg p-2">
                          <span className="text-earth-400 block">Max</span>
                          <span className="font-medium text-earth-700">{retreat.maxParticipants || '∞'}</span>
                        </div>
                        <div className="bg-earth-50 rounded-lg p-2">
                          <span className="text-earth-400 block">From</span>
                          <span className="font-medium text-saffron-600">₹{retreat.price?.toLocaleString() || 'TBD'}</span>
                        </div>
                      </div>
                      <LinkButton to="/contact" variant="primary" className="w-full justify-center">Book Now</LinkButton>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

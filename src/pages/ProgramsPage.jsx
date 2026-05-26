import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { PageHeader, Card, LinkButton, Badge, LoadingPage, EmptyState } from '../components/common';
import { programsAPI } from '../services/api';

const categories = ['all', 'meditation', 'yoga', 'healing', 'training', 'certification', 'workshop', 'retreat'];

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (category !== 'all') params.category = category;
    programsAPI.getAll(params)
      .then(res => setPrograms(res.data.data || []))
      .catch(() => setPrograms([]))
      .finally(() => setLoading(false));
  }, [category]);

  const filtered = programs.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.shortDescription || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Programs & Trainings — Anubhuthi Foundation</title>
        <meta name="description" content="Explore our transformative programs in meditation, yoga, Vedic philosophy, and spiritual training." />
      </Helmet>

      <PageHeader
        title="Programs & Trainings"
        subtitle="Sacred Offerings"
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Programs' }]}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <input
              type="text"
              placeholder="Search programs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 border border-earth-200 rounded-xl outline-none focus:border-saffron-400 text-earth-700"
            />
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                    category === cat ? 'bg-saffron-500 text-white' : 'bg-earth-100 text-earth-600 hover:bg-earth-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? <LoadingPage /> : filtered.length === 0 ? (
            <EmptyState
              icon="🧘"
              title="No Programs Found"
              description="Programs coming soon. Check back or contact us for upcoming offerings."
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((prog, i) => (
                <motion.div key={prog._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="h-full flex flex-col">
                    <div className="h-48 bg-gradient-to-br from-saffron-100 to-earth-100 flex items-center justify-center relative">
                      <span className="text-6xl">🧘</span>
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge color="saffron">{prog.category}</Badge>
                        {prog.isFeatured && <Badge color="earth">Featured</Badge>}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-serif text-xl font-bold text-earth-800 mb-2">{prog.title}</h3>
                      <p className="text-earth-500 text-sm leading-relaxed flex-1 mb-4">
                        {prog.shortDescription || prog.description?.slice(0, 150)}...
                      </p>
                      <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
                        <div className="bg-earth-50 rounded-lg p-2 text-center">
                          <span className="text-earth-400 block text-xs">Duration</span>
                          <span className="font-medium text-earth-700">{prog.duration || 'TBD'}</span>
                        </div>
                        <div className="bg-earth-50 rounded-lg p-2 text-center">
                          <span className="text-earth-400 block text-xs">Level</span>
                          <span className="font-medium text-earth-700 capitalize">{prog.level}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg text-saffron-600">
                          {prog.isFree ? 'Free' : `₹${prog.price?.toLocaleString()}`}
                        </span>
                        <LinkButton to={`/programs/${prog._id}`} variant="outline" size="sm">Learn More</LinkButton>
                      </div>
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

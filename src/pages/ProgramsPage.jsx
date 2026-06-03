import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Badge, Card, EmptyState, LinkButton, LoadingPage, PageHeader } from '../components/common';
import { animationVariants, transitionConfig, useReducedMotion, useIsMobile } from '../utils/animations';
import { programsAPI } from '../services/api';

const categories = ['all', 'meditation', 'yoga', 'healing', 'training', 'certification', 'workshop', 'retreat'];

export default function ProgramsPage() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = {};

    if (category !== 'all') params.category = category;

    programsAPI.getAll(params)
      .then((res) => setPrograms(res.data.data || []))
      .catch(() => setPrograms([]))
      .finally(() => setLoading(false));
  }, [category]);

  const filtered = programs.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.shortDescription || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Programs & Trainings â€” Anubhuthi Foundation</title>
        <meta name="description" content="Explore our transformative programs in meditation, yoga, Vedic philosophy, and spiritual training." />
      </Helmet>

      <PageHeader
        title="Programs & Trainings"
        subtitle="Sacred Offerings"
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Programs' }]}
      />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              placeholder="Search programs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 rounded-xl border border-earth-200 px-4 py-3 text-earth-700 outline-none focus:border-saffron-400"
            />
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
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
              title="No Programs Found"
              description="Programs coming soon. Check back or contact us for upcoming offerings."
            />
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((prog, i) => (
                <motion.div
                  key={prog._id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={prefersReducedMotion || isMobile ? {} : animationVariants.staggerItem}
                  transition={{ ...transitionConfig, delay: i * 0.1 }}
                >
                  <Card className="group flex h-full flex-col overflow-hidden">
                    <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-saffron-100 to-earth-100">
                      {prog.image && (
                        <img
                          src={prog.image}
                          alt={prog.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      )}
                      {prog.image && <div className="absolute inset-0 bg-gradient-to-t from-earth-900/25 to-transparent transition-opacity duration-500 ease-out group-hover:from-earth-900/35" />}
                      {prog.image && <div className="absolute inset-0 bg-earth-900/0 transition-colors duration-500 ease-out group-hover:bg-earth-900/10" />}
                      <div className="pointer-events-none absolute inset-0 rounded-t-2xl border border-saffron-300/0 transition-colors duration-300 ease-out group-hover:border-saffron-300/60" />
                      <div className="absolute left-3 top-3 flex gap-2">
                        <Badge color="saffron">{prog.category}</Badge>
                        {prog.isFeatured && <Badge color="earth">Featured</Badge>}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="mb-2 font-serif text-xl font-bold text-earth-800 transition-transform duration-300 ease-out group-hover:-translate-y-[5px]">{prog.title}</h3>
                      <p className="mb-4 flex-1 text-sm leading-relaxed text-earth-500">
                        {prog.shortDescription || prog.description?.slice(0, 150)}...
                      </p>
                      <div className="mb-5 grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-lg bg-earth-50 p-2 text-center">
                          <span className="block text-xs text-earth-400">Duration</span>
                          <span className="font-medium text-earth-700">{prog.duration || 'TBD'}</span>
                        </div>
                        <div className="rounded-lg bg-earth-50 p-2 text-center">
                          <span className="block text-xs text-earth-400">Level</span>
                          <span className="font-medium capitalize text-earth-700">{prog.level}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-saffron-600">
                          {prog.isFree ? 'Free' : `â‚¹${prog.price?.toLocaleString()}`}
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

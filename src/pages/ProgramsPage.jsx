import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { programsAPI } from '../services/api';
import himalayaImg from '../assets/himalaya.png';

const categories = ['all', 'meditation', 'yoga', 'healing', 'training', 'certification', 'workshop', 'retreat'];

const SkeletonCard = () => (
  <div className="animate-pulse bg-white border border-earth-100 rounded-[16px] overflow-hidden h-[300px] flex flex-col shadow-sm">
    <div className="h-32 bg-earth-100/50 w-full" />
    <div className="p-4 flex-grow flex flex-col justify-between">
      <div>
        <div className="h-3 bg-earth-100/50 w-20 rounded-full mb-2" />
        <div className="h-4 bg-earth-100/50 w-3/4 rounded-full mb-2" />
        <div className="h-3 bg-earth-100/50 w-full rounded-full mb-2" />
        <div className="h-3 bg-earth-100/50 w-5/6 rounded-full mb-2" />
      </div>
      <div className="h-8 bg-earth-100/50 w-full rounded-full" />
    </div>
  </div>
);

const EmptyState = ({ onReset }) => (
  <div className="text-center py-20 flex flex-col items-center max-w-md mx-auto">
    <div className="text-6xl mb-6 select-none opacity-80 text-[#D4A84F]">❈</div>
    <h3 className="font-sans font-bold text-2xl text-earth-800 mb-3 uppercase tracking-wider">No Programs Found</h3>
    <p className="text-earth-500 text-base mb-8 leading-relaxed">
      Try adjusting your search criteria or explore another category of sacred offerings.
    </p>
    <button 
      onClick={onReset}
      className="px-6 py-3 border border-[#D4A84F] text-[#D4A84F] hover:bg-[#D4A84F] hover:text-white rounded-full font-bold tracking-wide uppercase transition-colors duration-300 bg-transparent"
    >
      Reset Filters
    </button>
  </div>
);

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

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
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      (p.shortDescription || '').toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Programs & Trainings — Anubhuthi Foundation</title>
        <meta name="description" content="Explore our transformative programs in meditation, yoga, Vedic philosophy, and spiritual training." />
      </Helmet>

      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-[#D4A84F] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Viewport-Constrained Hero Section - fits in one viewport */}
      <div 
        className="relative z-10 flex min-h-[100svh] items-start justify-center overflow-hidden bg-[#1C2530]"
        style={{
          minHeight: '420px'
        }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${himalayaImg})`,
          }}
        />
        {/* Linear gradient overlay: dark left for readable white text, transparent right for visible mountain */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
        
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 text-center sm:px-6 md:pt-40 md:text-left lg:px-8 lg:pt-48">
          <nav className="text-sm md:text-base text-[#D4A84F] mb-4 tracking-wider uppercase font-semibold flex justify-center md:justify-start items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-xs"> </span>
            <span className="text-white/80">Programs</span>
          </nav>
          
          <p className="text-[#D4A84F] text-xs md:text-base font-bold tracking-[4px] uppercase mb-3"> Sacred Offerings </p>
          <h1 className="font-sans text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" style={{ textShadow: '0 4px 15px rgba(0,0,0,0.6)' }}>
            Programs & Trainings
          </h1>
        </div>
      </div>

      {/* Dynamic Programs List Section - mixed with white and cream for a neat aesthetic */}
      <section className="relative bg-gradient-to-b from-white via-[#FAF9F5] to-white pt-6 pb-16 min-h-screen overflow-hidden z-10">
        
        {/* Soft gold radial glows */}
        <div className="absolute left-1/4 top-1/3 w-[500px] h-[500px] bg-[#D4A84F]/3 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
        <div className="absolute right-1/4 bottom-1/3 w-[500px] h-[500px] bg-[#D4A84F]/3 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Category Filter Section - own dedicated section, contained in one card */}
        <div className="bg-white border border-earth-100 shadow-sm rounded-2xl mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 mb-10">
          <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-5 py-2 text-xs font-bold capitalize transition-all duration-300 shadow-sm border uppercase tracking-wider whitespace-nowrap ${
                  category === cat
                    ? 'bg-gradient-to-r from-[#D4A84F] to-[#F5D07A] text-white border-transparent shadow-[0_4px_12px_rgba(212,168,79,0.25)]'
                    : 'bg-white text-earth-600 border-earth-100 hover:bg-earth-50 hover:text-earth-900'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          

          {/* Program Grid rendering with category change transitions */}
          {loading ? (
            <div 
              className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {[1, 2, 3].map((n) => (
                <SkeletonCard key={n} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState onReset={() => { setSearch(''); setCategory('all'); }} />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
              >
                {filtered.map((prog, i) => (
                  <motion.div
                    key={prog._id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.1 }}
                    className="group relative mx-auto flex h-[300px] w-full max-w-[420px] min-w-0 flex-col overflow-hidden rounded-[16px] border border-earth-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A84F]/30 hover:shadow-[0_12px_30px_rgba(212,168,79,0.08)]"
                  >
                    {/* Card Image Area - Compact (h-32) */}
                    <div className="relative h-32 w-full overflow-hidden">
                      {prog.image ? (
                        <img
                          src={prog.image}
                          alt={prog.title}
                          className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-108"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#D4A84F]/10 to-transparent flex items-center justify-center">
                          <span className="text-[#D4A84F]/30 text-3xl">❈</span>
                        </div>
                      )}
                      
                      {/* Premium Overlay Gradient */}
                      <div 
                        className="absolute inset-0 transition-opacity duration-600 ease-in-out bg-gradient-to-t from-black/65 to-transparent opacity-75 group-hover:opacity-90"
                      />

                      {/* Floating badges */}
                      <div className="absolute left-4 top-4 flex gap-2">
                        <span className="bg-[#D4A84F]/15 text-[#D4A84F] border border-[#D4A84F]/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {prog.category}
                        </span>
                        {prog.isFeatured && (
                          <span className="bg-white/20 text-white border border-white/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Details Area - Compact padding p-4 */}
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <span className="text-[#D4A84F] text-[10px] font-bold uppercase tracking-widest block mb-1">{prog.category}</span>
                        <h3 className="text-earth-800 font-sans text-base font-bold tracking-wide mb-1.5 transition-colors duration-300 group-hover:text-[#D4A84F] line-clamp-1">{prog.title}</h3>
                        <p className="text-earth-600 text-xs leading-relaxed mb-3 line-clamp-2">
                          {prog.shortDescription || (prog.description ? prog.description.slice(0, 90) + '...' : 'Explore this sacred offering to align your journey with evolution.')}
                        </p>
                      </div>

                      {/* Learn More Button */}
                      <div>
                        <Link 
                          to={`/programs/${prog._id}`}
                          className="w-full inline-flex items-center justify-center gap-2 border border-[#D4A84F]/40 text-[#D4A84F] bg-transparent hover:bg-[#D4A84F] hover:text-white transition-all duration-300 py-2 rounded-full font-bold tracking-widest text-[11px] uppercase group/btn shadow-sm hover:shadow-[0_4px_12px_rgba(212,168,79,0.2)]"
                        >
                          <span>Learn More</span>
                          <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1.5">→</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

        </div>
      </section>
    </>
  );
}

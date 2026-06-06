import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaFilePdf, FaHeadphones, FaImages, FaNewspaper, FaPlay, FaTimes } from 'react-icons/fa';
import { Badge, EmptyState, LoadingPage } from '../components/common';
import { Link } from 'react-router-dom';
import { mediaAPI } from '../services/api';
import mediaBg from '../assets/media-publications-bg.png';

const typeIcons = {
  video: FaPlay,
  podcast: FaHeadphones,
  article: FaNewspaper,
  gallery: FaImages,
  document: FaFilePdf,
};

const typeColors = {
  video: 'red',
  podcast: 'blue',
  article: 'earth',
  gallery: 'green',
  document: 'saffron',
};

export default function MediaPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [activeItem, setActiveItem] = useState(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState('');

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    mediaAPI.getAll()
      .then(res => setMedia(res.data.data || []))
      .catch(() => setMedia([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!activeItem) {
      setActiveGalleryImage('');
      return;
    }

    const images = [activeItem.thumbnail, ...(activeItem.gallery || [])].filter(Boolean);
    setActiveGalleryImage(images[0] || '');
  }, [activeItem]);

  const types = ['all', 'video', 'article', 'podcast', 'gallery', 'document'];
  const filtered = filter === 'all' ? media : media.filter((m) => m.type === filter);

  const activeImages = useMemo(() => {
    if (!activeItem) return [];

    return [activeItem.thumbnail, ...(activeItem.gallery || [])]
      .filter(Boolean)
      .filter((src, index, arr) => arr.indexOf(src) === index);
  }, [activeItem]);

  const handleCtaClick = (type) => {
    setFilter(type);
    document.getElementById('media-archive')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Media & Publications — Anubhuthi Foundation</title>
        <meta name="description" content="Videos, articles, podcasts, and publications from Anubhuthi Foundation on spirituality, yoga, and Vedic wisdom." />
      </Helmet>

      {/* Premium Full-Screen Hero Section (100vh) */}
        <div className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#00142D] pt-28 pb-16 z-10 md:pt-32 md:pb-20">
        
        {/* Animated background image with subtle zoom and scroll parallax */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${mediaBg})`,
            y: bgY,
          }}
          animate={{ scale: [1, 1.05] }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Custom content overlay to ensure high readability */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(90deg, rgba(0,20,45,0.92) 0%, rgba(0,20,45,0.65) 50%, rgba(0,20,45,0.30) 100%)'
          }}
        />

        {/* Content Area */}
        <div className="relative z-10 flex h-full w-full max-w-7xl flex-col justify-center px-4 sm:px-8 lg:px-12">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-3xl text-left"
          >
            {/* Breadcrumbs */}
            <nav className="text-sm text-white/50 mb-6 flex items-center gap-2">
              <Link to="/" className="hover:text-[#C58A2B] transition-colors">Home</Link>
              <span className="text-white/30">›</span>
              <span className="text-[#C58A2B]/80 font-medium">Media</span>
            </nav>

            {/* Subtitle / Category Label */}
            <p className="text-[#C58A2B] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-4 flex items-center gap-2">
              <span> </span> Wisdom Library <span> </span>
            </p>

            {/* Main Title */}
            <h1 className="mb-6 font-serif text-4xl font-bold leading-tight tracking-wide text-white drop-shadow-md sm:text-6xl md:text-7xl">
              MEDIA & PUBLICATIONS
            </h1>

            {/* Short Inspirational Description */}
            <p className="text-white/80 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-8 max-w-2xl drop-shadow">
              Preserving, documenting, and sharing ancient wisdom and modern scientific insight. Dive into our curated archive of videos, articles, podcasts, and publications.
            </p>

            {/* Optional CTA Button */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#media-archive"
                className="px-8 py-3.5 bg-gradient-to-r from-[#C58A2B] to-[#A36E1E] text-white rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(197,138,43,0.3)] transition-all duration-300"
              >
                Explore Archive
              </a>
            </div>
          </motion.div>
          
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center p-1">
            <motion.div 
              className="w-1.5 h-1.5 bg-[#C58A2B] rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>

      </div>

      {/* Target anchor to navigate directly to the archive */}
      <div id="media-archive" />

      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setActiveItem(null)}>
          <div
            className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 px-6 py-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <Badge color={typeColors[activeItem.type] || 'earth'}>{activeItem.type}</Badge>
                {activeItem.category && <span className="text-sm text-earth-400">{activeItem.category}</span>}
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
              >
                <FaTimes size={14} />
              </button>
            </div>

            <div className="p-6 md:p-8">
              <h2 className="mb-4 font-serif text-3xl font-bold text-earth-800">{activeItem.title}</h2>

              {activeItem.type === 'video' && activeItem.url ? (
                <div className="mb-6 aspect-video overflow-hidden rounded-3xl bg-black">
                  <iframe src={activeItem.url} className="h-full w-full" allowFullScreen title={activeItem.title} />
                </div>
              ) : activeGalleryImage ? (
                <div className="mb-6 overflow-hidden rounded-3xl bg-earth-100">
                  <img src={activeGalleryImage} alt={activeItem.title} className="h-64 w-full object-cover sm:h-80 lg:h-[28rem]" />
                </div>
              ) : null}

              {activeImages.length > 1 && (
                <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {activeImages.map((src, index) => (
                    <button
                      key={`${src}-${index}`}
                      type="button"
                      onClick={() => setActiveGalleryImage(src)}
                      className={`overflow-hidden rounded-2xl border ${activeGalleryImage === src ? 'border-saffron-500' : 'border-gray-100'}`}
                    >
                      <img src={src} alt={`${activeItem.title} ${index + 1}`} className="h-24 w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {activeItem.description && (
                <p className="mb-6 text-base leading-8 text-earth-600">{activeItem.description}</p>
              )}

              <div className="flex flex-wrap gap-3 text-sm">
                {activeItem.url && activeItem.url !== '#' && activeItem.type !== 'video' && (
                  <a
                    href={activeItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-saffron-500 px-5 py-3 font-medium text-white transition-colors hover:bg-saffron-600"
                  >
                    Open Resource
                  </a>
                )}
                {activeItem.publishDate && (
                  <span className="rounded-full bg-earth-100 px-4 py-3 text-earth-500">
                    Published {new Date(activeItem.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-wrap gap-2 sm:gap-3">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium capitalize transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  filter === t 
                    ? 'bg-gradient-to-r from-[#C58A2B] to-[#A36E1E] text-white shadow-[0_0_15px_rgba(197,138,43,0.5)]' 
                    : 'bg-white border border-gray-200 text-earth-600 hover:border-[#C58A2B] hover:text-[#C58A2B]'
                }`}
              >
                {t !== 'all' && (() => {
                  const Icon = typeIcons[t];
                  return <Icon size={12} />;
                })()}
                {t}
              </button>
            ))}
          </div>

          {loading ? <LoadingPage /> : filtered.length === 0 ? (
            <EmptyState  title="No Content Yet" description="We are building our media library. Check back soon!" />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {filtered.map((item, i) => {
                const Icon = typeIcons[item.type] || FaNewspaper;
                const imageSrc = item.thumbnail || item.gallery?.[0];
                const mediaCount = item.gallery?.length || 0;

                return (
                  <motion.div key={item._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <button
                      type="button"
                      onClick={() => setActiveItem(item)}
                      className="group h-full w-full overflow-hidden rounded-3xl bg-white text-left shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-400 hover:-translate-y-2 border border-transparent hover:border-[#C58A2B]/30"
                    >
                      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-earth-100 to-saffron-50">
                        {imageSrc ? (
                          <img src={imageSrc} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        ) : (
                          <Icon className="text-6xl text-earth-300" />
                        )}
                        {imageSrc && <div className="absolute inset-0 bg-earth-900/20" />}
                        {item.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-saffron-500/90 shadow-saffron">
                              <FaPlay className="ml-1 text-white" size={16} />
                            </div>
                          </div>
                        )}
                        <div className="absolute left-3 top-3 flex items-center gap-2">
                          <Badge color={typeColors[item.type] || 'earth'}>{item.type}</Badge>
                          {mediaCount > 0 && (
                            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-earth-600">
                              {mediaCount} image{mediaCount > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex h-full flex-col p-5">
                        <h3 className="mb-2 font-serif font-bold leading-snug text-earth-800">{item.title}</h3>
                        {item.description && (
                          <p className="flex-1 text-sm leading-relaxed text-earth-500">
                            {item.description.length > 140 ? `${item.description.slice(0, 140)}...` : item.description}
                          </p>
                        )}
                        <div className="mt-4 text-sm font-medium text-saffron-600">
                          View details →
                        </div>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 1: FEATURED CONTENT HIGHLIGHTS */}
      <section className="bg-earth-50 py-20 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-earth-800 mb-4">Featured Insights</h2>
            <p className="text-lg text-earth-600">Explore our most impactful knowledge resources.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { cat: 'Human Evolution', title: 'The Path of Inner Transformation', desc: 'Discover the ancient methods of elevating your consciousness.', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80' },
              { cat: 'Conscious Living', title: 'Awakening to the Present Moment', desc: 'Practical wisdom for bringing mindfulness into everyday life.', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80' },
              { cat: 'Natural Intelligence', title: 'Learning from the Earth', desc: 'How aligning with natural rhythms unlocks our true potential.', img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80' },
              { cat: 'Meditation & Mindfulness', title: 'Deep States of Awareness', desc: 'Advanced practices for navigating the inner landscape.', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative h-[320px] overflow-hidden rounded-3xl cursor-pointer sm:h-[400px]"
              >
                <div className="absolute inset-0 bg-black/40 z-10 transition-colors duration-500 group-hover:bg-black/20" />
                <div className="absolute inset-0 z-0 bg-black">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" />
                </div>
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end border-2 border-transparent group-hover:border-[#C58A2B]/50 transition-all duration-500 rounded-3xl">
                  <span className="inline-block px-3 py-1 bg-[#C58A2B] text-white text-xs font-semibold rounded-full mb-4 w-max">{item.cat}</span>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/80 mb-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="flex items-center justify-center py-8 bg-earth-50">
        <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#C58A2B]"></div>
        <svg className="w-6 h-6 mx-4 text-[#C58A2B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#C58A2B]"></div>
      </div>

      {/* SECTION 2: MEDIA BY CATEGORY */}
      <section className="bg-earth-50 py-12 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-earth-800">Explore By Topic</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {[
              { title: 'Human Awareness', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
              { title: 'Conscious Relationships', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
              { title: 'Meditation', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' },
              { title: 'Natural Intelligence', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
              { title: 'Emotional Growth', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
              { title: 'Purpose Driven Living', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
            ].map((topic, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group flex cursor-pointer flex-col items-center rounded-3xl border border-earth-100 bg-white p-6 text-center shadow-sm transition-colors duration-500 hover:border-[#07284A] hover:bg-[#07284A] hover:shadow-xl sm:p-8"
              >
                <div className="w-16 h-16 rounded-full bg-earth-50 group-hover:bg-[#07284A] flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 border border-[#C58A2B]/30 group-hover:border-[#C58A2B]">
                  <svg className="w-8 h-8 text-[#C58A2B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={topic.icon} /></svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-earth-800 group-hover:text-white transition-colors duration-500">{topic.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PODCAST & INTERVIEW HIGHLIGHT */}
      <section className="bg-white py-12 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-earth-800">Featured Podcast & Interviews</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="relative h-[320px] overflow-hidden rounded-3xl group shadow-lg sm:h-[400px]"
            >
              <div className="absolute inset-0 bg-black/40 z-10 transition-colors group-hover:bg-black/20"></div>
              <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80" alt="Podcast" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-6 border border-white/40 cursor-pointer hover:bg-[#C58A2B] hover:border-[#C58A2B] transition-colors duration-300">
                  <FaPlay className="text-white ml-1" size={20} />
                </div>
                <h3 className="text-3xl font-serif font-bold text-white mb-2">The Architecture of Stillness</h3>
                <p className="text-white/80 mb-6 max-w-md">Ep 24. Exploring the space between thoughts with Master Yogi.</p>
              </div>
            </motion.div>
            <div className="flex flex-col justify-center space-y-6">
              {[
                { ep: 'Ep 23', title: 'Science of Sound', desc: 'How mantras alter brainwave states.' },
                { ep: 'Ep 22', title: 'Diet and Consciousness', desc: 'The subtle energy of the food we consume.' },
                { ep: 'Ep 21', title: 'Healing Trauma', desc: 'Vedic perspectives on emotional processing.' },
              ].map((interview, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="flex items-center gap-6 p-4 rounded-2xl hover:bg-earth-50 transition-colors group cursor-pointer border border-transparent hover:border-earth-200"
                >
                  <div className="w-14 h-14 bg-[#07284A] text-white rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#C58A2B] transition-all duration-300 shadow-lg">
                    <FaPlay size={14} className="ml-1" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#C58A2B] mb-1 block">{interview.ep}</span>
                    <h4 className="font-serif text-xl font-bold text-earth-800 group-hover:text-[#07284A] transition-colors">{interview.title}</h4>
                    <p className="text-earth-500 text-sm mt-1">{interview.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: RESOURCE LIBRARY CTA */}
      <section className="bg-[#07284A] py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Continue Your Learning Journey</h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">Discover resources designed to support awareness, conscious growth, and human evolution.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => handleCtaClick('article')} className="px-8 py-4 bg-[#C58A2B] text-white rounded-full font-semibold hover:-translate-y-1 hover:shadow-lg hover:bg-[#A36E1E] transition-all duration-300">Explore Articles</button>
            <button onClick={() => handleCtaClick('video')} className="px-8 py-4 bg-transparent border-2 border-[#C58A2B] text-[#C58A2B] rounded-full font-semibold hover:-translate-y-1 hover:bg-[#C58A2B] hover:text-white transition-all duration-300">Watch Videos</button>
            <button onClick={() => handleCtaClick('podcast')} className="px-8 py-4 bg-white/10 text-white backdrop-blur rounded-full font-semibold hover:-translate-y-1 hover:bg-white hover:text-[#07284A] transition-all duration-300">Listen to Podcasts</button>
          </div>
        </div>
      </section>
    </>
  );
}

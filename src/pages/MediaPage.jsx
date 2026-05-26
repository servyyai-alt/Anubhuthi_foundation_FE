import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaPlay, FaHeadphones, FaNewspaper, FaImages, FaFilePdf } from 'react-icons/fa';
import { PageHeader, Badge, LoadingPage, EmptyState, SectionTitle } from '../components/common';
import { mediaAPI } from '../services/api';

const typeIcons = { video: FaPlay, podcast: FaHeadphones, article: FaNewspaper, gallery: FaImages, document: FaFilePdf };
const typeColors = { video: 'red', podcast: 'blue', article: 'earth', gallery: 'green', document: 'saffron' };

const sampleMedia = [
  { _id: '1', type: 'video', title: 'Introduction to Vipassana Meditation', description: 'A comprehensive guide to beginning your Vipassana practice with authentic techniques.', url: 'https://www.youtube.com/embed/inpok4MKVLM', thumbnail: null },
  { _id: '2', type: 'article', title: 'The Science of Pranayama', description: 'How ancient breathwork practices align with modern neuroscience and psychophysiology.', url: '#' },
  { _id: '3', type: 'podcast', title: 'Conversations on Consciousness Ep. 12', description: 'Deep dive into non-dual awareness with a Himalayan master.', url: '#' },
  { _id: '4', type: 'video', title: 'Kedarnath Yatra 2023 — Sacred Journey', description: 'Experience the spiritual magnificence of the Kedarnath pilgrimage through our lens.', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: null },
  { _id: '5', type: 'article', title: 'Why Ancient Temples Are Sacred Science', description: 'Exploring the precise geometry, energy fields, and consciousness technology embedded in India\'s ancient temples.', url: '#' },
  { _id: '6', type: 'podcast', title: 'Guru-Shishya Tradition in Modern Times', description: 'How the ancient teacher-student relationship remains the most potent vehicle for transformation.', url: '#' },
];

export default function MediaPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    mediaAPI.getAll()
      .then(res => {
        const data = res.data.data || [];
        setMedia(data.length ? data : sampleMedia);
      })
      .catch(() => setMedia(sampleMedia))
      .finally(() => setLoading(false));
  }, []);

  const types = ['all', 'video', 'article', 'podcast', 'gallery', 'document'];
  const filtered = filter === 'all' ? media : media.filter(m => m.type === filter);

  return (
    <>
      <Helmet>
        <title>Media & Publications — Anubhuthi Foundation</title>
        <meta name="description" content="Videos, articles, podcasts, and publications from Anubhuthi Foundation on spirituality, yoga, and Vedic wisdom." />
      </Helmet>

      <PageHeader title="Media & Publications" subtitle="Wisdom Library" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Media' }]} />

      {/* Video player modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setActiveVideo(null)}>
          <div className="w-full max-w-4xl aspect-video" onClick={e => e.stopPropagation()}>
            <iframe src={activeVideo} className="w-full h-full rounded-xl" allowFullScreen title="Video" />
            <button onClick={() => setActiveVideo(null)} className="mt-4 text-white text-sm underline block mx-auto">Close</button>
          </div>
        </div>
      )}

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Type filter */}
          <div className="flex flex-wrap gap-3 mb-10">
            {types.map(t => (
              <button key={t} onClick={() => setFilter(t)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                  filter === t ? 'bg-saffron-500 text-white' : 'bg-earth-100 text-earth-600 hover:bg-earth-200'
                }`}
              >
                {t !== 'all' && (() => { const Icon = typeIcons[t]; return <Icon size={12} />; })()}
                {t}
              </button>
            ))}
          </div>

          {loading ? <LoadingPage /> : filtered.length === 0 ? (
            <EmptyState icon="📚" title="No Content Yet" description="We are building our media library. Check back soon!" />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((item, i) => {
                const Icon = typeIcons[item.type] || FaNewspaper;
                const isVideo = item.type === 'video';
                return (
                  <motion.div key={item._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <div className="bg-white rounded-2xl shadow-warm overflow-hidden card-hover h-full flex flex-col">
                      {/* Thumbnail */}
                      <div className="relative h-44 bg-gradient-to-br from-earth-100 to-saffron-50 flex items-center justify-center cursor-pointer"
                        onClick={() => isVideo && item.url && setActiveVideo(item.url)}
                      >
                        <Icon className="text-earth-300 text-6xl" />
                        {isVideo && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 bg-saffron-500/90 rounded-full flex items-center justify-center shadow-saffron">
                              <FaPlay className="text-white ml-1" size={16} />
                            </div>
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <Badge color={typeColors[item.type] || 'earth'}>{item.type}</Badge>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-serif font-bold text-earth-800 mb-2 leading-snug">{item.title}</h3>
                        {item.description && (
                          <p className="text-earth-500 text-sm leading-relaxed flex-1">{item.description}</p>
                        )}
                        {item.url && item.url !== '#' && !isVideo && (
                          <a href={item.url} target="_blank" rel="noopener noreferrer"
                            className="mt-4 text-saffron-600 text-sm font-medium hover:underline"
                          >
                            {item.type === 'podcast' ? 'Listen Now →' : item.type === 'article' ? 'Read Article →' : 'Open →'}
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

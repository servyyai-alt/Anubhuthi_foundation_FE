import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaFilePdf, FaHeadphones, FaImages, FaNewspaper, FaPlay, FaTimes } from 'react-icons/fa';
import { Badge, EmptyState, LoadingPage, PageHeader } from '../components/common';
import { mediaAPI } from '../services/api';

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

const sampleMedia = [
  { _id: '1', type: 'video', title: 'Introduction to Vipassana Meditation', description: 'A comprehensive guide to beginning your Vipassana practice with authentic techniques.', url: 'https://www.youtube.com/embed/inpok4MKVLM', thumbnail: null, gallery: [] },
  { _id: '2', type: 'article', title: 'The Science of Pranayama', description: 'How ancient breathwork practices align with modern neuroscience and psychophysiology.', url: '#', gallery: [] },
  { _id: '3', type: 'podcast', title: 'Conversations on Consciousness Ep. 12', description: 'Deep dive into non-dual awareness with a Himalayan master.', url: '#', gallery: [] },
  { _id: '4', type: 'video', title: 'Kedarnath Yatra 2023 — Sacred Journey', description: 'Experience the spiritual magnificence of the Kedarnath pilgrimage through our lens.', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: null, gallery: [] },
  { _id: '5', type: 'article', title: 'Why Ancient Temples Are Sacred Science', description: 'Exploring the precise geometry, energy fields, and consciousness technology embedded in India\'s ancient temples.', url: '#', gallery: [] },
  { _id: '6', type: 'podcast', title: 'Guru-Shishya Tradition in Modern Times', description: 'How the ancient teacher-student relationship remains the most potent vehicle for transformation.', url: '#', gallery: [] },
];

export default function MediaPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [activeItem, setActiveItem] = useState(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState('');

  useEffect(() => {
    mediaAPI.getAll()
      .then((res) => {
        const data = res.data.data || [];
        setMedia(data.length ? data : sampleMedia);
      })
      .catch(() => setMedia(sampleMedia))
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

  return (
    <>
      <Helmet>
        <title>Media & Publications — Anubhuthi Foundation</title>
        <meta name="description" content="Videos, articles, podcasts, and publications from Anubhuthi Foundation on spirituality, yoga, and Vedic wisdom." />
      </Helmet>

      <PageHeader title="Media & Publications" subtitle="Wisdom Library" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Media' }]} />

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
                  <img src={activeGalleryImage} alt={activeItem.title} className="h-[28rem] w-full object-cover" />
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
          <div className="mb-10 flex flex-wrap gap-3">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  filter === t ? 'bg-saffron-500 text-white' : 'bg-earth-100 text-earth-600 hover:bg-earth-200'
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
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, i) => {
                const Icon = typeIcons[item.type] || FaNewspaper;
                const imageSrc = item.thumbnail || item.gallery?.[0];
                const mediaCount = item.gallery?.length || 0;

                return (
                  <motion.div key={item._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <button
                      type="button"
                      onClick={() => setActiveItem(item)}
                      className="h-full w-full overflow-hidden rounded-2xl bg-white text-left shadow-warm transition-transform card-hover"
                    >
                      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-earth-100 to-saffron-50">
                        {imageSrc ? (
                          <img src={imageSrc} alt={item.title} className="h-full w-full object-cover" />
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
    </>
  );
}

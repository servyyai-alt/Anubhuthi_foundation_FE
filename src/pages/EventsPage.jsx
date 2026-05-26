import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FaCalendar, FaMapMarkerAlt, FaVideo, FaClock, FaUsers } from 'react-icons/fa';
import { PageHeader, Card, LinkButton, Badge, LoadingPage, EmptyState, SectionTitle } from '../components/common';
import { eventsAPI } from '../services/api';

const typeColors = { satsang: 'saffron', workshop: 'blue', seminar: 'earth', retreat: 'green', ceremony: 'red', online: 'blue', other: 'earth' };

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); // list | upcoming
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    eventsAPI.getAll()
      .then(res => setEvents(res.data.data || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const types = ['all', 'satsang', 'workshop', 'seminar', 'retreat', 'online', 'ceremony'];
  const filtered = filter === 'all' ? events : events.filter(e => e.type === filter);

  // Group by month
  const grouped = filtered.reduce((acc, event) => {
    const month = event.startDate ? format(new Date(event.startDate), 'MMMM yyyy') : 'TBD';
    if (!acc[month]) acc[month] = [];
    acc[month].push(event);
    return acc;
  }, {});

  return (
    <>
      <Helmet>
        <title>Events & Calendar — Anubhuthi Foundation</title>
        <meta name="description" content="Upcoming events, satsangs, workshops, and ceremonies at Anubhuthi Foundation." />
      </Helmet>

      <PageHeader title="Events & Calendar" subtitle="Sacred Gatherings" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Events' }]} />

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-10">
            {types.map(t => (
              <button key={t} onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                  filter === t ? 'bg-saffron-500 text-white' : 'bg-earth-100 text-earth-600 hover:bg-earth-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {loading ? <LoadingPage /> : filtered.length === 0 ? (
            <EmptyState icon="📅" title="No Events Scheduled" description="Check back soon for upcoming events and gatherings." />
          ) : (
            <div className="space-y-12">
              {Object.entries(grouped).map(([month, monthEvents]) => (
                <div key={month}>
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="font-serif text-2xl font-bold text-earth-800">{month}</h2>
                    <div className="flex-1 h-px bg-earth-100" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {monthEvents.map((event, i) => (
                      <motion.div key={event._id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                        <Card className="p-5 h-full flex gap-4">
                          {/* Date block */}
                          <div className="flex-shrink-0 text-center bg-saffron-50 rounded-xl px-3 py-2 min-w-14">
                            {event.startDate ? (
                              <>
                                <div className="text-saffron-600 text-xs font-bold uppercase">{format(new Date(event.startDate), 'MMM')}</div>
                                <div className="font-serif text-2xl font-bold text-earth-800">{format(new Date(event.startDate), 'd')}</div>
                              </>
                            ) : (
                              <div className="font-serif text-sm text-earth-400">TBD</div>
                            )}
                          </div>
                          {/* Info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="font-serif font-bold text-earth-800 leading-snug">{event.title}</h3>
                              <Badge color={typeColors[event.type] || 'earth'}>{event.type}</Badge>
                            </div>
                            {event.shortDescription && (
                              <p className="text-earth-500 text-sm mb-3 leading-relaxed">{event.shortDescription}</p>
                            )}
                            <div className="flex flex-wrap gap-3 text-xs text-earth-400">
                              {event.time && <span className="flex items-center gap-1"><FaClock size={10} />{event.time}</span>}
                              {event.isOnline ? (
                                <span className="flex items-center gap-1 text-blue-500"><FaVideo size={10} />Online</span>
                              ) : event.location && (
                                <span className="flex items-center gap-1"><FaMapMarkerAlt size={10} />{event.location}</span>
                              )}
                              {event.maxParticipants && <span className="flex items-center gap-1"><FaUsers size={10} />Max {event.maxParticipants}</span>}
                              <span className={event.isFree ? 'text-green-600 font-medium' : 'text-saffron-600 font-medium'}>
                                {event.isFree ? 'Free' : `₹${event.price?.toLocaleString()}`}
                              </span>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

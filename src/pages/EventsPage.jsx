import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FaCalendar, FaMapMarkerAlt, FaVideo, FaClock, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Card, Badge, LoadingPage, EmptyState } from '../components/common';
import { eventsAPI } from '../services/api';

const typeColors = { satsang: 'saffron', workshop: 'blue', seminar: 'earth', retreat: 'green', ceremony: 'red', online: 'blue', other: 'earth' };

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
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

      {/* Page Header with Load Animations and Parallax Micro-interaction */}
      <div className="pt-28 pb-16 bg-parchment mandala-bg overflow-hidden relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10 pointer-events-none"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          <motion.nav 
            className="text-sm text-earth-400 mb-4 flex items-center"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
          >
            <Link to="/" className="hover:text-saffron-500 transition-colors duration-300 relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-0 after:bg-saffron-500 hover:after:w-full after:transition-all after:duration-300">Home</Link>
            <span className="mx-2">›</span>
            <span>Events</span>
          </motion.nav>
          
          <motion.p 
            className="text-saffron-500 text-sm font-semibold tracking-widest uppercase mb-3"
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          >
            ✦ Sacred Gatherings ✦
          </motion.p>
          
          <motion.h1 
            className="font-serif text-4xl md:text-5xl font-bold text-earth-800"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
          >
            Events & Calendar
          </motion.h1>
        </motion.div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <motion.div 
            className="flex flex-wrap gap-3 mb-10"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.08 } }
            }}
          >
            {types.map(t => (
              <motion.button key={t} onClick={() => setFilter(t)}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-[250ms] hover:-translate-y-[3px] hover:shadow-md hover:brightness-105 ${
                  filter === t ? 'bg-saffron-500 text-white shadow-[0_0_15px_rgba(217,119,6,0.4)]' : 'bg-earth-100 text-earth-600 hover:bg-earth-200'
                }`}
              >
                {t}
              </motion.button>
            ))}
          </motion.div>

          {loading ? <LoadingPage /> : filtered.length === 0 ? (
            <EmptyState icon="📅" title="No Events Scheduled" description="Check back soon for upcoming events and gatherings." />
          ) : (
            <div className="space-y-12">
              {Object.entries(grouped).map(([month, monthEvents]) => (
                <motion.div 
                  key={month}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
                  }}
                >
                  {/* Month Heading & Divider Line Animation */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.h2 
                      className="font-serif text-2xl font-bold text-earth-800 shrink-0"
                      variants={{
                        hidden: { opacity: 0, x: -30 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                      }}
                    >
                      {month}
                    </motion.h2>
                    <div className="flex-1 overflow-hidden">
                      <motion.div 
                        className="h-px bg-earth-200 origin-left" 
                        variants={{
                          hidden: { scaleX: 0 },
                          visible: { scaleX: 1, transition: { duration: 1, ease: "easeOut" } }
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {monthEvents.map((event, i) => (
                      <motion.div
                        key={event._id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={{
                          hidden: { opacity: 0, y: 40 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: "easeOut" } }
                        }}
                      >
                        <Card className="group relative p-5 h-full flex gap-4 transition-all duration-[350ms] ease-out hover:-translate-y-[6px] hover:scale-[1.01] hover:shadow-[0_8px_30px_rgb(217,119,6/0.1)] border border-transparent hover:border-saffron-200" hover={false}>
                          {/* Date block */}
                          <div className="flex-shrink-0 text-center bg-saffron-50 rounded-xl px-3 py-2 min-w-[3.5rem] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(217,119,6,0.2)] group-hover:bg-saffron-100">
                            {event.startDate ? (
                              <>
                                <div className="text-saffron-600 group-hover:text-saffron-700 transition-colors duration-300 text-xs font-bold uppercase">{format(new Date(event.startDate), 'MMM')}</div>
                                <div className="font-serif text-2xl font-bold text-earth-800">{format(new Date(event.startDate), 'd')}</div>
                              </>
                            ) : (
                              <div className="font-serif text-sm text-earth-400">TBD</div>
                            )}
                          </div>
                          
                          {/* Info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              {/* Event Title */}
                              <h3 className="font-serif font-bold text-earth-800 leading-snug group-hover:text-saffron-600 transition-colors duration-300">
                                <span className="relative inline-block bg-gradient-to-r from-saffron-500 to-saffron-500 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-[background-size] duration-300 pb-[1px]">
                                  {event.title}
                                </span>
                              </h3>
                              {/* Category Badge */}
                              <div className="transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_10px_rgba(217,119,6,0.3)] rounded-full shrink-0">
                                <Badge color={typeColors[event.type] || 'earth'}>{event.type}</Badge>
                              </div>
                            </div>
                            
                            {event.shortDescription && (
                              <p className="text-earth-500 text-sm mb-3 leading-relaxed">{event.shortDescription}</p>
                            )}
                            
                            {/* Event Details Micro Interactions */}
                            <div className="flex flex-wrap gap-3 text-xs text-earth-400">
                              {event.time && (
                                <span className="flex items-center gap-1 group/detail hover:text-earth-600 transition-colors cursor-default">
                                  <FaClock size={10} className="group-hover/detail:scale-125 group-hover/detail:text-saffron-500 transition-all duration-300" />
                                  {event.time}
                                </span>
                              )}
                              
                              {event.isOnline ? (
                                <span className="flex items-center gap-1 text-blue-500 group/detail hover:text-blue-600 transition-colors cursor-default">
                                  <FaVideo size={10} className="group-hover/detail:scale-125 transition-transform duration-300" />
                                  Online
                                </span>
                              ) : event.location && (
                                <span className="flex items-center gap-1 group/detail hover:text-earth-600 transition-colors cursor-default">
                                  <FaMapMarkerAlt size={10} className="group-hover/detail:scale-125 group-hover/detail:text-saffron-500 transition-all duration-300" />
                                  {event.location}
                                </span>
                              )}
                              
                              {event.maxParticipants && (
                                <span className="flex items-center gap-1">
                                  <FaUsers size={10} />
                                  Max {event.maxParticipants}
                                </span>
                              )}
                              
                              <span className={`px-2 py-1 -mx-2 rounded transition-all duration-300 hover:bg-saffron-50 hover:text-saffron-700 ${event.isFree ? 'text-green-600 font-medium' : 'text-saffron-600 font-medium'}`}>
                                {event.isFree ? 'Free' : `₹${event.price?.toLocaleString()}`}
                              </span>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

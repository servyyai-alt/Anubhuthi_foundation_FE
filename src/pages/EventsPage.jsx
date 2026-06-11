import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { format, isAfter, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, startOfDay } from 'date-fns';
import { FaCalendar, FaMapMarkerAlt, FaVideo, FaClock, FaUsers, FaChevronDown, FaArrowRight, FaStar, FaCalendarAlt, FaListUl, FaRupeeSign, FaCheckCircle, FaSearchPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { eventsAPI } from '../services/api';
import { useReducedMotion, useIsMobile } from '../utils/animations';
import featuredBgImage from '../assets/featured_event_bg.png';

/* ──────────────────────────────────────────────────────────────────
   COLOR THEME — matches site theme (#D4A84F gold, #F5D07A light gold)
   ────────────────────────────────────────────────────────────────── */
const GOLD = '#D4A84F';
const GOLD_LIGHT = '#F5D07A';
const NAVY = '#1C2530';

const typeColors = {
  satsang: { bg: 'from-amber-100 to-amber-200', text: 'text-amber-700', border: 'border-amber-300', ring: 'ring-amber-400' },
  workshop: { bg: 'from-sky-100 to-sky-200', text: 'text-sky-700', border: 'border-sky-300', ring: 'ring-sky-400' },
  seminar: { bg: 'from-stone-100 to-stone-200', text: 'text-stone-700', border: 'border-stone-300', ring: 'ring-stone-400' },
  retreat: { bg: 'from-emerald-100 to-emerald-200', text: 'text-emerald-700', border: 'border-emerald-300', ring: 'ring-emerald-400' },
  ceremony: { bg: 'from-rose-100 to-rose-200', text: 'text-rose-700', border: 'border-rose-300', ring: 'ring-rose-400' },
  online: { bg: 'from-indigo-100 to-indigo-200', text: 'text-indigo-700', border: 'border-indigo-300', ring: 'ring-indigo-400' },
  other: { bg: 'from-stone-100 to-stone-200', text: 'text-stone-700', border: 'border-stone-300', ring: 'ring-stone-400' },
};

/* ──────────────────────────────────────────────────────────────────
   FLOATING GOLD PARTICLES BACKGROUND
   ────────────────────────────────────────────────────────────────── */
function FloatingGoldParticles({ count = 22 }) {
  const particles = useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 18 + 14,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.18 + 0.06,
      drift: (Math.random() - 0.5) * 80,
    })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {particles.map(p => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, ${GOLD_LIGHT} 0%, ${GOLD} 70%, transparent 100%)`,
            filter: 'blur(0.4px)',
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -120, 0, 80, 0],
            x: [0, p.drift, 0, -p.drift / 2, 0],
            opacity: [p.opacity, p.opacity * 1.6, p.opacity, p.opacity * 0.6, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   USE COUNTDOWN HOOK
   ────────────────────────────────────────────────────────────────── */
function useCountdown(targetDate) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!targetDate) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return useMemo(() => {
    if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0, started: false, total: 0 };
    const target = new Date(targetDate).getTime();
    const diff = target - now;
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, started: true, total: 0 };
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds, started: false, total: diff };
  }, [targetDate, now]);
}

/* ──────────────────────────────────────────────────────────────────
   COUNTDOWN BLOCK
   ────────────────────────────────────────────────────────────────── */
function CountdownBlock({ event }) {
  const target = event?.startDate ? new Date(event.startDate) : null;
  const { days, hours, minutes, seconds, started } = useCountdown(target);

  if (!event) return null;

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <div className="w-full">
      <p className="text-[10px] md:text-xs font-bold tracking-[4px] uppercase mb-3 text-center" style={{ color: GOLD_LIGHT }}> {started ? 'Event Started' : 'Starts In'} </p>
      {started ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-4 px-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
        >
          <FaCheckCircle className="inline-block text-2xl mb-2" style={{ color: GOLD_LIGHT }} />
          <p className="font-serif text-2xl md:text-3xl font-bold text-white">Event Started</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:gap-3">
          {units.map((u, i) => (
            <motion.div
              key={u.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              className="relative rounded-xl md:rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 p-2 md:p-3 text-center overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{ background: `radial-gradient(circle at 50% 0%, ${GOLD_LIGHT} 0%, transparent 70%)` }}
              />
              <div className="relative font-serif text-2xl md:text-4xl font-bold text-white tabular-nums">
                {String(u.value).padStart(2, '0')}
              </div>
              <div className="relative text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-white/70 mt-1">
                {u.label}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   FEATURED UPCOMING EVENT BANNER
   ────────────────────────────────────────────────────────────────── */
function FeaturedEventBanner({ event }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 14,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 14,
    });
  }, []);

  if (!event) return null;

  const dateLabel = event.startDate ? format(new Date(event.startDate), 'EEEE, MMMM d, yyyy') : 'Date TBD';
  const color = typeColors[event.type] || typeColors.other;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14"
    >
        <div
          className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl group sm:h-[460px] md:h-[400px]"
        onMouseMove={handleMouseMove}
        style={{ background: NAVY }}
      >
        {/* Background image with parallax + zoom */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
          style={{
            backgroundImage: `url(${event.image || featuredBgImage})`,
            transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.05)`,
            backgroundColor: event.image ? 'transparent' : NAVY,
          }}
        >
          {!event.image && (
            <div className="absolute inset-0 opacity-40 bg-black/30" />
          )}
        </motion.div>

        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

        {/* Featured badge top-left */}
        <div className="absolute top-5 left-5 md:top-6 md:left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
          <FaStar style={{ color: GOLD_LIGHT }} className="text-xs animate-pulse" />
          <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-white">Featured Event</span>
        </div>

        {/* Gold accent vertical line on right edge */}
        <div
          className="hidden md:block absolute top-10 bottom-10 right-10 w-px"
          style={{ background: `linear-gradient(to bottom, transparent, ${GOLD} 30%, ${GOLD} 70%, transparent)` }}
        />

        <div className="relative z-10 h-full flex flex-col md:flex-row items-stretch">
          {/* LEFT: content */}
          <div className="flex-1 p-6 md:p-10 flex flex-col justify-end md:justify-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${color.border} ${color.text} bg-white/85 mb-4`}>
                {event.type}
              </span>
              <h2 className="mb-3 font-serif text-2xl font-bold leading-tight md:text-4xl lg:text-5xl break-words" style={{ textShadow: '0 2px 14px rgba(0,0,0,0.5)' }}>
                {event.title}
              </h2>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/85 mb-4">
                <span className="flex items-center gap-1.5">
                  <FaCalendar size={12} style={{ color: GOLD_LIGHT }} />
                  {dateLabel}
                </span>
                {event.time && (
                  <span className="flex items-center gap-1.5">
                    <FaClock size={12} style={{ color: GOLD_LIGHT }} />
                    {event.time}
                  </span>
                )}
                {event.isOnline ? (
                  <span className="flex items-center gap-1.5">
                    <FaVideo size={12} style={{ color: GOLD_LIGHT }} />
                    Online Event
                  </span>
                ) : event.location ? (
                  <span className="flex items-center gap-1.5">
                    <FaMapMarkerAlt size={12} style={{ color: GOLD_LIGHT }} />
                    {event.location}
                  </span>
                ) : null}
              </div>
              {event.shortDescription && (
                <p className="text-white/80 text-sm md:text-base max-w-xl leading-relaxed mb-5 line-clamp-2 md:line-clamp-3">
                  {event.shortDescription}
                </p>
              )}

            </motion.div>
          </div>

          {/* RIGHT: countdown panel */}
          <div className="w-full md:w-[320px] lg:w-[360px] p-5 md:p-8 md:border-l border-white/10 flex flex-col justify-center">
            <CountdownBlock event={event} />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   CATEGORY FILTER PILLS
   ────────────────────────────────────────────────────────────────── */
function CategoryFilterPills({ types, value, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {types.map(t => {
        const active = value === t;
        const color = typeColors[t] || typeColors.other;
        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
              active
                ? `${color.bg} ${color.text} border-transparent shadow-sm scale-105`
                : 'bg-white text-earth-600 border-earth-200 hover:border-earth-300 hover:bg-earth-50'
            }`}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   VIEW TOGGLE
   ────────────────────────────────────────────────────────────────── */
function ViewToggle({ view, onChange }) {
  const options = [
    { id: 'timeline', label: 'Timeline', icon: FaListUl },
    { id: 'calendar', label: 'Calendar', icon: FaCalendarAlt },
  ];
  return (
    <div className="inline-flex p-1 rounded-full bg-white border border-earth-200 shadow-sm relative overflow-hidden">
      {options.map(o => {
        const Icon = o.icon;
        const active = view === o.id;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-300 z-10 ${
              active ? 'text-white' : 'text-earth-600 hover:text-earth-800'
            }`}
          >
            {active && (
              <motion.div
                layoutId="activeToggleBg"
                className="absolute inset-0 rounded-full -z-10 shadow-md"
                style={{ 
                  background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                  boxShadow: '0 4px 12px rgba(212,168,79,0.3)'
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              />
            )}
            <Icon className="text-xs" />
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* ───────────-/* ──────────────────────────────────────────────────────────────────
   TIMELINE NODE
   ────────────────────────────────────────────────────────────────── */
function TimelineNode({ event, isFirst, isActive, isHovered, onHover, onLeave, expanded }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });
  const isMobile = useIsMobile();

  return (
    <div
      ref={ref}
      className="relative shrink-0 w-5 md:w-6 flex flex-col items-center"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Outer pulse ring (active event) */}
      {isActive && !isMobile && (
        <motion.div
          className="absolute rounded-full"
          style={{ background: GOLD, width: 26, height: 26, top: -2 }}
          animate={{ scale: [1, 1.7, 1], opacity: [0.55, 0, 0.55] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      {/* Glowing ring on viewport entry */}
      <motion.div
        className="absolute rounded-full"
        style={{ background: `radial-gradient(circle, ${GOLD_LIGHT} 0%, transparent 70%)` }}
        animate={{
          scale: inView || isHovered || expanded ? [1, 1.6, 1] : 1,
          opacity: inView || isHovered || expanded ? [0.5, 0, 0.5] : 0.2,
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      {/* Solid node */}
      <motion.div
        className="relative rounded-full border-2 border-white"
        style={{
          width: isHovered || expanded ? 20 : 16,
          height: isHovered || expanded ? 20 : 16,
          background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
          boxShadow: inView || isHovered || expanded
            ? `0 0 ${isHovered || expanded ? 25 : 15}px rgba(212,168,79,0.85)`
            : `0 0 6px rgba(212,168,79,0.3)`,
        }}
        animate={{ scale: inView ? 1 : 0.6, opacity: inView ? 1 : 0.4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   EVENT CARD (used inside timeline)
   ────────────────────────────────────────────────────────────────── */
function EventCard({ event, index, isActive, isHovered, onHover, onLeave, expanded, onToggleExpand }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const isMobile = useIsMobile();
  const color = typeColors[event.type] || typeColors.other;

  const [showImageModal, setShowImageModal] = useState(false);

  const entryDelay = isMobile ? 0 : Math.min(index, 6) * 0.1;
  const isFreeEvent = event.isFree === true || event.isFree === 'true';

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: entryDelay, ease: 'easeOut' }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        whileHover={isMobile ? {} : { 
          y: -6,
          boxShadow: '0 20px 40px rgba(2, 27, 58, 0.2)'
        }}
        className="group/card relative flex-1"
      >
        <div
          onClick={(e) => {
            if (event.image) {
              e.stopPropagation();
              setShowImageModal(true);
            }
          }}
          className={`relative rounded-2xl transition-all duration-400 overflow-hidden flex flex-col md:justify-end bg-[#010D1E] cursor-pointer min-h-[auto] md:min-h-[420px] ${
            isHovered 
              ? 'shadow-[0_20px_50px_rgba(212,168,79,0.3)] ring-2 ring-[#D4A84F] ring-offset-2 ring-offset-white' 
              : 'shadow-lg ring-1 ring-[#010D1E]/10'
          }`}
        >
          {/* Image Container */}
          {event.image ? (
            <div 
              className="relative w-full h-64 md:absolute md:inset-0 md:h-full cursor-pointer overflow-hidden group/img shrink-0 bg-[#021B3A]"
              onClick={(e) => {
                e.stopPropagation();
                setShowImageModal(true);
              }}
            >
              <img 
                src={event.image} 
                alt={event.title} 
                className="absolute inset-0 w-full h-full object-cover object-center md:object-cover transition-transform duration-700 group-hover/img:scale-105" 
              />
              
              {/* Click to view overlay */}
              <div className="absolute inset-0 bg-[#010D1E]/0 group-hover/img:bg-[#010D1E]/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover/img:opacity-100 md:opacity-0 pointer-events-none">
                 <div className="flex items-center gap-2 bg-[#010D1E]/80 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-xl border border-white/20 transform translate-y-4 group-hover/img:translate-y-0 transition-all duration-300">
                   <FaSearchPlus size={14} /> View Image
                 </div>
              </div>

              {/* Mobile bottom gradient to blend into content */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#010D1E] via-[#010D1E]/80 to-transparent md:hidden pointer-events-none" />
            </div>
          ) : (
            <div className="relative w-full h-48 md:absolute md:inset-0 md:h-full bg-gradient-to-br from-[#021B3A] to-[#151C24] shrink-0" />
          )}

          {/* Desktop Gradient Overlay (covers whole card) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#010D1E] via-[#010D1E]/70 to-transparent opacity-90 transition-opacity duration-500 group-hover/card:opacity-95 hidden md:block pointer-events-none" />

          {/* Content Overlaid on Image (Desktop) or Below Image (Mobile) */}
          <div className="relative z-10 flex flex-col p-5 sm:p-6 w-full gap-4 mt-auto md:bg-transparent bg-[#010D1E] md:bg-none">
            
            {/* Top Row: Date & Badge */}
            <div className="flex flex-row items-start justify-between gap-3 w-full">
              {event.startDate ? (
                <motion.div
                  animate={{
                    scale: isHovered && !isMobile ? 1.05 : 1,
                    boxShadow: isHovered && !isMobile ? '0 0 20px rgba(212, 168, 79, 0.4)' : '0 4px 10px rgba(0,0,0,0.3)'
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 text-center rounded-xl px-3 py-2 min-w-[4rem] bg-gradient-to-br from-[#D4A84F] to-[#B3872E] text-[#010D1E] shadow-md border border-white/20 z-20 md:transform-none -mt-12 md:mt-0"
                >
                  <div className="text-xs font-bold uppercase text-[#010D1E]/80">
                    {format(new Date(event.startDate), 'MMM')}
                  </div>
                  {event.endDate && !isSameDay(new Date(event.startDate), new Date(event.endDate)) ? (
                      <div className="py-1 font-serif text-base font-bold leading-none text-[#010D1E] sm:text-lg">
                      {format(new Date(event.startDate), 'd')}-{format(new Date(event.endDate), 'd')}
                    </div>
                  ) : (
                      <div className="font-serif text-2xl font-bold leading-none text-[#010D1E] sm:text-3xl">
                      {format(new Date(event.startDate), 'd')}
                    </div>
                  )}
                  <div className="text-[10px] text-[#010D1E]/70 mt-1 font-semibold uppercase tracking-wider">
                    {format(new Date(event.startDate), 'EEE')}
                  </div>
                </motion.div>
              ) : (
                <div className="flex-shrink-0 text-center bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 min-w-[4.5rem] self-start border border-white/20 z-20 md:transform-none -mt-12 md:mt-0">
                  <div className="font-serif text-sm text-white/80">TBD</div>
                </div>
              )}

              <div className="flex flex-col items-end gap-2 ml-auto text-right z-20 md:transform-none -mt-8 md:mt-0">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20 text-white backdrop-blur-md bg-[#010D1E]/50 md:bg-white/10 inline-block shadow-sm">
                  {event.type}
                </span>
                {event.isFeatured && (
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#D4A84F] text-[#010D1E] text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(212,168,79,0.5)]">
                    <FaStar className="text-[9px]" /> Featured
                  </div>
                )}
              </div>
            </div>

            {/* Main Info */}
            <div className="min-w-0 mt-2 md:mt-1">
              <h3 className="font-serif text-xl font-bold leading-snug text-white transition-colors duration-300 md:text-2xl break-words drop-shadow-md"
                style={isHovered && !isMobile ? { color: '#f6e1b1' } : {}}
              >
                {event.title}
              </h3>

              {(event.shortDescription || event.description) && (
                <p className="mt-2 mb-4 break-words text-white/80 text-sm leading-relaxed line-clamp-2">
                {event.shortDescription || (event.description ? String(event.description).slice(0, 140) + '...' : '')}
              </p>
              )}

              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/90">
                {event.time && (
                  <span className="flex items-center gap-1.5">
                    <FaClock size={11} style={{ color: '#D4A84F' }} />
                    {event.time}
                  </span>
                )}
                {event.isOnline ? (
                  <span className="flex items-center gap-1.5 text-blue-300">
                    <FaVideo size={11} />
                    Online
                  </span>
                ) : event.location ? (
                  <span className="flex items-center gap-1.5">
                    <FaMapMarkerAlt size={11} style={{ color: '#D4A84F' }} />
                    {event.location}
                  </span>
                ) : null}
                {event.maxParticipants && (
                  <span className="flex items-center gap-1.5">
                    <FaUsers size={11} />
                    Max {event.maxParticipants}
                  </span>
                )}
                <span className="flex items-center gap-1 font-bold">
                  {isFreeEvent ? 'Free' : (
                    <>
                      <FaRupeeSign size={11} />
                      {event.price?.toLocaleString?.() ?? event.price}
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>



        </div>
      </motion.div>

      {/* Lightbox / Image Modal */}
      {createPortal(
        <AnimatePresence>
          {showImageModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowImageModal(false);
              }}
              className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-8 bg-[#010D1E]/95 backdrop-blur-lg"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowImageModal(false);
                }}
                className="absolute top-6 right-6 sm:top-8 sm:right-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 shadow-lg z-[100000]"
              >
                <span className="text-3xl leading-none -mt-1">×</span>
              </button>
              <motion.img
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={event.image}
                alt={event.title}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl relative z-[99999]"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
/* ──────────────────────────────────────────────────────────────────
   TIMELINE MONTH SECTION (Animate vertical line on scroll)
   ────────────────────────────────────────────────────────────────── */
function TimelineMonthSection({ month, monthEvents, mIdx, hoveredId, setHoveredId, expanded, toggleExpand, isMobile, prefersReducedMotion }) {
  const sectionRef = useRef(null);
  
  // Track scroll progress of this specific month section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Animate line from 0 to 1 as it scrolls through viewport
  const scaleY = useTransform(scrollYProgress, [0.1, 0.75], [0, 1]);
  
  // Detect if section is currently active in view
  const inView = useInView(sectionRef, { once: false, amount: isMobile ? 0.1 : 0.25 });

  return (
    <div ref={sectionRef} className="mb-14 last:mb-0">
      {/* Month heading */}
      <div className="flex items-center gap-4 mb-7 overflow-hidden">
        <motion.div
          animate={{
            scale: inView ? 1.05 : 1,
            boxShadow: inView ? '0 10px 25px rgba(212, 168, 79, 0.3)' : '0 2px 4px rgba(0,0,0,0.02)',
            borderColor: inView ? GOLD : 'rgba(212, 168, 79, 0.2)'
          }}
          transition={{ duration: 0.4 }}
          className="shrink-0 px-4 py-1.5 rounded-full text-white font-serif font-bold uppercase tracking-widest text-xs border"
          style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)` }}
        >
          {month}
        </motion.div>
        
        {/* Shimmer line */}
        <div className="flex-1 h-px relative bg-earth-200/50 overflow-hidden">
          {inView && (
            <motion.div
              initial={{ left: '-100%' }}
              animate={{ left: '100%' }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-[#F5D07A] to-transparent"
            />
          )}
        </div>
        
        <motion.div 
          animate={{ opacity: inView ? 1 : 0.4 }}
          className="shrink-0 text-[10px] text-earth-400 font-bold uppercase tracking-widest"
        >
          {monthEvents.length} {monthEvents.length === 1 ? 'Event' : 'Events'}
        </motion.div>
      </div>

      {/* Timeline list */}
      <div className="relative pl-6 md:pl-10">
        {/* Background base line */}
        <div
          className="absolute left-2 md:left-3 top-3 bottom-3 w-0.5 bg-earth-200/40 rounded"
        />
        {/* Vertical gold timeline line (fills downward) */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute left-2 md:left-3 top-3 bottom-3 w-0.5 origin-top rounded"
            style={{ 
              background: `linear-gradient(to bottom, ${GOLD}, ${GOLD_LIGHT}, ${GOLD})`,
              scaleY,
              boxShadow: '0 0 10px rgba(212, 168, 79, 0.4)'
            }}
          />
        )}

        <div className="space-y-6">
          {monthEvents.map((event, i) => {
            const isFirst = mIdx === 0 && i === 0;
            const isActive = isAfter(new Date(event.startDate), new Date()) && (isFirst || i === 0);
            const isHovered = hoveredId === event._id;
            const isExpanded = expanded.has(event._id);
            return (
              <div key={event._id} className="relative flex items-start gap-4 md:gap-5">
                <TimelineNode
                  event={event}
                  isFirst={isFirst}
                  isActive={isActive}
                  isHovered={isHovered}
                  expanded={isExpanded}
                  onHover={() => setHoveredId(event._id)}
                  onLeave={() => setHoveredId(null)}
                />
                <EventCard
                  event={event}
                  index={i}
                  isActive={isActive}
                  isHovered={isHovered}
                  onHover={() => setHoveredId(event._id)}
                  onLeave={() => setHoveredId(null)}
                  expanded={isExpanded}
                  onToggleExpand={() => toggleExpand(event._id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   TIMELINE VIEW
   ────────────────────────────────────────────────────────────────── */
function TimelineView({ grouped, hoveredId, setHoveredId, expanded, toggleExpand, isMobile, prefersReducedMotion }) {
  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {Object.entries(grouped).map(([month, monthEvents], mIdx) => (
        <TimelineMonthSection
          key={month}
          month={month}
          monthEvents={monthEvents}
          mIdx={mIdx}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
          expanded={expanded}
          toggleExpand={toggleExpand}
          isMobile={isMobile}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   CALENDAR VIEW
   ────────────────────────────────────────────────────────────────── */
function CalendarView({ events, expanded, toggleExpand }) {
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()));
  const isMobile = useIsMobile();
  const monthStart = startOfMonth(cursor);
  const monthEnd = endOfMonth(cursor);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const firstWeekday = monthStart.getDay();
  const eventsByDay = useMemo(() => {
    const m = new Map();
    events.forEach(e => {
      if (!e.startDate) return;
      const d = startOfDay(new Date(e.startDate));
      if (!m.has(d.getTime())) m.set(d.getTime(), []);
      m.get(d.getTime()).push(e);
    });
    return m;
  }, [events]);

  const monthLabel = format(cursor, 'MMMM yyyy');
  const today = startOfDay(new Date());

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-lg border border-earth-100 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-earth-100" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2A3441 100%)` }}>
          <button
            onClick={() => setCursor(c => addMonths(c, -1))}
            className="text-white/80 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors px-3 py-1 rounded-full hover:bg-white/10"
          >
            ← Prev
          </button>
          <h3 className="font-serif text-xl md:text-2xl font-bold text-white">
            {monthLabel}
          </h3>
          <button
            onClick={() => setCursor(c => addMonths(c, 1))}
            className="text-white/80 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors px-3 py-1 rounded-full hover:bg-white/10"
          >
            Next →
          </button>
        </div>

        <div className="overflow-x-auto">
          {/* Weekday labels */}
          <div className="grid min-w-[560px] grid-cols-7 border-b border-earth-100 bg-earth-50/50">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="p-2 text-center text-[10px] font-bold uppercase tracking-widest text-earth-500">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid min-w-[560px] grid-cols-7">
            {Array.from({ length: firstWeekday }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[90px] md:min-h-[110px] border-b border-r border-earth-100 bg-earth-50/30" />
            ))}
            {days.map((day, i) => {
            const dayEvents = eventsByDay.get(day.getTime()) || [];
            const isToday = isSameDay(day, today);
            const isCurrentMonth = isSameMonth(day, cursor);
            return (
              <motion.div
                key={day.toISOString()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: Math.min(i, 30) * 0.005 }}
                whileHover={isMobile ? {} : { 
                  scale: 1.03,
                  zIndex: 10,
                  boxShadow: '0 10px 20px rgba(2, 27, 58, 0.06)',
                  borderColor: GOLD
                }}
                className={`relative min-h-[90px] md:min-h-[110px] p-1.5 border-b border-r border-earth-100 transition-all duration-200 cursor-pointer ${isCurrentMonth ? 'bg-white' : 'bg-earth-50/40'} ${isToday ? 'ring-2 ring-inset' : ''}`}
                style={isToday ? { '--tw-ring-color': GOLD } : {}}
              >
                <div className={`text-xs font-bold mb-1 ${isToday ? 'text-white inline-block px-2 py-0.5 rounded-full' : 'text-earth-600'}`}
                  style={isToday ? { background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)` } : {}}
                >
                  {format(day, 'd')}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map(ev => {
                    const color = typeColors[ev.type] || typeColors.other;
                    return (
                      <button
                        key={ev._id}
                        onClick={() => toggleExpand(ev._id)}
                        className={`w-full text-left px-1.5 py-0.5 rounded text-[10px] font-bold truncate transition-all duration-200 flex items-center ${color.bg} ${color.text} hover:scale-[1.02]`}
                        title={ev.title}
                      >
                        {/* Pulsing indicator dot */}
                        <span className="inline-flex relative mr-1 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          <span className="absolute inset-0 rounded-full bg-current animate-ping opacity-75" />
                        </span>
                        <span className="truncate">{ev.title}</span>
                      </button>
                    );
                  })}
                  
                </div>
              </motion.div>
            );
            })}
          </div>
        </div>
      </motion.div>

      {/* Expanded events list below calendar */}
      {expanded.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 space-y-4"
        >
          <h4 className="font-serif text-xl font-bold text-earth-800">Event Details</h4>
          {Array.from(expanded).map(id => {
            const ev = events.find(e => e._id === id);
            if (!ev) return null;
            const color = typeColors[ev.type] || typeColors.other;
            return (
              <div key={id} className="bg-white rounded-2xl border border-earth-100 shadow-sm p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h5 className="font-serif text-lg font-bold text-earth-800">{ev.title}</h5>
                    <div className="text-xs text-earth-500 mt-1">
                      {ev.startDate ? format(new Date(ev.startDate), 'EEEE, MMMM d, yyyy') : 'Date TBD'}
                      {ev.time && ` · ${ev.time}`}
                    </div>
                  </div>
                  <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${color.border} ${color.text} bg-white`}>
                    {ev.type}
                  </span>
                </div>
                {ev.description && (
                  <p className="text-sm text-earth-600 leading-relaxed mb-2">{ev.description}</p>
                )}
                <div className="flex flex-wrap gap-3 text-xs text-earth-500">
                  {ev.isOnline ? (
                    <span className="flex items-center gap-1"><FaVideo size={10} /> Online</span>
                  ) : ev.location ? (
                    <span className="flex items-center gap-1"><FaMapMarkerAlt size={10} /> {ev.location}</span>
                  ) : null}
                  <span className={ev.isFree ? 'text-emerald-600 font-bold' : ''} style={!ev.isFree ? { color: GOLD } : {}}>
                    {ev.isFree ? 'Free' : `₹${ev.price?.toLocaleString?.() ?? ev.price}`}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SKELETON LOADER
   ────────────────────────────────────────────────────────────────── */
function EventsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {[1, 2, 3, 4].map(n => (
        <div key={n} className="animate-pulse bg-white rounded-2xl border border-earth-100 p-5 flex gap-4">
          <div className="w-20 h-20 rounded-xl bg-earth-100" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-earth-100 rounded w-1/3" />
            <div className="h-3 bg-earth-100 rounded w-full" />
            <div className="h-3 bg-earth-100 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   EMPTY STATE
   ────────────────────────────────────────────────────────────────── */
function EventsEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="text-center py-20 flex flex-col items-center max-w-md mx-auto"
    >
      <div className="text-6xl mb-6 select-none animate-bounce" style={{ color: GOLD_LIGHT }}>📅</div>
      <h3 className="font-serif font-bold text-2xl text-earth-800 mb-3 uppercase tracking-wider">No Events Available</h3>
      <p className="text-earth-500 text-base leading-relaxed">Check back soon for upcoming events and sacred gatherings.</p>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────────────────────────── */
export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('timeline');
  const [hoveredId, setHoveredId] = useState(null);
  const [expanded, setExpanded] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);

  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    eventsAPI.getAll()
      .then(res => setEvents(res.data.data || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) setScrollProgress((window.scrollY / totalHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const types = useMemo(
    () => ['all', 'satsang', 'workshop', 'seminar', 'retreat', 'online', 'ceremony'],
    []
  );

  const filtered = useMemo(() => {
    const activeEvents = events.filter(e => e.isActive !== false);
    if (filter === 'all') return activeEvents;
    return activeEvents.filter(e => {
      if (filter === 'online') {
        return e.type === 'online' || e.isOnline === true;
      }
      return e.type === filter;
    });
  }, [events, filter]);

  // Group by month dynamically
  const grouped = useMemo(() => {
    return filtered.reduce((acc, event) => {
      const month = event.startDate ? format(new Date(event.startDate), 'MMMM yyyy') : 'TBD';
      if (!acc[month]) acc[month] = [];
      acc[month].push(event);
      return acc;
    }, {});
  }, [filtered]);

  // Featured = nearest upcoming event specifically marked as 'featured' by admin
  const featuredEvent = useMemo(() => {
    return filtered.find(e => e.isFeatured === true) || null;
  }, [filtered]);

  const toggleExpand = useCallback((id) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Events & Calendar — Anubhuthi Foundation</title>
        <meta name="description" content="Upcoming events, satsangs, workshops, and ceremonies at Anubhuthi Foundation." />
      </Helmet>

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%`, background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})` }}
      />

      {/* Hero */}
      <motion.div 
        className="relative pt-28 pb-14 overflow-hidden" 
        style={{ 
          background: `linear-gradient(135deg, ${NAVY} 0%, #2A3441 50%, #151C24 100%)`,
          backgroundSize: '400% 400%'
        }}
        animate={prefersReducedMotion ? {} : {
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <FloatingGoldParticles count={18} />
        {/* Subtle gold radial glow accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${GOLD} 0%, transparent 70%)`, filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-15" style={{ background: `radial-gradient(circle, ${GOLD_LIGHT} 0%, transparent 70%)`, filter: 'blur(60px)' }} />
        </div>
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.nav
            className="text-sm text-white/50 mb-4 flex items-center"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
          >
            <Link to="/" className="hover:text-white transition-colors duration-300">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white/80">Events</span>
          </motion.nav>
          <motion.p
            className="text-xs font-bold tracking-[4px] uppercase mb-3"
            style={{ color: GOLD_LIGHT }}
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
          > Sacred Gatherings </motion.p>
          <motion.h1
            className="font-serif text-4xl md:text-5xl font-bold text-white"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
          >
            Events & Calendar
          </motion.h1>
        </motion.div>
      </motion.div>

      {/* Main content */}
      <section className="relative pb-20 bg-gradient-to-b from-white via-[#FAF9F5] to-white overflow-hidden">
        <div className="relative z-10 pt-10">
          {/* Featured Event Banner — auto-selected nearest upcoming */}
          {!loading && featuredEvent && <FeaturedEventBanner event={featuredEvent} />}

          {/* Controls: filters + view toggle */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <CategoryFilterPills types={types} value={filter} onChange={setFilter} />
              <ViewToggle view={view} onChange={setView} />
            </div>
          </div>

          {loading ? (
            <EventsSkeleton />
          ) : filtered.length === 0 ? (
            <EventsEmptyState />
          ) : (
            <AnimatePresence mode="wait">
              {view === 'timeline' ? (
                <motion.div
                  key={`timeline-${filter}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <TimelineView
                    grouped={grouped}
                    hoveredId={hoveredId}
                    setHoveredId={setHoveredId}
                    expanded={expanded}
                    toggleExpand={toggleExpand}
                    isMobile={isMobile}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={`calendar-${filter}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <CalendarView events={filtered} expanded={expanded} toggleExpand={toggleExpand} />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>
    </>
  );
}

const fs = require('fs');

const replacement = `function EventCard({ event, index, isActive, isHovered, onHover, onLeave, expanded, onToggleExpand }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const isMobile = useIsMobile();
  const color = typeColors[event.type] || typeColors.other;

  const entryDelay = isMobile ? 0 : Math.min(index, 6) * 0.1;
  const isFreeEvent = event.isFree === true || event.isFree === 'true';

  return (
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
        className={\`relative rounded-2xl transition-all duration-400 overflow-hidden flex flex-col justify-end min-h-[420px] \${
          isHovered || expanded 
            ? 'shadow-[0_20px_50px_rgba(212,168,79,0.3)] ring-2 ring-[#D4A84F] ring-offset-2 ring-offset-white' 
            : 'shadow-lg ring-1 ring-[#010D1E]/10'
        }\`}
      >
        {event.image ? (
          <img 
            src={event.image} 
            alt={event.title} 
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover/card:scale-[1.03]" 
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#021B3A] to-[#151C24]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#010D1E] via-[#010D1E]/70 to-transparent opacity-90 transition-opacity duration-500 group-hover/card:opacity-95" />

        <div className="relative z-10 flex flex-col p-5 sm:p-6 w-full gap-4 mt-auto">
          
          <div className="flex flex-row items-start justify-between gap-3 w-full">
            {event.startDate ? (
              <motion.div
                animate={{
                  scale: isHovered ? 1.05 : 1,
                  boxShadow: isHovered ? '0 0 20px rgba(212, 168, 79, 0.4)' : '0 4px 10px rgba(0,0,0,0.3)'
                }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 text-center rounded-xl px-3 py-2 min-w-[4rem] bg-gradient-to-br from-[#D4A84F] to-[#B3872E] text-[#010D1E] shadow-md border border-white/20"
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
              <div className="flex-shrink-0 text-center bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 min-w-[4.5rem] self-start border border-white/20">
                <div className="font-serif text-sm text-white/80">TBD</div>
              </div>
            )}

            <div className="flex flex-col items-end gap-2 ml-auto text-right">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20 text-white backdrop-blur-md bg-white/10 inline-block">
                {event.type}
              </span>
              {event.isFeatured && (
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#D4A84F] text-[#010D1E] text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(212,168,79,0.5)]">
                  <FaStar className="text-[9px]" /> Featured
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0 mt-1">
            <h3 className="font-serif text-xl font-bold leading-snug text-white transition-colors duration-300 md:text-2xl break-words drop-shadow-md"
              style={isHovered ? { color: '#f6e1b1' } : {}}
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

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative z-20 overflow-hidden bg-[#010D1E]/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="p-6 space-y-4">
                {event.description && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#D4A84F' }}>
                      About
                    </p>
                    <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">
                      {event.description}
                    </p>
                  </div>
                )}

                {event.venue && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#D4A84F' }}>Venue</p>
                    <p className="text-sm text-white/80 flex items-start gap-2">
                      <FaMapMarkerAlt className="mt-0.5 shrink-0" size={12} style={{ color: '#D4A84F' }} />
                      {event.venue}
                    </p>
                  </div>
                )}

                {event.schedule && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#D4A84F' }}>Schedule</p>
                    <p className="text-sm text-white/80 flex items-start gap-2">
                      <FaClock className="mt-0.5 shrink-0" size={12} style={{ color: '#D4A84F' }} />
                      {event.schedule}
                    </p>
                  </div>
                )}

                {event.registrationDetails && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#D4A84F' }}>Registration</p>
                    <p className="text-sm text-white/80 flex items-start gap-2">
                      <FaCheckCircle className="mt-0.5 shrink-0" size={12} style={{ color: '#D4A84F' }} />
                      {event.registrationDetails}
                    </p>
                  </div>
                )}

                {event.additionalInfo && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#D4A84F' }}>Additional Information</p>
                    <p className="text-sm text-white/80 leading-relaxed">{event.additionalInfo}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-20 w-full bg-[#010D1E]/95 backdrop-blur-md border-t border-white/10 px-6 py-3 flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
            className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4A84F] hover:text-[#f6e1b1] transition-colors focus:outline-none"
          >
            {expanded ? 'Hide Details' : 'View Full Details'}
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronDown size={10} />
            </motion.div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
\n`;

try {
  let content = fs.readFileSync('c:/anubhudhi foundation/Anubhuthi_foundation_FE/src/pages/EventsPage.jsx', 'binary');
  
  const startStr = 'function EventCard({ event, index, isActive, isHovered, onHover, onLeave, expanded, onToggleExpand }) {';
  const endStr = 'function TimelineView({';
  
  const startIndex = content.indexOf(startStr);
  const endIndex = content.indexOf(endStr);
  
  if (startIndex !== -1 && endIndex !== -1) {
    const newContent = content.substring(0, startIndex) + replacement + content.substring(endIndex);
    fs.writeFileSync('c:/anubhudhi foundation/Anubhuthi_foundation_FE/src/pages/EventsPage.jsx', newContent, 'utf8');
    console.log('Successfully fixed EventsPage.jsx');
  } else {
    console.log('Could not find EventCard or TimelineView markers in EventsPage.jsx');
  }
} catch (e) {
  console.error('Error fixing file:', e);
}

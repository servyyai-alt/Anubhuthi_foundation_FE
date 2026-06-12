const fs = require('fs');

const replacement = `function EventCard({ event, index, isActive, isHovered, onHover, onLeave }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const isMobile = useIsMobile();
  const color = typeColors[event.type] || typeColors.other;

  const [showImageModal, setShowImageModal] = useState(false);

  const entryDelay = isMobile ? 0 : Math.min(index, 6) * 0.1;
  const isFreeEvent = event.isFree === true || event.isFree === 'true';

  const modalContent = (
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
          style={{ zIndex: 99999 }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowImageModal(false);
            }}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 shadow-lg z-10"
          >
            <span className="text-2xl leading-none -mt-1">×</span>
          </button>
          <motion.img
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            src={event.image}
            alt={event.title}
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

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
          onClick={() => setShowImageModal(true)}
          className={\`relative rounded-2xl transition-all duration-400 overflow-hidden flex flex-col md:justify-end bg-[#010D1E] cursor-pointer min-h-[auto] md:min-h-[420px] \${
            isHovered 
              ? 'shadow-[0_20px_50px_rgba(212,168,79,0.3)] ring-2 ring-[#D4A84F] ring-offset-2 ring-offset-white' 
              : 'shadow-lg ring-1 ring-[#010D1E]/10'
          }\`}
        >
          {/* Image Container */}
          {event.image ? (
            <div 
              className="relative w-full h-64 md:absolute md:inset-0 md:h-full overflow-hidden group/img shrink-0 bg-[#021B3A]"
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
      {typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent}
    </>
  );
}
`;

try {
  let content = fs.readFileSync('c:/anubhudhi foundation/Anubhuthi_foundation_FE/src/pages/EventsPage.jsx', 'utf8');
  
  // Update imports for createPortal if missing
  if (!content.includes('createPortal')) {
    if (content.includes('import React, {')) {
      content = content.replace("import React, {", "import { createPortal } from 'react-dom';\\nimport React, {");
    } else {
      content = "import { createPortal } from 'react-dom';\\n" + content;
    }
  }

  const startStr = 'function EventCard({ event, index, isActive, isHovered, onHover, onLeave';
  const endStrSearch = 'TIMELINE MONTH SECTION';
  
  const startIndex = content.indexOf(startStr);
  let endIndex = content.indexOf(endStrSearch);
  
  if (endIndex !== -1) {
    // walk backward to find the start of the comment block
    const commentStart = content.lastIndexOf('/* ──', endIndex);
    if (commentStart !== -1) {
      endIndex = commentStart;
    }
  }
  
  if (startIndex !== -1 && endIndex !== -1) {
    const newContent = content.substring(0, startIndex) + replacement + "\\n\\n" + content.substring(endIndex);
    fs.writeFileSync('c:/anubhudhi foundation/Anubhuthi_foundation_FE/src/pages/EventsPage.jsx', newContent, 'utf8');
    console.log('Successfully replaced EventCard.');
  } else {
    console.log('Could not find markers in EventsPage.jsx', {
      foundStart: startIndex !== -1,
      foundEnd: endIndex !== -1
    });
  }
} catch (e) {
  console.error('Error modifying file:', e);
}

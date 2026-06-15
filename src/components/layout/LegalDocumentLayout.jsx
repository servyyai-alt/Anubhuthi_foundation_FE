import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaChevronDown, FaSearch, FaExpandAlt, FaCompressAlt, FaArrowUp, FaListUl, FaTimes } from 'react-icons/fa';

export default function LegalDocumentLayout({ title, subtitle, lastUpdated, sections, children }) {
  const { hash } = useLocation();
  const [activeSection, setActiveSection] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [readingProgress, setReadingProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const contentRef = useRef(null);

  // Handle Search Filtering
  const filteredSections = useMemo(() => {
    if (!searchQuery) return sections;
    const query = searchQuery.toLowerCase();
    return sections.filter(sec => {
      if (sec.title.toLowerCase().includes(query)) return true;
      return false;
    });
  }, [sections, searchQuery]);

  // Initialization: Open hashed section if any
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      setExpandedSections(prev => new Set(prev).add(id));
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(id);
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  // Scroll Spy & Progress
  useEffect(() => {
    const handleScroll = () => {
      // Progress
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setReadingProgress(progress);

      // Back to Top visibility
      setShowBackToTop(window.scrollY > 400);

      // Spy
      const sectionElements = sections.map(s => document.getElementById(s.id)).filter(Boolean);
      let currentActive = activeSection;
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150) {
          currentActive = el.id;
          break;
        }
      }
      
      if (currentActive !== activeSection) {
        setActiveSection(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, activeSection]);

  const toggleSection = (id) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setExpandedSections(new Set(sections.map(s => s.id)));
  };

  const collapseAll = () => {
    setExpandedSections(new Set());
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cream relative">
      <Helmet>
        <title>{title} | Anubhuthi Foundation</title>
        <meta name="description" content={subtitle} />
      </Helmet>

      {/* Reading Progress */}
      <div className="fixed top-0 left-0 w-full h-1 bg-earth-100 z-50">
        <div 
          className="h-full bg-saffron-500 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Main Layout Area - Starts directly below navbar */}
      <section className="pt-32 pb-16 relative z-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Simple Clean Title Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-earth-900 leading-tight">
              {title}
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* LEFT: Sticky Table of Contents (Desktop) */}
            <div className="hidden lg:block w-[280px] shrink-0 sticky top-28">
              <div className="bg-white rounded-2xl shadow-warm p-6 border border-earth-100/50">
                <h3 className="font-serif font-bold text-xl text-earth-800 mb-6 border-b border-earth-100 pb-4">Contents</h3>
                
                {/* Search Box */}
                <div className="relative mb-4">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400" />
                  <input 
                    type="text" 
                    placeholder="Search sections..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-earth-50 border border-earth-200 rounded-lg text-sm focus:outline-none focus:border-saffron-400 focus:ring-1 focus:ring-saffron-400 transition-all"
                  />
                </div>

                <nav className="flex flex-col space-y-2 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                  {filteredSections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setExpandedSections(prev => new Set(prev).add(section.id));
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', `#${section.id}`);
                        setActiveSection(section.id);
                      }}
                      className={`text-sm transition-all duration-300 py-2 px-3 rounded-lg border-l-2 ${
                        activeSection === section.id 
                          ? 'border-saffron-500 bg-saffron-50 text-saffron-700 font-semibold shadow-sm' 
                          : 'border-transparent text-earth-600 hover:bg-earth-50 hover:text-earth-900'
                      }`}
                    >
                      {section.title}
                    </a>
                  ))}
                  {filteredSections.length === 0 && (
                    <p className="text-sm text-earth-500 text-center py-4">No sections found.</p>
                  )}
                </nav>
              </div>
            </div>

            {/* CENTER: Main Content Area */}
            <div className="w-full lg:flex-1 min-w-0" ref={contentRef}>
              
              {/* Mobile TOC Button */}
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-full flex items-center justify-center gap-2 bg-white border border-earth-200 p-4 rounded-xl shadow-sm font-semibold text-earth-800 mb-6"
              >
                <FaListUl className="text-saffron-500" />
                View Table of Contents
              </button>

              {/* Action Bar (Expand / Collapse) */}
              <div className="flex flex-wrap items-center gap-3 mb-6 bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-earth-100">
                <button onClick={expandAll} className="flex items-center gap-2 px-4 py-2 bg-earth-50 hover:bg-earth-100 text-earth-700 rounded-lg text-sm font-medium transition-colors">
                  <FaExpandAlt className="text-earth-500" />
                  Expand All
                </button>
                <button onClick={collapseAll} className="flex items-center gap-2 px-4 py-2 bg-earth-50 hover:bg-earth-100 text-earth-700 rounded-lg text-sm font-medium transition-colors">
                  <FaCompressAlt className="text-earth-500" />
                  Collapse All
                </button>
              </div>

              {/* Sections Accordion */}
              <div className="space-y-4 mb-8">
                {filteredSections.map((section) => {
                  const isExpanded = expandedSections.has(section.id) || searchQuery !== '';
                  const isActive = activeSection === section.id;

                  return (
                    <div 
                      key={section.id} 
                      id={section.id} 
                      className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 scroll-mt-28
                        ${isActive ? 'border-saffron-400 shadow-warm ring-1 ring-saffron-400/20' : 'border-earth-200 hover:border-earth-300'}
                      `}
                    >
                      <button 
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-5 sm:p-6 text-left outline-none"
                        aria-expanded={isExpanded}
                      >
                        <div className="flex items-center gap-4 pr-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors
                            ${isActive ? 'bg-saffron-500 text-white' : 'bg-earth-100 text-earth-600'}
                          `}>
                            {section.title.split('.')[0]}
                          </div>
                          <h2 className={`font-serif text-xl sm:text-2xl font-bold transition-colors ${isActive ? 'text-earth-900' : 'text-earth-800'}`}>
                            {section.title.substring(section.title.indexOf('.') + 1).trim()}
                          </h2>
                        </div>
                        <div className="flex items-center shrink-0">
                          <div className={`w-8 h-8 rounded-full bg-earth-50 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-saffron-50 text-saffron-600' : 'text-earth-500'}`}>
                            <FaChevronDown size={12} />
                          </div>
                        </div>
                      </button>

                      {/* Accordion Content */}
                      <div 
                        className={`overflow-hidden transition-all duration-500 ease-in-out
                          ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}
                        `}
                      >
                        <div className="p-5 sm:p-8 pt-0 sm:pt-0 border-t border-earth-100/50">
                          <div className={`pl-0 sm:pl-12 text-earth-700 leading-relaxed space-y-4`}>
                            {section.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

          {/* Bottom Custom Content - Full width, outside sidebar layout */}
          {children && (
            <div className="mt-12 space-y-8 max-w-3xl mx-auto">
              {children}
            </div>
          )}
        </div>
      </section>

      {/* Standalone Back to Top Floating Badge */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-[90px] right-6 z-40 w-12 h-12 bg-saffron-500 hover:bg-saffron-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          aria-label="Back to Top"
        >
          <FaArrowUp size={18} />
        </button>
      )}

      {/* Mobile TOC Drawer */}
      <div className={`fixed inset-0 z-50 bg-earth-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileMenuOpen(false)} />
      <div className={`fixed bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-2xl z-50 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden flex flex-col max-h-[85vh] ${mobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="p-4 border-b border-earth-100 flex items-center justify-between bg-earth-50 rounded-t-3xl shrink-0">
          <h3 className="font-serif font-bold text-xl text-earth-800 ml-2">Table of Contents</h3>
          <button onClick={() => setMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-white text-earth-500 flex items-center justify-center shadow-sm">
            <FaTimes />
          </button>
        </div>
        <div className="p-4 overflow-y-auto overscroll-contain flex-1 custom-scrollbar pb-24">
          <div className="relative mb-6">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400" />
            <input 
              type="text" 
              placeholder="Search sections..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-earth-200 rounded-xl text-sm focus:outline-none focus:border-saffron-400 shadow-sm"
            />
          </div>
          <nav className="flex flex-col space-y-2">
            {filteredSections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setExpandedSections(prev => new Set(prev).add(section.id));
                  setMobileMenuOpen(false);
                  setTimeout(() => {
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', `#${section.id}`);
                    setActiveSection(section.id);
                  }, 300);
                }}
                className={`text-left w-full text-sm transition-all duration-300 py-3 px-4 rounded-xl border-l-4 ${
                  activeSection === section.id 
                    ? 'border-saffron-500 bg-saffron-50 text-saffron-700 font-bold' 
                    : 'border-transparent bg-earth-50/50 text-earth-700'
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>
      </div>

    </div>
  );
}

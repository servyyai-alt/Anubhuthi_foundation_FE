import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// Asset imports
import trekkingRetreatImage from '../assets/hero-temple-image.png.png';
import coupleRetreatImage from '../assets/community-culture.png.png';
import spiritualCampImage from '../assets/truth.png';
import meditationJourneyImage from '../assets/study.png';
import humanitarianProgramImage from '../assets/service.png';
import internationalAwarenessImage from '../assets/purity.png';
import meditationMountainImage from '../assets/meditation.png';

export default function RetreatsPage() {
  const featureIcons = [
    {
      label: 'Travel',
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto text-[#D8A24A]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      label: 'Meditation',
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto text-[#D8A24A]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
          <path d="M5 20a7 7 0 0 1 14 0" />
          <path d="M12 10v6" />
          <path d="M8 14h8" />
        </svg>
      ),
    },
    {
      label: 'Awareness Training',
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto text-[#D8A24A]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <circle cx="12" cy="11" r="3" />
        </svg>
      ),
    },
    {
      label: 'Trekking',
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto text-[#D8A24A]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
      ),
    },
    {
      label: 'Conscious Living',
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto text-[#D8A24A]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      ),
    },
    {
      label: 'Bonding',
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto text-[#D8A24A]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      label: 'Cultural Exploration',
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto text-[#D8A24A]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m12 3-10 9h3v8h14v-8h3L12 3z" />
          <path d="M9 20v-8h6v8" />
        </svg>
      ),
    },
  ];

  const cards = [
    { title: 'Himalayan Trekking Retreats', image: trekkingRetreatImage },
    { title: 'Couple Awareness Retreats', image: coupleRetreatImage },
    { title: 'Spiritual Nature Camps', image: spiritualCampImage },
    { title: 'Meditation Journeys', image: meditationJourneyImage },
    { title: 'Conscious Humanitarian Programs', image: humanitarianProgramImage },
    { title: 'International Awareness Tours', image: internationalAwarenessImage },
  ];

  return (
    <>
      <Helmet>
        <title>Himalayan Retreats & Conscious Tourism - Anubhuthi Foundation</title>
        <meta name="description" content="Anubhuthi Foundation organizes transformative journeys across the Himalayas and other nature-rich destinations." />
      </Helmet>

      <div className="pt-20 bg-[#F5EFE4] min-h-screen flex flex-col">
        {/* SECTION 1 - HERO */}
        <section className="bg-gradient-to-b from-[#021B3A] to-[#123A63] text-white py-16 px-6 lg:px-12 relative overflow-hidden">
          <div className="mx-auto w-full max-w-[1280px]">
            {/* Breadcrumb - Top Left */}
            <nav className="text-sm text-white/50 mb-10 flex items-center gap-1.5 font-sans justify-start">
              <Link to="/" className="hover:text-[#D8A24A] transition-colors">Home</Link>
              <span>›</span>
              <span className="text-white/80">Retreats</span>
            </nav>

            {/* Title & Subtitle */}
            <div className="text-center mb-16">
              <h1 className="font-sans text-[36px] font-bold uppercase leading-[0.98] tracking-[-0.03em] text-white sm:text-[48px] lg:text-[56px] xl:text-[60px]">
                TRANSFORM THROUGH NATURE
              </h1>
              <p className="mt-4 font-sans text-[15px] sm:text-[18px] leading-[1.5] text-white/90 max-w-[800px] mx-auto">
                Anubhuthi Foundation organizes transformative journeys across the Himalayas and other nature-rich destinations.
              </p>
            </div>

            {/* Feature Icons Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 text-center max-w-[1100px] mx-auto justify-center items-start">
              {featureIcons.map((item, i) => (
                <div key={i} className="flex flex-col items-center space-y-3">
                  <div className="h-16 w-16 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <p className="font-sans text-[14px] sm:text-[15px] font-medium text-white leading-snug">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2 - RETREAT EXPERIENCES */}
        <section className="bg-[#F5EFE4] py-16 px-6 lg:px-12 relative">
          <div className="mx-auto w-full max-w-[1400px]">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="font-sans text-[28px] font-bold uppercase tracking-[-0.03em] text-[#021B3A] sm:text-[32px]">
                RETREAT EXPERIENCES
              </h2>
              {/* Gold Divider Decoration */}
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="w-12 h-[1px] bg-[#D8A24A]"></div>
                <span className="text-[#D8A24A] text-lg">❈</span>
                <div className="w-12 h-[1px] bg-[#D8A24A]"></div>
              </div>
            </div>

            {/* 6 Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {cards.map((card, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-[20px] border-[3px] border-white bg-[#F7F1E7] shadow-[0_12px_34px_rgba(15,23,42,0.1)] flex flex-col h-full"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden shrink-0">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-3 py-4 flex items-center justify-center text-center flex-grow">
                    <p className="font-sans text-[16px] font-semibold leading-[1.2] text-[#021B3A]">
                      {card.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 - PARTICIPANTS EXPERIENCE */}
        <section className="bg-[#F5EFE4] pb-16 pt-8 px-6 lg:px-12 relative overflow-hidden flex-grow">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] items-center gap-8 relative z-10">
              
              {/* Left Column: Two-column bullet layout */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-sans text-[24px] font-bold uppercase tracking-[-0.03em] text-[#021B3A] sm:text-[28px]">
                    PARTICIPANTS EXPERIENCE
                  </h3>
                  {/* Gold Divider */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-8 h-[1px] bg-[#D8A24A]"></div>
                    <span className="text-[#D8A24A] text-sm">❈</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 pt-4">
                  {/* Column 1 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#D8A24A] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="font-sans text-[16px] font-medium text-[#111827]">Self-discovery</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#D8A24A] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="font-sans text-[16px] font-medium text-[#111827]">Emotional clarity</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#D8A24A] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="font-sans text-[16px] font-medium text-[#111827]">Mental peace</span>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#D8A24A] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="font-sans text-[16px] font-medium text-[#111827]">Relationship understanding</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#D8A24A] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="font-sans text-[16px] font-medium text-[#111827]">Nature connection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#D8A24A] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="font-sans text-[16px] font-medium text-[#111827]">Purpose-oriented living</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Meditation Mountain Image with Gradient Overlay */}
              <div className="relative rounded-[20px] overflow-hidden aspect-[16/9] lg:aspect-auto lg:h-[280px] w-full shadow-md">
                {/* Blend Overlay to make it fade into cream from the left */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#F5EFE4] via-[#F5EFE4]/30 to-transparent z-10" />
                <img
                  src={meditationMountainImage}
                  alt="Meditation mountain"
                  className="w-full h-full object-cover z-0"
                />
              </div>

            </div>
          </div>
        </section>

        {/* BOTTOM STRIP */}
        <footer className="bg-[#021B3A] py-6 shrink-0 mt-auto">
          <div className="mx-auto w-full px-6 lg:px-12 text-center font-sans text-[20px] font-medium tracking-[0.01em] text-[#D8A24A] sm:text-[24px]">
            One Purpose <span className="mx-2 text-white">•</span> One Humanity <span className="mx-2 text-white">•</span> One Journey <span className="mx-2 text-white">•</span> One Evolution
          </div>
        </footer>
      </div>
    </>
  );
}

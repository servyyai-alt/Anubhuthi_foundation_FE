<<<<<<<<< Temporary merge branch 1
// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { motion } from 'framer-motion';
// import { FaMountain, FaCalendar, FaUsers } from 'react-icons/fa';
// import { PageHeader, Card, LinkButton, Badge, LoadingPage, EmptyState, SectionTitle } from '../components/common';
// import { retreatsAPI } from '../services/api';

// const himalayaFacts = [
//   { icon: '🏔️', title: 'Sacred Himalayan Routes', desc: 'From Kedarnath to Gangotri, we traverse the most spiritually potent corridors on earth.' },
//   { icon: '🌅', title: 'Expert Spiritual Guides', desc: 'Our experienced guides blend yogic knowledge with deep Himalayan expertise.' },
//   { icon: '🕌', title: 'Temple Immersions', desc: 'Ritual access to ancient temples not typically open to ordinary tourists.' },
//   { icon: '🌿', title: 'Holistic Wellbeing', desc: 'Satvic meals, morning practices, and evening satsangs throughout every retreat.' },
// ];

// export default function RetreatsPage() {
//   const [retreats, setRetreats] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     retreatsAPI.getAll()
//       .then(res => setRetreats(res.data.data || []))
//       .catch(() => setRetreats([]))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <>
//       <Helmet>
//         <title>Himalayan Retreats — Anubhuthi Foundation</title>
//         <meta name="description" content="Sacred retreats in the Himalayas — Kedarnath, Gangotri, Badrinath, and beyond. Transform your inner landscape." />
//       </Helmet>

//       <PageHeader
//         title="Himalayan Sacred Retreats"
//         subtitle="Return to the Source"
//         breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Retreats' }]}
//       />

//       {/* Why Himalaya */}
//       <section className="py-16 bg-parchment">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <SectionTitle subtitle="The Himalayas Await" title="Why Retreat in the Sacred Mountains?" center />
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//             {himalayaFacts.map((f, i) => (
//               <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
//                 className="text-center p-6 bg-white rounded-2xl shadow-warm"
//               >
//                 <div className="text-4xl mb-3">{f.icon}</div>
//                 <h3 className="font-serif font-bold text-earth-800 mb-2">{f.title}</h3>
//                 <p className="text-earth-500 text-sm leading-relaxed">{f.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Retreats listing */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <SectionTitle subtitle="Upcoming Journeys" title="Sacred Retreat Programs" />
//           {loading ? <LoadingPage /> : retreats.length === 0 ? (
//             <EmptyState icon="🏔️" title="Retreat Schedule Coming Soon"
//               description="Our upcoming Himalayan retreats are being finalized. Contact us to register interest." />
//           ) : (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {retreats.map((retreat, i) => (
//                 <motion.div key={retreat._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
//                   <Card className="h-full flex flex-col">
//                     <div className="h-52 bg-gradient-to-br from-slate-700 to-earth-800 flex items-center justify-center relative overflow-hidden">
//                       <FaMountain className="text-white/20 text-[120px] absolute" />
//                       <span className="text-white font-serif text-2xl font-bold relative z-10 text-center px-4">{retreat.title}</span>
//                       {retreat.isFeatured && (
//                         <div className="absolute top-3 right-3">
//                           <Badge color="saffron">Featured</Badge>
//                         </div>
//                       )}
//                     </div>
//                     <div className="p-6 flex flex-col flex-1">
//                       <div className="flex items-center gap-2 text-sm text-earth-400 mb-3">
//                         <FaMountain size={12} />
//                         <span>{retreat.location}</span>
//                         <span className="ml-auto capitalize text-earth-500">{retreat.difficulty}</span>
//                       </div>
//                       <p className="text-earth-500 text-sm leading-relaxed flex-1 mb-4">
//                         {retreat.shortDescription || retreat.description?.slice(0, 150)}...
//                       </p>
//                       <div className="grid grid-cols-3 gap-2 mb-5 text-xs text-center">
//                         <div className="bg-earth-50 rounded-lg p-2">
//                           <span className="text-earth-400 block">Duration</span>
//                           <span className="font-medium text-earth-700">{retreat.duration || 'TBD'}</span>
//                         </div>
//                         <div className="bg-earth-50 rounded-lg p-2">
//                           <span className="text-earth-400 block">Max</span>
//                           <span className="font-medium text-earth-700">{retreat.maxParticipants || '∞'}</span>
//                         </div>
//                         <div className="bg-earth-50 rounded-lg p-2">
//                           <span className="text-earth-400 block">From</span>
//                           <span className="font-medium text-saffron-600">₹{retreat.price?.toLocaleString() || 'TBD'}</span>
//                         </div>
//                       </div>
//                       <LinkButton to="/contact" variant="primary" className="w-full justify-center">Book Now</LinkButton>
//                     </div>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// }


import bg from "../assets/retreat-bg.png";

import travel from "../assets/travel.png";
import meditation from "../assets/meditation1.png";
import awareness from "../assets/awareness.png";
import trekking from "../assets/trekking.png";
import conscious from "../assets/conscious.png";
import growth from "../assets/growth.png";
import cultural from "../assets/cultural.png";

import himalaya from "../assets/himalaya.png";
import couples from "../assets/couples.png";
import natureCamp from "../assets/awareness.png";
import meditationJourney from "../assets/awareness.png";
import consciousLiving from "../assets/awareness.png";
import international from "../assets/awareness.png";

import participant from "../assets/awareness.png";

export default function RetreatsPage() {
  const topItems = [
    { title: "Travel", image: travel },
    { title: "Meditation", image: meditation },
    { title: "Awareness", image: awareness },
    { title: "Trekking", image: trekking },
    { title: "Conscious Living", image: conscious },
    { title: "Growth", image: growth },
    { title: "Cultural Exploration", image: cultural },
  ];

  const retreats = [
    {
      title: "Himalayan Trekking Retreats",
      image: himalaya,
    },
    {
      title: "Couples Awareness Retreats",
      image: couples,
    },
    {
      title: "Spiritual Nature Camps",
      image: natureCamp,
    },
    {
      title: "Meditation Journeys",
      image: meditationJourney,
    },
    {
      title: "Conscious Living Programs",
      image: consciousLiving,
    },
    {
      title: "International Awareness Tours",
      image: international,
    },
  ];

  return (
    <section className="bg-[#f8f2e8]">

      {/* HERO */}

      <div
        className="bg-cover bg-center py-20"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center text-white">

          <h1
            className="
            text-4xl
            md:text-6xl
            font-bold
            font-serif
            "
          >
            TRANSFORM THROUGH NATURE
          </h1>

          <p
            className="
            mt-5
            max-w-3xl
            mx-auto
            text-gray-200
            leading-8
            "
          >
            Anubhuthi Foundation organizes transformative
            journeys across the Himalayas and other
            nature-rich destinations.
          </p>

          {/* Top Row */}

          <div
            className="
            grid
            grid-cols-2
            md:grid-cols-4
            lg:grid-cols-7
            gap-6
            mt-16
            "
          >
            {topItems.map((item, index) => (
              <div key={index}>

                <img
                  src={item.image}
                  alt=""
                  className="
                  w-20
                  h-20
                  mx-auto
                  rounded-full
                  object-cover
                  border-2
                  border-[#d7b56d]
                  "
                />

                <h3
                  className="
                  mt-3
                  text-sm
                  font-medium
                  "
                >
                  {item.title}
                </h3>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RETREAT EXPERIENCES */}

      <div className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2
            className="
            text-center
            text-4xl
            font-bold
            font-serif
            text-[#1d3557]
            mb-12
            "
          >
            RETREAT EXPERIENCES
          </h2>

          <div
            className="
            grid
            md:grid-cols-2
            lg:grid-cols-6
            gap-5
            "
          >
            {retreats.map((item, index) => (
              <div
                key={index}
                className="
                bg-white
                rounded-xl
                overflow-hidden
                border
                border-[#e7d7bc]
                shadow-sm
                "
              >

                <img
                  src={item.image}
                  alt=""
                  className="
                  h-[120px]
                  w-full
                  object-cover
                  "
                />

                <div className="p-3">

                  <h4
                    className="
                    text-center
                    text-sm
                    font-semibold
                    text-[#1d3557]
                    "
                  >
                    {item.title}
                  </h4>

                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

      {/* PARTICIPANT EXPERIENCE */}

      <div className="pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <div
            className="
            bg-white
            rounded-3xl
            p-10
            border
            border-[#e7d7bc]
            grid
            lg:grid-cols-2
            gap-12
            items-center
            "
          >

            <div>

              <h2
                className="
                text-4xl
                font-serif
                font-bold
                text-[#1d3557]
                mb-8
                "
              >
                PARTICIPANTS EXPERIENCE
              </h2>

              <div
                className="
                grid
                md:grid-cols-2
                gap-y-5
                text-gray-700
                "
              >
                <p>✓ Self Discovery</p>
                <p>✓ Relationship Understanding</p>

                <p>✓ Emotional Clarity</p>
                <p>✓ Nature Connection</p>

                <p>✓ Mental Peace</p>
                <p>✓ Purpose Oriented Living</p>
              </div>

            </div>

            <div>

              <img
                src={participant}
                alt=""
                className="
                w-full
                h-[320px]
                object-cover
                rounded-2xl
                "
              />

            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM STRIP */}

      <div
        className="
        bg-[#0e2a47]
        py-5
        text-center
        text-white
        font-medium
        tracking-wide
        "
      >
        One Purpose • One Humanity • One Journey • One Evolution
      </div>

    </section>
=========
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
>>>>>>>>> Temporary merge branch 2
  );
}
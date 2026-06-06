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


import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
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
import natureCamp from "../assets/natureCamp.png";
import meditationJourney from "../assets/meditationJourney.png";
import consciousLiving from "../assets/conscious-living-programs.png";
import international from "../assets/international-awareness-tours.png";

import participant from "../assets/awareness.png";
import { retreatsAPI } from "../services/api";

export default function RetreatsPage() {
  const [adminRetreats, setAdminRetreats] = useState([]);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    retreatsAPI.getAll()
      .then((res) => setAdminRetreats(res.data.data || []))
      .catch(() => setAdminRetreats([]));
  }, []);

  const topItems = [
    { title: "Travel", image: travel },
    { title: "Meditation", image: meditation },
    { title: "Awareness", image: awareness },
    { title: "Trekking", image: trekking },
    { title: "Conscious Living", image: conscious },
    { title: "Growth", image: growth },
    { title: "Cultural Exploration", image: cultural },
  ];

  const staticRetreats = [
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

  const getRetreatImage = (title = "") => {
    const t = title.toLowerCase();
    if (t.includes("trekking") || t.includes("himalayan") || t.includes("himalaya")) return himalaya;
    if (t.includes("couple") || t.includes("relationship")) return couples;
    if (t.includes("nature") || t.includes("camp")) return natureCamp;
    if (t.includes("meditation")) return meditationJourney;
    if (t.includes("conscious") || t.includes("humanitarian") || t.includes("living")) return consciousLiving;
    if (t.includes("international") || t.includes("tour")) return international;
    return null;
  };

  const retreats = useMemo(() => {
    if (!adminRetreats.length) return staticRetreats;

    return adminRetreats.map((retreat) => {
      const localImg = getRetreatImage(retreat.title);
      return {
        _id: retreat._id,
        title: retreat.title,
        image: localImg || retreat.image || retreat.gallery?.[0] || himalaya,
        location: retreat.location,
        duration: retreat.duration,
        price: retreat.price,
        shortDescription: retreat.shortDescription || retreat.description,
      };
    });
  }, [adminRetreats]);

  return (
    <>
      <Helmet>
        <title>Himalayan Retreats - Anubhuthi Foundation</title>
        <meta name="description" content="Sacred retreats, nature journeys, and conscious living programs from Anubhuthi Foundation." />
      </Helmet>
      <section className="bg-[#f8f2e8]">

      {/* HERO */}

      <div className="relative flex min-h-[100svh] items-center overflow-hidden pt-20 pb-12 md:py-16 lg:py-20">
        {/* Cinematic Zoom + Parallax background */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bg})`,
            y: bgY,
          }}
          animate={{ scale: [1, 1.05] }}
          transition={{
            duration: 20,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/45" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white w-full">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
             className="
             text-3xl
             sm:text-4xl
             md:text-6xl
             font-bold
             font-serif
             text-white
             drop-shadow-[0_4px_18px_rgba(0,0,0,0.75)]
             "
           >
             TRANSFORM THROUGH NATURE
           </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="
             mt-5
             max-w-3xl
             mx-auto
             text-[#f8f2e8]
             drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]
              text-base
              sm:text-lg
              md:text-2xl
              leading-7
              md:leading-8
             "
           >
            Anubhuthi Foundation organizes transformative
            journeys across the Himalayas and other
            nature-rich destinations.
          </motion.p>

          {/* Top Row */}

          <div
            className="
            grid
             grid-cols-2
             sm:grid-cols-3
             md:grid-cols-4
             lg:grid-cols-7
             gap-4
             sm:gap-6
             mt-12
             sm:mt-16
            "
          >
            {topItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 + index * 0.1 }}
                className="group cursor-pointer flex flex-col items-center"
              >
                <motion.div
                  className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#d7b56d] sm:h-28 sm:w-28"
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0 0 25px rgba(215, 181, 109, 0.75)",
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <motion.img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.12 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </motion.div>

                <h3
                  className="
                  mt-3
                  text-sm
                  font-medium
                  text-white
                  group-hover:text-[#d7b56d]
                  transition-colors
                  duration-300
                  "
                >
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* RETREAT EXPERIENCES */}

      <div className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="
            text-center
             text-3xl
             sm:text-4xl
            font-bold
            font-serif
            text-[#1d3557]
            mb-12
            "
          >
            RETREAT EXPERIENCES
          </motion.h2>

          <div
            className="
            grid
             sm:grid-cols-2
             lg:grid-cols-3
             xl:grid-cols-6
            gap-5
            "
          >
            {retreats.map((item, index) => (
              <motion.div
                key={item._id || item.title || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.08 }}
                className="
                group
                bg-white
                rounded-xl
                overflow-hidden
                border
                border-[#e7d7bc]
                shadow-sm
                "
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    className="
                    h-[120px]
                    w-full
                    object-cover
                    transition-all
                    duration-500
                    ease-out
                    group-hover:scale-105
                    group-hover:brightness-105
                    "
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 ease-out group-hover:bg-black/10" />
                </div>

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
                  {(item.shortDescription || item.location || item.duration || item.price) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="mt-3 space-y-2 text-center text-xs text-gray-600"
                    >
                      {item.shortDescription && (
                        <p className="line-clamp-3 leading-5">
                          {item.shortDescription}
                        </p>
                      )}
                      <div className="flex flex-wrap justify-center gap-2">
                        {item.location && <span>{item.location}</span>}
                        {item.duration && <span>{item.duration}</span>}
                        {item.price ? <span>Rs {Number(item.price).toLocaleString()}</span> : null}
                      </div>
                    </motion.div>
                  )}

                </div>

              </motion.div>
            ))}
          </div>

        </div>

      </div>

      {/* PARTICIPANT EXPERIENCE */}

      <div className="pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="
            bg-white
            rounded-3xl
             p-6
             sm:p-8
             lg:p-10
            border
            border-[#e7d7bc]
            grid
            lg:grid-cols-2
            gap-12
            items-center
            "
          >

            <div>

              <motion.h2
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="
                 text-3xl
                 sm:text-4xl
                font-serif
                font-bold
                text-[#1d3557]
                mb-8
                "
              >
                PARTICIPANTS EXPERIENCE
              </motion.h2>

              <div
                className="
                grid
                md:grid-cols-2
                gap-y-5
                text-gray-700
                "
              >
                {[
                  "Self Discovery",
                  "Relationship Understanding",
                  "Emotional Clarity",
                  "Nature Connection",
                  "Mental Peace",
                  "Purpose Oriented Living",
                ].map((text, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                    className="group/item flex items-start gap-2.5 cursor-pointer transition-transform duration-300 hover:translate-x-[8px]"
                  >
                    <FaCheckCircle className="text-gray-400 group-hover/item:text-[#d7b56d] transition-colors duration-300 flex-shrink-0 text-[15px] mt-[3px]" />
                    <span className="transition-colors duration-300 group-hover/item:text-[#1d3557] font-medium">{text}</span>
                  </motion.div>
                ))}
              </div>

            </div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
            >

              <motion.img
                src={participant}
                alt=""
                className="
                w-full
                h-[320px]
                object-cover
                rounded-2xl
                "
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />

            </motion.div>

          </motion.div>

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
    </>
  );
}

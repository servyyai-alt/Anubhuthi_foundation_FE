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
import natureCamp from "../assets/spiritual-nature-camps.png";
import meditationJourney from "../assets/meditationJourney.png";
import consciousLiving from "../assets/conscious-living-programs.png";
import international from "../assets/international-awareness-tours.png";

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
  );
}
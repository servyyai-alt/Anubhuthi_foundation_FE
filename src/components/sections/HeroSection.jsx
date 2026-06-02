// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaOm, FaPlay, FaArrowRight } from 'react-icons/fa';

// const slides = [
//   {
//     title: 'Awaken Your True Self',
//     subtitle: 'Anubhuthi - The Experience Within',
//     description: 'Embark on a profound journey of self-discovery through ancient Vedic wisdom, transformative meditation, and sacred Himalayan retreats.',
//     cta: 'Join The Movement',
//     ctaPath: '/about',
//     bg: 'from-amber-950 via-earth-900 to-amber-900',
//   },
//   {
//     title: 'DNI Academy of Ancient Wisdom',
//     subtitle: 'Divinity · Nature · Intelligence',
//     description: 'Comprehensive training programs in yogic sciences, Vedic philosophy, and consciousness exploration for sincere seekers.',
//     cta: 'Apply For Training',
//     ctaPath: '/programs',
//     bg: 'from-stone-900 via-earth-900 to-amber-950',
//   },
//   {
//     title: 'Himalayan Sacred Retreats',
//     subtitle: 'Return to the Source',
//     description: 'Experience the timeless magic of the Himalayas on transformative retreats to Kedarnath, Badrinath, Gangotri, and beyond.',
//     cta: 'Explore Retreats',
//     ctaPath: '/retreats',
//     bg: 'from-slate-900 via-earth-900 to-stone-900',
//   },
// ];

// const stats = [
//   { number: '5000+', label: 'Lives Transformed' },
//   { number: '150+', label: 'Programs Delivered' },
//   { number: '12+', label: 'Sacred Retreats Yearly' },
//   { number: '8', label: 'States Served' },
// ];

// export default function HeroSection() {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const slide = slides[current];

//   return (
//     <section className="relative min-h-screen flex flex-col overflow-hidden">
//       {/* Animated BG */}
//       <div className={`absolute inset-0 bg-gradient-to-br ${slide.bg} transition-all duration-1000`} />

//       {/* Sacred pattern overlay */}
//       <div className="absolute inset-0 opacity-10"
//         style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f5a030' fill-opacity='0.5'%3E%3Cpath d='M40 40m-10 0a10 10 0 1 0 20 0 10 10 0 1 0 -20 0M40 10l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
//       />

//       {/* Radial glow */}
//       <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-saffron-500/10 rounded-full blur-3xl" />

//       {/* Main Content */}
//       <div className="relative flex-1 flex flex-col justify-center pt-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//           <div className="max-w-4xl">
//             {/* Om symbol */}
//             <motion.div
//               key={`om-${current}`}
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.6 }}
//               className="flex items-center gap-3 mb-6"
//             >
//               <div className="w-12 h-12 bg-saffron-500/20 border border-saffron-500/30 rounded-full flex items-center justify-center animate-pulse-slow">
//                 <FaOm className="text-saffron-400 text-xl" />
//               </div>
//               <span className="sanskrit-text text-saffron-300 text-lg">{slide.subtitle}</span>
//             </motion.div>

//             {/* Main heading */}
//             <motion.h1
//               key={`h1-${current}`}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.1 }}
//               className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-6"
//             >
//               {slide.title.split(' ').map((word, i) => (
//                 <span key={i} className={i === slide.title.split(' ').length - 1 ? 'text-saffron-400' : ''}>
//                   {word}{' '}
//                 </span>
//               ))}
//             </motion.h1>

//             {/* Description */}
//             <motion.p
//               key={`desc-${current}`}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.2 }}
//               className="text-earth-200 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl"
//             >
//               {slide.description}
//             </motion.p>

//             {/* CTA Buttons */}
//             <motion.div
//               key={`cta-${current}`}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.3 }}
//               className="flex flex-wrap gap-4"
//             >
//               <Link to={slide.ctaPath}
//                 className="px-8 py-4 bg-saffron-500 text-white rounded-full font-semibold text-base hover:bg-saffron-400 transition-all shadow-saffron hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"
//               >
//                 {slide.cta} <FaArrowRight />
//               </Link>
//               <Link to="/programs"
//                 className="px-8 py-4 border border-white/30 text-white rounded-full font-semibold text-base hover:bg-white/10 transition-all backdrop-blur-sm flex items-center gap-2"
//               >
//                 <FaPlay size={14} /> Watch Story
//               </Link>
//               <Link to="/donate"
//                 className="px-8 py-4 bg-white/10 border border-saffron-400/50 text-saffron-300 rounded-full font-semibold text-base hover:bg-saffron-500/20 transition-all backdrop-blur-sm"
//               >
//                 Donate Now 🙏
//               </Link>
//             </motion.div>

//             {/* Additional CTAs */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.6 }}
//               className="flex flex-wrap gap-3 mt-6"
//             >
//               {[
//                 { label: 'Join Our Team', path: '/careers' },
//                 { label: 'Volunteer', path: '/volunteer' },
//               ].map(item => (
//                 <Link key={item.label} to={item.path}
//                   className="text-earth-300 hover:text-saffron-300 text-sm underline underline-offset-4 transition-colors"
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* Slide dots */}
//       <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
//         {slides.map((_, i) => (
//           <button key={i} onClick={() => setCurrent(i)}
//             className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-saffron-400 h-6' : 'bg-white/30'}`}
//           />
//         ))}
//       </div>

//       {/* Stats bar */}
//       <div className="relative bg-black/30 backdrop-blur-md border-t border-white/10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//             {stats.map((stat, i) => (
//               <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
//                 className="text-center"
//               >
//                 <div className="font-serif text-2xl sm:text-3xl font-bold text-saffron-400">{stat.number}</div>
//                 <div className="text-earth-300 text-sm">{stat.label}</div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import React, { useEffect, useState } from "react";
import hero from "../../assets/hero-section.png";
import bg from "../../assets/bg.png";
import { Link } from "react-router-dom";

const heroStats = [
  { value: 5000, suffix: "+", label: "Lives Impacted" },
  { value: 150, suffix: "+", label: "Programs" },
  { value: 12, suffix: "+", label: "Retreats" },
];

export default function HeroSection() {
  const [counts, setCounts] = useState(heroStats.map(() => 0));

  useEffect(() => {
    let animationFrame;
    let startTime;
    const duration = 1800;

    const animateCounts = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCounts(heroStats.map((item) => Math.floor(item.value * progress)));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animateCounts);
      }
    };

    animationFrame = window.requestAnimationFrame(animateCounts);

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {/* overlay */}

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">

        <div className="
        flex
        flex-col
        lg:flex-row
        items-center
        justify-between
        min-h-screen
        pt-24
        ">

          {/* LEFT IMAGE */}

          <div className="
          w-full
          lg:w-1/2
          flex
          justify-center
          lg:justify-start
          ">

            <img
              src={hero}
              alt=""
              className="
              w-[320px]
              md:w-[450px]
              lg:w-[620px]
              object-contain
              translate-y-16
              "
            />

          </div>



          {/* RIGHT CONTENT */}

          <div className="
          lg:w-1/2
          text-white
          lg:pl-10
          ">

            <p className="
            uppercase
            tracking-[8px]
            text-orange-400
            text-sm
            mb-6
            ">
              HUMAN EVOLUTION MOVEMENT
            </p>


            <h1 className="
            font-serif
            font-bold
            text-5xl
            md:text-7xl
            leading-none
            ">
              Transform Your Life.

              <br/>

              Understand Your Purpose.

              <br/>

              Evolve Humanity.
            </h1>



            <p className="
            mt-8
            text-gray-300
            text-xl
            leading-9
            max-w-xl
            ">
              Helping individuals reconnect with
              awareness, meditation, purpose,
              retreats and conscious living.
            </p>



            {/* buttons */}

            <div className="
            flex
            gap-4
            flex-wrap
            mt-10
            sm:mt-12
            ">

              <Link
                to="/contact"
                className="
               inline-flex
               w-fit
               items-center
               justify-center
                bg-orange-500
                px-10
                py-4
                rounded-full
                font-semibold
               leading-none
              "
              >
                Join Movement
              </Link>


              <Link
                to="/retreats"
                className="
               inline-flex
               w-fit
               items-center
               justify-center
                border
                border-white/30
                px-10
                py-4
                rounded-full
               leading-none
              "
              >
                Explore Retreats
              </Link>

            </div>



            {/* stats */}

            <div className="
            mt-12
            grid
            grid-cols-2
            gap-4
            sm:mt-14
            sm:grid-cols-3
            sm:gap-5
            lg:mt-16
            ">

              {heroStats.map((item, index) => (
                <div
                  key={item.label}
                  className="
                  rounded-[24px]
                  border
                  border-white/10
                  bg-black/20
                  px-4
                  py-4
                  backdrop-blur-sm
                  "
                >
                  <h2 className="
                  text-3xl
                  font-bold
                  text-orange-400
                  sm:text-4xl
                  lg:text-5xl
                  ">
                    {counts[index]}{item.suffix}
                  </h2>

                  <p className="mt-1 text-sm text-white/85 sm:text-base">{item.label}</p>
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

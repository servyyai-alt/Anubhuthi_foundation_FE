import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaBalanceScale,
  FaBrain,
  FaBullseye,
  FaChild,
  FaDna,
  FaEye,
  FaHandsHelping,
  FaHeartbeat,
  FaLeaf,
  FaSeedling,
  FaUserCheck,
  FaUsers,
} from 'react-icons/fa';
import { PageHeader, SectionTitle, LinkButton } from '../components/common';
import { AboutSection as HomeAboutSection } from '../components/sections/HomeSections';
import bg from '../../src/assets/philosophy-bg.png';
import meditation from '../../src/assets/meditation1.png';
import human from '../assets/humanbirth.png';
import awareness from '../assets/awareness.png';
import emotion from '../assets/emotion.png';
import dna from '../assets/dna.png';
import intelligence from '../assets/intelligence.png';
import evolution from '../assets/evolution.png';
import purpose from '../assets/purpose.png';
import dniBg from '../assets/dni-bg.png';
import whojoin from '../assets/whojoin.png';
import training from '../assets/training.png';
import heroTempleImage from '../assets/hero-temple-image.png.png';
import beforeRestorationImage from '../assets/before-restoration.png.png';
import duringRestorationImage from '../assets/during-restoration.png.png';
import afterRestorationImage from '../assets/after-restoration.png.png';
import communityCultureImage from '../assets/community-culture.png.png';
import legalBg from '../assets/legal.jpeg';

const revealViewport = { once: true, amount: 0.2 };

const revealTransition = {
  duration: 0.7,
  ease: 'easeOut',
};

const staggerFadeUp = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: revealTransition,
  },
};

const slideLeftReveal = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: revealTransition,
  },
};

const slideRightReveal = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: revealTransition,
  },
};

const scaleFadeReveal = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: revealTransition,
  },
};

// --- About Page ---
export function AboutPage() {
  return (
    <>
      <Helmet><title>About Us - Anubhuthi Foundation</title></Helmet>
      {/* Compact Page Header */}
      <div className="pt-24 pb-6 bg-parchment mandala-bg border-b border-orange-100/50">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="text-sm text-earth-400 mb-2">
            <Link to="/" className="hover:text-saffron-500 transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span>About</span>
          </nav>
          <h1 className="font-serif text-3xl font-bold text-earth-800 md:text-5xl">About Us</h1>
        </div>
      </div>

      <HomeAboutSection compact={true} />
    </>
  );
}

// --- Philosophy Page ---
export function PhilosophyPage() {
  const areas = [
    { title: 'Human Birth', image: human },
    { title: 'Awareness', image: awareness },
    { title: 'Emotions', image: emotion },
    { title: 'DNA', image: dna },
    { title: 'Inner Intelligence', image: intelligence },
    { title: 'Self Evolution', image: evolution },
    { title: 'Purpose', image: purpose },
  ];

  const understandingItems = [
    {
      label: 'Your Body',
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="5" r="2.5" />
          <path d="M12 7.5v5" />
          <path d="M8.5 21l1-5.5L8 11.5" />
          <path d="M15.5 21l-1-5.5 1.5-4" />
          <path d="M8 10l4 2 4-2" />
        </svg>
      ),
    },
    {
      label: 'Your Mind',
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9.5 18.5C6.5 18.5 4 16 4 13c0-1.9 1-3.6 2.5-4.6 0-3 2.5-5.4 5.5-5.4 2.8 0 5.2 2 5.8 4.7 1.9.5 3.2 2.2 3.2 4.3 0 2.5-2 4.5-4.5 4.5" />
          <path d="M9 10.5c.8-.9 2.2-1 3.1-.2.9.8 1 2.2.2 3.1" />
          <path d="M12.3 13.4 15 16" />
        </svg>
      ),
    },
    {
      label: 'Your Emotions',
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 20s-6.5-4.2-8.5-8.1C2 9 3.1 5.8 6.2 5c2-.5 4 .4 5 2 1-1.6 3-2.5 5-2 3.1.8 4.2 4 2.7 6.9C18.5 15.8 12 20 12 20Z" />
        </svg>
      ),
    },
    {
      label: 'Your Experiences',
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 6.5h14" />
          <path d="M7 4v5" />
          <path d="M17 4v5" />
          <rect x="4" y="6.5" width="16" height="13.5" rx="2" />
          <path d="M8 11h8" />
          <path d="M8 15h5" />
        </svg>
      ),
    },
    {
      label: 'Your Purpose',
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="7.5" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2.5v2.5" />
          <path d="M21.5 12H19" />
        </svg>
      ),
    },
    {
      label: 'Your Responsibility',
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3l7 3v5c0 4.5-3 7.7-7 10-4-2.3-7-5.5-7-10V6l7-3Z" />
          <path d="m9.5 12 1.8 1.8 3.7-3.8" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <Helmet><title>Philosophy - Anubhuthi Foundation</title></Helmet>
      <section
        className="
relative
py-24
sm:py-28
md:py-32
bg-cover
bg-center
overflow-hidden
text-white
"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div
        className="
absolute inset-0
bg-gradient-to-b
from-black/60
via-black/50
to-black/80
"
      />

      <div
        className="
relative z-10
max-w-7xl
mx-auto
px-6
"
      >
        <div className="text-center">
          <p
            className="
uppercase
tracking-[0.28em]
sm:tracking-[8px]
text-orange-400
text-[11px]
sm:text-sm
mb-5
sm:mb-6
"
          >
            ANUBHUTHI PHILOSOPHY
          </p>

          <h1
            className="
font-serif
text-4xl
sm:text-5xl
md:text-8xl
font-bold
leading-tight
"
          >
            Conscious Human Evolution
          </h1>

          <p
            className="
mt-6
max-w-2xl
mx-auto
text-gray-300
text-lg
sm:text-xl
leading-8
sm:leading-9
"
          >
            Understanding life through awareness,
            purpose and inner transformation.
          </p>
        </div>

        <motion.div
            className="
grid
grid-cols-2
sm:grid-cols-3
md:grid-cols-4
lg:grid-cols-7
gap-6
sm:gap-8
mt-16
sm:mt-24
"
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={staggerFadeUp}
        >
          {areas.map((item, index) => (
            <motion.div
              key={index}
              className="
text-center
group
"
              variants={fadeUpItem}
            >
              <div
                className="
w-20
h-20
sm:w-24
sm:h-24
lg:w-28
lg:h-28
mx-auto
rounded-full
overflow-hidden
border-2
border-orange-400
shadow-xl
group-hover:scale-110
duration-500
"
              >
                <img
                  src={item.image}
                  className="
w-full
h-full
object-cover
"
                />
              </div>

              <h3
                className="
mt-4
font-semibold
text-sm
sm:text-base
lg:text-lg
break-words
"
              >
                {item.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>

        <div
          className="
grid
lg:grid-cols-2
gap-10
sm:gap-14
lg:gap-20
items-center
mt-16
sm:mt-24
lg:mt-32
"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={slideLeftReveal}
          >
            <p
              className="
uppercase
tracking-[0.22em]
sm:tracking-[6px]
text-orange-400
text-[11px]
sm:text-sm
mb-4
sm:mb-5
"
            >
              Conscious Understanding
            </p>

            <h2
              className="
font-serif
text-3xl
sm:text-4xl
lg:text-5xl
xl:text-6xl
font-bold
leading-tight
break-words
"
            >
              To Live Meaningfully
              Understand:
            </h2>

            <div
              className="
space-y-4
sm:space-y-5
mt-8
sm:mt-10
text-base
sm:text-lg
lg:text-xl
text-gray-200
"
            >
              {understandingItems.map((item) => (
                <p key={item.label} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-orange-400">{item.icon}</span>
                  <span className="break-words">{item.label}</span>
                </p>
              ))}
            </div>
          </motion.div>

          <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
            <div
              className="
absolute
inset-0
bg-orange-500/20
blur-[120px]
"
            />

            <img
              src={meditation}
              className="
relative
rounded-[24px]
sm:rounded-[32px]
lg:rounded-[40px]
shadow-2xl
w-full
max-h-[70vh]
object-cover
"
            />
          </div>
        </div>

        <motion.div
          className="
mt-24
bg-white/5
backdrop-blur-xl
border
border-white/10
rounded-[32px]
p-6
sm:p-10
lg:p-16
text-center
"
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={scaleFadeReveal}
        >
          <h2
            className="
font-serif
text-3xl
sm:text-4xl
lg:text-5xl
font-bold
leading-tight
"
          >
            One Purpose • One Humanity
            <br />
            One Evolution
          </h2>

          <p
            className="
mt-6
max-w-3xl
mx-auto
text-gray-300
leading-7
sm:leading-8
text-base
sm:text-lg
"
          >
            Human transformation begins through
            awareness, responsibility and conscious
            living.
          </p>

          <Link to="/contact" className="inline-block mt-10 mb-4 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white duration-300 hover:bg-orange-600 sm:px-10 sm:py-4">Explore Philosophy</Link>
        </motion.div>
      </div>
    </section>
    </>
  );
}

// --- DNI Academy Page ---
export function DNIAcademyPage() {
  const academy = [
    'Natural Intelligence',
    'Conscious Awareness',
    'Healthy Relationships',
    'Self Realisation',
    'Meditation',
    'Human Evolution',
    'Purpose Discovery',
  ];

  const trainingFormat = [
    'Online Programs',
    'Residential Retreats',
    'Himalayan Camps',
    'Leadership Workshops',
    'Meditation Programs',
    'Student Awareness Camps',
  ];

  const whoCanJoin = [
    'Students',
    'Professionals',
    'Couples',
    'Families',
    'Entrepreneurs',
    'Teachers',
  ];

  const joinIcons = {
    Students: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9 12 4l9 5-9 5-9-5Z" />
        <path d="M7 11.5V15c0 1.7 2.2 3 5 3s5-1.3 5-3v-3.5" />
      </svg>
    ),
    Professionals: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="7" width="16" height="11" rx="2" />
        <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
        <path d="M4 11h16" />
      </svg>
    ),
    Couples: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="9" r="2.5" />
        <circle cx="15" cy="9" r="2.5" />
        <path d="M5.5 18c.5-2.3 2.2-4 4.5-4 1 0 2 .3 2.8.9" />
        <path d="M11.2 14.9c.8-.6 1.7-.9 2.8-.9 2.3 0 4 1.7 4.5 4" />
      </svg>
    ),
    Families: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="7.5" cy="9" r="2" />
        <circle cx="16.5" cy="9" r="2" />
        <circle cx="12" cy="7" r="2.2" />
        <path d="M3.5 18c.4-2 1.9-3.5 4-3.5 1.4 0 2.6.5 3.4 1.5" />
        <path d="M13.1 16c.8-1 2-1.5 3.4-1.5 2.1 0 3.6 1.5 4 3.5" />
        <path d="M8.5 18c.5-2.3 2-4 3.5-4s3 1.7 3.5 4" />
      </svg>
    ),
    Entrepreneurs: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v18" />
        <path d="M8.5 7.5c0-1.4 1.5-2.5 3.5-2.5s3.5 1.1 3.5 2.5-1 2.1-3.5 2.5-3.5 1.1-3.5 2.5S10 15 12 15s3.5-1.1 3.5-2.5" />
      </svg>
    ),
    Teachers: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v14H6.5A2.5 2.5 0 0 0 4 20z" />
        <path d="M4 6.5v13" />
        <path d="M9 8h7" />
        <path d="M9 12h7" />
      </svg>
    ),
  };

  const trainingIcons = {
    'Online Programs': (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="5" width="16" height="11" rx="2" />
        <path d="M10 19h4" />
        <path d="M12 16v3" />
      </svg>
    ),
    'Residential Retreats': (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 20h16" />
        <path d="M6 20v-8l6-4 6 4v8" />
        <path d="M10 20v-4h4v4" />
      </svg>
    ),
    'Himalayan Camps': (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m3 18 5-8 4 6 3-4 6 6" />
        <path d="m8 10 2-4 2 3 2-5 3 5" />
      </svg>
    ),
    'Leadership Workshops': (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="7" r="2.5" />
        <path d="M6 20c.6-2.8 2.9-4.5 6-4.5s5.4 1.7 6 4.5" />
        <path d="M4 12h4" />
        <path d="M16 12h4" />
      </svg>
    ),
    'Meditation Programs': (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 5c1.1 0 2 .9 2 2 0 .8-.5 1.5-1.2 1.8L14 11l2 2" />
        <path d="M10 11 8 13l2 2" />
        <path d="M7 19c1.2-2.3 3-3.5 5-3.5s3.8 1.2 5 3.5" />
        <circle cx="12" cy="5" r="2" />
      </svg>
    ),
    'Student Awareness Camps': (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9 12 4l9 5-9 5-9-5Z" />
        <path d="M7 11.5V15c0 1.7 2.2 3 5 3s5-1.3 5-3v-3.5" />
        <path d="M19 10v4" />
      </svg>
    ),
  };

  return (
    <>
      <Helmet><title>DNI Academy - Anubhuthi Foundation</title></Helmet>
      <section className="bg-[#faf6ef]">
        <section
          className="
relative
min-h-[90vh]
bg-cover
bg-center
text-white
overflow-hidden
"
        style={{
          backgroundImage: `url(${dniBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/65" />

        <div
          className="
relative z-10
max-w-7xl
mx-auto
px-6
py-28
"
        >
          <p
            className="
uppercase
tracking-[0.26em]
sm:tracking-[8px]
text-orange-400
text-[11px]
sm:text-sm
"
          >
            Decode of Natural Intelligence
          </p>

          <h1
            className="
text-4xl
sm:text-5xl
md:text-8xl
font-serif
font-bold
mt-6
leading-tight
"
          >
            DNI Academy
          </h1>

          <p
            className="
mt-6
text-lg
sm:text-xl
max-w-3xl
leading-8
sm:leading-10
text-gray-300
"
          >
            Structured learning ecosystem helping
            individuals awaken intelligence,
            purpose and conscious living.
          </p>

          <motion.div
            className="
grid
sm:grid-cols-2
md:grid-cols-3
gap-5
sm:gap-6
mt-14
sm:mt-20
"
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={staggerFadeUp}
          >
            {academy.map((item, index) => (
              <motion.div
                key={index}
                className="
bg-white/10
backdrop-blur
rounded-3xl
p-5
sm:p-6
text-center
break-words
"
                variants={fadeUpItem}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <div
          className="
max-w-7xl
mx-auto
grid
lg:grid-cols-2
gap-12
lg:gap-20
px-6
"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={slideLeftReveal}
          >
            <h2
              className="
text-3xl
sm:text-4xl
lg:text-5xl
font-bold
font-serif
mb-8
sm:mb-10
lg:mb-12
break-words
"
            >
              Who Can Join?
            </h2>

            <div className="space-y-5">
              {whoCanJoin.map((item, index) => (
                <p key={index} className="flex items-start gap-3 text-base sm:text-lg lg:text-xl">
                  <span className="mt-0.5 shrink-0 text-orange-400">{joinIcons[item]}</span>
                  <span className="break-words">{item}</span>
                </p>
              ))}
            </div>

            <img
              src={whojoin}
              className="
rounded-[24px]
sm:rounded-[30px]
mt-10
w-full
max-h-[26rem]
object-cover
"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={slideRightReveal}
          >
            <h2
              className="
text-3xl
sm:text-4xl
lg:text-5xl
font-bold
font-serif
mb-8
sm:mb-10
lg:mb-12
break-words
"
            >
              Training Format
            </h2>

            <div className="space-y-5">
              {trainingFormat.map((item, index) => (
                <p key={index} className="flex items-start gap-3 text-base sm:text-lg lg:text-xl">
                  <span className="mt-0.5 shrink-0 text-orange-400">{trainingIcons[item]}</span>
                  <span className="break-words">{item}</span>
                </p>
              ))}
            </div>

            <img
              src={training}
              className="
rounded-[24px]
sm:rounded-[30px]
mt-10
w-full
max-h-[26rem]
object-cover
"
            />
          </motion.div>
        </div>
      </section>

      <section
        className="
py-20
sm:py-24
lg:py-28
bg-white
"
      >
        <div
          className="
max-w-7xl
mx-auto
px-6
"
        >
          <h2
            className="
text-center
text-3xl
sm:text-4xl
lg:text-5xl
xl:text-6xl
font-serif
font-bold
break-words
"
          >
            DNI Programs
          </h2>

          <div
            className="
grid
sm:grid-cols-2
lg:grid-cols-4
gap-5
sm:gap-6
lg:gap-8
mt-12
sm:mt-16
lg:mt-20
"
          >
            {[
              'Foundation Course',
              'Leadership Program',
              'Meditation Intensive',
              'Himalayan Immersion',
            ].map((item, index) => (
              <div
                key={index}
                className="
bg-[#faf6ef]
rounded-[30px]
p-8
hover:-translate-y-3
duration-500
shadow-lg
"
              >
                <h3
                  className="
text-2xl
font-bold
mb-4
"
                >
                  {item}
                </h3>

                <p className="text-gray-600">
                  Transformative experiential learning.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="
py-20
sm:py-24
lg:py-28
bg-[#1d1208]
text-center
text-white
px-6
"
      >
        <h2
          className="
text-3xl
sm:text-4xl
lg:text-5xl
xl:text-6xl
font-serif
font-bold
break-words
"
        >
          One Purpose • One Humanity
          <br />
          One Education
        </h2>

        <p
          className="
max-w-3xl
mx-auto
mt-6
sm:mt-8
leading-7
sm:leading-9
text-base
sm:text-lg
text-gray-300
"
        >
          DNI Academy creates conscious
          leaders through awareness,
          intelligence and purpose.
        </p>

        <Link
          to="/careers"
          className="
inline-block
mt-10
bg-orange-500
hover:bg-orange-600
text-white
px-6
sm:px-10
py-3
sm:py-4
rounded-full
font-semibold
duration-300
"
        >
          Apply Now
        </Link>
        </section>
      </section>
    </>
  );
}

// --- Temple Restoration Page ---
export function TempleRestorationPage() {
  const objectives = [
    {
      title: 'Restore ancient temple structures',
      icon: (
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 20h16" />
          <path d="M6 20V10h12v10" />
          <path d="M3 10l9-6 9 6" />
          <path d="M10 20v-6h4v6" />
        </svg>
      ),
    },
    {
      title: 'Promote awareness through spiritual spaces',
      icon: (
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 20l16-16" />
          <path d="M14 4l6 6" />
          <path d="M4 10l4-4 3 3-4 4" />
          <path d="M10 20l4-4 3 3-4 4" />
        </svg>
      ),
    },
    {
      title: 'Support local communities',
      icon: (
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="8" cy="8" r="2.5" />
          <circle cx="16" cy="8" r="2.5" />
          <circle cx="12" cy="14" r="2.5" />
          <path d="M3.5 19c.6-2.5 2.5-4 4.5-4s3.9 1.5 4.5 4" />
          <path d="M11.5 19c.6-2.5 2.5-4 4.5-4s3.9 1.5 4.5 4" />
        </svg>
      ),
    },
    {
      title: 'Create meditation and learning centers',
      icon: (
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z" />
          <path d="M4 5.5v15" />
          <path d="M12 7h5" />
          <path d="M12 11h5" />
        </svg>
      ),
    },
    {
      title: 'Preserve cultural and philosophical heritage',
      icon: (
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 5c-4.5.2-8.5 2.8-10.4 6.8A7.7 7.7 0 0 0 7 15c0 3 2 5 5 5 1 0 2.1-.2 3.2-.7C19.2 17.5 21.8 13.5 22 9c-1.8 1.1-4 1.6-6.3 1.4-.2-2.3.3-4.5 1.3-6.4Z" />
          <path d="M4 20c3.5-1 6-3.5 7-7" />
        </svg>
      ),
    },
  ];

  const galleryCards = [
    {
      title: 'Before Restoration',
      image: beforeRestorationImage,
      alt: 'Ancient temple in a damaged state before restoration work',
    },
    {
      title: 'During Restoration',
      image: duringRestorationImage,
      alt: 'Temple restoration work with workers and scaffolding',
    },
    {
      title: 'After Restoration',
      image: afterRestorationImage,
      alt: 'Fully restored temple in warm daylight',
    },
    {
      title: 'Community & Culture',
      image: communityCultureImage,
      alt: 'Community gathering around a temple cultural activity',
    },
  ];

  return (
    <>
      <Helmet><title>Temple Restoration Mission - Anubhuthi Foundation</title></Helmet>

      <div className="bg-[#F5EFE4]">
        <section className="bg-[#F5EFE4] relative overflow-hidden">
          <div
            className="relative grid min-h-[auto] w-full grid-cols-1 items-stretch lg:min-h-[960px] lg:grid-cols-[45%_55%] lg:grid-rows-[auto_1fr]"
          >
            <div
              className="flex flex-col justify-center bg-[#021B3A]/85 px-5 pt-24 pb-10 text-white sm:px-6 sm:pt-28 sm:pb-12 lg:col-start-1 lg:row-start-1 lg:items-end lg:bg-[#021B3A]/80 lg:pt-28 lg:pb-10 lg:pl-12 lg:pr-8 lg:backdrop-blur-[3px]"
              style={{ zIndex: 20 }}
            >
              <div className="w-full max-w-[600px] text-left">
                <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs font-sans text-white/50 sm:text-sm">
                  <Link to="/" className="hover:text-[#D8A24A] transition-colors">Home</Link>
                  <span>{'>'}</span>
                  <span className="text-white/80">Temple Restoration</span>
                </nav>

                <h1 className="font-sans text-[30px] font-bold uppercase leading-[1.02] tracking-[-0.03em] text-white sm:text-[42px] md:text-[48px] lg:text-[56px] xl:text-[60px]">
                  TEMPLE RESTORATION MISSION
                </h1>

                <p className="mt-3 font-serif text-lg font-semibold italic text-[#D8A24A] sm:text-xl md:text-2xl">
                  Reviving Ancient Wisdom
                </p>

                <p className="mt-5 max-w-[550px] font-sans text-[15px] leading-[1.6] text-white opacity-90 sm:text-[17px] lg:text-[18px]">
                  Anubhuthi Foundation works toward restoring ancient temples and spiritual heritage spaces with support from local communities.
                </p>

                <p className="mt-4 max-w-[550px] font-sans text-sm leading-[1.6] text-white/80 sm:text-[15px]">
                  The mission aims to: preserve heritage, revive cultural wisdom, create awareness centers, and support conscious community development.
                </p>
              </div>
            </div>

            <motion.div
              className="flex flex-col justify-center border-t border-earth-100 bg-[#F5EFE4]/92 px-5 py-10 text-[#111827] sm:px-6 sm:py-12 lg:col-start-1 lg:row-start-2 lg:items-end lg:bg-[#F5EFE4]/80 lg:py-12 lg:pl-12 lg:pr-8 lg:backdrop-blur-[3px]"
              style={{ zIndex: 20 }}
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              variants={slideLeftReveal}
            >
              <div className="w-full max-w-[600px] text-left">
                <h2 className="mb-6 font-sans text-[24px] font-bold uppercase tracking-[-0.03em] text-[#12264D] sm:text-[28px] lg:text-[32px]">
                  OUR OBJECTIVES
                </h2>

                <div className="space-y-4 sm:space-y-5">
                  {objectives.map((item) => (
                    <div
                      key={item.title}
                      className="group flex items-start gap-3 rounded-2xl border border-[#D8A24A]/15 bg-white/70 px-4 py-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#D8A24A]/50 hover:bg-white hover:shadow-[0_14px_30px_rgba(15,23,42,0.12)] sm:gap-4"
                    >
                      <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF6E8] text-[#D8A24A] transition duration-300 group-hover:scale-110 group-hover:bg-[#D8A24A] group-hover:text-white">
                        {item.icon}
                      </div>
                      <p className="font-sans text-[15px] font-medium leading-[1.4] text-[#111827] sm:text-[17px] lg:text-[18px]">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div
              className="absolute inset-0 h-full w-full lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-2"
              style={{ zIndex: 1 }}
            >
              <img
                src={heroTempleImage}
                alt="Temple background"
                className="h-full w-full object-cover object-center lg:object-right"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#021B3A]/55 via-[#021B3A]/20 to-[#F5EFE4]/40 lg:hidden" />
            </div>
          </div>
        </section>

        <section className="relative bg-[#F5EFE4] py-12 sm:py-14 lg:py-16" style={{ zIndex: 20 }}>
          <div className="mx-auto w-full px-5 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {galleryCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  className="group overflow-hidden rounded-[20px] border-[3px] border-white bg-[#F7F1E7] shadow-[0_12px_34px_rgba(15,23,42,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,23,42,0.18)]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={revealViewport}
                  variants={fadeUpItem}
                  transition={{ ...revealTransition, delay: index * 0.08 }}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#021B3A]/0 transition-colors duration-500 ease-out group-hover:bg-[#021B3A]/10" />
                  </div>
                  <div className="px-4 py-4 text-center">
                    <p className="font-sans text-[17px] font-medium leading-tight text-[#14213D] sm:text-[18px] lg:text-[20px]">
                      {card.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-[#021B3A]">
          <div className="mx-auto w-full px-5 py-5 text-center font-sans text-[16px] font-medium tracking-[0.01em] text-[#D8A24A] sm:px-6 sm:text-[20px] lg:px-12 lg:text-[24px]">
            One Purpose <span className="mx-2 text-white">&bull;</span> One Humanity <span className="mx-2 text-white">&bull;</span> One Journey <span className="mx-2 text-white">&bull;</span> One Evolution
          </div>
        </div>
      </div>
    </>
  );
}

// --- Legal Page ---
export function LegalPage() {
  return (
    <>
      <Helmet><title>Legal & Compliance - Anubhuthi Foundation</title></Helmet>
      
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#011126]">
        {/* Soft background zoom animation */}
        <motion.div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${legalBg})` }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        {/* Dark blue gradient overlay for readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#011126]/95 via-[#011126]/70 to-[#011126]/40 md:to-transparent"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* LEFT SIDE */}
            <motion.div 
              className="text-white"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.2
                  }
                }
              }}
            >
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: "easeOut" } }
                }}
                className="mb-8 font-serif text-4xl font-bold leading-tight tracking-wide text-white drop-shadow-2xl md:text-6xl"
              >
                LEGAL &<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e7ad43] to-[#f9d689] drop-shadow-[0_0_20px_rgba(231,173,67,0.4)]">
                  COMPLIANCE
                </span>
              </motion.h1>

              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-light"
              >
                Anubhuthi Foundation operates as a Section 8<br className="hidden xl:block" />
                Non-Profit Organization under the Companies<br className="hidden xl:block" />
                Act, 2013.
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
              >
                <p className="text-[#e7ad43] font-semibold text-xl mb-6 font-serif tracking-wide">
                  The Foundation complies with:
                </p>

                <ul className="space-y-4 mb-10">
                  {[
                    'Companies Act',
                    'Income Tax Regulations',
                    'CSR Guidelines',
                    'Applicable MCA Regulations',
                    'FEMA Guidelines'
                  ].map((item, i) => (
                    <motion.li 
                      key={i}
                      variants={{
                        hidden: { opacity: 0, x: -30, filter: 'blur(5px)' },
                        visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: "easeOut" } }
                      }}
                      className="group flex items-center gap-4 text-lg text-gray-200 font-medium transition-all duration-300 hover:text-white hover:translate-x-2 cursor-default"
                    >
                      <span className="relative flex-shrink-0 w-7 h-7 rounded-full bg-[#e7ad43]/20 flex items-center justify-center border border-[#e7ad43]/40 transition-all duration-300 group-hover:bg-[#e7ad43]/40 group-hover:border-[#e7ad43]/80 group-hover:shadow-[0_0_15px_rgba(231,173,67,0.6)] group-hover:scale-110">
                        <svg className="w-4 h-4 text-[#e7ad43] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>

                <p className="text-gray-400 text-sm italic font-light">
                  (Subject to updates)
                </p>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE: Kept empty so the background image (legal scale) shines through */}
            <div className="hidden md:block"></div>

          </div>
        </div>
      </section>

      {/* Quote Section Before Footer */}
      <section className="bg-white py-16 sm:py-20 overflow-hidden">
        <motion.div 
          className="max-w-7xl mx-auto px-6 text-center flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
            visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1.2, ease: "easeOut" } }
          }}
        >
          <div className="py-6 sm:py-8 inline-block max-w-4xl">
            <motion.h3 
              whileHover={{ scale: 1.05, filter: "drop-shadow(0px 0px 12px rgba(249,115,22,0.5))" }}
              transition={{ duration: 0.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 tracking-wide m-0 cursor-default"
            >
              One Purpose &bull; One Humanity &bull; One Evolution
            </motion.h3>
          </div>
        </motion.div>
      </section>
    </>
  );
}

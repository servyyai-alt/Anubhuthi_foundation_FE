import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaArrowRight,
  FaBook,
  FaCalendarAlt,
  FaFileAlt,
  FaHandsHelping,
  FaHeadphones,
  FaImages,
  FaMapMarkerAlt,
  FaMountain,
  FaNewspaper,
  FaOm,
  FaPlay,
} from 'react-icons/fa';
import { SectionTitle, LinkButton, Card } from '../common';
import meditation from "../../assets/meditation.png";
import purity from "../../assets/purity.png";
import service from "../../assets/service.png";
import truth from "../../assets/truth.png";
import study from "../../assets/study.png";
import community from "../../assets/community.png";
import purpose from "../../assets/purpose.png";
import awareness from "../../assets/awareness.png";
import intelligence from "../../assets/intelligence.png";
import potential from "../../assets/potential.png";
import founder from "../../assets/hero-section.png";

const programIconMap = {
  meditation: FaOm,
  retreat: FaMountain,
  certification: FaBook,
  training: FaBook,
  workshop: FaHandsHelping,
  healing: FaHandsHelping,
  yoga: FaOm,
};

const mediaIconMap = {
  video: FaPlay,
  article: FaNewspaper,
  podcast: FaHeadphones,
  gallery: FaImages,
  document: FaFileAlt,
};

const formatDate = (value, options = { day: 'numeric', month: 'short', year: 'numeric' }) => {
  if (!value) return 'Date to be announced';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date to be announced';

  return new Intl.DateTimeFormat('en-IN', options).format(date);
};

const formatProgramPrice = (program) => {
  if (program?.isFree || !program?.price) return 'Free';
  return `₹${Number(program.price).toLocaleString('en-IN')}`;
};

const getMediaActionLabel = (type) => {
  if (type === 'podcast') return 'Listen Now';
  if (type === 'article') return 'Read Publication';
  if (type === 'document') return 'Open Document';
  if (type === 'gallery') return 'View Gallery';
  return 'Watch Now';
};

// --- About Section ---

export function AboutSection() {

const pillars = [

{
image: purpose,
title:"Purpose",
desc:"Discover why you exist and align life with meaning."
},

{
image: awareness,
title:"Awareness",
desc:"Observe consciously and understand yourself deeply."
},

{
image: intelligence,
title:"Inner Intelligence",
desc:"Awaken natural wisdom beyond conditioning."
},

{
image: potential,
title:"Extraordinary Potential",
desc:"Unlock the highest version of yourself."
}

];

const foundationFocusAreas = [
"Human Awareness",
"Emotional Understanding",
"Conscious Relationships",
"Meditation & Self-Realization",
"Nature-Based Learning",
"Tourism & Retreat Experiences",
"Spiritual Awareness",
"Social Transformation"
];



return (

<section className="py-28 bg-[#fffaf5]">

<div className="max-w-7xl mx-auto px-6">


{/* Heading */}

<div className="text-center max-w-4xl mx-auto">

<span className="
uppercase
tracking-[5px]
text-orange-500
text-sm
">

ABOUT FOUNDATION

</span>


<h2 className="
mt-6
text-5xl
md:text-7xl
font-bold
leading-tight
text-[#2f1f10]
">

What Is <br/>
Anubhuthi Foundation?

</h2>


<p className="
mt-8
text-lg
leading-9
text-gray-600
">

Anubhuthi Foundation is a non-profit human evolution organization established to guide individuals toward conscious living through the philosophy of Natural Intelligence.

</p>

<p className="
mt-6
text-base
leading-8
text-gray-600
">

The Foundation combines human awareness, emotional understanding, conscious relationships, meditation and self-realization, nature-based learning, tourism and retreat experiences, spiritual awareness, and social transformation.

</p>

</div>


<div className="mt-12 max-w-6xl mx-auto">

<p className="
text-sm
font-semibold
tracking-[4px]
uppercase
text-orange-500
text-center
mb-6
">
The Foundation Combines
</p>

<div className="
grid
sm:grid-cols-2
lg:grid-cols-4
gap-4
">

{foundationFocusAreas.map((area) => (
<div
key={area}
className="
bg-white
border
border-orange-100
rounded-2xl
px-5
py-4
text-center
text-[#2f1f10]
font-medium
shadow-sm
"
>
{area}
</div>
))}

</div>

</div>




{/* Cards */}

<div className="
grid
md:grid-cols-2
lg:grid-cols-4
gap-8
mt-20
">

{pillars.map((item,index)=>(

<div
key={index}
className="
bg-white
rounded-[30px]
overflow-hidden
hover:-translate-y-3
hover:shadow-2xl
duration-500
">

<img
src={item.image}
alt=""
className="
w-full
h-[250px]
object-cover
"
/>


<div className="p-8">

<h3 className="
text-2xl
font-bold
text-[#2f1f10]
">

{item.title}

</h3>


<p className="
mt-4
text-gray-600
leading-8
">

{item.desc}

</p>

</div>

</div>

))}

</div>




{/* Vision Mission */}

<div className="
mt-28
grid
lg:grid-cols-2
gap-10
">


{/* Vision */}

<div className="
bg-orange-50
rounded-[35px]
p-12
border
border-orange-100
">

<span className="
uppercase
tracking-[5px]
text-orange-500
text-sm
">

OUR VISION

</span>


<h2 className="
mt-5
text-4xl
font-bold
text-[#2f1f10]
leading-tight
">

Creating Humanity <br/>
Rooted In Awareness

</h2>



<p className="
mt-8
text-lg
leading-9
text-gray-600
">

To build a consciously evolved society where every individual lives with awareness, responsibility, emotional clarity, and purpose.

</p>



<div className="
mt-10
border-t
border-orange-100
pt-8
">

<h3 className="
text-5xl
font-bold
text-orange-500
">

1M+

</h3>

<p className="text-gray-500">

Lives To Impact

</p>

</div>

</div>



{/* Mission */}

<div className="
bg-[#1d1d1d]
text-white
rounded-[35px]
p-12
">

<span className="
uppercase
tracking-[5px]
text-orange-400
text-sm
">

OUR MISSION

</span>


<h2 className="
mt-5
text-4xl
font-bold
leading-tight
">

Transform Humanity Through Awareness

</h2>



<div className="
mt-10
space-y-6
text-gray-300
">

<p>• Guide humanity beyond confusion and unconscious living</p>

<p>• Help individuals grow in awareness and responsibility</p>

<p>• Support emotional maturity and conscious relationships</p>

<p>• Create nature-based learning, retreats, and transformation experiences</p>

<p>• Encourage purposeful living and social transformation</p>

</div>



<button className="
mt-10
bg-orange-500
hover:bg-orange-600
px-8
py-4
rounded-full
font-semibold
">

Join Mission

</button>

</div>

</div>





{/* Founder */}

<div className="
mt-28
grid
lg:grid-cols-2
gap-16
items-center
">


<div>

<img
src={founder}
alt=""
className="
w-[450px]
mx-auto
drop-shadow-2xl
"
/>

</div>



<div>

<span className="
uppercase
tracking-[5px]
text-orange-500
text-sm
">

FOUNDER MESSAGE

</span>


<h2 className="
mt-5
text-5xl
font-bold
text-[#2f1f10]
">

Guru Nana

</h2>


<p className="
mt-8
text-gray-600
leading-10
text-xl
">

“Human evolution begins when people
understand who they truly are,
why they exist and how consciously
they should live.”

</p>



<button className="
mt-10
bg-orange-500
hover:bg-orange-600
px-10
py-4
rounded-full
text-white
font-semibold
">

Explore Journey

</button>

</div>

</div>




{/* Bottom */}

<div className="
mt-24
text-center
border-t
pt-12
">

<h3 className="
text-3xl
font-serif
text-orange-500
">

One Purpose • One Humanity • One Evolution

</h3>

</div>



</div>

</section>

);

}

// --- Core Values -give--
const values = [
  {
    image: meditation,
    title: "Sadhana",
    desc: "Daily spiritual practice for awakening and inner transformation.",
  },

  {
    image: purity,
    title: "Sattva",
    desc: "Purity in thought, action and conscious living.",
  },

  {
    image: service,
    title: "Seva",
    desc: "Selfless service as a path toward liberation.",
  },

  {
    image: truth,
    title: "Satya",
    desc: "Commitment to truth in all dimensions of life.",
  },

  {
    image: study,
    title: "Svadhyaya",
    desc: "Self-study through scripture and inner observation.",
  },

  {
    image: community,
    title: "Sangha",
    desc: "The power of conscious community and growth.",
  },
];


export function CoreValuesSection() {
  return (
    <section className="py-28 bg-[#faf7f2]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">

          <span className="
          uppercase
          tracking-[6px]
          text-orange-500
          text-sm
          ">
            OUR FOUNDATION
          </span>

          <h2 className="
          text-5xl
          font-serif
          font-bold
          mt-5
          text-[#4b2f1f]
          ">
            The Six Pillars of Anubhuthi
          </h2>

          <p className="
          mt-6
          text-lg
          text-gray-600
          max-w-3xl
          mx-auto
          ">
            Ancient wisdom guiding conscious living,
            service and human transformation.
          </p>

        </div>



        <div className="
        grid
        md:grid-cols-2
        lg:grid-cols-3
        gap-8
        ">

          {values.map((item) => (

            <div
              key={item.title}
              className="
              bg-white
              rounded-[30px]
              overflow-hidden
              shadow-md
              hover:-translate-y-3
              transition
              duration-300
              "
            >

              <img
                src={item.image}
                className="
                h-[240px]
                w-full
                object-cover
                "
              />

              <div className="p-8">

                <h3 className="
                text-3xl
                font-serif
                font-bold
                text-[#4b2f1f]
                ">
                  {item.title}
                </h3>

                <p className="
                mt-4
                text-gray-600
                leading-8
                ">
                  {item.desc}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

// --- Featured Programs ---
const defaultPrograms = [
  { icon: FaOm, category: 'Meditation', title: 'Advanced Vipassana Retreat', duration: '10 Days', level: 'Intermediate', price: 'Free', desc: 'A deep dive into the ancient practice of insight meditation as taught in the Theravada tradition.' },
  { icon: FaMountain, category: 'Retreat', title: 'Kedarnath Pilgrimage', duration: '7 Days', level: 'All Levels', price: '₹25,000', desc: 'Sacred journey to one of the most powerful Jyotirlingas in the Himalayas with guided spiritual practices.' },
  { icon: FaBook, category: 'Training', title: 'DNI Teacher Training', duration: '6 Months', level: 'Advanced', price: '₹85,000', desc: 'Comprehensive certification program in Vedic philosophy, yoga, and conscious leadership.' },
  { icon: FaHandsHelping, category: 'Workshop', title: 'Pranayama & Sound Healing', duration: '3 Days', level: 'Beginner', price: '₹8,000', desc: 'Explore the transformative power of breath and sacred sound to awaken dormant energies.' },
];

export function FeaturedProgramsSection({ programs = [] }) {
  const items = programs.length
    ? programs.slice(0, 4).map((program) => ({
        icon: programIconMap[program.category] || FaBook,
        category: (program.category || 'program').replace(/-/g, ' '),
        title: program.title,
        image: program.image,
        duration: program.duration || 'Schedule coming soon',
        level: program.level ? program.level.replace(/(^\w)|(\s\w)/g, (match) => match.toUpperCase()) : 'All Levels',
        price: formatProgramPrice(program),
        desc: program.shortDescription || program.description || 'Details coming soon.',
        link: program._id ? `/programs/${program._id}` : '/programs',
      }))
    : defaultPrograms.map((program) => ({
        ...program,
        link: '/programs',
      }));

  return (
    <section className="py-24 bg-parchment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionTitle
            subtitle="Sacred Offerings"
            title="Featured Programs & Trainings"
          />
          <LinkButton to="/programs" variant="outline" size="sm">View All Programs</LinkButton>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((prog, i) => (
            <motion.div key={prog.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <div className="relative">
                  <div className="h-40 bg-gradient-to-br from-saffron-100 to-earth-100 flex items-center justify-center overflow-hidden">
                    {prog.image ? (
                      <img src={prog.image} alt={prog.title} className="h-full w-full object-cover" />
                    ) : (
                      <prog.icon className="text-saffron-500 text-5xl" />
                    )}
                  </div>
                  <span className="absolute top-3 left-3 bg-white text-saffron-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                    {prog.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-serif font-bold text-earth-800 mb-2 leading-snug">{prog.title}</h3>
                  <p className="text-earth-500 text-sm leading-relaxed mb-4 flex-1">{prog.desc}</p>
                  <div className="flex items-center justify-between text-xs text-earth-400 mb-4">
                    <span>⏱ {prog.duration}</span>
                    <span>• {prog.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-saffron-600">{prog.price}</span>
                    <Link to={prog.link} className="text-earth-600 hover:text-saffron-600 text-sm font-medium transition-colors">
                      Learn More →
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function UpcomingEventsSection({ events = [] }) {
  const items = events.slice(0, 3);

  if (!items.length) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionTitle
            subtitle="Events"
            title="Upcoming Gatherings"
            description="Everything your admin team publishes in events will show up here automatically."
          />
          <LinkButton to="/events" variant="outline" size="sm">View All Events</LinkButton>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {items.map((event, index) => (
            <motion.div
              key={event._id || event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col p-6">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-saffron-500 mb-2">
                      {(event.type || 'event').replace(/-/g, ' ')}
                    </p>
                    <h3 className="font-serif text-2xl font-bold text-earth-800 leading-tight">
                      {event.title}
                    </h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-saffron-50 text-saffron-600 flex items-center justify-center flex-shrink-0">
                    <FaCalendarAlt size={20} />
                  </div>
                </div>

                <p className="text-earth-500 text-sm leading-relaxed mb-6 flex-1">
                  {event.shortDescription || event.description || 'More details will be shared soon.'}
                </p>

                <div className="space-y-3 text-sm text-earth-500 mb-6">
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-saffron-500" />
                    <span>{formatDate(event.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-saffron-500" />
                    <span>{event.isOnline ? 'Online Event' : event.location || 'Location to be announced'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-saffron-600">
                    {event.isFree ? 'Free Entry' : `₹${Number(event.price || 0).toLocaleString('en-IN')}`}
                  </span>
                  <Link to="/events" className="inline-flex items-center gap-2 text-earth-700 hover:text-saffron-600 text-sm font-medium transition-colors">
                    Explore <FaArrowRight size={12} />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MediaPublicationsSection({ mediaItems = [] }) {
  const items = mediaItems.slice(0, 3);

  if (!items.length) return null;

  return (
    <section className="py-24 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionTitle
            subtitle="Media & Publications"
            title="Fresh From The Wisdom Library"
            description="New videos, articles, podcasts, and documents added by admin will reflect here automatically."
          />
          <LinkButton to="/media" variant="outline" size="sm">Browse Media</LinkButton>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const Icon = mediaIconMap[item.type] || FaNewspaper;
            const href = item.type === 'video' ? '/media' : item.url || '/media';
            const isExternal = item.type !== 'video' && item.url;

            return (
              <motion.div
                key={item._id || item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <div className="h-44 bg-gradient-to-br from-earth-100 to-saffron-50 flex items-center justify-center">
                    <Icon className="text-earth-400 text-5xl" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-xs uppercase tracking-[0.25em] text-saffron-500 mb-3">
                      {(item.type || 'media').replace(/-/g, ' ')}
                    </p>
                    <h3 className="font-serif text-2xl font-bold text-earth-800 mb-3 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-earth-500 text-sm leading-relaxed mb-6 flex-1">
                      {item.description || 'This publication is now available in our media library.'}
                    </p>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs text-earth-400">
                        {formatDate(item.publishDate, { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      {isExternal ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-earth-700 hover:text-saffron-600 text-sm font-medium transition-colors"
                        >
                          {getMediaActionLabel(item.type)} <FaArrowRight size={12} />
                        </a>
                      ) : (
                        <Link to={href} className="inline-flex items-center gap-2 text-earth-700 hover:text-saffron-600 text-sm font-medium transition-colors">
                          {getMediaActionLabel(item.type)} <FaArrowRight size={12} />
                        </Link>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- Why Join Us ---
const reasons = [
  { title: 'Authentic Lineage', desc: 'Our teachings come from an unbroken chain of master-student transmission rooted in the Himalayan tradition.', icon: '🏔️' },
  { title: 'Transformative Community', desc: 'Join a global sangha of dedicated seekers supporting each other on the path.', icon: '🤝' },
  { title: 'Holistic Approach', desc: 'We integrate physical practices, mental training, emotional healing, and spiritual awakening.', icon: '☯️' },
  { title: 'Sacred Locations', desc: 'Our retreats and programs happen in the most powerful spiritual vortexes in India and beyond.', icon: '🕌' },
];

export function WhyJoinUsSection() {
  return (
    <section className="py-24 bg-earth-900 mandala-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-transparent to-amber-950/50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="The Anubhuthi Difference"
          title="Why Join Our Movement"
          description="We are not just another spiritual organization. We are a living ecosystem of transformation."
          center
          light
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <div className="text-5xl mb-4">{r.icon}</div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">{r.title}</h3>
              <p className="text-earth-300 text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12 flex flex-wrap gap-4 justify-center">
          <LinkButton to="/about" variant="primary" size="lg">Discover Our Story</LinkButton>
          <LinkButton to="/programs" variant="white" size="lg">Explore Programs</LinkButton>
        </div>
      </div>
    </section>
  );
}

// --- Testimonials Preview ---
export function TestimonialsPreview({ testimonials = [] }) {
  const defaults = [
    { name: 'Priya Sharma', designation: 'IT Professional', content: 'The 10-day retreat completely transformed my relationship with myself. I came back with clarity I had never experienced before.', rating: 5 },
    { name: 'Arjun Mehta', designation: 'Entrepreneur', content: 'DNI Academy gave me the philosophical framework and meditative tools to lead with consciousness. Truly life-changing.', rating: 5 },
    { name: 'Sunita Rao', designation: 'Teacher', content: 'The Kedarnath pilgrimage with Anubhuthi was not just a trek — it was an initiation into something much deeper.', rating: 5 },
  ];
  const items = testimonials.length ? testimonials : defaults;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="Voices of Transformation" title="What Seekers Say" center />
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {items.slice(0, 3).map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-8 bg-parchment rounded-2xl relative"
            >
              <div className="text-saffron-400 text-5xl font-serif leading-none mb-4">"</div>
              <p className="text-earth-600 italic leading-relaxed mb-6">{t.content}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-saffron-200 rounded-full flex items-center justify-center font-serif font-bold text-saffron-700">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-earth-800 text-sm">{t.name}</div>
                  <div className="text-earth-400 text-xs">{t.designation}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <LinkButton to="/testimonials" variant="outline">Read More Stories</LinkButton>
        </div>
      </div>
    </section>
  );
}

// --- CTA Banner ---
export function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-saffron-600 to-earth-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern opacity-20" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="sanskrit-text text-saffron-200 text-3xl mb-4">ॐ तत् सत्</div>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
          Begin Your Sacred Journey Today
        </h2>
        <p className="text-saffron-100 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Whether you are taking your first step on the spiritual path or deepening an existing practice, Anubhuthi Foundation is here to guide and support you.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <LinkButton to="/programs" variant="white" size="lg">Explore Programs</LinkButton>
          <LinkButton to="/contact" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold">
            Get in Touch
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

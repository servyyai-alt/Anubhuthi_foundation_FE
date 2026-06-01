import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

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
import bg from "../../src/assets/philosophy-bg.png";
import meditation from "../../src/assets/meditation1.png";
import human from "../assets/humanbirth.png";
import awareness from "../assets/awareness.png";
import emotion from "../assets/emotion.png";
import dna from "../assets/dna.png";
import intelligence from "../assets/intelligence.png";
import evolution from "../assets/evolution.png";
import purpose from "../assets/purpose.png";
import dniBg from "../assets/dni-bg.png";
import whojoin from "../assets/whojoin.png";
import training from "../assets/training.png";





// --- About Page ---
export function AboutPage() {
  return (
    <>
      <Helmet><title>About Us - Anubhuthi Foundation</title></Helmet>
      <PageHeader title="About Us" subtitle="Our Story" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'About' }]} />


      <HomeAboutSection />

    </>
  );
}

// --- Philosophy Page ---
export function PhilosophyPage() {


const areas=[

{title:"Human Birth",image:human},
{title:"Awareness",image:awareness},
{title:"Emotions",image:emotion},
{title:"DNA",image:dna},
{title:"Inner Intelligence",image:intelligence},
{title:"Self Evolution",image:evolution},
{title:"Purpose",image:purpose}

]

return(

<section
className="
relative
py-32
bg-cover
bg-center
overflow-hidden
text-white
"
style={{
backgroundImage:`url(${bg})`
}}
>

<div className="
absolute inset-0
bg-gradient-to-b
from-black/60
via-black/50
to-black/80
"/>



<div className="
relative z-10
max-w-7xl
mx-auto
px-6
">

{/* HEADING */}

<div className="text-center">

<p className="
uppercase
tracking-[8px]
text-orange-400
text-sm
mb-6
">

ANUBHUTHI PHILOSOPHY

</p>


<h1 className="
font-serif
text-6xl
md:text-8xl
font-bold
leading-tight
">

Conscious Human Evolution

</h1>


<p className="
mt-8
max-w-2xl
mx-auto
text-gray-300
text-xl
leading-9
">

Understanding life through awareness,
purpose and inner transformation.

</p>

</div>



{/* TOP CIRCLES */}

<div className="
grid
grid-cols-2
md:grid-cols-4
lg:grid-cols-7
gap-10
mt-24
">

{areas.map((item,index)=>(

<div
key={index}
className="
text-center
group
"
>

<div className="
w-28
h-28
mx-auto
rounded-full
overflow-hidden
border-2
border-orange-400
shadow-xl
group-hover:scale-110
duration-500
">

<img
src={item.image}
className="
w-full
h-full
object-cover
"
/>

</div>

<h3 className="
mt-5
font-semibold
text-lg
">

{item.title}

</h3>

</div>

))}

</div>



{/* MIDDLE */}

<div className="
grid
lg:grid-cols-2
gap-24
items-center
mt-32
">

<div>

<p className="
uppercase
tracking-[6px]
text-orange-400
mb-5
">

Conscious Understanding

</p>


<h2 className="
font-serif
text-6xl
font-bold
leading-tight
">

To Live Meaningfully
Understand:

</h2>


<div className="
space-y-7
mt-12
text-xl
text-gray-200
">

<p>✓ Your Body</p>

<p>✓ Your Mind</p>

<p>✓ Your Emotions</p>

<p>✓ Your Experiences</p>

<p>✓ Your Purpose</p>

<p>✓ Your Responsibility</p>

</div>

</div>



<div className="relative">

<div className="
absolute
inset-0
bg-orange-500/20
blur-[120px]
"/>


<img
src={meditation}
className="
relative
rounded-[40px]
shadow-2xl
w-full
"
/>

</div>

</div>




{/* EVOLUTION QUOTE */}

<div className="
mt-32
bg-white/5
backdrop-blur-xl
border
border-white/10
rounded-[40px]
p-16
text-center
">

<h2 className="
font-serif
text-5xl
font-bold
leading-tight
">

One Purpose • One Humanity
<br/>
One Evolution

</h2>


<p className="
mt-8
max-w-3xl
mx-auto
text-gray-300
leading-9
text-lg
">

Human transformation begins through
awareness, responsibility and conscious
living.

</p>


<button className="
mt-10
bg-orange-500
hover:bg-orange-600
px-10
py-4
rounded-full
font-semibold
duration-300
">

Explore Philosophy

</button>

</div>


</div>

</section>

)


}

// --- DNI Academy Page ---
export function DNIAcademyPage() {


const academy = [

"Natural Intelligence",
"Conscious Awareness",
"Healthy Relationships",
"Self Realisation",
"Meditation",
"Human Evolution",
"Purpose Discovery"

]

const trainingFormat=[

"Online Programs",
"Residential Retreats",
"Himalayan Camps",
"Leadership Workshops",
"Meditation Programs",
"Student Awareness Camps"

]

const whoCanJoin=[

"Students",
"Professionals",
"Couples",
"Families",
"Entrepreneurs",
"Teachers"

]


return(

<section className="bg-[#faf6ef]">

{/* HERO */}

<section
className="
relative
min-h-[90vh]
bg-cover
bg-center
text-white
"
style={{
backgroundImage:`url(${dniBg})`
}}
>

<div className="absolute inset-0 bg-black/65"/>

<div className="
relative z-10
max-w-7xl
mx-auto
px-6
py-28
">

<p className="
uppercase
tracking-[8px]
text-orange-400
">

Decode of Natural Intelligence

</p>


<h1 className="
text-6xl
md:text-8xl
font-serif
font-bold
mt-6
leading-tight
">

DNI Academy

</h1>


<p className="
mt-8
text-xl
max-w-3xl
leading-10
text-gray-300
">

Structured learning ecosystem helping
individuals awaken intelligence,
purpose and conscious living.

</p>


<div className="
grid
md:grid-cols-3
gap-8
mt-20
">

{academy.map((item,index)=>(

<div
key={index}
className="
bg-white/10
backdrop-blur
rounded-3xl
p-6
text-center
"
>

{item}

</div>

))}

</div>

</div>

</section>



{/* WHO CAN JOIN */}

<section className="py-28">

<div className="
max-w-7xl
mx-auto
grid
lg:grid-cols-2
gap-20
px-6
">

<div>

<h2 className="
text-5xl
font-bold
font-serif
mb-12
">

Who Can Join?

</h2>


<div className="space-y-5">

{whoCanJoin.map((item,index)=>(

<p key={index}
className="text-xl">

✓ {item}

</p>

))}

</div>


<img
src={whojoin}
className="
rounded-[30px]
mt-10
"
/>

</div>




<div>

<h2 className="
text-5xl
font-bold
font-serif
mb-12
">

Training Format

</h2>


<div className="space-y-5">

{trainingFormat.map((item,index)=>(

<p key={index}
className="text-xl">

✓ {item}

</p>

))}

</div>


<img
src={training}
className="
rounded-[30px]
mt-10
"
/>

</div>

</div>

</section>




{/* PROGRAMS */}

<section className="
py-28
bg-white
">

<div className="
max-w-7xl
mx-auto
px-6
">

<h2 className="
text-center
text-6xl
font-serif
font-bold
">

DNI Programs

</h2>


<div className="
grid
md:grid-cols-2
lg:grid-cols-4
gap-8
mt-20
">

{[
"Foundation Course",
"Leadership Program",
"Meditation Intensive",
"Himalayan Immersion"

].map((item,index)=>(

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

<h3 className="
text-2xl
font-bold
mb-4
">

{item}

</h3>

<p className="text-gray-600">

Transformative experiential learning.

</p>

<button className="
mt-8
bg-orange-500
text-white
px-8
py-3
rounded-full
">

Explore

</button>

</div>

))}

</div>

</div>

</section>




{/* CTA */}

<section className="
py-28
bg-[#1d1208]
text-center
text-white
">

<h2 className="
text-6xl
font-serif
font-bold
">

One Purpose • One Humanity
<br/>

One Education

</h2>


<p className="
max-w-3xl
mx-auto
mt-8
leading-9
text-gray-300
">

DNI Academy creates conscious
leaders through awareness,
intelligence and purpose.

</p>


<button className="
mt-10
bg-orange-500
px-10
py-4
rounded-full
">

Apply Now

</button>

</section>

</section>

)


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
      
      <div className="bg-[#F5EFE4] pt-20">
        
        {/* Combined Hero + Objectives Grid Container */}
        <section className="bg-[#F5EFE4] relative overflow-hidden">
          <div 
            className="w-full grid grid-cols-1 lg:grid-cols-[45%_55%] lg:grid-rows-[auto_1fr] items-stretch relative"
          >
            {/* Left Content Column - Row 1: Hero Content Area */}
            <div 
              className="bg-[#021B3A]/80 lg:backdrop-blur-[3px] text-white py-12 px-6 lg:py-10 lg:pl-12 lg:pr-8 flex flex-col justify-center items-end lg:col-start-1 lg:row-start-1"
              style={{ zIndex: 20 }}
            >
              <div className="w-full max-w-[600px] text-left">
                {/* Breadcrumb */}
                <nav className="text-sm text-white/50 mb-4 flex items-center gap-1.5 font-sans">
                  <Link to="/" className="hover:text-[#D8A24A] transition-colors">Home</Link>
                  <span>›</span>
                  <span className="text-white/80">Temple Restoration</span>
                </nav>

                {/* Title */}
                <h1 className="font-sans text-[36px] font-bold uppercase leading-[0.98] tracking-[-0.03em] text-white sm:text-[48px] lg:text-[56px] xl:text-[60px]">
                  TEMPLE RESTORATION MISSION
                </h1>
                
                {/* Subtitle */}
                <p className="mt-3 font-serif text-xl font-semibold italic text-[#D8A24A] sm:text-2xl">
                  Reviving Ancient Wisdom
                </p>

                {/* Hero Paragraph */}
                <p className="mt-5 font-sans text-[16px] leading-[1.5] text-white opacity-90 sm:text-[18px] max-w-[550px]">
                  Anubhuthi Foundation works toward restoring ancient temples and spiritual heritage spaces with support from local communities.
                </p>

                {/* Aims Paragraph */}
                <p className="mt-4 font-sans text-[15px] leading-[1.5] text-white/80 max-w-[550px]">
                  The mission aims to: preserve heritage, revive cultural wisdom, create awareness centers, and support conscious community development.
                </p>
              </div>
            </div>

            {/* Left Content Column - Row 2: Objectives Content Area */}
            <div 
              className="bg-[#F5EFE4]/80 lg:backdrop-blur-[3px] text-[#111827] py-16 px-6 lg:py-12 lg:pl-12 lg:pr-8 lg:col-start-1 lg:row-start-2 border-t border-earth-100 flex flex-col justify-center items-end"
              style={{ zIndex: 20 }}
            >
              <div className="w-full max-w-[600px] text-left">
                <h2 className="font-sans text-[28px] font-bold uppercase tracking-[-0.03em] text-[#12264D] sm:text-[32px] mb-6">
                  OUR OBJECTIVES
                </h2>
                
                <div className="space-y-5">
                  {objectives.map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center text-[#D8A24A]">
                        {item.icon}
                      </div>
                      <p className="font-sans text-[16px] font-medium leading-[1.16] text-[#111827] sm:text-[18px]">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Background Temple Image spanning both columns and rows */}
            <div 
              className="absolute inset-0 lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-2 w-full h-full"
              style={{ zIndex: 1 }}
            >
              <img
                src={heroTempleImage}
                alt="Temple background"
                className="w-full h-full object-cover object-center lg:object-right"
              />
            </div>

          </div>
        </section>

        {/* Gallery Cards Section */}
        <section className="bg-[#F5EFE4] py-16 relative" style={{ zIndex: 20 }}>
          <div className="mx-auto w-full px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
              {galleryCards.map((card) => (
                <div
                  key={card.title}
                  className="overflow-hidden rounded-[20px] border-[3px] border-white bg-[#F7F1E7] shadow-[0_12px_34px_rgba(15,23,42,0.14)]"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-4 py-4 text-center">
                    <p className="font-sans text-[18px] font-medium leading-tight text-[#14213D] sm:text-[20px]">
                      {card.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Gold-Text Footer Bar */}
        <div className="bg-[#021B3A]">
          <div className="mx-auto w-full px-6 lg:px-12 py-6 text-center font-sans text-[20px] font-medium tracking-[0.01em] text-[#D8A24A] sm:text-[24px]">
            One Purpose <span className="mx-2 text-white">•</span> One Humanity <span className="mx-2 text-white">•</span> One Journey <span className="mx-2 text-white">•</span> One Evolution
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
      <PageHeader title="Legal & Compliance" subtitle="Transparency" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Legal' }]} />
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {[
            { title: 'Registration & Legal Status', content: 'Anubhuthi Foundation is registered as a non-profit charitable trust under the Indian Trusts Act 1882. Registration No: [REG-2015-XXXX]. We are also registered under the Foreign Contribution Regulation Act (FCRA) and are eligible to receive international donations.' },
            { title: '80G Tax Exemption', content: 'All donations to Anubhuthi Foundation are eligible for tax deduction under Section 80G of the Income Tax Act, 1961. Donors will receive official receipts for all contributions above Rs 500.' },
            { title: 'Annual Reports & Audits', content: 'Our financial statements are audited annually by independent chartered accountants. Annual reports are available for public inspection and will be provided upon written request.' },
            { title: 'Privacy Policy', content: 'We are committed to protecting your personal information. We collect only the data necessary to serve you and do not sell or share your information with third parties. All payment processing is handled through secure, PCI-compliant payment gateways.' },
            { title: 'Refund Policy', content: 'Program fees are refundable up to 14 days before the program start date, minus a 10% administrative fee. Donations are non-refundable but may be redirected to another cause of your choice upon written request within 30 days.' },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="font-serif text-2xl font-bold text-earth-800 mb-3">{section.title}</h2>
              <p className="text-earth-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

import React from 'react';
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
      <Helmet><title>About Us — Anubhuthi Foundation</title></Helmet>
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
  return (
    <>
      <Helmet><title>Temple Restoration Mission — Anubhuthi Foundation</title></Helmet>
      <PageHeader title="Temple Restoration Mission" subtitle="Preserving Sacred Heritage" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Temple Restoration' }]} />
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-7xl mb-4">🕌</div>
            <h2 className="font-serif text-4xl font-bold text-earth-800 mb-5">Restoring India's Sacred Soul</h2>
            <p className="text-earth-600 text-lg leading-relaxed max-w-3xl mx-auto">
              Hundreds of ancient temples across the Himalayas lie in states of neglect — crumbling walls, broken idols, discontinued rituals. These are not merely buildings. They are living repositories of consciousness technology, built by enlightened beings to serve as portals of transformation.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { num: '15+', label: 'Temples Restored', icon: '🏛️' },
              { num: '₹50L+', label: 'Funds Mobilized', icon: '💛' },
              { num: '200+', label: 'Volunteers Engaged', icon: '🤝' },
            ].map(item => (
              <div key={item.label} className="text-center p-6 bg-saffron-50 rounded-2xl">
                <div className="text-4xl mb-2">{item.icon}</div>
                <div className="font-serif text-3xl font-bold text-saffron-600 mb-1">{item.num}</div>
                <div className="text-earth-600 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <LinkButton to="/donate?purpose=temple-restoration" variant="primary" size="lg">Support Temple Restoration</LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}

// --- Legal Page ---
export function LegalPage() {
  return (
    <>
      <Helmet><title>Legal & Compliance — Anubhuthi Foundation</title></Helmet>
      <PageHeader title="Legal & Compliance" subtitle="Transparency" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Legal' }]} />
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {[
            { title: 'Registration & Legal Status', content: 'Anubhuthi Foundation is registered as a non-profit charitable trust under the Indian Trusts Act 1882. Registration No: [REG-2015-XXXX]. We are also registered under the Foreign Contribution Regulation Act (FCRA) and are eligible to receive international donations.' },
            { title: '80G Tax Exemption', content: 'All donations to Anubhuthi Foundation are eligible for tax deduction under Section 80G of the Income Tax Act, 1961. Donors will receive official receipts for all contributions above ₹500.' },
            { title: 'Annual Reports & Audits', content: 'Our financial statements are audited annually by independent chartered accountants. Annual reports are available for public inspection and will be provided upon written request.' },
            { title: 'Privacy Policy', content: 'We are committed to protecting your personal information. We collect only the data necessary to serve you and do not sell or share your information with third parties. All payment processing is handled through secure, PCI-compliant payment gateways.' },
            { title: 'Refund Policy', content: 'Program fees are refundable up to 14 days before the program start date, minus a 10% administrative fee. Donations are non-refundable but may be redirected to another cause of your choice upon written request within 30 days.' },
          ].map(section => (
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

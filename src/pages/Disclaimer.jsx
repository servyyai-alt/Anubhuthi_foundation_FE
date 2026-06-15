import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaChevronDown, FaShieldAlt, FaHandHoldingHeart, FaUndoAlt, FaCookieBite, FaUsers, FaMountain } from 'react-icons/fa';

const policies = [
  {
    id: 'website-disclaimer',
    icon: FaShieldAlt,
    title: 'Website Disclaimer',
    content: (
      <div className="space-y-4">
        <p className="font-semibold text-earth-700">Effective Date: [Date of Publication]</p>

        <h5 className="font-bold text-earth-800 mt-4">General Information</h5>
        <p>The information provided on www.anubhuthi.org is intended solely for educational, informational, cultural, awareness and charitable purposes.</p>
        <p>While Anubhuthi Foundation endeavors to ensure the accuracy and relevance of the information published, no representation or warranty is made regarding its completeness, reliability or suitability for any specific purpose.</p>

        <h5 className="font-bold text-earth-800 mt-4">Educational Purpose</h5>
        <p>All articles, videos, AI guidance, workshops, retreats and publications are intended to encourage awareness, self-development and responsible living.</p>
        <p>They should not be interpreted as:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Medical advice</li>
          <li>Psychological therapy</li>
          <li>Legal advice</li>
          <li>Financial advice</li>
          <li>Investment advice</li>
          <li>Professional counselling</li>
        </ul>
        <p>Users should seek qualified professionals where appropriate.</p>

        <h5 className="font-bold text-earth-800 mt-4">Anubhuthi AI Disclaimer</h5>
        <p>Anubhuthi AI is an educational and guidance platform.</p>
        <p>Responses generated through AI are informational only and should not be relied upon as the sole basis for important decisions.</p>

        <h5 className="font-bold text-earth-800 mt-4">Retreat Participation</h5>
        <p>Participation in meditation programs, retreats, trekking or outdoor activities is voluntary.</p>
        <p>Participants are responsible for ensuring that they are physically and medically fit before participating.</p>

        <h5 className="font-bold text-earth-800 mt-4">External Links</h5>
        <p>The Foundation is not responsible for the content or policies of external websites linked from this platform.</p>

        <h5 className="font-bold text-earth-800 mt-4">No Guarantee</h5>
        <p>Participation in Foundation programs does not guarantee specific personal, financial, educational or professional outcomes.</p>
        <p>Results depend on individual commitment and circumstances.</p>
      </div>
    )
  },
  {
    id: 'donation-policy',
    icon: FaHandHoldingHeart,
    title: 'Donation Policy',
    content: (
      <div className="space-y-4">
        <h5 className="font-bold text-earth-800 mt-4">Voluntary Contributions</h5>
        <p>All donations made to Anubhuthi Foundation are voluntary and intended to support its charitable objectives.</p>

        <h5 className="font-bold text-earth-800 mt-4">Utilisation of Funds</h5>
        <p>Funds may be used for:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Human Evolution Programs</li>
          <li>Educational Initiatives</li>
          <li>Scholarships</li>
          <li>Temple Restoration</li>
          <li>Research</li>
          <li>Volunteer Development</li>
          <li>Infrastructure</li>
          <li>Administrative Requirements</li>
          <li>Digital Platforms</li>
        </ul>
        <p>consistent with the Foundation's objectives and applicable law.</p>

        <h5 className="font-bold text-earth-800 mt-4">Tax Benefits</h5>
        <p>Tax benefits, if any, shall be available only in accordance with applicable laws and approvals obtained by the Foundation.</p>

        <h5 className="font-bold text-earth-800 mt-4">Donor Privacy</h5>
        <p>Donor details will remain confidential unless the donor expressly consents to public recognition.</p>

        <h5 className="font-bold text-earth-800 mt-4">Restricted Donations</h5>
        <p>The Foundation will make reasonable efforts to honor donor-designated purposes, subject to legal, operational and practical feasibility.</p>
      </div>
    )
  },
  {
    id: 'refund-policy',
    icon: FaUndoAlt,
    title: 'Refund & Cancellation Policy',
    content: (
      <div className="space-y-4">
        <h5 className="font-bold text-earth-800 mt-4">Donations</h5>
        <p>Donations made voluntarily are generally non-refundable, except where:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Duplicate transactions occur.</li>
          <li>Payment errors are verified.</li>
          <li>Refund is required by applicable law.</li>
        </ul>
        <p>Requests shall be reviewed individually.</p>

        <h5 className="font-bold text-earth-800 mt-4">Retreat Registration</h5>
        <p>Cancellation requests may be considered based on the applicable retreat policy announced at the time of registration.</p>
        <p>Administrative deductions may apply where permitted.</p>

        <h5 className="font-bold text-earth-800 mt-4">Course Registration</h5>
        <p>The Foundation reserves the right to modify schedules, faculty or venues.</p>
        <p>If a program is cancelled by the Foundation, eligible participants may receive rescheduling or refund options as determined by policy.</p>
      </div>
    )
  },
  {
    id: 'cookie-policy',
    icon: FaCookieBite,
    title: 'Cookie Policy',
    content: (
      <div className="space-y-4">
        <h5 className="font-bold text-earth-800 mt-4">What Are Cookies?</h5>
        <p>Cookies are small text files stored on your device to improve website functionality.</p>

        <h5 className="font-bold text-earth-800 mt-4">We May Use Cookies For:</h5>
        <ul className="list-disc pl-6 space-y-1">
          <li>Remembering preferences.</li>
          <li>Website analytics.</li>
          <li>Performance optimisation.</li>
          <li>Security.</li>
          <li>User experience enhancement.</li>
        </ul>

        <h5 className="font-bold text-earth-800 mt-4">User Choice</h5>
        <p>Users may disable cookies through browser settings.</p>
        <p>Some website features may not function properly after disabling cookies.</p>
      </div>
    )
  },
  {
    id: 'volunteer-code',
    icon: FaUsers,
    title: 'Volunteer Code of Conduct',
    content: (
      <div className="space-y-4">
        <p>Every volunteer shall:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Act honestly.</li>
          <li>Respect all participants.</li>
          <li>Avoid discrimination.</li>
          <li>Maintain confidentiality.</li>
          <li>Protect Foundation property.</li>
          <li>Follow safety instructions.</li>
          <li>Respect local communities.</li>
          <li>Avoid conflicts of interest.</li>
          <li>Refrain from political campaigning in the Foundation's name.</li>
          <li>Represent the Foundation responsibly.</li>
        </ul>
        <p>Violation may result in suspension or termination of volunteer engagement.</p>
      </div>
    )
  },
  {
    id: 'retreat-policy',
    icon: FaMountain,
    title: 'Retreat Participation & Risk Acknowledgement Policy',
    content: (
      <div className="space-y-4">
        <p>Participants acknowledge that:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Retreats may involve travel.</li>
          <li>Weather conditions may change unexpectedly.</li>
          <li>Trekking and outdoor activities carry inherent risks.</li>
        </ul>
        <p>Participants remain responsible for their own health and safety.</p>

        <p className="mt-4">Participants are encouraged to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Carry required medications.</li>
          <li>Obtain medical advice before participation if necessary.</li>
          <li>Follow instructions provided by organisers and guides.</li>
        </ul>
        <p>The Foundation shall take reasonable care in organising activities but cannot eliminate all risks associated with travel or outdoor experiences.</p>
      </div>
    )
  }
];

function PolicyCard({ policy, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = policy.icon;

  return (
    <div
      id={policy.id}
      className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 scroll-mt-32
        ${isOpen ? 'border-saffron-400 shadow-warm ring-1 ring-saffron-400/20' : 'border-earth-200 hover:border-earth-300'}
      `}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 pr-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors
            ${isOpen ? 'bg-saffron-500 text-white' : 'bg-saffron-50 text-saffron-600'}
          `}>
            <Icon size={20} />
          </div>
          <h2 className={`font-serif text-xl sm:text-2xl font-bold transition-colors ${isOpen ? 'text-earth-900' : 'text-earth-800'}`}>
            {policy.title}
          </h2>
        </div>
        <div className="flex items-center shrink-0">
          <div className={`w-8 h-8 rounded-full bg-earth-50 flex items-center justify-center transition-transform duration-300
            ${isOpen ? 'rotate-180 bg-saffron-50 text-saffron-600' : 'text-earth-500'}
          `}>
            <FaChevronDown size={12} />
          </div>
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-5 sm:p-8 pt-0 sm:pt-0 border-t border-earth-100/50">
          <div className="sm:pl-16 text-earth-700 leading-relaxed space-y-3">
            {policy.content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Disclaimer() {
  const [readingProgress, setReadingProgress] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setReadingProgress(progress);
    };
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream relative">
      <Helmet>
        <title>Disclaimer & Additional Policies | Anubhuthi Foundation</title>
        <meta
          name="description"
          content="Website Disclaimer, Donation Policy, Refund & Cancellation Policy, Cookie Policy, Volunteer Code of Conduct, and Retreat Participation Policy of Anubhuthi Foundation."
        />
      </Helmet>

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-earth-100 z-50">
        <div
          className="h-full bg-saffron-500 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <section className="pt-32 pb-20 relative z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page Header */}
          <div className="mb-10">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-earth-900 leading-tight mb-3">
              Disclaimer & Additional Policies
            </h1>
            <p className="text-earth-600 text-lg">
              Legal policies governing participation, donations, and use of Anubhuthi Foundation services.
            </p>
          </div>

          {/* Quick Jump Links */}
          <div className="bg-white rounded-2xl border border-earth-200 p-5 sm:p-6 mb-10 shadow-sm">
            <h3 className="font-serif font-bold text-earth-800 mb-4 text-lg">Jump to Policy</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {policies.map((policy) => {
                const Icon = policy.icon;
                return (
                  <a
                    key={policy.id}
                    href={`#${policy.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(policy.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl text-earth-700 hover:bg-saffron-50 hover:text-saffron-700 border border-transparent hover:border-saffron-200 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-earth-100 group-hover:bg-saffron-100 flex items-center justify-center shrink-0 transition-colors">
                      <Icon size={14} className="text-earth-500 group-hover:text-saffron-600 transition-colors" />
                    </div>
                    <span className="text-sm font-medium">{policy.title}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Policy Accordions */}
          <div className="space-y-4">
            {policies.map((policy, index) => (
              <PolicyCard key={policy.id} policy={policy} index={index} />
            ))}
          </div>

          {/* Contact Information - Centered */}
          <div className="text-center mt-16 mb-8 px-4 sm:px-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-earth-900 mb-3">Need Help?</h3>
            <p className="text-earth-600 text-base sm:text-lg mb-6">For any questions regarding these policies:</p>
            <p className="font-bold text-earth-900 text-2xl sm:text-3xl md:text-4xl mb-5 uppercase tracking-wide">ANUBHUTHI FOUNDATION</p>
            <p className="text-earth-700 text-base sm:text-lg mb-3">
              <span className="font-medium mr-1">Website:</span> <a href="http://www.anubhuthi.org" target="_blank" rel="noopener noreferrer" className="text-saffron-600 hover:text-saffron-700 transition-colors underline-offset-4 hover:underline break-all sm:break-normal">www.anubhuthi.org</a>
            </p>
            <p className="text-earth-700 text-base sm:text-lg">
              <span className="font-medium mr-1">Email:</span> <a href="mailto:info@anubhuthi.org" className="text-saffron-600 hover:text-saffron-700 transition-colors underline-offset-4 hover:underline break-all sm:break-normal">info@anubhuthi.org</a>
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}

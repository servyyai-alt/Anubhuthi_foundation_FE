import React from 'react';
import LegalDocumentLayout from '../components/layout/LegalDocumentLayout';

export default function TermsAndConditions() {
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: (
        <div className="space-y-4">
          <p>Welcome to Anubhuthi Foundation ("Foundation", "we", "our", or "us").</p>
          <p>By accessing or using www.anubhuthi.org, you acknowledge that you have read, understood and agree to be bound by these Terms & Conditions.</p>
          <p>If you do not agree with any part of these terms, please discontinue the use of this website.</p>
        </div>
      )
    },
    {
      id: "about",
      title: "2. About Anubhuthi Foundation",
      content: (
        <div className="space-y-4">
          <p>Anubhuthi Foundation is a Section 8 non-profit organization established for charitable, educational, cultural and social development purposes.</p>
          <p>Its activities may include:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Human Evolution Programs</li>
            <li>DNI Academy</li>
            <li>Awareness Workshops</li>
            <li>Meditation Programs</li>
            <li>Leadership Development</li>
            <li>Himalayan Retreats</li>
            <li>Temple Restoration Initiatives</li>
            <li>Community Development Projects</li>
            <li>Volunteer Programs</li>
            <li>Digital Learning Platforms</li>
            <li>Anubhuthi AI Educational Services</li>
            <li>Research and Publications</li>
          </ul>
        </div>
      )
    },
    {
      id: "acceptance",
      title: "3. Acceptance of Terms",
      content: (
        <div className="space-y-4">
          <p>By accessing this website or participating in any Foundation activity, you agree to comply with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Applicable Indian laws</li>
            <li>Foundation policies</li>
            <li>Event guidelines</li>
            <li>Community standards</li>
            <li>Code of conduct</li>
          </ul>
        </div>
      )
    },
    {
      id: "website-usage",
      title: "4. Website Usage",
      content: (
        <div className="space-y-4">
          <p>Users agree to use the website only for lawful purposes.</p>
          <p>Users shall not:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Upload malicious software.</li>
            <li>Attempt unauthorized access.</li>
            <li>Disrupt website functionality.</li>
            <li>Copy or misuse website content.</li>
            <li>Use automated systems without authorization.</li>
          </ul>
        </div>
      )
    },
    {
      id: "educational-nature",
      title: "5. Educational Nature of Services",
      content: (
        <div className="space-y-4">
          <p>The Foundation provides educational, awareness-based and self-development programs.</p>
          <p>Unless specifically stated otherwise:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Programs are intended for informational and educational purposes.</li>
            <li>Participation does not create a doctor-patient, lawyer-client or therapist-client relationship.</li>
            <li>Programs should not be interpreted as professional medical, legal, financial or psychological advice.</li>
          </ul>
        </div>
      )
    },
    {
      id: "ai-services",
      title: "6. Anubhuthi AI Services",
      content: (
        <div className="space-y-4">
          <p>Anubhuthi AI is designed to support:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Learning</li>
            <li>Awareness</li>
            <li>Guidance</li>
            <li>Educational assistance</li>
          </ul>
          <p>Users acknowledge that:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>AI-generated responses may not always be complete or error-free.</li>
            <li>Users should independently verify important information.</li>
            <li>The Foundation is not responsible for decisions made solely based on AI-generated outputs.</li>
          </ul>
        </div>
      )
    },
    {
      id: "training-programs",
      title: "7. Training Programs",
      content: (
        <div className="space-y-4">
          <p>Participants enrolling in any course or retreat agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Follow program rules.</li>
            <li>Respect trainers and fellow participants.</li>
            <li>Maintain discipline.</li>
            <li>Avoid disruptive behaviour.</li>
          </ul>
          <p>The Foundation reserves the right to suspend participation for violations.</p>
        </div>
      )
    },
    {
      id: "himalayan-retreats",
      title: "8. Himalayan Retreats",
      content: (
        <div className="space-y-4">
          <p>Participants acknowledge that retreat activities may involve:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Travel</li>
            <li>Walking</li>
            <li>Trekking</li>
            <li>Outdoor programs</li>
            <li>Nature-based experiences</li>
          </ul>
          <p>Participation is voluntary.</p>
          <p>Participants are responsible for ensuring that they are medically fit for participation.</p>
        </div>
      )
    },
    {
      id: "donations",
      title: "9. Donations",
      content: (
        <div className="space-y-4">
          <p>Donations made to the Foundation are voluntary.</p>
          <p>All donated funds shall be utilized in accordance with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The Foundation's objectives.</li>
            <li>Applicable laws.</li>
            <li>Governance policies.</li>
          </ul>
          <p>Receipt issuance shall be subject to statutory requirements.</p>
        </div>
      )
    },
    {
      id: "sponsorship",
      title: "10. Sponsorship Programs",
      content: (
        <div className="space-y-4">
          <p>Sponsors may support:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Students</li>
            <li>Retreats</li>
            <li>Infrastructure</li>
            <li>Research</li>
            <li>Temple initiatives</li>
            <li>Community projects</li>
          </ul>
          <p>The Foundation retains discretion regarding allocation consistent with donor intent and operational needs.</p>
        </div>
      )
    },
    {
      id: "volunteer",
      title: "11. Volunteer Participation",
      content: (
        <div className="space-y-4">
          <p>Volunteers agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Act ethically.</li>
            <li>Respect local communities.</li>
            <li>Follow organizational guidelines.</li>
            <li>Maintain confidentiality where applicable.</li>
          </ul>
          <p>Volunteer participation does not create an employment relationship unless separately agreed in writing.</p>
        </div>
      )
    },
    {
      id: "temple-restoration",
      title: "12. Temple Restoration Initiatives",
      content: (
        <div className="space-y-4">
          <p>The Foundation may collaborate with communities and stakeholders to support preservation of heritage and cultural spaces.</p>
          <p>All activities shall be conducted in accordance with applicable legal and regulatory requirements.</p>
        </div>
      )
    },
    {
      id: "intellectual-property",
      title: "13. Intellectual Property",
      content: (
        <div className="space-y-4">
          <p>Unless otherwise stated:</p>
          <p>All content including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Logos</li>
            <li>Text</li>
            <li>Graphics</li>
            <li>Videos</li>
            <li>Publications</li>
            <li>Designs</li>
            <li>Training materials</li>
          </ul>
          <p>remain the intellectual property of Anubhuthi Foundation.</p>
          <p>Unauthorized reproduction is prohibited.</p>
        </div>
      )
    },
    {
      id: "user-generated-content",
      title: "14. User Generated Content",
      content: (
        <div className="space-y-4">
          <p>Users submitting testimonials, photographs or comments grant the Foundation permission to use such content for educational, promotional or reporting purposes unless otherwise agreed.</p>
        </div>
      )
    },
    {
      id: "privacy",
      title: "15. Privacy",
      content: (
        <div className="space-y-4">
          <p>Personal information is handled in accordance with the Foundation's Privacy Policy.</p>
        </div>
      )
    },
    {
      id: "external-links",
      title: "16. External Links",
      content: (
        <div className="space-y-4">
          <p>The website may contain links to third-party websites.</p>
          <p>The Foundation is not responsible for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>External content.</li>
            <li>Privacy practices.</li>
            <li>Accuracy of third-party information.</li>
          </ul>
        </div>
      )
    },
    {
      id: "limitation-liability",
      title: "17. Limitation of Liability",
      content: (
        <div className="space-y-4">
          <p>To the maximum extent permitted by law, the Foundation shall not be liable for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Indirect losses.</li>
            <li>Consequential damages.</li>
            <li>Loss of data.</li>
            <li>Business interruption.</li>
            <li>Decisions made solely based on educational materials or AI outputs.</li>
          </ul>
        </div>
      )
    },
    {
      id: "health-wellbeing",
      title: "18. Health & Well-being",
      content: (
        <div className="space-y-4">
          <p>Meditation, yoga and awareness programs may involve physical or emotional experiences.</p>
          <p>Participants should consult qualified professionals regarding any existing medical conditions before participation.</p>
        </div>
      )
    },
    {
      id: "children-participation",
      title: "19. Children's Participation",
      content: (
        <div className="space-y-4">
          <p>Programs involving minors require consent from a parent or legal guardian wherever applicable.</p>
        </div>
      )
    },
    {
      id: "international-participants",
      title: "20. International Participants",
      content: (
        <div className="space-y-4">
          <p>Participation by international users remains subject to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Applicable laws.</li>
            <li>Visa regulations.</li>
            <li>Travel requirements.</li>
            <li>Local compliance obligations.</li>
          </ul>
        </div>
      )
    },
    {
      id: "amendments",
      title: "21. Amendments",
      content: (
        <div className="space-y-4">
          <p>The Foundation reserves the right to update these Terms & Conditions at any time.</p>
          <p>Updated versions become effective upon publication on the website.</p>
        </div>
      )
    },
    {
      id: "governing-law",
      title: "22. Governing Law",
      content: (
        <div className="space-y-4">
          <p>These Terms shall be governed by the laws of India.</p>
          <p>Any disputes shall be subject to the jurisdiction of the competent courts having authority over the Foundation's registered office, unless otherwise required by applicable law.</p>
        </div>
      )
    }
  ];

  return (
    <LegalDocumentLayout
      title="Terms & Conditions"
      subtitle="Guidelines, responsibilities and conditions governing the use of Anubhuthi Foundation services, programs and website."
      lastUpdated="Date of Publication"
      sections={sections}
    >
      {/* Contact Information - Centered */}
      <div className="text-center mt-16 mb-8 px-4 sm:px-6">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-earth-900 mb-3">Need Help?</h3>
        <p className="text-earth-600 text-base sm:text-lg mb-6">For any questions regarding these Terms &amp; Conditions:</p>
        <p className="font-bold text-earth-900 text-2xl sm:text-3xl md:text-4xl mb-5 uppercase tracking-wide">ANUBHUTHI FOUNDATION</p>
        <p className="text-earth-700 text-base sm:text-lg mb-3">
          <span className="font-medium mr-1">Website:</span> <a href="http://www.anubhuthi.org" target="_blank" rel="noopener noreferrer" className="text-saffron-600 hover:text-saffron-700 transition-colors underline-offset-4 hover:underline break-all sm:break-normal">www.anubhuthi.org</a>
        </p>
        <p className="text-earth-700 text-base sm:text-lg">
          <span className="font-medium mr-1">Email:</span> <a href="mailto:info@anubhuthi.org" className="text-saffron-600 hover:text-saffron-700 transition-colors underline-offset-4 hover:underline break-all sm:break-normal">info@anubhuthi.org</a>
        </p>
      </div>

      {/* Statement - plain text only, no card, no heading */}
      <p className="text-earth-700 text-base leading-relaxed text-center mt-8 mb-4">
        By continuing to use this website or participating in Foundation activities, you acknowledge that you have read, understood and agreed to these Terms &amp; Conditions.
      </p>
    </LegalDocumentLayout>
  );
}

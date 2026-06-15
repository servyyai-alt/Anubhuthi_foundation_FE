import React from 'react';
import { Link } from 'react-router-dom';
import LegalDocumentLayout from '../components/layout/LegalDocumentLayout';
import { FaShieldAlt } from 'react-icons/fa';

export default function PrivacyPolicy() {
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: (
        <div className="space-y-4">
          <p>Anubhuthi Foundation ("Foundation", "we", "our", or "us") respects your privacy and is committed to protecting your personal information.</p>
          <p>This Privacy Policy explains:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>What information we collect.</li>
            <li>Why we collect it.</li>
            <li>How it is used.</li>
            <li>How it is protected.</li>
            <li>Your rights regarding your personal information.</li>
          </ul>
        </div>
      )
    },
    {
      id: "information-we-collect",
      title: "2. Information We Collect",
      content: (
        <div className="space-y-4">
          <p>We may collect information voluntarily provided by you, including:</p>
          
          <h4 className="font-bold text-earth-800 mt-6 mb-2">Personal Information</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Mobile Number</li>
            <li>Postal Address</li>
            <li>Country</li>
            <li>Date of Birth (where required)</li>
            <li>Gender (optional)</li>
            <li>Identification details where legally necessary</li>
          </ul>

          <h4 className="font-bold text-earth-800 mt-6 mb-2">Donation Information</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Donation Amount</li>
            <li>Donation Date</li>
            <li>Payment Reference</li>
            <li>Sponsorship Category</li>
          </ul>
          <p className="italic">Note: The Foundation does not intentionally store complete debit card, credit card or banking credentials processed through authorized payment gateways.</p>

          <h4 className="font-bold text-earth-800 mt-6 mb-2">Program Registration Information</h4>
          <p>For training programs, retreats and workshops:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Participant Name</li>
            <li>Emergency Contact</li>
            <li>Dietary Preferences (optional)</li>
            <li>Health-related disclosures voluntarily provided</li>
            <li>Accommodation preferences</li>
          </ul>

          <h4 className="font-bold text-earth-800 mt-6 mb-2">Volunteer Information</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Educational Background</li>
            <li>Skills</li>
            <li>Experience</li>
            <li>Areas of Interest</li>
            <li>Availability</li>
          </ul>

          <h4 className="font-bold text-earth-800 mt-6 mb-2">Communication Data</h4>
          <p>When contacting us through:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Contact Forms</li>
            <li>Email</li>
            <li>WhatsApp</li>
            <li>Social Media</li>
            <li>Newsletters</li>
          </ul>
          <p>we may retain the correspondence for administrative purposes.</p>
        </div>
      )
    },
    {
      id: "collected-automatically",
      title: "3. Information Collected Automatically",
      content: (
        <div className="space-y-4">
          <p>When you visit our website, technical information may be collected, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>IP Address</li>
            <li>Browser Type</li>
            <li>Device Information</li>
            <li>Operating System</li>
            <li>Referring Website</li>
            <li>Date & Time of Visit</li>
            <li>Pages Viewed</li>
          </ul>
          <p>This information helps improve website performance and security.</p>
        </div>
      )
    },
    {
      id: "cookies",
      title: "4. Cookies",
      content: (
        <div className="space-y-4">
          <p>Our website may use cookies to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Improve user experience.</li>
            <li>Remember preferences.</li>
            <li>Measure website performance.</li>
            <li>Understand visitor behavior.</li>
          </ul>
          <p>Users may disable cookies through browser settings, although certain features may not function properly.</p>
        </div>
      )
    },
    {
      id: "how-we-use",
      title: "5. How We Use Your Information",
      content: (
        <div className="space-y-4">
          <p>Your information may be used for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Program registration</li>
            <li>Event management</li>
            <li>Volunteer coordination</li>
            <li>Donation processing</li>
            <li>Communication</li>
            <li>Educational services</li>
            <li>Newsletter distribution</li>
            <li>Research and reporting</li>
            <li>Website improvement</li>
            <li>Compliance with legal obligations</li>
          </ul>
        </div>
      )
    },
    {
      id: "anubhuthi-ai",
      title: "6. Anubhuthi AI",
      content: (
        <div className="space-y-4">
          <p>Where users interact with Anubhuthi AI or other digital learning tools:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Inputs may be processed to improve educational services.</li>
            <li>Users should avoid sharing highly confidential or sensitive personal information unless specifically required.</li>
            <li>AI-generated outputs are intended for informational and educational purposes.</li>
          </ul>
        </div>
      )
    },
    {
      id: "sharing",
      title: "7. Sharing of Information",
      content: (
        <div className="space-y-4">
          <p>The Foundation does not sell personal information.</p>
          <p>Information may be shared only where necessary with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Payment service providers</li>
            <li>Technology vendors</li>
            <li>Event partners</li>
            <li>Professional advisors</li>
            <li>Regulatory authorities</li>
            <li>Government agencies where legally required</li>
          </ul>
          <p>Such sharing shall be limited to legitimate operational purposes.</p>
        </div>
      )
    },
    {
      id: "international",
      title: "8. International Participants",
      content: (
        <div className="space-y-4">
          <p>For participants located outside India, information may be processed in accordance with applicable Indian laws and relevant contractual or operational requirements.</p>
        </div>
      )
    },
    {
      id: "security",
      title: "9. Data Security",
      content: (
        <div className="space-y-4">
          <p>The Foundation implements reasonable administrative, technical and organizational safeguards to protect personal information against:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Unauthorized access</li>
            <li>Misuse</li>
            <li>Disclosure</li>
            <li>Alteration</li>
            <li>Loss</li>
          </ul>
          <p>However, no electronic transmission or storage method can be guaranteed to be completely secure.</p>
        </div>
      )
    },
    {
      id: "retention",
      title: "10. Data Retention",
      content: (
        <div className="space-y-4">
          <p>Personal information shall be retained only for as long as reasonably necessary for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Program administration</li>
            <li>Legal compliance</li>
            <li>Financial reporting</li>
            <li>Record keeping</li>
            <li>Organizational purposes</li>
          </ul>
          <p>Thereafter, information may be securely deleted or anonymized.</p>
        </div>
      )
    },
    {
      id: "children",
      title: "11. Children's Privacy",
      content: (
        <div className="space-y-4">
          <p>Programs involving minors require consent from a parent or legal guardian wherever applicable.</p>
          <p>The Foundation does not knowingly collect personal information from children without appropriate authorization.</p>
        </div>
      )
    },
    {
      id: "donor-privacy",
      title: "12. Donor Privacy",
      content: (
        <div className="space-y-4">
          <p>Donor information shall be treated confidentially.</p>
          <p>Public acknowledgement will only be made where:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Donor consent is obtained, or</li>
            <li>Recognition forms part of an agreed sponsorship arrangement.</li>
          </ul>
          <p>Anonymous donations shall be respected wherever legally permissible.</p>
        </div>
      )
    },
    {
      id: "volunteer-privacy",
      title: "13. Volunteer Privacy",
      content: (
        <div className="space-y-4">
          <p>Volunteer records shall be used solely for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Assignment</li>
            <li>Coordination</li>
            <li>Communication</li>
            <li>Reporting</li>
            <li>Safety management</li>
          </ul>
          <p>and not for unrelated commercial purposes.</p>
        </div>
      )
    },
    {
      id: "health-info",
      title: "14. Health Information",
      content: (
        <div className="space-y-4">
          <p>If participants voluntarily disclose health-related information for retreat or program safety, such information shall be handled with appropriate confidentiality and used only for legitimate program administration.</p>
        </div>
      )
    },
    {
      id: "email",
      title: "15. Email Communications",
      content: (
        <div className="space-y-4">
          <p>Users may receive communications relating to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Registrations</li>
            <li>Events</li>
            <li>Retreats</li>
            <li>Foundation updates</li>
            <li>Educational content</li>
          </ul>
          <p>Users may opt out of promotional communications at any time.</p>
        </div>
      )
    },
    {
      id: "third-party",
      title: "16. Third-Party Websites",
      content: (
        <div className="space-y-4">
          <p>Our website may contain links to external websites.</p>
          <p>The Foundation is not responsible for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Their privacy practices</li>
            <li>Content</li>
            <li>Security</li>
            <li>Policies</li>
          </ul>
          <p>Users should review the privacy policies of those websites independently.</p>
        </div>
      )
    },
    {
      id: "your-rights",
      title: "17. Your Rights",
      content: (
        <div className="space-y-4">
          <p>Subject to applicable law, users may request:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access to their personal information.</li>
            <li>Correction of inaccurate information.</li>
            <li>Withdrawal of consent where applicable.</li>
            <li>Deletion of information where legally permissible.</li>
            <li>Clarification regarding data processing.</li>
          </ul>
          <p>Requests may be submitted through official contact channels.</p>
        </div>
      )
    },
    {
      id: "legal-compliance",
      title: "18. Legal Compliance",
      content: (
        <div className="space-y-4">
          <p>The Foundation processes personal information in accordance with applicable laws, including but not limited to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Digital Personal Data Protection Act, 2023 (India)</li>
            <li>Information Technology Act, 2000 (where applicable)</li>
            <li>Other relevant statutory obligations</li>
          </ul>
          <p>Future regulatory developments may result in policy updates.</p>
        </div>
      )
    },
    {
      id: "policy-updates",
      title: "19. Policy Updates",
      content: (
        <div className="space-y-4">
          <p>This Privacy Policy may be revised periodically.</p>
          <p>Updated versions become effective upon publication on the official website.</p>
          <p>Users are encouraged to review this page regularly.</p>
        </div>
      )
    }
  ];

  return (
    <LegalDocumentLayout
      title="Privacy Policy"
      subtitle="How Anubhuthi Foundation collects, uses, protects and manages personal information."
      lastUpdated="Date of Publication"
      sections={sections}
    >
      {/* Contact Information - Centered */}
      <div className="text-center mt-16 mb-8 px-4 sm:px-6">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-earth-900 mb-3">Contact Information</h3>
        <p className="text-earth-600 text-base sm:text-lg mb-6">For privacy-related questions or requests:</p>
        <p className="font-bold text-earth-900 text-2xl sm:text-3xl md:text-4xl mb-5 uppercase tracking-wide">ANUBHUTHI FOUNDATION</p>
        <p className="text-earth-700 text-base sm:text-lg mb-3">
          <span className="font-medium mr-1">Website:</span> <a href="http://www.anubhuthi.org" target="_blank" rel="noopener noreferrer" className="text-saffron-600 hover:text-saffron-700 transition-colors underline-offset-4 hover:underline break-all sm:break-normal">www.anubhuthi.org</a>
        </p>
        <p className="text-earth-700 text-base sm:text-lg mb-3">
          <span className="font-medium mr-1">Email:</span> <a href="mailto:privacy@anubhuthi.org" className="text-saffron-600 hover:text-saffron-700 transition-colors underline-offset-4 hover:underline break-all sm:break-normal">privacy@anubhuthi.org</a>
          <span className="text-earth-500 ml-1 text-xs sm:text-sm block sm:inline mt-1 sm:mt-0">(or another official privacy contact designated by the Foundation)</span>
        </p>
        <p className="text-earth-700 text-base sm:text-lg">
          <span className="font-medium mr-1">General Contact:</span> <a href="mailto:info@anubhuthi.org" className="text-saffron-600 hover:text-saffron-700 transition-colors underline-offset-4 hover:underline break-all sm:break-normal">info@anubhuthi.org</a>
        </p>
      </div>

      {/* Statement - plain text only, no card, no heading */}
      <p className="text-earth-700 text-base leading-relaxed text-center mt-8 mb-4">
        By using www.anubhuthi.org or participating in Foundation activities, you acknowledge that you have read and understood this Privacy Policy and consent to the collection and processing of information in accordance with applicable law and this Policy.
      </p>

      {/* Extracted Additional Legal Policies CTA */}
      <div className="bg-white border border-earth-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl font-bold text-earth-900 mb-4 flex items-center gap-3">
              <FaShieldAlt className="text-saffron-500" />
              Additional Legal Policies
            </h3>
            <p className="text-earth-700 mb-4">The following policies are available on a dedicated page:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-earth-700 mb-6 md:mb-0">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-saffron-400"></div>
                Website Disclaimer
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-saffron-400"></div>
                Donation Policy
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-saffron-400"></div>
                Refund & Cancellation Policy
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-saffron-400"></div>
                Cookie Policy
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-saffron-400"></div>
                Volunteer Code of Conduct
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-saffron-400"></div>
                Retreat Participation Policy
              </div>
            </div>
          </div>
          <Link 
            to="/disclaimer" 
            className="shrink-0 bg-earth-900 hover:bg-earth-800 text-white font-medium py-3 px-6 rounded-xl transition-all hover:-translate-y-0.5 shadow-md"
          >
            View Disclaimer & Additional Policies
          </Link>
        </div>
      </div>
    </LegalDocumentLayout>
  );
}

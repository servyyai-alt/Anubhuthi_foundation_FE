import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import logo from '../../assets/logo.jpeg';
import leastActionLogo from '../../assets/least action logo.png';

export default function Footer() {
  return (
    <footer className="bg-[#011126] text-[#bcccdc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-4">
              <img src={logo} alt="Anubhuthi Foundation" className="h-20 w-auto" />
              <div className="leading-none">
                <div className="text-white text-3xl font-serif font-bold uppercase">Anubhuthi</div>
                <div className="text-[#e7ad43] text-xl font-semibold uppercase tracking-[0.2em] mt-2">Foundation</div>
              </div>
            </div>
            <p className="text-[#9fb3c8] text-sm leading-relaxed mb-6">
              Awakening consciousness through ancient wisdom, sacred practices, and transformative experiences since 2015.
            </p>
            <p className="text-[#829ab1] text-xs mt-1">Truth, Goodness, Beauty</p>

            <div className="flex gap-3 mt-6">
              {[
                { icon: FaFacebook, href: 'https://www.facebook.com/share/18oVpiFZBm/', label: 'Facebook' },
                { icon: FaInstagram, href: 'https://www.instagram.com/anubhuthimahan?igsh=b2pzaGZvbGtrYXg4', label: 'Instagram' },
                { icon: FaYoutube, href: 'https://www.youtube.com/@gurunana180', label: 'YouTube' },
                { icon: FaTwitter, href: 'https://x.com/gurunana180', label: 'X' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-[#021B3A] rounded-full flex items-center justify-center text-[#9fb3c8] hover:bg-[#D8A24A] hover:text-white transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-white mb-5 text-lg">Foundation</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Philosophy', path: '/philosophy' },
                { label: 'DNI Academy', path: '/dni-academy' },
                { label: 'Temple Restoration', path: '/temple-restoration' },
                { label: 'Himalayan Retreats', path: '/retreats' },
                { label: 'Programs & Trainings', path: '/programs' }
              ].map(item => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-[#9fb3c8] hover:text-[#e7ad43] text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-white mb-5 text-lg">Get Involved</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Volunteer & Internship', path: '/volunteer' },
                { label: 'Careers', path: '/careers' },
                { label: 'Donate & Support', path: '/donate' },
                { label: 'Events & Calendar', path: '/events' },
                { label: 'Testimonials', path: '/testimonials' },
                { label: 'Media & Publications', path: '/media' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.path} className="text-[#9fb3c8] hover:text-[#e7ad43] text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-white mb-5 text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <FaMapMarkerAlt className="text-[#e7ad43] mt-1 flex-shrink-0" />
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Anubhuthi+Foundation,+Door+No+:+3/37B,+Vadamalaipatti,+Musiri+Taluk,Thathiengarpet+post,+Tiruchirappalli+District-621214,+Tamilnadu,+INDIA"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#9fb3c8] hover:text-[#e7ad43] text-sm transition-colors leading-relaxed"
                >
                  Anubhuthi Foundation, Door No : 3/37B, Vadamalaipatti, Musiri Taluk, Thathiengarpet post, Tiruchirappalli District-621214, Tamilnadu. INDIA.
                </a>
              </li>
              <li className="flex gap-3">
                <FaPhone className="text-[#e7ad43] mt-0.5 flex-shrink-0" />
                <a href="tel:+916381586747" className="text-[#9fb3c8] hover:text-[#e7ad43] text-sm transition-colors">
                  +91 63815 86747
                </a>
              </li>
              <li className="flex gap-3">
                <FaEnvelope className="text-[#e7ad43] mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:gurunana180@gmail.com"
                  className="text-[#9fb3c8] hover:text-[#e7ad43] text-sm transition-colors"
                >
                  gurunana180@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-8 pt-6 border-t border-[#021B3A]">
              <ul className="space-y-2">
                {['Legal & Compliance', 'Privacy Policy', 'Terms of Service'].map(item => (
                  <li key={item}>
                    <Link to="/legal" className="text-[#9fb3c8] hover:text-[#e7ad43] text-sm transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#021B3A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col lg:flex-row items-center justify-between gap-3">
          <p className="text-[#829ab1] text-sm">© 2024 Anubhuthi Foundation. All rights reserved.</p>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <Link to="/admin/login" className="text-[#829ab1] hover:text-[#e7ad43] text-sm md:text-base transition-colors">
              Admin Login
            </Link>
            <span className="hidden sm:inline text-[#021B3A]">|</span>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
              <img src={leastActionLogo} alt="Least Action Logo" className="h-8 md:h-10 w-auto object-contain" />
              <span className="text-[#829ab1] text-sm md:text-base">Powered by Least Action Company Pvt Ltd</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import logo from '../../assets/logo.jpeg';

export default function Footer() {
  return (
    <footer className="bg-earth-900 text-earth-200">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-4">
              <img src={logo} alt="Anubhuthi Foundation" className="h-20 w-auto" />
              <div className="leading-none">
                <div className="text-white text-3xl font-serif font-bold uppercase">Anubhuthi</div>
                <div className="text-saffron-400 text-xl font-semibold uppercase tracking-[0.2em] mt-2">Foundation</div>
              </div>
            </div>
            <p className="text-earth-300 text-sm leading-relaxed mb-6">
              Awakening consciousness through ancient wisdom, sacred practices, and transformative experiences since 2015.
            </p>
            <p className="text-earth-400 text-xs mt-1">Truth, Goodness, Beauty</p>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: FaFacebook, href: '#', label: 'Facebook' },
                { icon: FaInstagram, href: '#', label: 'Instagram' },
                { icon: FaYoutube, href: '#', label: 'YouTube' },
                { icon: FaTwitter, href: '#', label: 'Twitter' },
                { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-8 h-8 bg-earth-800 rounded-full flex items-center justify-center text-earth-300 hover:bg-saffron-500 hover:text-white transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-white mb-5 text-lg">Foundation</h3>
            <ul className="space-y-2.5">
              {['About Us', 'Philosophy', 'DNI Academy', 'Temple Restoration', 'Himalayan Retreats', 'Programs & Trainings'].map(item => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="text-earth-300 hover:text-saffron-400 text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
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
                  <Link to={item.path} className="text-earth-300 hover:text-saffron-400 text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-semibold text-white mb-5 text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <FaMapMarkerAlt className="text-saffron-400 mt-1 flex-shrink-0" />
                <span className="text-earth-300 text-sm">Anubhuthi Foundation, Rishikesh, Uttarakhand, India 249201</span>
              </li>
              <li className="flex gap-3">
                <FaPhone className="text-saffron-400 mt-0.5 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-earth-300 hover:text-saffron-400 text-sm transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex gap-3">
                <FaEnvelope className="text-saffron-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:namaste@anubhuthifoundation.org" className="text-earth-300 hover:text-saffron-400 text-sm transition-colors">namaste@anubhuthifoundation.org</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-earth-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-earth-400 text-sm">Â© 2024 Anubhuthi Foundation. All rights reserved.</p>
          <div className="flex gap-6">
            {['Legal & Compliance', 'Privacy Policy', 'Terms of Service'].map(item => (
              <Link key={item} to={`/legal`} className="text-earth-400 hover:text-saffron-400 text-xs transition-colors">{item}</Link>
            ))}
            <Link to="/admin/login" className="text-earth-400 hover:text-saffron-400 text-xs transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

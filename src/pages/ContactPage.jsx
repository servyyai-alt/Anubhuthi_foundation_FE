import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { PageHeader, FormInput, FormTextarea, FormSelect, Button } from '../components/common';
import { animationVariants, transitionConfig, useReducedMotion, useIsMobile } from '../utils/animations';
import { contactAPI } from '../services/api';

export default function ContactPage() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', type: 'general' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in required fields');
      return;
    }
    setLoading(true);
    try {
      await contactAPI.submit(form);
      setSubmitted(true);
      toast.success('Message sent! We will get back to you soon.');
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const info = [
    { icon: FaMapMarkerAlt, title: 'Address', lines: ['Anubhuthi Foundation', 'Rishikesh, Uttarakhand 249201', 'India'] },
    { icon: FaPhone, title: 'Phone', lines: ['+91 98765 43210', '+91 135 XXX XXXX'] },
    { icon: FaEnvelope, title: 'Email', lines: ['namaste@anubhuthifoundation.org', 'programs@anubhuthifoundation.org'] },
    { icon: FaClock, title: 'Hours', lines: ['Mon - Sat: 9:00 AM â€“ 6:00 PM', 'Sunday: 10:00 AM â€“ 2:00 PM'] },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us â€” Anubhuthi Foundation</title>
        <meta name="description" content="Get in touch with Anubhuthi Foundation for inquiries about programs, retreats, volunteering, and more." />
      </Helmet>

      <PageHeader title="Contact Us" subtitle="Reach Out" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Contact' }]} />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <p className="text-saffron-500 text-sm font-semibold tracking-widest uppercase mb-2">âœ¦ Namaste âœ¦</p>
                <h2 className="font-serif text-3xl font-bold text-earth-800 mb-4">We'd Love to Hear from You</h2>
                <p className="text-earth-500 leading-relaxed">
                  Whether you have questions about our programs, want to collaborate, or simply want to connect with our community â€” we are here.
                </p>
              </div>

              {info.map((item, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={prefersReducedMotion || isMobile ? {} : animationVariants.staggerItem}
                  transition={{ ...transitionConfig, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 bg-saffron-50 border border-saffron-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-saffron-500" size={16} />
                  </div>
                  <div>
                    <div className="font-semibold text-earth-800 text-sm mb-1">{item.title}</div>
                    {item.lines.map((line, j) => (
                      <div key={j} className="text-earth-500 text-sm">{line}</div>
                    ))}
                  </div>
                </motion.div>
              ))}

              <div className="p-5 bg-saffron-50 border border-saffron-200 rounded-2xl">
                <p className="text-earth-600 text-sm italic">You are always welcome here.</p>
              </div>
            </div>

            {/* Right form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={prefersReducedMotion || isMobile ? {} : animationVariants.scaleFade}
                  transition={transitionConfig}
                  className="text-center py-20 bg-saffron-50 rounded-3xl"
                >

                  <div className="text-7xl mb-6">✅</div>

                  <h3 className="font-serif text-3xl font-bold text-earth-800 mb-3">Message Received</h3>
                  <p className="text-earth-500 max-w-sm mx-auto">
                    Thank you for reaching out. Our team will respond within 2-3 business days.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 text-saffron-600 underline text-sm">
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={prefersReducedMotion || isMobile ? {} : animationVariants.fadeUp}
                  transition={transitionConfig}
                  className="bg-parchment p-8 rounded-3xl space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormInput name="name" label="Full Name *" placeholder="Your name" value={form.name} onChange={handleChange} required />
                    <FormInput name="email" type="email" label="Email Address *" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormInput name="phone" label="Phone Number" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
                    <FormSelect name="type" label="Inquiry Type" value={form.type} onChange={handleChange}>
                      <option value="general">General Inquiry</option>
                      <option value="programs">Programs & Training</option>
                      <option value="retreats">Retreats</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="media">Media</option>
                    </FormSelect>
                  </div>
                  <FormInput name="subject" label="Subject" placeholder="What is this about?" value={form.subject} onChange={handleChange} />
                  <FormTextarea name="message" label="Your Message *" placeholder="Tell us how we can help..." rows={5} value={form.message} onChange={handleChange} required />
                  <Button type="submit" loading={loading} size="lg" className="w-full">

                    Send Message ✅
                  </Button>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

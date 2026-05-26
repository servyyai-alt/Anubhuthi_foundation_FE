import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/sections/HeroSection';
import {
  AboutSection,
  CoreValuesSection,
  FeaturedProgramsSection,
  WhyJoinUsSection,
  TestimonialsPreview,
  CTABanner
} from '../components/sections/HomeSections';
import { testimonialsAPI } from '../services/api';

export default function HomePage() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    testimonialsAPI.getAll({ featured: true })
      .then(res => setTestimonials(res.data.data || []))
      .catch(() => {});
  }, []);

  return (
    <>
      <Helmet>
        <title>Anubhuthi Foundation — Awaken Your True Self</title>
        <meta name="description" content="Anubhuthi Foundation is a spiritual organization offering transformative programs, Himalayan retreats, and Vedic wisdom for modern seekers." />
        <meta property="og:title" content="Anubhuthi Foundation" />
        <meta property="og:description" content="Sacred programs, retreats, and wisdom for your spiritual journey." />
      </Helmet>
      <HeroSection />
      <AboutSection />
      <CoreValuesSection />
      <FeaturedProgramsSection />
      <WhyJoinUsSection />
      <TestimonialsPreview testimonials={testimonials} />
      <CTABanner />
    </>
  );
}

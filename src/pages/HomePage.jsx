import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/sections/HeroSection';
import {
  AboutSection,
  CoreValuesSection,
  FeaturedProgramsSection,
  MediaPublicationsSection,
  UpcomingEventsSection,
  WhyJoinUsSection,
  TestimonialsPreview,
  CTABanner
} from '../components/sections/HomeSections';
import { eventsAPI, mediaAPI, programsAPI, testimonialsAPI } from '../services/api';

export default function HomePage() {
  const [programs, setPrograms] = useState([]);
  const [events, setEvents] = useState([]);
  const [mediaItems, setMediaItems] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [programsLoading, setProgramsLoading] = useState(true);
  const [programsError, setProgramsError] = useState(null);

  useEffect(() => {
    setProgramsLoading(true);
    setProgramsError(null);
    Promise.allSettled([
      programsAPI.getAll(),
      eventsAPI.getAll({ featured: true, limit: 3 }),
      mediaAPI.getAll({ featured: true, limit: 3 }),
      testimonialsAPI.getAll({ featured: true, limit: 3 }),
    ]).then(([programsRes, eventsRes, mediaRes, testimonialsRes]) => {
      setProgramsLoading(false);
      
      if (programsRes.status === 'fulfilled') {
        const fetchedPrograms = programsRes.value.data.data || [];
        const sortedPrograms = fetchedPrograms.slice().sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          return (b._id || '').localeCompare(a._id || '');
        });
        setPrograms(sortedPrograms.slice(0, 4));
      } else {
        setProgramsError('Failed to load programs. Please try again later.');
        setPrograms([]);
      }

      if (eventsRes.status === 'fulfilled') {
        const upcomingEvents = (eventsRes.value.data.data || [])
          .slice()
          .sort((a, b) => new Date(a.startDate || 0) - new Date(b.startDate || 0));
        setEvents(upcomingEvents);
      }

      if (mediaRes.status === 'fulfilled') {
        setMediaItems(mediaRes.value.data.data || []);
      }

      if (testimonialsRes.status === 'fulfilled') {
        setTestimonials(testimonialsRes.value.data.data || []);
      }
    });
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
      <FeaturedProgramsSection programs={programs} loading={programsLoading} error={programsError} />
      <UpcomingEventsSection events={events} />
      <MediaPublicationsSection mediaItems={mediaItems} />
      <WhyJoinUsSection />
      <TestimonialsPreview testimonials={testimonials} />
      <CTABanner />

    </>
  );
}

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaUsers, FaMapMarkerAlt, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import SEO, { courseSchema } from '../components/SEO';
import { Button, Badge, Spinner, ErrorMsg } from '../components/common';
import { useApi } from '../hooks';
import { programsAPI } from '../services/api';

export default function ProgramDetailPage() {
  const { id } = useParams();
  const { data: program, loading, error } = useApi(() => programsAPI.getById(id), [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment pt-28 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="min-h-screen bg-parchment pt-28 px-4">
        <div className="max-w-xl mx-auto">
          <ErrorMsg message={error || 'Program not found'} />
          <Link to="/programs" className="mt-4 inline-flex items-center gap-2 text-saffron-600 hover:underline">
            <FaArrowLeft size={12} /> Back to Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={program.title}
        description={program.shortDescription || program.description?.slice(0, 155)}
        schema={courseSchema(program)}
      />

      {/* Hero */}
      <div className="bg-gradient-to-br from-earth-900 to-amber-950 pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/programs" className="inline-flex items-center gap-2 text-earth-300 hover:text-saffron-300 text-sm mb-6 transition-colors">
            <FaArrowLeft size={12} /> All Programs
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge color="saffron">{program.category}</Badge>
            <Badge color="earth">{program.level}</Badge>
            {program.isFeatured && <Badge color="saffron">⭐ Featured</Badge>}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {program.title}
          </h1>
          {program.shortDescription && (
            <p className="text-earth-200 text-lg leading-relaxed max-w-3xl">{program.shortDescription}</p>
          )}
          <div className="flex flex-wrap gap-6 mt-8 text-earth-300 text-sm">
            {program.duration && (
              <span className="flex items-center gap-2"><FaClock size={14} />{program.duration}</span>
            )}
            {program.maxParticipants && (
              <span className="flex items-center gap-2"><FaUsers size={14} />Max {program.maxParticipants} participants</span>
            )}
            {program.location && (
              <span className="flex items-center gap-2"><FaMapMarkerAlt size={14} />{program.location}</span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              {program.description && (
                <section>
                  <h2 className="font-serif text-2xl font-bold text-earth-800 mb-4">About This Program</h2>
                  <p className="text-earth-600 leading-relaxed">{program.description}</p>
                </section>
              )}

              {/* Highlights */}
              {program.highlights?.length > 0 && (
                <section>
                  <h2 className="font-serif text-2xl font-bold text-earth-800 mb-4">What You'll Experience</h2>
                  <ul className="space-y-2">
                    {program.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <FaCheckCircle className="text-saffron-500 mt-1 flex-shrink-0" size={14} />
                        <span className="text-earth-600">{h}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Curriculum */}
              {program.curriculum?.length > 0 && (
                <section>
                  <h2 className="font-serif text-2xl font-bold text-earth-800 mb-4">Curriculum</h2>
                  <div className="space-y-4">
                    {program.curriculum.map((week, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                        className="flex gap-4 p-4 bg-parchment rounded-xl"
                      >
                        <div className="w-10 h-10 bg-saffron-100 rounded-full flex items-center justify-center font-bold text-saffron-600 flex-shrink-0 text-sm">
                          W{week.week}
                        </div>
                        <div>
                          <div className="font-semibold text-earth-800">{week.topic}</div>
                          {week.description && <div className="text-earth-500 text-sm mt-1">{week.description}</div>}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* Instructor */}
              {program.instructor?.name && (
                <section>
                  <h2 className="font-serif text-2xl font-bold text-earth-800 mb-4">Your Instructor</h2>
                  <div className="flex items-start gap-4 p-6 bg-parchment rounded-2xl">
                    <div className="w-14 h-14 bg-saffron-200 rounded-full flex items-center justify-center font-serif text-2xl font-bold text-saffron-700 flex-shrink-0">
                      {program.instructor.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-earth-800">{program.instructor.name}</div>
                      {program.instructor.bio && <p className="text-earth-500 text-sm mt-1 leading-relaxed">{program.instructor.bio}</p>}
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside>
              <div className="sticky top-28 bg-parchment rounded-2xl p-6 space-y-5">
                <div className="text-center">
                  <div className="font-serif text-4xl font-bold text-saffron-600 mb-1">
                    {program.isFree ? 'Free' : `₹${program.price?.toLocaleString()}`}
                  </div>
                  {!program.isFree && <p className="text-earth-400 text-sm">one-time fee</p>}
                </div>

                <div className="space-y-3 text-sm text-earth-600">
                  {[
                    { label: 'Duration', value: program.duration },
                    { label: 'Level', value: program.level, capitalize: true },
                    { label: 'Format', value: program.isOnline ? 'Online' : 'In-person' },
                    { label: 'Location', value: program.location },
                    { label: 'Starts', value: program.startDate ? new Date(program.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Ongoing' },
                  ].filter(r => r.value).map(row => (
                    <div key={row.label} className="flex justify-between items-center py-2 border-b border-earth-100 last:border-0">
                      <span className="text-earth-400">{row.label}</span>
                      <span className={`font-medium text-earth-800 ${row.capitalize ? 'capitalize' : ''}`}>{row.value}</span>
                    </div>
                  ))}
                </div>

                <Link to="/contact"
                  className="block w-full py-3 bg-saffron-500 text-white text-center rounded-full font-semibold hover:bg-saffron-600 transition-colors"
                >
                  Apply Now 🙏
                </Link>
                <Link to="/contact"
                  className="block w-full py-3 border border-earth-300 text-earth-700 text-center rounded-full font-semibold hover:bg-earth-50 transition-colors text-sm"
                >
                  Ask a Question
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

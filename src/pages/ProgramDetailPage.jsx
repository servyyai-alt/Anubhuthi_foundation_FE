import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheckCircle, FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import SEO, { courseSchema } from '../components/SEO';
import { Badge, ErrorMsg, Spinner } from '../components/common';
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
      <div className="min-h-screen bg-parchment px-4 pt-28">
        <div className="mx-auto max-w-xl">
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

      <div className="relative overflow-hidden bg-gradient-to-br from-earth-900 to-amber-950 pb-16 pt-28">
        {program.image && (
          <>
            <img
              src={program.image}
              alt={program.title}
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-earth-950/70" />
          </>
        )}

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link to="/programs" className="mb-6 inline-flex items-center gap-2 text-sm text-earth-300 transition-colors hover:text-saffron-300">
            <FaArrowLeft size={12} /> All Programs
          </Link>
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge color="saffron">{program.category}</Badge>
            <Badge color="earth">{program.level}</Badge>
            {program.isFeatured && <Badge color="saffron">â­ Featured</Badge>}
          </div>
          <h1 className="mb-4 font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
            {program.title}
          </h1>
          {program.shortDescription && (
            <p className="max-w-3xl text-lg leading-relaxed text-earth-200">{program.shortDescription}</p>
          )}
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-earth-300">
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

      <div className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-10 lg:col-span-2">
              {program.image && (
                <section>
                  <img src={program.image} alt={program.title} className="h-[26rem] w-full rounded-3xl object-cover shadow-sm" />
                </section>
              )}

              {program.description && (
                <section>
                  <h2 className="mb-4 font-serif text-2xl font-bold text-earth-800">About This Program</h2>
                  <p className="leading-relaxed text-earth-600">{program.description}</p>
                </section>
              )}

              {program.highlights?.length > 0 && (
                <section>
                  <h2 className="mb-4 font-serif text-2xl font-bold text-earth-800">What You'll Experience</h2>
                  <ul className="space-y-2">
                    {program.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <FaCheckCircle className="mt-1 flex-shrink-0 text-saffron-500" size={14} />
                        <span className="text-earth-600">{h}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {program.curriculum?.length > 0 && (
                <section>
                  <h2 className="mb-4 font-serif text-2xl font-bold text-earth-800">Curriculum</h2>
                  <div className="space-y-4">
                    {program.curriculum.map((week, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="flex gap-4 rounded-xl bg-parchment p-4"
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-saffron-100 text-sm font-bold text-saffron-600">
                          W{week.week}
                        </div>
                        <div>
                          <div className="font-semibold text-earth-800">{week.topic}</div>
                          {week.description && <div className="mt-1 text-sm text-earth-500">{week.description}</div>}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {program.instructor?.name && (
                <section>
                  <h2 className="mb-4 font-serif text-2xl font-bold text-earth-800">Your Instructor</h2>
                  <div className="flex items-start gap-4 rounded-2xl bg-parchment p-6">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-saffron-200 font-serif text-2xl font-bold text-saffron-700">
                      {program.instructor.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-earth-800">{program.instructor.name}</div>
                      {program.instructor.bio && <p className="mt-1 text-sm leading-relaxed text-earth-500">{program.instructor.bio}</p>}
                    </div>
                  </div>
                </section>
              )}
            </div>

            <aside>
              <div className="sticky top-28 space-y-5 rounded-2xl bg-parchment p-6">
                <div className="text-center">
                  <div className="mb-1 font-serif text-4xl font-bold text-saffron-600">
                    {program.isFree ? 'Free' : `â‚¹${program.price?.toLocaleString()}`}
                  </div>
                  {!program.isFree && <p className="text-sm text-earth-400">one-time fee</p>}
                </div>

                <div className="space-y-3 text-sm text-earth-600">
                  {[
                    { label: 'Duration', value: program.duration },
                    { label: 'Level', value: program.level, capitalize: true },
                    { label: 'Format', value: program.isOnline ? 'Online' : 'In-person' },
                    { label: 'Location', value: program.location },
                    {
                      label: 'Starts',
                      value: program.startDate
                        ? new Date(program.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
                        : 'Ongoing'
                    },
                  ].filter((row) => row.value).map((row) => (
                    <div key={row.label} className="flex items-center justify-between border-b border-earth-100 py-2 last:border-0">
                      <span className="text-earth-400">{row.label}</span>
                      <span className={`font-medium text-earth-800 ${row.capitalize ? 'capitalize' : ''}`}>{row.value}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className="block w-full rounded-full bg-saffron-500 py-3 text-center font-semibold text-white transition-colors hover:bg-saffron-600"
                >
                  Apply Now
                </Link>
                <Link
                  to="/contact"
                  className="block w-full rounded-full border border-earth-300 py-3 text-center text-sm font-semibold text-earth-700 transition-colors hover:bg-earth-50"
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

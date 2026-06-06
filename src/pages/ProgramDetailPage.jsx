import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheckCircle, FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import SEO, { courseSchema } from '../components/SEO';
import { Badge, ErrorMsg, Spinner } from '../components/common';
import { useApi } from '../hooks';
import { programsAPI } from '../services/api';
import programDetailBg from '../assets/program-detail-bg.jpg';

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

  const priceLabel = program.isFree ? 'Free' : `Rs ${program.price?.toLocaleString()}`;

  return (
    <>
      <SEO
        title={program.title}
        description={program.shortDescription || program.description?.slice(0, 155)}
        schema={courseSchema(program)}
      />

      <div className="relative min-h-screen overflow-hidden bg-[#020b16]">
        <img
          src={programDetailBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 pb-16 pt-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Link to="/programs" className="mb-6 inline-flex items-center gap-2 text-sm text-earth-200 transition-colors hover:text-saffron-300">
              <FaArrowLeft size={12} /> All Programs
            </Link>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge color="saffron">{program.category}</Badge>
              <Badge color="earth">{program.level}</Badge>
              {program.isFeatured && <Badge color="saffron">Featured</Badge>}
            </div>
            <h1 className="mb-4 font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
              {program.title}
            </h1>
            {program.shortDescription && (
              <p className="max-w-3xl text-lg leading-relaxed text-earth-100">{program.shortDescription}</p>
            )}
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-earth-200">
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

          <div className="mx-auto mt-16 max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="space-y-10 lg:col-span-2">
                {program.image && (
                  <section>
                    <img
                      src={program.image}
                      alt={program.title}
                      className="h-72 w-full rounded-3xl object-cover shadow-[0_20px_50px_rgba(0,0,0,0.18)] sm:h-80 lg:h-[26rem]"
                    />
                  </section>
                )}

                {program.description && (
                  <section className="rounded-3xl border border-white/50 bg-white/90 p-8 shadow-[0_18px_40px_rgba(62,39,21,0.08)] backdrop-blur-sm">
                    <h2 className="mb-4 font-serif text-2xl font-bold text-earth-800">About This Program</h2>
                    <p className="leading-relaxed text-earth-600">{program.description}</p>
                  </section>
                )}

                {program.highlights?.length > 0 && (
                  <section className="rounded-3xl border border-white/50 bg-white/90 p-8 shadow-[0_18px_40px_rgba(62,39,21,0.08)] backdrop-blur-sm">
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
                  <section className="rounded-3xl border border-white/50 bg-white/90 p-8 shadow-[0_18px_40px_rgba(62,39,21,0.08)] backdrop-blur-sm">
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
                  <section className="rounded-3xl border border-white/50 bg-white/90 p-8 shadow-[0_18px_40px_rgba(62,39,21,0.08)] backdrop-blur-sm">
                    <h2 className="mb-4 font-serif text-2xl font-bold text-earth-800">Your Instructor</h2>
                    <div className="flex flex-col items-start gap-4 rounded-2xl bg-parchment p-5 sm:flex-row sm:p-6">
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
                <div className="sticky top-28 space-y-5 rounded-3xl border border-white/60 bg-[#fff8ec]/90 p-6 shadow-[0_22px_50px_rgba(62,39,21,0.12)] backdrop-blur-sm">
                  <div className="text-center">
                    <div className="mb-1 font-serif text-4xl font-bold text-saffron-600">
                      {priceLabel}
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
                      <div key={row.label} className="flex flex-col gap-1 border-b border-earth-100 py-2 last:border-0 sm:flex-row sm:items-center sm:justify-between">
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
      </div>
    </>
  );
}

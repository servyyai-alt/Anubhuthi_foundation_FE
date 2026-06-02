import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import careersBg from "../assets/careers.png";

const openRolesLeft = [
  "Retreat Coordinators",
  "Travel & Retreat Executives",
  "Content Creators",
  "Social Media Managers",
  "Teaching Support Facilitators",
];

const openRolesRight = [
  "Human Resource Coordinators",
  "Tech & Community Team",
  "Event & Outreach Specialists",
  "Content & Media Team",
];

const idealCandidates = [
  "Great communication skills",
  "English/Hindi/Bilingual language fluency",
  "Positive personality",
  "Team player mindset",
  "Passion for awareness and human growth",
  "Discipline and integrity",
];

const benefits = [
  "Stay & Food Provided",
  "Training & Personal Growth",
  "Purpose-Driven Environment",
  "Meaningful Work Experience",
  "Career Development Opportunities",
];

function BenefitIcon({ type }) {
  const baseClass = "h-5 w-5 text-[#D8A24A] shrink-0";
  if (type === "food") {
    return (
      <svg viewBox="0 0 24 24" className={baseClass} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    );
  }
  if (type === "growth") {
    return (
      <svg viewBox="0 0 24 24" className={baseClass} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }
  if (type === "purpose") {
    return (
      <svg viewBox="0 0 24 24" className={baseClass} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    );
  }
  if (type === "work") {
    return (
      <svg viewBox="0 0 24 24" className={baseClass} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={baseClass} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function SectionHeading({ children }) {
  return (
    <h3 className="font-sans text-[20px] sm:text-[22px] font-bold uppercase tracking-wide text-[#021B3A] mb-3">
      {children}
    </h3>
  );
}

export default function CareersPage() {
  return (
    <>
      <Helmet>
        <title>Careers & Opportunities - Anubhuthi Foundation</title>
        <meta
          name="description"
          content="Careers and opportunities at Anubhuthi Foundation. Work with purpose and contribute to humanity."
        />
      </Helmet>

      <div className="pt-20 bg-[#F5EFE4] min-h-screen">
        {/* Banner Hero Container */}
        <section className="relative overflow-hidden w-full py-16 px-4 sm:px-6 lg:px-12">
          {/* Background Image */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${careersBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* Deep Navy Overlay */}
          <div
            className="absolute inset-0 z-1"
            style={{
              background:
                "linear-gradient(180deg, rgba(2,27,58,0.92) 0%, rgba(2,27,58,0.82) 50%, rgba(2,27,58,0.6) 100%)",
            }}
          />

          <div className="relative z-10 mx-auto w-full max-w-[1240px]">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-1.5 text-sm font-sans text-white/60 justify-start">
              <Link to="/" className="transition-colors hover:text-[#D8A24A]">Home</Link>
              <span>›</span>
              <span className="text-white/80">Careers</span>
            </nav>

            {/* Title & Subtitle */}
            <div className="mb-8 text-left">
              <h1 className="font-sans text-[36px] sm:text-[44px] lg:text-[48px] font-bold uppercase leading-[0.98] tracking-[-0.03em] text-white">
                WORK WITH PURPOSE
              </h1>
              <p className="mt-3 max-w-[650px] font-sans text-[15px] sm:text-[16px] leading-[1.5] text-white/90">
                We are looking for passionate individuals who want to make a
                real difference while contributing to humanity.
              </p>
            </div>

            {/* Main Rounded Content Card - Compact Sized with solid background */}
            <div
              className="mx-auto w-full max-w-[880px] rounded-[18px] border border-[#EFE7D9] shadow-[0_18px_42px_rgba(0,0,0,0.22)] p-5 sm:p-6 text-left"
              style={{ backgroundColor: "#F5EFE4" }}
            >
              
              {/* TOP ROW: OPEN ROLES */}
              <div>
                <SectionHeading>OPEN ROLES</SectionHeading>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_1px_1fr] sm:gap-6">
                  <ul className="space-y-2">
                    {openRolesLeft.map((role) => (
                      <li
                        key={role}
                        className="flex items-start gap-2.5 font-sans text-[17px] leading-[1.3] font-semibold text-[#111827]"
                      >
                        <span className="h-2 w-2 shrink-0 rounded-full bg-[#D8A24A]" />
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="hidden w-px bg-[#D9CFC0] sm:block" />

                  <ul className="space-y-2">
                    {openRolesRight.map((role) => (
                      <li
                        key={role}
                        className="flex items-start gap-2.5 font-sans text-[17px] leading-[1.3] font-semibold text-[#111827]"
                      >
                        <span className="h-2 w-2 shrink-0 rounded-full bg-[#D8A24A]" />
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* HORIZONTAL SEPARATOR */}
              <div className="my-5 h-px w-full bg-[#D9CFC0]" />

              {/* BOTTOM ROW: IDEAL CANDIDATES & BENEFITS */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_1px_1fr] sm:gap-6">
                
                {/* IDEAL CANDIDATES */}
                <div>
                  <SectionHeading>IDEAL CANDIDATES</SectionHeading>
                  <ul className="space-y-2">
                    {idealCandidates.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 font-sans text-[17px] leading-[1.3] font-semibold text-[#111827]"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="mt-[1px] h-5 w-5 shrink-0 text-[#D8A24A]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hidden w-px bg-[#D9CFC0] sm:block" />

                {/* BENEFITS */}
                <div>
                  <SectionHeading>BENEFITS</SectionHeading>
                  <ul className="space-y-2">
                    {benefits.map((item, index) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 font-sans text-[17px] leading-[1.3] font-semibold text-[#111827]"
                      >
                        <BenefitIcon
                          type={
                            index === 0
                              ? "food"
                              : index === 1
                                ? "growth"
                                : index === 2
                                  ? "purpose"
                                  : index === 3
                                    ? "work"
                                    : "star"
                          }
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CENTERED APPLY BUTTON */}
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  className="h-[56px] w-full max-w-[230px] rounded-[14px] text-white font-sans text-[20px] leading-none font-bold uppercase shadow-md transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105"
                  style={{ background: "linear-gradient(90deg,#D6A03A 0%,#B97712 100%)" }}
                >
                  APPLY NOW
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* BOTTOM NAVY SLOGAN BAR */}
        <div className="bg-[#021B3A] py-6 text-center">
          <div className="mx-auto w-full px-6 lg:px-12 text-center font-sans text-[20px] font-medium tracking-[0.01em] text-[#D8A24A] sm:text-[24px]">
            One Purpose <span className="mx-2 text-white">•</span> One Humanity <span className="mx-2 text-white">•</span> One Journey <span className="mx-2 text-white">•</span> One Evolution
          </div>
        </div>

      </div>
    </>
  );
}

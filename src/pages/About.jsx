import React from 'react';
import PageHeader from '../components/PageHeader';
import AboutProcess from '../components/AboutProcess';
import { teamMembers } from '../data/team';
import { studioConfig } from '../data/studioConfig';

export default function About() {
  return (
    <div className="pb-24 space-y-24 bg-white">
      <PageHeader
        kicker="Behind The Lens"
        title="About MY3 Studio"
        subtitle="Dedicated to authentic wedding stories, vibrant birthday celebrations, and timeless portraits."
      />

      {/* Origin Story & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[400px]">
              <img
                src="/photographer-bw.png"
                alt="MY3 Studio Lead Photographer"
                className="w-full h-auto object-contain filter contrast-105 drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)]"
              />
              <div className="mt-3 p-4 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm text-center">
                <span className="text-xs text-charcoal-600 font-mono tracking-wider font-bold">
                  EST. {studioConfig.establishedYear} • PROFESSIONAL EVENT COVERAGE
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-charcoal-600 font-normal leading-relaxed text-sm sm:text-base">
            <span className="font-script text-3xl text-coral block -mb-2 select-none">
              Our Story
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal-900 leading-tight">
              Real Smiles, Genuine Emotions & True Colors
            </h2>
            <p>
              We believe great photography isn't about stiff poses or artificial filters. It's about capturing how your celebration actually felt — the laughter during haldi, the happy tears during the vows, and the joyous dance floor energy with your closest friends.
            </p>
            <p>
              With over 8 years of experience covering multi-day weddings, birthday milestones, and family gatherings, our team combines traditional rituals coverage with modern candid moments and cinematic drone visuals.
            </p>
            <div className="p-6 rounded-2xl bg-gray-50 border-l-4 border-coral text-charcoal-800 text-sm font-semibold">
              "We take care of every detail — from photography and videography to custom printed albums and frames you'll cherish for a lifetime."
            </div>
          </div>
        </div>
      </section>

      {/* The 4-step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AboutProcess />
      </section>

      {/* The Team / Artists */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-script text-3xl text-coral block -mb-1 select-none">
            Our Crew
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal-900 tracking-tight">
            Meet the Team
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white border border-gray-200 overflow-hidden group hover:border-coral/40 hover:shadow-xl transition-all duration-300 flex flex-col shadow-sm"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-mono text-coral uppercase tracking-wider font-bold mb-1">
                    {member.role}
                  </p>
                  <h3 className="font-display font-bold text-xl text-charcoal-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed font-normal mb-4">
                    {member.bio}
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 text-[11px] text-charcoal-500">
                  <span className="font-bold text-charcoal-700">Specialty:</span> {member.specialty}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

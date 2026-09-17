import React from 'react';
import PageHeader from '../components/PageHeader';
import AboutProcess from '../components/AboutProcess';
import { teamMembers } from '../data/team';
import { studioConfig } from '../data/studioConfig';

export default function About() {
  return (
    <div className="pb-24 space-y-24">
      <PageHeader
        breadcrumb="About"
        badge="Philosophy & Atelier"
        title="Artistry Bound to Authentic Light"
        subtitle="Mythri Studios was founded with an uncompromised commitment to preserving human legacy with painterly tonality and documentary truth."
      />

      {/* Origin Story & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl border border-studio-800">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85"
              alt="Studio Founder at Work"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-studio-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-xs text-studio-300 font-mono">
              EST. {studioConfig.establishedYear} • BENGALURU, INDIA
            </div>
          </div>

          <div className="space-y-6 text-studio-300 font-light leading-relaxed text-sm sm:text-base">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
              The Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-studio-50 leading-tight">
              Beyond Trends: Creating Visual Heirlooms
            </h2>
            <p>
              In an era overwhelmed by disposable digital snapshots, Mythri Studios operates with the deliberate patience of an art atelier. We treat light as a sculptor treats stone — shaping mood, revealing personality, and immortalizing moments before they fade into memory.
            </p>
            <p>
              Whether documenting high-profile weddings or sculpting an intimate editorial portrait, our approach balances unobtrusive photojournalism with refined cinematic direction.
            </p>
            <div className="p-5 rounded-xl bg-studio-900 border border-studio-800 italic font-serif text-studio-100 text-sm">
              "A photograph is not taken; it is recognized, honored, and distilled."
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
          <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-2 block">
            The Artists
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-studio-50">
            Meet the Principal Creators
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-studio-900/80 border border-studio-800 overflow-hidden group hover:border-gold/40 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-studio-950/20 to-transparent" />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-mono text-gold uppercase tracking-wider mb-1">
                    {member.role}
                  </p>
                  <h3 className="font-serif text-xl text-studio-50 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-xs text-studio-400 leading-relaxed font-light mb-4">
                    {member.bio}
                  </p>
                </div>
                <div className="pt-3 border-t border-studio-800/80 text-[11px] text-studio-500">
                  <span className="text-studio-400">Specialty:</span> {member.specialty}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

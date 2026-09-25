import React from 'react';
import { Calendar, Camera, Film, Gift } from 'lucide-react';

const steps = [
  {
    step: "01",
    title: "Planning & Date Lock",
    icon: Calendar,
    desc: "We discuss your event dates, venue locations, rituals schedule, and package requirements to lock in our crew.",
  },
  {
    step: "02",
    title: "Event Day Coverage",
    icon: Camera,
    desc: "Our dedicated photo and video team captures traditional rituals, candid moments, drone angles, and family portraits.",
  },
  {
    step: "03",
    title: "Editing & Color Tuning",
    icon: Film,
    desc: "We edit the full ceremony videos, cut the cinematic highlights teaser, and retouch all photos with natural color tones.",
  },
  {
    step: "04",
    title: "Album & Media Delivery",
    icon: Gift,
    desc: "You receive your printed photo album, calendars, framed prints, master edited video, and all files on a high-speed pendrive.",
  },
];

export default function AboutProcess() {
  return (
    <section className="space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="font-script text-3xl text-[#E59A3D] block -mb-1 select-none">
          Simple & Transparent
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
          How We Work With You
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-[#14161C] rounded-3xl p-6 relative group border border-white/10 hover:border-[#E59A3D]/40 shadow-sm hover:shadow-xl transition-all">
              <span className="font-display text-sm text-[#E59A3D] font-black block mb-4">
                Step {s.step}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-[#E59A3D]/10 text-[#E59A3D] flex items-center justify-center mb-4 group-hover:bg-[#E59A3D] group-hover:text-black transition-all">
                <Icon size={20} />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                {s.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-normal">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

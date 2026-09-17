import React from 'react';
import { Sparkles, Calendar, Camera, Award } from 'lucide-react';

const steps = [
  {
    step: "01",
    title: "Discovery & Moodboarding",
    icon: Calendar,
    desc: "We discuss your personal aesthetic, wardrobe nuances, location ambiance, and lighting cues over tea or video call.",
  },
  {
    step: "02",
    title: "Production & Direction",
    icon: Camera,
    desc: "A relaxed, immersive shooting environment with gentle guidance, natural rapport, and precision lighting.",
  },
  {
    step: "03",
    title: "Darkroom & Retouching",
    icon: Sparkles,
    desc: "Each frame is meticulously color graded to achieve organic skin tones, rich analog tonal gradations, and cinematic contrast.",
  },
  {
    step: "04",
    title: "Heirloom Delivery",
    icon: Award,
    desc: "Private cloud gallery delivery of full resolution files, accompanied by custom Italian linen print folios.",
  },
];

export default function AboutProcess() {
  return (
    <section className="space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-2 block">
          The Experience
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-studio-50">
          Our Four-Stage Creative Journey
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="glass-card rounded-2xl p-6 relative group border border-studio-800">
              <span className="font-mono text-xs text-gold font-bold block mb-4">
                PHASE {s.step}
              </span>
              <div className="w-10 h-10 rounded-xl bg-studio-900 border border-studio-700 flex items-center justify-center text-gold mb-4 group-hover:border-gold/60 transition-colors">
                <Icon size={18} />
              </div>
              <h3 className="font-serif text-lg text-studio-100 mb-2">
                {s.title}
              </h3>
              <p className="text-xs text-studio-400 leading-relaxed font-light">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

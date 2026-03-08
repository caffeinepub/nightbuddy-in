import { BadgeCheck, Bot, Flag, HeartOff, PhoneOff } from "lucide-react";
import React from "react";

const safetyFeatures = [
  {
    icon: Bot,
    title: "AI Moderated Conversations",
    description:
      "Every conversation is monitored by AI to ensure a safe, respectful environment.",
  },
  {
    icon: PhoneOff,
    title: "No Phone Number Sharing",
    description:
      "Your personal contact details are never shared with anyone on the platform.",
  },
  {
    icon: HeartOff,
    title: "Strict No Dating Policy",
    description:
      "NightBuddy is for emotional support only. Romantic solicitation is strictly prohibited.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Listeners Only",
    description:
      "All listeners go through a thorough verification and training process before joining.",
  },
  {
    icon: Flag,
    title: "Report & Block Feature",
    description:
      "Instantly report or block anyone who makes you uncomfortable. Your safety comes first.",
  },
];

export default function Safety() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.11 0.025 265) 0%, oklch(0.13 0.035 272) 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.52 0.24 290 / 0.07) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="container-max relative z-10">
        {/* Section header */}
        <div className="text-center mb-10">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3 px-4 py-1.5 rounded-full"
            style={{
              color: "oklch(0.72 0.18 290)",
              background: "oklch(0.52 0.24 290 / 0.12)",
              border: "1px solid oklch(0.52 0.24 290 / 0.25)",
            }}
          >
            Safe & Anonymous
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold leading-tight mb-5"
            style={{ color: "oklch(0.95 0.01 280)" }}
          >
            Your privacy is sacred here
          </h2>

          {/* Lead paragraph — prominently styled */}
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-medium"
            style={{ color: "oklch(0.80 0.07 285)" }}
          >
            Every conversation on NightBuddy is fully anonymous. No names, no
            phone numbers —{" "}
            <span
              style={{
                color: "oklch(0.88 0.12 295)",
                fontWeight: 600,
              }}
            >
              just two people talking, safely.
            </span>
          </p>
        </div>

        {/* Safety features grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {safetyFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const isLast = index === safetyFeatures.length - 1;
            const isOdd = safetyFeatures.length % 2 !== 0;

            return (
              <div
                key={feature.title}
                className={`card-night rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.03] ${
                  isLast && isOdd ? "col-span-2 md:col-span-1" : ""
                }`}
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.52 0.24 290 / 0.2), oklch(0.62 0.20 310 / 0.15))",
                    border: "1px solid oklch(0.52 0.24 290 / 0.3)",
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: "oklch(0.72 0.18 290)" }}
                  />
                </div>
                <h3
                  className="font-semibold text-sm mb-1.5 leading-snug"
                  style={{ color: "oklch(0.90 0.02 280)" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-xs leading-relaxed hidden sm:block"
                  style={{ color: "oklch(0.60 0.04 280)" }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust badge */}
        <div
          className="mt-10 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.52 0.24 290 / 0.10), oklch(0.62 0.20 310 / 0.07))",
            border: "1px solid oklch(0.52 0.24 290 / 0.18)",
          }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.52 0.24 290 / 0.25), oklch(0.62 0.20 310 / 0.2))",
              border: "1px solid oklch(0.52 0.24 290 / 0.4)",
            }}
          >
            <span className="text-xl">🛡️</span>
          </div>
          <p
            className="text-sm sm:text-base"
            style={{ color: "oklch(0.72 0.05 280)" }}
          >
            NightBuddy is designed for{" "}
            <span style={{ color: "oklch(0.82 0.14 295)", fontWeight: 600 }}>
              emotional support only
            </span>
            . We maintain a zero-tolerance policy for harassment, dating
            solicitation, or any form of misuse.
          </p>
        </div>
      </div>
    </section>
  );
}

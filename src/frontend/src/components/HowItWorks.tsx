import { MessageSquare, Smile, Zap } from "lucide-react";
import React from "react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Start an anonymous chat",
    subtitle: "No sign-up needed",
    description:
      "Jump in with a tap — no real name, no phone number. Your identity stays completely private.",
  },
  {
    number: "02",
    icon: Zap,
    title: "Get matched with someone instantly",
    subtitle: "Smart matching",
    description:
      "Our system finds someone awake and ready to listen, matched to how you're feeling right now.",
  },
  {
    number: "03",
    icon: Smile,
    title: "Talk freely and feel lighter",
    subtitle: "Judge-free zone",
    description:
      "Say what's on your mind. No advice unless you want it. Just someone who genuinely listens.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.13 0.03 270) 0%, oklch(0.11 0.025 265) 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.20 310 / 0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="container-max relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3 px-4 py-1.5 rounded-full"
            style={{
              color: "oklch(0.72 0.18 290)",
              background: "oklch(0.52 0.24 290 / 0.12)",
              border: "1px solid oklch(0.52 0.24 290 / 0.25)",
            }}
          >
            Simple & Safe
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold leading-tight mb-4"
            style={{ color: "oklch(0.95 0.01 280)" }}
          >
            How It Works
          </h2>
          <p
            className="text-base sm:text-lg max-w-md mx-auto"
            style={{ color: "oklch(0.68 0.04 280)" }}
          >
            Three simple steps to find your calm in the night.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-4 relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-14 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.52 0.24 290 / 0.4), oklch(0.52 0.24 290 / 0.4), transparent)",
            }}
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="flex-1 flex flex-col items-center text-center relative"
              >
                {/* Step number badge */}
                <div className="relative mb-5">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center relative z-10"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.52 0.24 290), oklch(0.62 0.20 310))",
                      boxShadow: "0 0 25px oklch(0.52 0.24 290 / 0.45)",
                    }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {/* Step number */}
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                    style={{
                      background: "oklch(0.12 0.025 265)",
                      color: "oklch(0.72 0.18 290)",
                      border: "1px solid oklch(0.52 0.24 290 / 0.5)",
                      fontSize: "10px",
                    }}
                  >
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <div
                  className="card-night rounded-2xl p-5 w-full"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}
                >
                  <div
                    className="text-xs font-semibold tracking-wider uppercase mb-1"
                    style={{ color: "oklch(0.62 0.18 295)" }}
                  >
                    Step {index + 1} — {step.subtitle}
                  </div>
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ color: "oklch(0.92 0.02 280)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.65 0.04 280)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

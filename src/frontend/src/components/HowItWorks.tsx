import { ChevronDown, MessageCircle, Shield, UserCheck } from "lucide-react";
import React, { useState } from "react";

const steps = [
  {
    number: "01",
    icon: Shield,
    label: "Step 1 — Join Safely",
    title: "Join Safely",
    summary: "Sign up with just your name and email.",
    detail:
      "Users sign up with basic information like name and email. No personal identity is shared publicly. Your privacy is protected from the start.",
  },
  {
    number: "02",
    icon: UserCheck,
    label: "Step 2 — Complete Profile",
    title: "Complete Profile",
    summary: "Add age, gender, and country.",
    detail:
      "Users add age, gender and country so we can create a better support experience. This helps us match you with the right listener and make NightBuddy better for you.",
  },
  {
    number: "03",
    icon: MessageCircle,
    label: "Step 3 — Start Talking",
    title: "Start Talking",
    summary: "Chat anonymously in a safe space.",
    detail:
      "Users can chat anonymously with a listener or another user in a safe and judgment-free environment. No real names, no pressure — just honest conversations.",
  },
];

export default function HowItWorks() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            How NightBuddy Works
          </h2>
          <p
            className="text-base sm:text-lg max-w-md mx-auto"
            style={{ color: "oklch(0.68 0.04 280)" }}
          >
            Three steps to feel heard and supported.
          </p>
        </div>

        {/* Interactive steps */}
        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isOpen = openIndex === index;

            return (
              <div
                key={step.number}
                data-ocid={`how_it_works.item.${index + 1}`}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: isOpen
                    ? "linear-gradient(135deg, oklch(0.16 0.04 275 / 0.95), oklch(0.14 0.035 270 / 0.95))"
                    : "oklch(0.14 0.03 270 / 0.7)",
                  border: isOpen
                    ? "1px solid oklch(0.52 0.24 290 / 0.45)"
                    : "1px solid oklch(0.22 0.04 270 / 0.6)",
                  boxShadow: isOpen
                    ? "0 4px 24px oklch(0.52 0.24 290 / 0.15), 0 0 40px oklch(0.52 0.24 290 / 0.08)"
                    : "0 2px 12px rgba(0,0,0,0.2)",
                }}
              >
                {/* Header row — semantic button for accessibility */}
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-4 px-5 py-4 cursor-pointer text-left"
                  style={{ background: "none", border: "none" }}
                >
                  {/* Step icon */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: isOpen
                        ? "linear-gradient(135deg, oklch(0.52 0.24 290), oklch(0.62 0.20 310))"
                        : "oklch(0.52 0.24 290 / 0.18)",
                      border: isOpen
                        ? "1px solid oklch(0.72 0.20 290 / 0.5)"
                        : "1px solid oklch(0.42 0.18 290 / 0.35)",
                      boxShadow: isOpen
                        ? "0 0 20px oklch(0.52 0.24 290 / 0.4)"
                        : "none",
                    }}
                  >
                    <Icon
                      className="w-5 h-5 transition-colors duration-300"
                      style={{
                        color: isOpen ? "#ffffff" : "oklch(0.72 0.18 290)",
                      }}
                    />
                  </div>

                  {/* Title and summary */}
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-xs font-semibold tracking-widest uppercase mb-0.5"
                      style={{ color: "oklch(0.62 0.18 295)" }}
                    >
                      {step.label}
                    </div>
                    {!isOpen && (
                      <p
                        className="text-sm truncate"
                        style={{ color: "oklch(0.62 0.04 280)" }}
                      >
                        {step.summary}
                      </p>
                    )}
                    {isOpen && (
                      <h3
                        className="font-bold text-base"
                        style={{ color: "oklch(0.92 0.02 280)" }}
                      >
                        {step.title}
                      </h3>
                    )}
                  </div>

                  {/* Chevron */}
                  <ChevronDown
                    className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
                    style={{
                      color: isOpen
                        ? "oklch(0.72 0.18 290)"
                        : "oklch(0.45 0.04 275)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                {/* Expanded detail */}
                <div
                  style={{
                    maxHeight: isOpen ? "200px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.35s ease",
                  }}
                >
                  <div
                    className="px-5 pb-5"
                    style={{
                      borderTop: "1px solid oklch(0.52 0.24 290 / 0.15)",
                      paddingTop: "1rem",
                    }}
                  >
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "oklch(0.70 0.05 280)" }}
                    >
                      {step.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Flow indicator */}
        <div className="flex justify-center mt-10">
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium"
            style={{
              background: "oklch(0.52 0.24 290 / 0.08)",
              border: "1px solid oklch(0.52 0.24 290 / 0.20)",
              color: "oklch(0.65 0.08 285)",
            }}
          >
            <span style={{ color: "oklch(0.72 0.18 290)" }}>Join</span>
            <span style={{ color: "oklch(0.40 0.04 275)" }}>→</span>
            <span style={{ color: "oklch(0.72 0.18 290)" }}>Profile</span>
            <span style={{ color: "oklch(0.40 0.04 275)" }}>→</span>
            <span style={{ color: "oklch(0.72 0.18 290)" }}>Chat</span>
          </div>
        </div>
      </div>
    </section>
  );
}

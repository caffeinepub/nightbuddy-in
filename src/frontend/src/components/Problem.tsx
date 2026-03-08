import React from "react";

const problems = [
  {
    emoji: "🌀",
    title: "Overthinking at 2 AM",
    description:
      "Your mind won't stop. The same thoughts loop endlessly — what if, why me, what next. Sleep feels miles away.",
  },
  {
    emoji: "💔",
    title: "Loneliness after a breakup",
    description:
      "You reach for your phone to text them, then remember. The silence is deafening. You just need someone to talk to.",
  },
  {
    emoji: "😰",
    title: "Career pressure & uncertainty",
    description:
      "Placements, job hunts, family expectations — the weight of it all hits hardest when the world goes quiet at night.",
  },
  {
    emoji: "🌑",
    title: "Night anxiety & emptiness",
    description:
      "A hollow feeling you can't explain. Not sad, not happy — just lost. And there's no one awake to understand.",
  },
];

export default function Problem() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.12 0.025 265) 0%, oklch(0.13 0.03 270) 100%)",
      }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.52 0.24 290 / 0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
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
            You're Not Alone
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold leading-tight mb-4"
            style={{ color: "oklch(0.95 0.01 280)" }}
          >
            You're Not Alone in the Night
          </h2>
          <p
            className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.68 0.04 280)" }}
          >
            Millions of young Indians lie awake every night, carrying feelings
            they can't share with anyone around them.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="card-night rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
              style={{
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    background: "oklch(0.52 0.24 290 / 0.15)",
                    border: "1px solid oklch(0.52 0.24 290 / 0.25)",
                  }}
                >
                  {problem.emoji}
                </div>
                <div>
                  <h3
                    className="font-semibold text-base mb-1.5"
                    style={{ color: "oklch(0.92 0.02 280)" }}
                  >
                    {problem.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.65 0.04 280)" }}
                  >
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stat callout */}
        <div
          className="mt-10 rounded-2xl p-6 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.52 0.24 290 / 0.12), oklch(0.62 0.20 310 / 0.08))",
            border: "1px solid oklch(0.52 0.24 290 / 0.2)",
          }}
        >
          <p
            className="text-base sm:text-lg font-medium leading-relaxed"
            style={{ color: "oklch(0.80 0.06 280)" }}
          >
            <span
              className="font-bold text-xl"
              style={{ color: "oklch(0.78 0.18 295)" }}
            >
              7 in 10
            </span>{" "}
            young Indians aged 18–35 report feeling emotionally unsupported
            during late-night hours.
            <br className="hidden sm:block" />
            <span style={{ color: "oklch(0.68 0.04 280)" }}>
              {" "}
              NightBuddy is here to change that.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

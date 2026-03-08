import { Moon, Sparkles } from "lucide-react";
import type React from "react";

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2.5 + 1,
  duration: `${Math.random() * 3 + 2}s`,
  delay: `${Math.random() * 4}s`,
  opacity: Math.random() * 0.6 + 0.2,
}));

export default function Hero() {
  const handleScrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("early-access");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.09 0.03 265) 0%, oklch(0.12 0.025 265) 40%, oklch(0.14 0.04 275) 100%)",
      }}
    >
      {/* Hero background image */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url(/assets/generated/hero-night-sky.dim_1200x600.png)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {STARS.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration} ease-in-out infinite`,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Purple glow orbs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.52 0.24 290 / 0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.20 310 / 0.12) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
        {/* Logo icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center float-animation"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.52 0.24 290 / 0.3), oklch(0.62 0.20 310 / 0.2))",
              border: "1px solid oklch(0.58 0.22 290 / 0.5)",
              boxShadow: "0 0 30px oklch(0.58 0.22 290 / 0.4)",
            }}
          >
            <img
              src="/assets/generated/nightbuddy-logo-icon.dim_128x128.png"
              alt="NightBuddy"
              className="w-10 h-10 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).parentElement!.innerHTML =
                  '<span style="font-size:28px">🌙</span>';
              }}
            />
          </div>
        </div>

        {/* Brand name */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles
            className="w-4 h-4"
            style={{ color: "oklch(0.72 0.18 290)" }}
          />
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: "oklch(0.72 0.18 290)" }}
          >
            NightBuddy.in
          </span>
          <Sparkles
            className="w-4 h-4"
            style={{ color: "oklch(0.72 0.18 290)" }}
          />
        </div>

        {/* Hindi headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5"
          style={{
            fontFamily: "'Inter', sans-serif",
            background:
              "linear-gradient(135deg, oklch(0.95 0.01 280), oklch(0.82 0.14 300))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Raat ko kisi se
          <br />
          baat karni hai?
        </h1>

        {/* English subheadline */}
        <p
          className="text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-xl mx-auto"
          style={{ color: "oklch(0.75 0.05 280)" }}
        >
          NightBuddy connects you with verified anonymous listeners in minutes.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={handleScrollToForm}
            className="btn-primary text-base sm:text-lg pulse-glow"
          >
            <Moon className="w-5 h-5" />
            Join Early Access
          </button>

          {/* Launch note */}
          <p
            className="text-sm font-medium"
            style={{ color: "oklch(0.62 0.04 280)" }}
          >
            Launching Soon in India 🇮🇳
          </p>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.12 0.025 265))",
        }}
      />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <div
          className="w-0.5 h-8 rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.58 0.22 290), transparent)",
            animation: "float 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}

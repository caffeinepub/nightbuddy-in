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

interface HeroProps {
  isRegistered: boolean;
}

export default function Hero({ isRegistered }: HeroProps) {
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
      {/* Hero background image — cinematic rooftop night scene */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(/assets/generated/hero-rooftop-night.dim_1600x900.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          filter: "blur(0.8px)",
          transform: "scale(1.03)",
          zIndex: 0,
        }}
      />

      {/* Dark gradient overlay — reduced to ~0.55 so new cinematic scene shows through */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.06 0.03 265 / 0.50) 0%, oklch(0.05 0.02 265 / 0.55) 55%, oklch(0.08 0.025 265 / 0.78) 100%)",
          zIndex: 1,
        }}
      />

      {/* CSS Stars */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 2 }}
      >
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
          zIndex: 2,
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.20 310 / 0.12) 0%, transparent 70%)",
          filter: "blur(30px)",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        className="relative text-center px-5 max-w-3xl mx-auto"
        style={{ zIndex: 10 }}
      >
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
          className="text-base sm:text-lg md:text-xl leading-relaxed mb-3 max-w-xl mx-auto"
          style={{ color: "oklch(0.78 0.06 280)" }}
        >
          NightBuddy is a calm place where you can talk to someone who will
          truly listen — anonymously.
        </p>

        {/* Emotional line */}
        <p
          className="text-sm sm:text-base leading-relaxed mb-9 max-w-sm mx-auto"
          style={{
            color: "oklch(0.62 0.10 295)",
            fontStyle: "italic",
            letterSpacing: "0.01em",
          }}
        >
          Sometimes all we need is someone who understands.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-wrap items-center justify-center gap-4"
          style={{ position: "relative", zIndex: 20 }}
        >
          {isRegistered ? (
            /* Registered user — show Start Chatting as primary */
            <button
              data-ocid="hero.primary_button"
              type="button"
              style={{
                position: "relative",
                zIndex: 20,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                fontWeight: 700,
                borderRadius: "9999px",
                padding: "1rem 2.5rem",
                fontSize: "1.1rem",
                cursor: "pointer",
                color: "#ffffff",
                background:
                  "linear-gradient(135deg, oklch(0.62 0.28 285), oklch(0.58 0.26 310), oklch(0.65 0.24 330))",
                boxShadow:
                  "0 0 30px oklch(0.62 0.26 290 / 0.8), 0 0 60px oklch(0.62 0.26 290 / 0.4)",
                border: "1px solid oklch(0.78 0.22 290 / 0.7)",
                textShadow: "0 0 12px oklch(0.9 0.1 290 / 0.6)",
                animation: "pulse-glow 3s ease-in-out infinite",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-2px) scale(1.04)";
                el.style.boxShadow =
                  "0 0 40px oklch(0.68 0.28 290 / 0.9), 0 0 80px oklch(0.68 0.28 290 / 0.5), 0 6px 28px oklch(0.3 0.15 290 / 0.6)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0) scale(1)";
                el.style.boxShadow =
                  "0 0 30px oklch(0.62 0.26 290 / 0.8), 0 0 60px oklch(0.62 0.26 290 / 0.4)";
              }}
            >
              <Moon
                style={{ width: "1.2rem", height: "1.2rem", flexShrink: 0 }}
              />
              Start Chatting
            </button>
          ) : (
            /* New visitor — show only Join Early Access */
            <button
              data-ocid="hero.primary_button"
              type="button"
              onClick={handleScrollToForm}
              style={{
                position: "relative",
                zIndex: 20,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                fontWeight: 700,
                borderRadius: "9999px",
                padding: "1rem 2.5rem",
                fontSize: "1.1rem",
                cursor: "pointer",
                color: "#ffffff",
                background:
                  "linear-gradient(135deg, oklch(0.62 0.28 285), oklch(0.58 0.26 310), oklch(0.65 0.24 330))",
                boxShadow:
                  "0 0 30px oklch(0.62 0.26 290 / 0.8), 0 0 60px oklch(0.62 0.26 290 / 0.4)",
                border: "1px solid oklch(0.78 0.22 290 / 0.7)",
                textShadow: "0 0 12px oklch(0.9 0.1 290 / 0.6)",
                opacity: 1,
                animation: "pulse-glow 3s ease-in-out infinite",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-2px) scale(1.04)";
                el.style.boxShadow =
                  "0 0 40px oklch(0.68 0.28 290 / 0.9), 0 0 80px oklch(0.68 0.28 290 / 0.5), 0 6px 28px oklch(0.3 0.15 290 / 0.6)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0) scale(1)";
                el.style.boxShadow =
                  "0 0 30px oklch(0.62 0.26 290 / 0.8), 0 0 60px oklch(0.62 0.26 290 / 0.4)";
              }}
            >
              <Moon
                style={{ width: "1.2rem", height: "1.2rem", flexShrink: 0 }}
              />
              Join Early Access
            </button>
          )}
        </div>

        {/* Subtle tagline */}
        <p
          className="text-sm font-medium mt-5 tracking-widest uppercase"
          style={{ color: "oklch(0.52 0.06 280)" }}
        >
          Anonymous · Safe · Free
        </p>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.12 0.025 265))",
          zIndex: 3,
        }}
      />

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40"
        style={{ zIndex: 10 }}
      >
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

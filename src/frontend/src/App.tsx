import React from "react";
import AdminPasswordGate from "./components/AdminPasswordGate";
import AdminView from "./components/AdminView";
import EarlyAccessForm from "./components/EarlyAccessForm";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Problem from "./components/Problem";
import Safety from "./components/Safety";

function LandingPage() {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{ background: "oklch(0.10 0.025 265)" }}
    >
      {/* Sticky nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-3"
        style={{
          background: "oklch(0.10 0.025 265 / 0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid oklch(0.20 0.04 270 / 0.3)",
        }}
      >
        <div className="flex items-center gap-2">
          <img
            src="/assets/generated/nightbuddy-logo-icon.dim_128x128.png"
            alt="NightBuddy logo"
            className="w-7 h-7 rounded-lg"
          />
          <span
            className="font-bold text-base tracking-wide"
            style={{ color: "oklch(0.90 0.04 280)" }}
          >
            NightBuddy
            <span style={{ color: "oklch(0.72 0.18 290)" }}>.in</span>
          </span>
        </div>
        <a
          href="#early-access"
          className="text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200"
          style={{
            background: "oklch(0.52 0.24 290 / 0.15)",
            border: "1px solid oklch(0.52 0.24 290 / 0.30)",
            color: "oklch(0.78 0.16 290)",
          }}
        >
          Get Early Access
        </a>
      </nav>

      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Safety />
        <EarlyAccessForm />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const isAdmin = window.location.pathname === "/admin";

  if (isAdmin) {
    return (
      <AdminPasswordGate>
        <AdminView />
      </AdminPasswordGate>
    );
  }

  return <LandingPage />;
}

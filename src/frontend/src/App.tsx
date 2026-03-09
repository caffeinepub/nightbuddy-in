import React, { useState } from "react";
import AdminPasswordGate from "./components/AdminPasswordGate";
import AdminView from "./components/AdminView";
import EarlyAccessForm from "./components/EarlyAccessForm";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Problem from "./components/Problem";
import Safety from "./components/Safety";

const REGISTERED_KEY = "nightbuddy_registered";
const PROFILE_KEY = "nightbuddy_profile_complete";
const EMAIL_KEY = "nightbuddy_signup_email";
// Bump this version string whenever the onboarding flow changes to
// automatically clear stale localStorage from previous deployments.
const ONBOARDING_VERSION = "v3";
const VERSION_KEY = "nightbuddy_onboarding_version";

/** Validate that a string looks like a real email address. */
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Read and validate onboarding state from localStorage.
 *  Rules:
 *  - If the stored onboarding version doesn't match ONBOARDING_VERSION,
 *    all keys are wiped and the user is treated as a brand-new visitor.
 *  - isRegistered requires: flag === "true" AND a valid-format email.
 *  - isProfileComplete requires isRegistered to also be valid.
 */
function readOnboardingState() {
  try {
    // Version gate — clears stale state from previous deployments
    const storedVersion = localStorage.getItem(VERSION_KEY);
    if (storedVersion !== ONBOARDING_VERSION) {
      localStorage.removeItem(REGISTERED_KEY);
      localStorage.removeItem(PROFILE_KEY);
      localStorage.removeItem(EMAIL_KEY);
      localStorage.setItem(VERSION_KEY, ONBOARDING_VERSION);
      return { registered: false, profileComplete: false, email: "" };
    }

    const email = localStorage.getItem(EMAIL_KEY) ?? "";
    const registeredFlag = localStorage.getItem(REGISTERED_KEY);
    const profileFlag = localStorage.getItem(PROFILE_KEY);

    // Both the flag AND a valid email must be present
    const registered = registeredFlag === "true" && isValidEmail(email);

    // Profile complete only valid when signup is also valid
    const profileComplete = registered && profileFlag === "true";

    // Repair inconsistent state: if registered is false but partial keys
    // exist, remove them so nothing leaks through
    if (!registered) {
      localStorage.removeItem(REGISTERED_KEY);
      localStorage.removeItem(PROFILE_KEY);
      localStorage.removeItem(EMAIL_KEY);
    } else if (!profileComplete) {
      localStorage.removeItem(PROFILE_KEY);
    }

    return { registered, profileComplete, email: registered ? email : "" };
  } catch {
    return { registered: false, profileComplete: false, email: "" };
  }
}

function LandingPage() {
  const initial = readOnboardingState();

  const [isRegistered, setIsRegistered] = useState<boolean>(initial.registered);

  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(
    initial.profileComplete,
  );

  const [signupEmail, setSignupEmail] = useState<string>(initial.email);

  const handleRegistered = (email: string) => {
    try {
      localStorage.setItem(VERSION_KEY, ONBOARDING_VERSION);
      localStorage.setItem(REGISTERED_KEY, "true");
      localStorage.setItem(EMAIL_KEY, email);
    } catch {
      // ignore storage errors
    }
    setIsRegistered(true);
    setSignupEmail(email);
  };

  const handleProfileComplete = () => {
    try {
      localStorage.setItem(VERSION_KEY, ONBOARDING_VERSION);
      localStorage.setItem(PROFILE_KEY, "true");
    } catch {
      // ignore storage errors
    }
    setIsProfileComplete(true);
  };

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
        {isProfileComplete ? (
          <button
            data-ocid="nav.primary_button"
            type="button"
            onClick={() => {
              const el = document.getElementById("early-access");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.62 0.28 285 / 0.85), oklch(0.58 0.26 310 / 0.85))",
              border: "1px solid oklch(0.72 0.22 290 / 0.5)",
              color: "#ffffff",
            }}
          >
            Start Chatting
          </button>
        ) : (
          <a
            href="#early-access"
            data-ocid="nav.link"
            className="text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200"
            style={{
              background: "oklch(0.52 0.24 290 / 0.15)",
              border: "1px solid oklch(0.52 0.24 290 / 0.30)",
              color: "oklch(0.78 0.16 290)",
            }}
          >
            {isRegistered ? "Complete Profile" : "Join Early Access"}
          </a>
        )}
      </nav>

      <main>
        <Hero
          isRegistered={isRegistered}
          isProfileComplete={isProfileComplete}
        />
        <Problem />
        <HowItWorks />
        <Safety />
        <EarlyAccessForm
          isRegistered={isRegistered}
          isProfileComplete={isProfileComplete}
          signupEmail={signupEmail}
          onRegistered={handleRegistered}
          onProfileComplete={handleProfileComplete}
        />
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

import {
  CheckCircle,
  ChevronRight,
  Loader2,
  Mail,
  Moon,
  User,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
  useGetSignups,
  useSubmitProfile,
  useSubmitSignup,
} from "../hooks/useQueries";

interface EarlyAccessFormProps {
  isRegistered: boolean;
  isProfileComplete: boolean;
  signupEmail: string;
  onRegistered: (email: string) => void;
  onProfileComplete: () => void;
}

const AGE_RANGES = ["18–24", "25–34", "35–44", "45+"];
const GENDERS = ["Male", "Female", "Non-binary", "Prefer not to say"];

// Shared button pill style for selector groups
function PillOption({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer"
      style={{
        background: selected
          ? "linear-gradient(135deg, oklch(0.62 0.28 285), oklch(0.58 0.26 310))"
          : "oklch(0.12 0.025 265)",
        border: selected
          ? "1px solid oklch(0.72 0.22 290 / 0.7)"
          : "1px solid oklch(0.28 0.05 270)",
        color: selected ? "#ffffff" : "oklch(0.68 0.04 280)",
        boxShadow: selected ? "0 0 16px oklch(0.62 0.26 290 / 0.45)" : "none",
        textShadow: selected ? "0 0 8px oklch(0.9 0.1 290 / 0.4)" : "none",
      }}
    >
      {label}
    </button>
  );
}

// Step indicator dots
function StepIndicator({ currentStep }: { currentStep: 1 | 2 }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      {[1, 2].map((step) => {
        const isDone = step < currentStep;
        const isActive = step === currentStep;
        return (
          <div key={step} className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
              style={{
                width: "28px",
                height: "28px",
                background: isDone
                  ? "linear-gradient(135deg, oklch(0.62 0.28 285), oklch(0.58 0.26 310))"
                  : isActive
                    ? "oklch(0.52 0.24 290 / 0.25)"
                    : "oklch(0.18 0.03 265)",
                border: isDone
                  ? "1px solid oklch(0.72 0.22 290 / 0.7)"
                  : isActive
                    ? "1px solid oklch(0.52 0.24 290 / 0.8)"
                    : "1px solid oklch(0.28 0.05 270)",
                color: isDone
                  ? "#ffffff"
                  : isActive
                    ? "oklch(0.78 0.18 290)"
                    : "oklch(0.45 0.04 275)",
                boxShadow: isActive
                  ? "0 0 10px oklch(0.52 0.24 290 / 0.3)"
                  : "none",
              }}
            >
              {isDone ? "✓" : step}
            </div>
            {step < 2 && (
              <div
                className="h-px w-8 rounded-full transition-all duration-300"
                style={{
                  background:
                    currentStep > 1
                      ? "linear-gradient(90deg, oklch(0.62 0.28 285), oklch(0.52 0.24 290 / 0.4))"
                      : "oklch(0.28 0.05 270)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function EarlyAccessForm({
  isRegistered,
  isProfileComplete,
  signupEmail,
  onRegistered,
  onProfileComplete,
}: EarlyAccessFormProps) {
  // Step 1: Signup state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [step1Errors, setStep1Errors] = useState<{
    name?: string;
    email?: string;
  }>({});

  // Step 2: Profile state
  const [ageRange, setAgeRange] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [step2Errors, setStep2Errors] = useState<{
    ageRange?: string;
    country?: string;
    general?: string;
  }>({});

  const submitSignup = useSubmitSignup();
  const submitProfile = useSubmitProfile();
  const { data: signups, isLoading: isCountLoading } = useGetSignups();
  const signupCount = signups?.length ?? 0;

  // Fade-in animation state — triggers whenever the visible step changes
  const [cardVisible, setCardVisible] = useState(true);
  const prevStepRef = useRef<"signup" | "profile" | "success">(
    isProfileComplete ? "success" : isRegistered ? "profile" : "signup",
  );

  const currentStep = isProfileComplete
    ? "success"
    : isRegistered
      ? "profile"
      : "signup";

  useEffect(() => {
    if (prevStepRef.current !== currentStep) {
      prevStepRef.current = currentStep;
      // Trigger re-mount fade-in: hide → show
      setCardVisible(false);
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setCardVisible(true));
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [currentStep]);

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // ── Step 1 submit ────────────────────────────────────────────────────────────
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { name?: string; email?: string } = {};
    if (!name.trim()) errs.name = "Please enter your name.";
    if (!email.trim()) errs.email = "Please enter your email.";
    else if (!validateEmail(email))
      errs.email = "Please enter a valid email address.";
    setStep1Errors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      const result = await submitSignup.mutateAsync({
        name: name.trim(),
        email: email.trim(),
      });
      // success
      void result;
      setName("");
      setEmail("");
      setStep1Errors({});
      onRegistered(email.trim());
    } catch (err: unknown) {
      const raw = err instanceof Error ? err.message : String(err);
      const msg = raw.toLowerCase();
      if (
        msg.includes("already signed up") ||
        msg.includes("email already") ||
        msg.includes("already registered")
      ) {
        // Soft success — email is already on the list
        setName("");
        setEmail("");
        setStep1Errors({});
        onRegistered(email.trim());
      } else if (
        msg.includes("connecting") ||
        msg.includes("please try again") ||
        msg.includes("please wait")
      ) {
        setStep1Errors({
          email: "Still connecting — please wait a moment and try again.",
        });
      } else if (
        msg.includes("unable to reach") ||
        msg.includes("please refresh") ||
        msg.includes("not available")
      ) {
        setStep1Errors({
          email: "Unable to reach the server. Please refresh the page.",
        });
      } else if (
        msg.includes("name cannot be empty") ||
        msg.includes("invalid email") ||
        msg.includes("name is required")
      ) {
        setStep1Errors({ email: raw });
      } else {
        console.error("[NightBuddy signup error]", raw);
        setStep1Errors({
          email:
            "Something went wrong. Please check your connection and try again.",
        });
      }
    }
  };

  // ── Step 2 submit ────────────────────────────────────────────────────────────
  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { ageRange?: string; country?: string; general?: string } = {};
    if (!ageRange) errs.ageRange = "Please select your age range.";
    if (!country.trim()) errs.country = "Please enter your country.";
    setStep2Errors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      await submitProfile.mutateAsync({
        email: signupEmail,
        ageRange,
        country: country.trim(),
        gender,
      });
      setStep2Errors({});
      onProfileComplete();
    } catch (err: unknown) {
      const raw = err instanceof Error ? err.message : String(err);
      console.error("[NightBuddy profile error]", raw);
      setStep2Errors({
        general: "Couldn't save your profile. Please try again.",
      });
    }
  };

  const handleSkipProfile = () => {
    onProfileComplete();
  };

  // ── Shared input style helpers ────────────────────────────────────────────────
  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    background: "oklch(0.10 0.02 265)",
    border: hasError
      ? "1px solid oklch(0.577 0.245 27.325)"
      : "1px solid oklch(0.28 0.05 270)",
    color: "oklch(0.92 0.02 280)",
    boxShadow: "none",
    fontSize: "16px",
  });

  const submitBtnStyle: React.CSSProperties = {
    background:
      "linear-gradient(135deg, oklch(0.62 0.28 285), oklch(0.58 0.26 310), oklch(0.65 0.24 330))",
    color: "#ffffff",
    border: "1px solid oklch(0.72 0.22 290 / 0.5)",
    textShadow: "0 0 10px oklch(0.9 0.1 290 / 0.4)",
  };

  // ── Determine current step ───────────────────────────────────────────────────
  // step 1: !isRegistered
  // step 2: isRegistered && !isProfileComplete
  // step 3: isProfileComplete

  return (
    <section
      id="early-access"
      className="section-padding relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.13 0.035 272) 0%, oklch(0.10 0.025 265) 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-80 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.52 0.24 290 / 0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="container-max relative z-10">
        <div className="max-w-lg mx-auto">
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
              {isProfileComplete ? "You're In" : "Limited Spots"}
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight mb-4"
              style={{ color: "oklch(0.95 0.01 280)" }}
            >
              {isProfileComplete
                ? "You're all set!"
                : isRegistered
                  ? "One more thing..."
                  : "Welcome to NightBuddy"}
            </h2>
            <p
              className="text-base sm:text-lg"
              style={{ color: "oklch(0.68 0.04 280)" }}
            >
              {isProfileComplete
                ? "NightBuddy is ready for you."
                : isRegistered
                  ? "Tell us a little about yourself. This helps us make NightBuddy better for you."
                  : "Tell us a little about you so we can let you know when NightBuddy opens."}
            </p>

            {/* Signup counter — only show before completion */}
            {!isProfileComplete && (
              <div className="mt-5 flex items-center justify-center">
                {isCountLoading ? (
                  <div
                    data-ocid="signup.loading_state"
                    className="h-7 w-52 rounded-full animate-pulse"
                    style={{ background: "oklch(0.20 0.03 270 / 0.5)" }}
                  />
                ) : signupCount > 0 ? (
                  <div
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium"
                    style={{
                      background: "oklch(0.52 0.24 290 / 0.10)",
                      border: "1px solid oklch(0.52 0.24 290 / 0.22)",
                    }}
                  >
                    <span className="text-base">🌙</span>
                    <span style={{ color: "oklch(0.68 0.04 280)" }}>
                      <span
                        className="font-bold"
                        style={{ color: "oklch(0.82 0.16 290)" }}
                      >
                        {signupCount.toLocaleString()}
                      </span>{" "}
                      {signupCount === 1 ? "person has" : "people have"} already
                      joined
                    </span>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Form card */}
          <div
            className="card-night rounded-3xl p-7 sm:p-8"
            style={{
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.4), 0 0 60px oklch(0.52 0.24 290 / 0.08)",
              opacity: cardVisible ? 1 : 0,
              transform: cardVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            {/* ── STEP 3: SUCCESS ── */}
            {isProfileComplete ? (
              <div
                data-ocid="signup.success_state"
                className="flex flex-col items-center text-center py-8 gap-5"
              >
                {/* Check icon with glow */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.52 0.24 290 / 0.25), oklch(0.62 0.20 310 / 0.2))",
                    border: "1px solid oklch(0.52 0.24 290 / 0.45)",
                    boxShadow:
                      "0 0 40px oklch(0.52 0.24 290 / 0.35), 0 0 80px oklch(0.52 0.24 290 / 0.15)",
                  }}
                >
                  <CheckCircle
                    className="w-10 h-10"
                    style={{ color: "oklch(0.72 0.18 290)" }}
                  />
                </div>

                <div className="flex flex-col gap-2 max-w-xs">
                  <p
                    className="text-xl font-bold leading-snug"
                    style={{ color: "oklch(0.92 0.02 280)" }}
                  >
                    Account Created!
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "oklch(0.58 0.06 280)" }}
                  >
                    Your NightBuddy profile is ready. Start your first anonymous
                    conversation.
                  </p>
                </div>

                {/* Start Chatting CTA */}
                <button
                  data-ocid="signup.primary_button"
                  type="button"
                  style={{
                    marginTop: "0.5rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    fontWeight: 700,
                    borderRadius: "9999px",
                    padding: "0.875rem 2.25rem",
                    fontSize: "1rem",
                    cursor: "pointer",
                    color: "#ffffff",
                    background:
                      "linear-gradient(135deg, oklch(0.62 0.28 285), oklch(0.58 0.26 310), oklch(0.65 0.24 330))",
                    boxShadow:
                      "0 0 28px oklch(0.62 0.26 290 / 0.75), 0 0 56px oklch(0.62 0.26 290 / 0.35)",
                    border: "1px solid oklch(0.78 0.22 290 / 0.6)",
                    textShadow: "0 0 10px oklch(0.9 0.1 290 / 0.5)",
                    animation: "pulse-glow 3s ease-in-out infinite",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(-2px) scale(1.04)";
                    el.style.boxShadow =
                      "0 0 40px oklch(0.68 0.28 290 / 0.9), 0 0 80px oklch(0.68 0.28 290 / 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(0) scale(1)";
                    el.style.boxShadow =
                      "0 0 28px oklch(0.62 0.26 290 / 0.75), 0 0 56px oklch(0.62 0.26 290 / 0.35)";
                  }}
                >
                  <Moon
                    style={{ width: "1rem", height: "1rem", flexShrink: 0 }}
                  />
                  Start Chatting
                </button>
              </div>
            ) : isRegistered ? (
              /* ── STEP 2: PROFILE SETUP ── */
              <form
                onSubmit={handleStep2Submit}
                noValidate
                className="flex flex-col gap-5"
              >
                <StepIndicator currentStep={2} />

                {/* Age Range */}
                <fieldset className="flex flex-col gap-2 border-0 p-0 m-0">
                  <legend
                    className="text-sm font-medium mb-1"
                    style={{ color: "oklch(0.80 0.04 280)" }}
                  >
                    Age Range
                    <span style={{ color: "oklch(0.65 0.22 27)" }}> *</span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {AGE_RANGES.map((range) => (
                      <PillOption
                        key={range}
                        label={range}
                        selected={ageRange === range}
                        onClick={() => {
                          setAgeRange(range);
                          if (step2Errors.ageRange)
                            setStep2Errors((prev) => ({
                              ...prev,
                              ageRange: undefined,
                            }));
                        }}
                      />
                    ))}
                  </div>
                  {step2Errors.ageRange && (
                    <p
                      data-ocid="profile.error_state"
                      className="text-xs"
                      style={{ color: "oklch(0.65 0.22 27)" }}
                    >
                      {step2Errors.ageRange}
                    </p>
                  )}
                </fieldset>

                {/* Country */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="profile-country"
                    className="text-sm font-medium"
                    style={{ color: "oklch(0.80 0.04 280)" }}
                  >
                    Country
                    <span style={{ color: "oklch(0.65 0.22 27)" }}> *</span>
                  </label>
                  <input
                    id="profile-country"
                    data-ocid="profile.input"
                    type="text"
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      if (step2Errors.country)
                        setStep2Errors((prev) => ({
                          ...prev,
                          country: undefined,
                        }));
                    }}
                    placeholder="e.g. India, USA..."
                    autoComplete="country-name"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={inputStyle(!!step2Errors.country)}
                    onFocus={(e) => {
                      e.target.style.border =
                        "1px solid oklch(0.52 0.24 290 / 0.7)";
                      e.target.style.boxShadow =
                        "0 0 0 3px oklch(0.52 0.24 290 / 0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.border = step2Errors.country
                        ? "1px solid oklch(0.577 0.245 27.325)"
                        : "1px solid oklch(0.28 0.05 270)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  {step2Errors.country && (
                    <p
                      data-ocid="profile.error_state"
                      className="text-xs"
                      style={{ color: "oklch(0.65 0.22 27)" }}
                    >
                      {step2Errors.country}
                    </p>
                  )}
                </div>

                {/* Gender (optional) */}
                <fieldset className="flex flex-col gap-2 border-0 p-0 m-0">
                  <legend
                    className="text-sm font-medium mb-1"
                    style={{ color: "oklch(0.80 0.04 280)" }}
                  >
                    Gender
                    <span
                      className="text-xs font-normal ml-1"
                      style={{ color: "oklch(0.50 0.04 275)" }}
                    >
                      (optional)
                    </span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {GENDERS.map((g) => (
                      <PillOption
                        key={g}
                        label={g}
                        selected={gender === g}
                        onClick={() => setGender(gender === g ? "" : g)}
                      />
                    ))}
                  </div>
                </fieldset>

                {/* General error */}
                {step2Errors.general && (
                  <p
                    data-ocid="profile.error_state"
                    className="text-xs text-center"
                    style={{ color: "oklch(0.65 0.22 27)" }}
                  >
                    {step2Errors.general}
                  </p>
                )}

                {/* Submit button */}
                <button
                  data-ocid="profile.submit_button"
                  type="submit"
                  disabled={submitProfile.isPending}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-1"
                  style={{
                    ...submitBtnStyle,
                    boxShadow: submitProfile.isPending
                      ? "none"
                      : "0 0 24px oklch(0.62 0.26 290 / 0.5), 0 0 48px oklch(0.62 0.26 290 / 0.25)",
                  }}
                >
                  {submitProfile.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    <>
                      Complete Profile
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Skip link */}
                <button
                  data-ocid="profile.secondary_button"
                  type="button"
                  onClick={handleSkipProfile}
                  className="text-center text-xs transition-colors duration-200"
                  style={{
                    color: "oklch(0.50 0.04 275)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "oklch(0.72 0.14 290)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "oklch(0.50 0.04 275)";
                  }}
                >
                  Skip for now
                </button>
              </form>
            ) : (
              /* ── STEP 1: SIGNUP ── */
              <form
                onSubmit={handleStep1Submit}
                noValidate
                className="flex flex-col gap-5"
              >
                <StepIndicator currentStep={1} />

                {/* Name field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="signup-name"
                    className="text-sm font-medium"
                    style={{ color: "oklch(0.80 0.04 280)" }}
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                      style={{ color: "oklch(0.55 0.06 280)" }}
                    />
                    <input
                      id="signup-name"
                      data-ocid="signup.input"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (step1Errors.name)
                          setStep1Errors((prev) => ({
                            ...prev,
                            name: undefined,
                          }));
                      }}
                      placeholder="What should we call you?"
                      autoComplete="given-name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={inputStyle(!!step1Errors.name)}
                      onFocus={(e) => {
                        e.target.style.border =
                          "1px solid oklch(0.52 0.24 290 / 0.7)";
                        e.target.style.boxShadow =
                          "0 0 0 3px oklch(0.52 0.24 290 / 0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.border = step1Errors.name
                          ? "1px solid oklch(0.577 0.245 27.325)"
                          : "1px solid oklch(0.28 0.05 270)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  {step1Errors.name && (
                    <p
                      data-ocid="signup.error_state"
                      className="text-xs"
                      style={{ color: "oklch(0.65 0.22 27)" }}
                    >
                      {step1Errors.name}
                    </p>
                  )}
                </div>

                {/* Email field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="signup-email"
                    className="text-sm font-medium"
                    style={{ color: "oklch(0.80 0.04 280)" }}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                      style={{ color: "oklch(0.55 0.06 280)" }}
                    />
                    <input
                      id="signup-email"
                      data-ocid="signup.search_input"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (step1Errors.email)
                          setStep1Errors((prev) => ({
                            ...prev,
                            email: undefined,
                          }));
                      }}
                      placeholder="your@email.com"
                      autoComplete="email"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={inputStyle(!!step1Errors.email)}
                      onFocus={(e) => {
                        e.target.style.border =
                          "1px solid oklch(0.52 0.24 290 / 0.7)";
                        e.target.style.boxShadow =
                          "0 0 0 3px oklch(0.52 0.24 290 / 0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.border = step1Errors.email
                          ? "1px solid oklch(0.577 0.245 27.325)"
                          : "1px solid oklch(0.28 0.05 270)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  {step1Errors.email && (
                    <p
                      data-ocid="signup.error_state"
                      className="text-xs"
                      style={{ color: "oklch(0.65 0.22 27)" }}
                    >
                      {step1Errors.email}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  data-ocid="signup.submit_button"
                  type="submit"
                  disabled={submitSignup.isPending}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-1"
                  style={{
                    ...submitBtnStyle,
                    boxShadow: submitSignup.isPending
                      ? "none"
                      : "0 0 24px oklch(0.62 0.26 290 / 0.5), 0 0 48px oklch(0.62 0.26 290 / 0.25)",
                  }}
                >
                  {submitSignup.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Joining…
                    </>
                  ) : (
                    "Join the Waitlist"
                  )}
                </button>

                <p
                  className="text-center text-xs"
                  style={{ color: "oklch(0.50 0.04 275)" }}
                >
                  No spam, ever. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

import { CheckCircle, Loader2, Mail, User } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useGetSignups, useSubmitSignup } from "../hooks/useQueries";

export default function EarlyAccessForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [successMessage, setSuccessMessage] = useState("");

  const submitMutation = useSubmitSignup();
  const { data: signups, isLoading: isCountLoading } = useGetSignups();
  const signupCount = signups?.length ?? 0;

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) {
      newErrors.name = "Please enter your name.";
    }
    if (!email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!validate()) return;

    try {
      const result = await submitMutation.mutateAsync({
        name: name.trim(),
        email: email.trim(),
      });
      setSuccessMessage(result);
      setName("");
      setEmail("");
      setErrors({});
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      if (
        message.includes("already signed up") ||
        message.includes("Email already")
      ) {
        setErrors({
          email: "This email is already registered. You're on the list!",
        });
      } else {
        setErrors({ email: "Something went wrong. Please try again." });
      }
    }
  };

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
              Limited Spots
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight mb-4"
              style={{ color: "oklch(0.95 0.01 280)" }}
            >
              Get Early Access
            </h2>
            <p
              className="text-base sm:text-lg"
              style={{ color: "oklch(0.68 0.04 280)" }}
            >
              Be among the first to experience NightBuddy when we launch in
              India.
            </p>

            {/* Signup counter */}
            <div className="mt-5 flex items-center justify-center">
              {isCountLoading ? (
                <div
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
          </div>

          {/* Form card */}
          <div
            className="card-night rounded-3xl p-7 sm:p-8"
            style={{
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.4), 0 0 60px oklch(0.52 0.24 290 / 0.08)",
            }}
          >
            {successMessage ? (
              /* Success state */
              <div className="flex flex-col items-center text-center py-6 gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.52 0.24 290 / 0.25), oklch(0.62 0.20 310 / 0.2))",
                    border: "1px solid oklch(0.52 0.24 290 / 0.4)",
                    boxShadow: "0 0 30px oklch(0.52 0.24 290 / 0.3)",
                  }}
                >
                  <CheckCircle
                    className="w-8 h-8"
                    style={{ color: "oklch(0.72 0.18 290)" }}
                  />
                </div>
                <div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: "oklch(0.92 0.02 280)" }}
                  >
                    You're on the list! 🎉
                  </h3>
                  <p style={{ color: "oklch(0.68 0.04 280)" }}>
                    {successMessage}
                  </p>
                  <p
                    className="text-sm mt-3"
                    style={{ color: "oklch(0.55 0.04 280)" }}
                  >
                    We'll notify you as soon as NightBuddy launches in India 🇮🇳
                  </p>
                </div>
              </div>
            ) : (
              /* Form */
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5"
              >
                {/* Name field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
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
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name)
                          setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="What should we call you?"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{
                        background: "oklch(0.10 0.02 265)",
                        border: errors.name
                          ? "1px solid oklch(0.577 0.245 27.325)"
                          : "1px solid oklch(0.28 0.05 270)",
                        color: "oklch(0.92 0.02 280)",
                        boxShadow: "none",
                      }}
                      onFocus={(e) => {
                        e.target.style.border =
                          "1px solid oklch(0.52 0.24 290 / 0.7)";
                        e.target.style.boxShadow =
                          "0 0 0 3px oklch(0.52 0.24 290 / 0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.border = errors.name
                          ? "1px solid oklch(0.577 0.245 27.325)"
                          : "1px solid oklch(0.28 0.05 270)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  {errors.name && (
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.65 0.22 27)" }}
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
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
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email)
                          setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{
                        background: "oklch(0.10 0.02 265)",
                        border: errors.email
                          ? "1px solid oklch(0.577 0.245 27.325)"
                          : "1px solid oklch(0.28 0.05 270)",
                        color: "oklch(0.92 0.02 280)",
                        boxShadow: "none",
                      }}
                      onFocus={(e) => {
                        e.target.style.border =
                          "1px solid oklch(0.52 0.24 290 / 0.7)";
                        e.target.style.boxShadow =
                          "0 0 0 3px oklch(0.52 0.24 290 / 0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.border = errors.email
                          ? "1px solid oklch(0.577 0.245 27.325)"
                          : "1px solid oklch(0.28 0.05 270)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  {errors.email && (
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.65 0.22 27)" }}
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-1"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.52 0.24 290), oklch(0.58 0.22 310))",
                    color: "oklch(0.98 0.01 280)",
                    boxShadow: submitMutation.isPending
                      ? "none"
                      : "0 0 24px oklch(0.52 0.24 290 / 0.4)",
                  }}
                >
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Joining…
                    </>
                  ) : (
                    "Join the Waitlist →"
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

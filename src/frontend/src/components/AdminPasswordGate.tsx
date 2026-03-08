import { AlertCircle, Eye, EyeOff, Lock } from "lucide-react";
import type React from "react";
import { useState } from "react";

const ADMIN_PASSWORD = "nightbuddy2025";

interface AdminPasswordGateProps {
  children: React.ReactNode;
}

export default function AdminPasswordGate({
  children,
}: AdminPasswordGateProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4"
      style={{ background: "oklch(0.12 0.025 265)" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.52 0.24 290 / 0.10) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.52 0.24 290 / 0.25), oklch(0.62 0.20 310 / 0.15))",
              border: "1px solid oklch(0.52 0.24 290 / 0.35)",
              boxShadow: "0 0 30px oklch(0.52 0.24 290 / 0.2)",
            }}
          >
            <Lock
              className="w-6 h-6"
              style={{ color: "oklch(0.72 0.18 290)" }}
            />
          </div>
          <h1
            className="text-xl font-bold tracking-tight mb-1"
            style={{ color: "oklch(0.92 0.04 280)" }}
          >
            Admin Access
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.58 0.06 275)" }}>
            Enter the admin password to continue
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-7"
          style={{
            background: "oklch(0.14 0.028 268 / 0.85)",
            border: "1px solid oklch(0.24 0.05 270 / 0.45)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 40px oklch(0.08 0.02 265 / 0.6)",
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="admin-password"
                className="text-sm font-medium"
                style={{ color: "oklch(0.80 0.04 280)" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  className="w-full pl-4 pr-11 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    background: "oklch(0.10 0.02 265)",
                    border: error
                      ? "1px solid oklch(0.577 0.245 27.325)"
                      : "1px solid oklch(0.28 0.05 270)",
                    color: "oklch(0.92 0.02 280)",
                  }}
                  onFocus={(e) => {
                    if (!error) {
                      e.target.style.border =
                        "1px solid oklch(0.52 0.24 290 / 0.7)";
                      e.target.style.boxShadow =
                        "0 0 0 3px oklch(0.52 0.24 290 / 0.12)";
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.border = error
                      ? "1px solid oklch(0.577 0.245 27.325)"
                      : "1px solid oklch(0.28 0.05 270)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "oklch(0.55 0.06 280)" }}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {error && (
                <div className="flex items-center gap-1.5">
                  <AlertCircle
                    className="w-3.5 h-3.5 flex-shrink-0"
                    style={{ color: "oklch(0.65 0.22 27)" }}
                  />
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.65 0.22 27)" }}
                  >
                    {error}
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!password}
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.52 0.24 290), oklch(0.58 0.22 310))",
                color: "oklch(0.98 0.01 280)",
                boxShadow: password
                  ? "0 0 20px oklch(0.52 0.24 290 / 0.35)"
                  : "none",
              }}
            >
              Unlock Dashboard
            </button>
          </form>
        </div>

        <p
          className="mt-6 text-center text-xs"
          style={{ color: "oklch(0.38 0.04 270)" }}
        >
          <a href="/" style={{ color: "oklch(0.55 0.08 280)" }}>
            ← Back to site
          </a>
        </p>
      </div>
    </div>
  );
}

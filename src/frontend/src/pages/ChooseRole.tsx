import { Headphones, MessageCircle, Moon } from "lucide-react";
import { useState } from "react";

const ROLE_KEY = "nightbuddy_role";

export default function ChooseRole() {
  const [selected, setSelected] = useState<"user" | "listener" | null>(null);
  const [animating, setAnimating] = useState(false);

  const handleSelect = (role: "user" | "listener") => {
    setSelected(role);
    setAnimating(true);
    try {
      localStorage.setItem(ROLE_KEY, role);
    } catch {
      // ignore
    }
    setTimeout(() => {
      window.location.href =
        role === "user" ? "/user-dashboard" : "/listener-dashboard";
    }, 700);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-5"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.09 0.03 265) 0%, oklch(0.12 0.025 265) 50%, oklch(0.10 0.025 265) 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.52 0.24 290 / 0.14) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <div
        className="relative z-10 w-full max-w-lg mx-auto text-center"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "scale(0.96)" : "scale(1)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Moon className="w-5 h-5" style={{ color: "oklch(0.72 0.18 290)" }} />
          <span
            className="font-bold text-base tracking-wide"
            style={{ color: "oklch(0.90 0.04 280)" }}
          >
            NightBuddy
            <span style={{ color: "oklch(0.72 0.18 290)" }}>.in</span>
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-3xl sm:text-4xl font-bold mb-3 leading-tight"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.95 0.01 280), oklch(0.82 0.14 300))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Choose Your Role
        </h1>
        <p
          className="text-sm sm:text-base mb-10"
          style={{ color: "oklch(0.65 0.04 280)" }}
        >
          How would you like to use NightBuddy?
        </p>

        {/* Role cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* USER card */}
          <button
            data-ocid="role.item.1"
            type="button"
            onClick={() => handleSelect("user")}
            disabled={animating}
            className="group flex flex-col items-center text-center p-7 rounded-2xl transition-all duration-300 cursor-pointer"
            style={{
              background:
                selected === "user"
                  ? "linear-gradient(135deg, oklch(0.52 0.24 290 / 0.30), oklch(0.58 0.22 310 / 0.22))"
                  : "oklch(0.14 0.03 268)",
              border:
                selected === "user"
                  ? "1.5px solid oklch(0.68 0.22 290 / 0.8)"
                  : "1.5px solid oklch(0.24 0.05 270 / 0.6)",
              boxShadow:
                selected === "user"
                  ? "0 0 32px oklch(0.52 0.24 290 / 0.35), 0 0 64px oklch(0.52 0.24 290 / 0.15)"
                  : "none",
              transform: selected === "user" ? "scale(1.03)" : "scale(1)",
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300"
              style={{
                background:
                  selected === "user"
                    ? "linear-gradient(135deg, oklch(0.62 0.28 285 / 0.4), oklch(0.58 0.26 310 / 0.3))"
                    : "oklch(0.52 0.24 290 / 0.15)",
                border:
                  selected === "user"
                    ? "1px solid oklch(0.72 0.22 290 / 0.6)"
                    : "1px solid oklch(0.42 0.14 290 / 0.4)",
                boxShadow:
                  selected === "user"
                    ? "0 0 20px oklch(0.52 0.24 290 / 0.4)"
                    : "none",
              }}
            >
              <MessageCircle
                className="w-7 h-7"
                style={{
                  color:
                    selected === "user"
                      ? "oklch(0.82 0.18 290)"
                      : "oklch(0.65 0.12 290)",
                }}
              />
            </div>
            <h2
              className="text-base font-bold mb-2"
              style={{
                color:
                  selected === "user"
                    ? "oklch(0.92 0.02 280)"
                    : "oklch(0.82 0.04 280)",
              }}
            >
              I want someone to listen to me
            </h2>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "oklch(0.58 0.04 278)" }}
            >
              Talk freely about anything on your mind. Connect with a listener
              who will understand without judgment.
            </p>
            <span
              className="mt-4 text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background:
                  selected === "user"
                    ? "oklch(0.62 0.28 285 / 0.2)"
                    : "oklch(0.52 0.24 290 / 0.10)",
                color:
                  selected === "user"
                    ? "oklch(0.78 0.18 290)"
                    : "oklch(0.62 0.12 285)",
                border:
                  selected === "user"
                    ? "1px solid oklch(0.62 0.22 290 / 0.4)"
                    : "1px solid oklch(0.42 0.10 285 / 0.3)",
              }}
            >
              USER
            </span>
          </button>

          {/* LISTENER card */}
          <button
            data-ocid="role.item.2"
            type="button"
            onClick={() => handleSelect("listener")}
            disabled={animating}
            className="group flex flex-col items-center text-center p-7 rounded-2xl transition-all duration-300 cursor-pointer"
            style={{
              background:
                selected === "listener"
                  ? "linear-gradient(135deg, oklch(0.45 0.22 310 / 0.30), oklch(0.50 0.20 330 / 0.22))"
                  : "oklch(0.14 0.03 268)",
              border:
                selected === "listener"
                  ? "1.5px solid oklch(0.65 0.20 315 / 0.8)"
                  : "1.5px solid oklch(0.24 0.05 270 / 0.6)",
              boxShadow:
                selected === "listener"
                  ? "0 0 32px oklch(0.50 0.22 315 / 0.35), 0 0 64px oklch(0.50 0.22 315 / 0.15)"
                  : "none",
              transform: selected === "listener" ? "scale(1.03)" : "scale(1)",
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300"
              style={{
                background:
                  selected === "listener"
                    ? "linear-gradient(135deg, oklch(0.50 0.24 310 / 0.4), oklch(0.55 0.22 330 / 0.3))"
                    : "oklch(0.50 0.20 315 / 0.15)",
                border:
                  selected === "listener"
                    ? "1px solid oklch(0.65 0.20 315 / 0.6)"
                    : "1px solid oklch(0.42 0.12 310 / 0.4)",
                boxShadow:
                  selected === "listener"
                    ? "0 0 20px oklch(0.50 0.22 315 / 0.4)"
                    : "none",
              }}
            >
              <Headphones
                className="w-7 h-7"
                style={{
                  color:
                    selected === "listener"
                      ? "oklch(0.80 0.16 315)"
                      : "oklch(0.62 0.10 310)",
                }}
              />
            </div>
            <h2
              className="text-base font-bold mb-2"
              style={{
                color:
                  selected === "listener"
                    ? "oklch(0.92 0.02 280)"
                    : "oklch(0.82 0.04 280)",
              }}
            >
              I want to help and listen to others
            </h2>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "oklch(0.58 0.04 278)" }}
            >
              Support others through their difficult moments. Be the voice
              someone needs to hear tonight.
            </p>
            <span
              className="mt-4 text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background:
                  selected === "listener"
                    ? "oklch(0.50 0.24 315 / 0.2)"
                    : "oklch(0.50 0.20 315 / 0.10)",
                color:
                  selected === "listener"
                    ? "oklch(0.78 0.16 315)"
                    : "oklch(0.60 0.10 310)",
                border:
                  selected === "listener"
                    ? "1px solid oklch(0.60 0.18 315 / 0.4)"
                    : "1px solid oklch(0.42 0.10 310 / 0.3)",
              }}
            >
              LISTENER
            </span>
          </button>
        </div>

        <p className="mt-8 text-xs" style={{ color: "oklch(0.42 0.04 275)" }}>
          You can change this later from your profile settings.
        </p>
      </div>
    </div>
  );
}

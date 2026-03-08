import { Heart, Moon } from "lucide-react";
import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "nightbuddy-in",
  );

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "oklch(0.09 0.02 265)",
        borderTop: "1px solid oklch(0.22 0.04 270 / 0.6)",
      }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.52 0.24 290 / 0.4), transparent)",
        }}
      />

      <div className="container-max px-5 py-10">
        {/* Brand */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <Moon
              className="w-5 h-5"
              style={{ color: "oklch(0.72 0.18 290)" }}
            />
            <span
              className="text-lg font-bold tracking-wide"
              style={{ color: "oklch(0.88 0.04 280)" }}
            >
              NightBuddy.in
            </span>
          </div>
          <p
            className="text-sm text-center max-w-xs"
            style={{ color: "oklch(0.50 0.04 280)" }}
          >
            Anonymous emotional support for India's night owls.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-8">
          {[
            { label: "Privacy Policy", href: "#" },
            { label: "Terms & Conditions", href: "#" },
            { label: "Contact", href: "mailto:contact@nightbuddy.in" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm transition-colors duration-200 hover:underline"
              style={{ color: "oklch(0.55 0.06 280)" }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.color =
                  "oklch(0.72 0.18 290)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.color =
                  "oklch(0.55 0.06 280)";
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Divider */}
        <div
          className="w-full h-px mb-6"
          style={{ background: "oklch(0.20 0.03 265)" }}
        />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p style={{ color: "oklch(0.42 0.03 280)" }}>
            © {year} NightBuddy.in — All rights reserved.
          </p>
          <p
            className="flex items-center gap-1"
            style={{ color: "oklch(0.42 0.03 280)" }}
          >
            Built with{" "}
            <Heart
              className="w-3 h-3 inline-block"
              style={{
                color: "oklch(0.62 0.20 310)",
                fill: "oklch(0.62 0.20 310)",
              }}
            />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: "oklch(0.62 0.18 295)" }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.color =
                  "oklch(0.72 0.18 290)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.color =
                  "oklch(0.62 0.18 295)";
              }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

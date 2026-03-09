import { LogOut, MessageCircle, Moon, Settings, Users } from "lucide-react";

export default function UserDashboard() {
  const handleLogout = () => {
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
    window.location.href = "/";
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.09 0.03 265) 0%, oklch(0.12 0.025 265) 100%)",
      }}
    >
      {/* Nav */}
      <nav
        className="flex items-center justify-between px-5 sm:px-8 py-3"
        style={{
          background: "oklch(0.10 0.025 265 / 0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid oklch(0.20 0.04 270 / 0.3)",
        }}
      >
        <div className="flex items-center gap-2">
          <Moon className="w-5 h-5" style={{ color: "oklch(0.72 0.18 290)" }} />
          <span
            className="font-bold text-base"
            style={{ color: "oklch(0.90 0.04 280)" }}
          >
            NightBuddy
            <span style={{ color: "oklch(0.72 0.18 290)" }}>.in</span>
          </span>
        </div>
        <button
          data-ocid="dashboard.secondary_button"
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-200"
          style={{
            color: "oklch(0.55 0.04 278)",
            border: "1px solid oklch(0.24 0.04 270 / 0.5)",
            background: "transparent",
          }}
        >
          <LogOut className="w-3.5 h-3.5" />
          Logout
        </button>
      </nav>

      <div className="max-w-2xl mx-auto px-5 py-12">
        <h1
          className="text-2xl sm:text-3xl font-bold mb-2"
          style={{ color: "oklch(0.92 0.02 280)" }}
        >
          Welcome back
        </h1>
        <p className="text-sm mb-10" style={{ color: "oklch(0.55 0.04 278)" }}>
          Ready to talk tonight?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            data-ocid="dashboard.primary_button"
            type="button"
            className="flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-200"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.52 0.24 290 / 0.20), oklch(0.58 0.22 310 / 0.14))",
              border: "1.5px solid oklch(0.52 0.24 290 / 0.35)",
              boxShadow: "0 0 20px oklch(0.52 0.24 290 / 0.15)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "oklch(0.52 0.24 290 / 0.2)",
                border: "1px solid oklch(0.62 0.22 290 / 0.4)",
              }}
            >
              <MessageCircle
                className="w-5 h-5"
                style={{ color: "oklch(0.78 0.18 290)" }}
              />
            </div>
            <div>
              <p
                className="font-semibold text-sm"
                style={{ color: "oklch(0.88 0.04 280)" }}
              >
                Start Chat
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.52 0.04 278)" }}
              >
                Find a listener now
              </p>
            </div>
          </button>

          <button
            data-ocid="dashboard.item.1"
            type="button"
            className="flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-200"
            style={{
              background: "oklch(0.14 0.03 268)",
              border: "1.5px solid oklch(0.24 0.05 270 / 0.5)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "oklch(0.22 0.04 268 / 0.5)",
                border: "1px solid oklch(0.32 0.06 270 / 0.4)",
              }}
            >
              <Users
                className="w-5 h-5"
                style={{ color: "oklch(0.62 0.08 278)" }}
              />
            </div>
            <div>
              <p
                className="font-semibold text-sm"
                style={{ color: "oklch(0.88 0.04 280)" }}
              >
                Find a Listener
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.52 0.04 278)" }}
              >
                Browse available listeners
              </p>
            </div>
          </button>

          <button
            data-ocid="dashboard.item.2"
            type="button"
            className="flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-200"
            style={{
              background: "oklch(0.14 0.03 268)",
              border: "1.5px solid oklch(0.24 0.05 270 / 0.5)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "oklch(0.22 0.04 268 / 0.5)",
                border: "1px solid oklch(0.32 0.06 270 / 0.4)",
              }}
            >
              <MessageCircle
                className="w-5 h-5"
                style={{ color: "oklch(0.62 0.08 278)" }}
              />
            </div>
            <div>
              <p
                className="font-semibold text-sm"
                style={{ color: "oklch(0.88 0.04 280)" }}
              >
                My Conversations
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.52 0.04 278)" }}
              >
                View past chats
              </p>
            </div>
          </button>

          <button
            data-ocid="dashboard.item.3"
            type="button"
            className="flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-200"
            style={{
              background: "oklch(0.14 0.03 268)",
              border: "1.5px solid oklch(0.24 0.05 270 / 0.5)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "oklch(0.22 0.04 268 / 0.5)",
                border: "1px solid oklch(0.32 0.06 270 / 0.4)",
              }}
            >
              <Settings
                className="w-5 h-5"
                style={{ color: "oklch(0.62 0.08 278)" }}
              />
            </div>
            <div>
              <p
                className="font-semibold text-sm"
                style={{ color: "oklch(0.88 0.04 280)" }}
              >
                Edit Profile
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.52 0.04 278)" }}
              >
                Update your details
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

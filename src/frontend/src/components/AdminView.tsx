import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  Clock,
  Globe,
  Inbox,
  Mail,
  RefreshCw,
  User,
  Users,
} from "lucide-react";
import React from "react";
import { useGetSignups } from "../hooks/useQueries";

function formatTimestamp(timestamp: bigint): string {
  if (timestamp === 0n) return "\u2014";
  try {
    // Backend stores nanoseconds; convert to milliseconds
    const ms = Number(timestamp / 1_000_000n);
    return new Date(ms).toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "\u2014";
  }
}

export default function AdminView() {
  const {
    data: signups,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetSignups();

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{ background: "oklch(0.12 0.025 265)" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-5 py-3"
        style={{
          background: "oklch(0.10 0.025 265 / 0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid oklch(0.22 0.04 270 / 0.4)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">\uD83C\uDF19</span>
          <span
            className="font-bold text-base tracking-wide"
            style={{ color: "oklch(0.90 0.04 280)" }}
          >
            NightBuddy
            <span style={{ color: "oklch(0.72 0.18 290)" }}>.in</span>
          </span>
          <span
            className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              background: "oklch(0.52 0.24 290 / 0.2)",
              border: "1px solid oklch(0.52 0.24 290 / 0.35)",
              color: "oklch(0.78 0.16 290)",
            }}
          >
            Admin
          </span>
        </div>
        <a
          href="/"
          className="text-xs font-medium transition-colors"
          style={{ color: "oklch(0.65 0.08 280)" }}
        >
          \u2190 Back to site
        </a>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Page title + stats */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1
              className="text-2xl font-bold tracking-tight mb-1"
              style={{ color: "oklch(0.92 0.04 280)" }}
            >
              Early Access Signups
            </h1>
            <p className="text-sm" style={{ color: "oklch(0.60 0.06 275)" }}>
              All collected user registrations
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Count badge */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{
                background: "oklch(0.16 0.03 270 / 0.8)",
                border: "1px solid oklch(0.24 0.05 270 / 0.5)",
              }}
            >
              <Users size={15} style={{ color: "oklch(0.72 0.18 290)" }} />
              <span
                className="text-sm font-semibold"
                style={{ color: "oklch(0.88 0.06 280)" }}
              >
                {isLoading
                  ? "\u2014"
                  : `${signups?.length ?? 0} signup${
                      (signups?.length ?? 0) !== 1 ? "s" : ""
                    }`}
              </span>
            </div>

            {/* Refresh button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isFetching}
              className="gap-2 text-xs font-semibold"
              style={{
                background: "oklch(0.16 0.03 270 / 0.6)",
                border: "1px solid oklch(0.30 0.06 270 / 0.5)",
                color: "oklch(0.78 0.12 285)",
              }}
            >
              <RefreshCw
                size={13}
                className={isFetching ? "animate-spin" : ""}
              />
              Refresh
            </Button>
          </div>
        </div>

        {/* Card container */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "oklch(0.14 0.028 268 / 0.85)",
            border: "1px solid oklch(0.24 0.05 270 / 0.45)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 40px oklch(0.08 0.02 265 / 0.6)",
          }}
        >
          {/* Loading state */}
          {isLoading && (
            <div className="p-6 space-y-3">
              {[...Array(5)].map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list with fixed count
                <div key={i} className="flex gap-4">
                  <Skeleton
                    className="h-9 w-8 rounded-lg"
                    style={{ background: "oklch(0.20 0.03 270 / 0.5)" }}
                  />
                  <Skeleton
                    className="h-9 w-28 rounded-lg"
                    style={{ background: "oklch(0.20 0.03 270 / 0.5)" }}
                  />
                  <Skeleton
                    className="h-9 flex-1 rounded-lg"
                    style={{ background: "oklch(0.20 0.03 270 / 0.5)" }}
                  />
                  <Skeleton
                    className="h-9 flex-1 rounded-lg"
                    style={{ background: "oklch(0.20 0.03 270 / 0.5)" }}
                  />
                  <Skeleton
                    className="h-9 w-16 rounded-lg"
                    style={{ background: "oklch(0.20 0.03 270 / 0.5)" }}
                  />
                  <Skeleton
                    className="h-9 flex-1 rounded-lg"
                    style={{ background: "oklch(0.20 0.03 270 / 0.5)" }}
                  />
                  <Skeleton
                    className="h-9 w-20 rounded-lg"
                    style={{ background: "oklch(0.20 0.03 270 / 0.5)" }}
                  />
                  <Skeleton
                    className="h-9 flex-1 rounded-lg"
                    style={{ background: "oklch(0.20 0.03 270 / 0.5)" }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {isError && !isLoading && (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <AlertCircle
                size={36}
                className="mb-3"
                style={{ color: "oklch(0.65 0.20 25)" }}
              />
              <p
                className="text-sm font-medium mb-1"
                style={{ color: "oklch(0.80 0.06 280)" }}
              >
                Failed to load signups
              </p>
              <p
                className="text-xs mb-4"
                style={{ color: "oklch(0.55 0.05 275)" }}
              >
                There was a problem fetching data from the backend.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="text-xs"
                style={{
                  background: "oklch(0.16 0.03 270 / 0.6)",
                  border: "1px solid oklch(0.30 0.06 270 / 0.5)",
                  color: "oklch(0.78 0.12 285)",
                }}
              >
                Try again
              </Button>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !isError && signups?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <Inbox
                size={36}
                className="mb-3"
                style={{ color: "oklch(0.52 0.10 280)" }}
              />
              <p
                className="text-sm font-medium mb-1"
                style={{ color: "oklch(0.80 0.06 280)" }}
              >
                No signups yet
              </p>
              <p className="text-xs" style={{ color: "oklch(0.55 0.05 275)" }}>
                Early access registrations will appear here once people sign up.
              </p>
            </div>
          )}

          {/* Data table */}
          {!isLoading && !isError && signups && signups.length > 0 && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow
                    style={{
                      borderBottom: "1px solid oklch(0.22 0.04 270 / 0.4)",
                      background: "oklch(0.11 0.025 265 / 0.6)",
                    }}
                  >
                    <TableHead
                      className="py-3 pl-6 w-12 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "oklch(0.55 0.08 280)" }}
                    >
                      #
                    </TableHead>
                    <TableHead
                      className="py-3 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "oklch(0.55 0.08 280)" }}
                    >
                      <span className="flex items-center gap-1.5">
                        <User size={12} />
                        User ID
                      </span>
                    </TableHead>
                    <TableHead
                      className="py-3 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "oklch(0.55 0.08 280)" }}
                    >
                      <span className="flex items-center gap-1.5">
                        <User size={12} />
                        Name
                      </span>
                    </TableHead>
                    <TableHead
                      className="py-3 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "oklch(0.55 0.08 280)" }}
                    >
                      <span className="flex items-center gap-1.5">
                        <Mail size={12} />
                        Email
                      </span>
                    </TableHead>
                    <TableHead
                      className="py-3 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "oklch(0.55 0.08 280)" }}
                    >
                      Age Range
                    </TableHead>
                    <TableHead
                      className="py-3 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "oklch(0.55 0.08 280)" }}
                    >
                      <span className="flex items-center gap-1.5">
                        <Globe size={12} />
                        Country
                      </span>
                    </TableHead>
                    <TableHead
                      className="py-3 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "oklch(0.55 0.08 280)" }}
                    >
                      Gender
                    </TableHead>
                    <TableHead
                      className="py-3 pr-6 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "oklch(0.55 0.08 280)" }}
                    >
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        Signed Up
                      </span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {signups.map((signup, index) => (
                    <TableRow
                      key={signup.email}
                      style={{
                        borderBottom:
                          index < signups.length - 1
                            ? "1px solid oklch(0.20 0.03 270 / 0.3)"
                            : "none",
                      }}
                      className="transition-colors hover:bg-[oklch(0.18_0.03_270_/_0.3)]"
                    >
                      <TableCell
                        className="py-3.5 pl-6 text-xs font-mono"
                        style={{ color: "oklch(0.48 0.06 275)" }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        className="py-3.5 text-xs font-mono"
                        style={{
                          color: "oklch(0.48 0.06 275)",
                          whiteSpace: "nowrap",
                          maxWidth: "120px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {signup.userId || "\u2014"}
                      </TableCell>
                      <TableCell
                        className="py-3.5 text-sm font-medium"
                        style={{ color: "oklch(0.88 0.05 280)" }}
                      >
                        {signup.name}
                      </TableCell>
                      <TableCell
                        className="py-3.5 text-sm font-mono"
                        style={{ color: "oklch(0.72 0.14 290)" }}
                      >
                        {signup.email}
                      </TableCell>
                      <TableCell
                        className="py-3.5 text-xs"
                        style={{
                          color: "oklch(0.72 0.12 290)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {signup.ageRange || "\u2014"}
                      </TableCell>
                      <TableCell
                        className="py-3.5 text-sm"
                        style={{ color: "oklch(0.78 0.06 280)" }}
                      >
                        {signup.country || "\u2014"}
                      </TableCell>
                      <TableCell
                        className="py-3.5 text-xs"
                        style={{ color: "oklch(0.65 0.06 280)" }}
                      >
                        {signup.gender || "\u2014"}
                      </TableCell>
                      <TableCell
                        className="py-3.5 pr-6 text-xs"
                        style={{
                          color: "oklch(0.60 0.06 275)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatTimestamp(signup.timestamp)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Footer note */}
        <p
          className="mt-6 text-center text-xs"
          style={{ color: "oklch(0.42 0.05 270)" }}
        >
          Data is stored securely on the Internet Computer blockchain.
        </p>
      </main>
    </div>
  );
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Signup } from "../backend";
import { useActor } from "./useActor";

function extractTrapMessage(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  // Canister trap messages are embedded in rejection strings like:
  // "Call failed ... Reject text: Canister ... trapped explicitly: <message>"
  const trapMatch = raw.match(/trapped explicitly:\s*(.+)/i);
  if (trapMatch) return trapMatch[1].trim();
  // Also handle "Error: <message>" format from string returns
  const errorMatch = raw.match(/^Error:\s*(.+)/i);
  if (errorMatch) return errorMatch[1].trim();
  return raw;
}

export function useSubmitSignup() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      if (!actor) {
        if (isFetching) {
          throw new Error(
            "Still connecting to backend. Please try again in a moment.",
          );
        }
        throw new Error("Backend not available. Please refresh and try again.");
      }
      try {
        const result = await actor.submitSignup(name, email);
        // Backend may return "Error: ..." strings for validation failures
        if (typeof result === "string" && result.startsWith("Error:")) {
          throw new Error(result.replace(/^Error:\s*/, ""));
        }
        return result;
      } catch (err) {
        // Re-throw with cleaned-up trap message
        throw new Error(extractTrapMessage(err));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signups"] });
      queryClient.refetchQueries({ queryKey: ["signups"] });
    },
  });
}

export function useSubmitProfile() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      ageRange,
      country,
      gender,
    }: {
      email: string;
      ageRange: string;
      country: string;
      gender: string;
    }) => {
      if (!actor) {
        if (isFetching) {
          throw new Error(
            "Still connecting to backend. Please try again in a moment.",
          );
        }
        throw new Error("Backend not available. Please refresh and try again.");
      }
      try {
        const result = await actor.submitProfile(
          email,
          ageRange,
          country,
          gender,
        );
        if (typeof result === "string" && result.startsWith("Error:")) {
          throw new Error(result.replace(/^Error:\s*/, ""));
        }
        return result;
      } catch (err) {
        throw new Error(extractTrapMessage(err));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signups"] });
      queryClient.refetchQueries({ queryKey: ["signups"] });
    },
  });
}

export function useGetSignups() {
  const { actor, isFetching } = useActor();

  return useQuery<Signup[]>({
    queryKey: ["signups"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      const results = await actor.getSignups();
      return results;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSignupByEmail(email: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Signup | null>({
    queryKey: ["signup", email],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.getSignupByEmail(email);
      return result;
    },
    enabled: !!actor && !isFetching && email.trim().length > 0,
  });
}

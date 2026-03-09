import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type MutableRefObject, useRef } from "react";
import type { backendInterface } from "../backend";
import type { Signup } from "../backend";
import { useActor } from "./useActor";

/** Thrown when the actor is still initialising at timeout. */
class ActorLoadingError extends Error {
  constructor() {
    super("__loading__");
  }
}

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

/**
 * Polls a ref for a non-null actor value, waiting up to `timeoutMs` with
 * `intervalMs` between checks. Resolves with the actor or rejects with a
 * user-friendly message.
 */
function waitForActor(
  actorRef: MutableRefObject<backendInterface | null>,
  isFetchingRef: MutableRefObject<boolean>,
  timeoutMs = 15000,
  intervalMs = 500,
): Promise<backendInterface> {
  return new Promise((resolve, reject) => {
    if (actorRef.current) {
      resolve(actorRef.current);
      return;
    }

    const start = Date.now();
    const timer = setInterval(() => {
      if (actorRef.current) {
        clearInterval(timer);
        resolve(actorRef.current);
        return;
      }
      if (Date.now() - start >= timeoutMs) {
        clearInterval(timer);
        if (isFetchingRef.current) {
          // Backend is still loading — signal the form to show a spinner
          reject(new ActorLoadingError());
        } else {
          reject(
            new Error(
              "Unable to reach the server. Please refresh the page and try again.",
            ),
          );
        }
      }
    }, intervalMs);
  });
}

export function useSubmitSignup() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  // Always hold the latest actor and isFetching values so the mutationFn
  // closure can access them even when they change after render.
  const actorRef = useRef<backendInterface | null>(actor);
  actorRef.current = actor;
  const isFetchingRef = useRef(isFetching);
  isFetchingRef.current = isFetching;

  return useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      // Wait up to 15 s for the actor to initialise (handles fast submits on
      // first page load before the canister connection is established).
      const resolvedActor = await waitForActor(actorRef, isFetchingRef);
      try {
        const result = await resolvedActor.submitSignup(name, email);
        // Backend may return "Error: ..." strings for validation failures
        if (typeof result === "string" && result.startsWith("Error:")) {
          throw new Error(result.replace(/^Error:\s*/, ""));
        }
        return result;
      } catch (err) {
        // Re-throw ActorLoadingError as-is so callers can detect it
        if (err instanceof ActorLoadingError) throw err;
        // Re-throw with cleaned-up trap message
        throw new Error(extractTrapMessage(err));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signups"] });
      queryClient.refetchQueries({ queryKey: ["signups"] });
      queryClient.invalidateQueries({ queryKey: ["signupCount"] });
      queryClient.refetchQueries({ queryKey: ["signupCount"] });
    },
  });
}

export function useSubmitProfile() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const actorRef = useRef<backendInterface | null>(actor);
  actorRef.current = actor;
  const isFetchingRef = useRef(isFetching);
  isFetchingRef.current = isFetching;

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
      const resolvedActor = await waitForActor(actorRef, isFetchingRef);
      try {
        const result = await resolvedActor.submitProfile(
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
        if (err instanceof ActorLoadingError) throw err;
        throw new Error(extractTrapMessage(err));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signups"] });
      queryClient.refetchQueries({ queryKey: ["signups"] });
      queryClient.invalidateQueries({ queryKey: ["signupCount"] });
      queryClient.refetchQueries({ queryKey: ["signupCount"] });
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

export function useGetSignupCount() {
  const { actor, isFetching } = useActor();

  return useQuery<number>({
    queryKey: ["signupCount"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      const count = await actor.getSignupCount();
      return Number(count);
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

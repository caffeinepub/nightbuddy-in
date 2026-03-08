import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Signup } from "../backend";
import { useActor } from "./useActor";

export function useSubmitSignup() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      if (!actor) throw new Error("Backend not available. Please try again.");
      const result = await actor.submitSignup(name, email);
      return result;
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

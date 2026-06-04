import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api";

import type { Plan, UserSubscription } from "../types/subscription.types";

// get all plans
export function usePlans() {
    return useQuery({
        queryKey: ["plans"],
        queryFn: async () => {
            const response = await apiFetch<Plan[]>("/api/plans/");
            return response;
        },
        staleTime: 10 * 60 * 1000, // 10 دقیقه کش بماند
    });
}

// get current subscription of user
export function useSubscription() {
    return useQuery({
        queryKey: ["subscription"],
        queryFn: async () => {
            return await apiFetch<UserSubscription>("/account/subscription/");
        },
        staleTime: 1 * 60 * 1000, // 1 دقیقه
        refetchOnWindowFocus: true,
    });
}

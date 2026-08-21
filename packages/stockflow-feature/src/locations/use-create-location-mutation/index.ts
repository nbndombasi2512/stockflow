import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApiClient } from "stockflow-helpers";
import type { Location } from "../types";
import { LOCATIONS_QUERY_KEY } from "../use-locations-query";

export interface CreateLocationRequest {
  name: string;
  notes?: string;
}

const apiClient = createApiClient();

const createLocation = (body: CreateLocationRequest): Promise<Location> => {
  return apiClient.post<Location>("/locations", body);
};

export const useCreateLocationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLocation,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: LOCATIONS_QUERY_KEY });
    },
  });
};

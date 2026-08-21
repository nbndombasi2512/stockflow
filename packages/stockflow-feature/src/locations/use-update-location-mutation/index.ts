import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApiClient } from "stockflow-helpers";
import type { Location } from "../types";
import { LOCATIONS_QUERY_KEY } from "../use-locations-query";

export interface UpdateLocationRequest {
  id: string;
  name?: string;
  notes?: string;
  archived?: boolean;
}

const apiClient = createApiClient();

const updateLocation = ({
  id,
  ...body
}: UpdateLocationRequest): Promise<Location> => {
  return apiClient.patch<Location>(`/locations/${id}`, body);
};

export const useUpdateLocationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLocation,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: LOCATIONS_QUERY_KEY });
    },
  });
};

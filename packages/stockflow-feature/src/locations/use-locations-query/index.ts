import { useQuery } from "@tanstack/react-query";
import { createApiClient } from "stockflow-helpers";
import type { Location } from "../types";

export const LOCATIONS_QUERY_KEY = ["locations"] as const;

const apiClient = createApiClient();

const fetchLocations = (): Promise<Location[]> => {
  return apiClient.get<Location[]>("/locations?includeArchived=true");
};

export const useLocationsQuery = () => {
  return useQuery({
    queryKey: LOCATIONS_QUERY_KEY,
    queryFn: fetchLocations,
  });
};

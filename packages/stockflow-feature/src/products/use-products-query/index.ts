import { useQuery } from "@tanstack/react-query";
import { createApiClient } from "stockflow-helpers";
import type { Product } from "../types";

export const PRODUCTS_QUERY_KEY = ["products"] as const;

const apiClient = createApiClient();

const fetchProducts = (): Promise<Product[]> => {
  return apiClient.get<Product[]>("/products");
};

export const useProductsQuery = () => {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: fetchProducts,
  });
};

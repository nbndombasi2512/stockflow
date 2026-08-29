import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import type { Product } from "../../types";
import { useProductsQuery } from "../index";

const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "Pallet jack",
    sku: "SKU-001",
    description: "Warehouse pallet jack",
    category: "Equipment",
    unit: "each",
    reorderThreshold: 2,
    imageUrl: null,
    archived: false,
    createdAt: "2026-08-12T12:00:00.000Z",
  },
];

const originalFetch = globalThis.fetch;

const mockFetchOnce = (body: unknown = [], status = 200) => {
  const fetchMock = jest.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response);

  globalThis.fetch = fetchMock;

  return fetchMock;
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  return Wrapper;
};

describe("useProductsQuery", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("fetches products", async () => {
    const fetchMock = mockFetchOnce(mockProducts);
    const { result } = renderHook(() => useProductsQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(fetchMock).toHaveBeenCalledWith("/api/products", expect.anything());
    expect(result.current.data).toEqual(mockProducts);
  });
});

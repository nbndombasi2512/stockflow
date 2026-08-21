import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import type { Location } from "../../types";
import { useLocationsQuery } from "../index";

const mockLocations: Location[] = [
  {
    id: "loc-1",
    name: "Main Warehouse",
    notes: "Primary storage",
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

describe("useLocationsQuery", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("fetches locations including archived", async () => {
    const fetchMock = mockFetchOnce(mockLocations);
    const { result } = renderHook(() => useLocationsQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/locations?includeArchived=true",
      expect.anything(),
    );
    expect(result.current.data).toEqual(mockLocations);
  });
});

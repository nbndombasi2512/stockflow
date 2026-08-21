import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import type { Location } from "../../types";
import { LOCATIONS_QUERY_KEY } from "../../use-locations-query";
import { useCreateLocationMutation } from "../index";

const createdLocation: Location = {
  id: "loc-1",
  name: "Main Warehouse",
  notes: "Primary storage",
  archived: false,
  createdAt: "2026-08-12T12:00:00.000Z",
};

const originalFetch = globalThis.fetch;

const mockFetchOnce = (body: unknown = createdLocation, status = 200) => {
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
  const invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");

  const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  return { Wrapper, invalidateSpy };
};

describe("useCreateLocationMutation", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("posts a location and invalidates the locations query", async () => {
    const fetchMock = mockFetchOnce(createdLocation);
    const { Wrapper, invalidateSpy } = createWrapper();
    const { result } = renderHook(() => useCreateLocationMutation(), {
      wrapper: Wrapper,
    });

    result.current.mutate({
      name: "Main Warehouse",
      notes: "Primary storage",
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const init = fetchMock.mock.calls[0][1] as RequestInit;

    expect(fetchMock).toHaveBeenCalledWith("/api/locations", expect.anything());
    expect(init.method).toBe("POST");
    expect(init.body).toBe(
      JSON.stringify({
        name: "Main Warehouse",
        notes: "Primary storage",
      }),
    );
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: LOCATIONS_QUERY_KEY,
    });
  });
});

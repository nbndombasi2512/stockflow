import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import type { Location } from "../../types";
import { LOCATIONS_QUERY_KEY } from "../../use-locations-query";
import { useUpdateLocationMutation } from "../index";

const updatedLocation: Location = {
  id: "loc-1",
  name: "Main Warehouse",
  notes: "Primary storage",
  archived: false,
  createdAt: "2026-08-12T12:00:00.000Z",
};

const originalFetch = globalThis.fetch;

const mockFetchOnce = (body: unknown = updatedLocation, status = 200) => {
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

describe("useUpdateLocationMutation", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("patches a location and invalidates the locations query", async () => {
    const fetchMock = mockFetchOnce(updatedLocation);
    const { Wrapper, invalidateSpy } = createWrapper();
    const { result } = renderHook(() => useUpdateLocationMutation(), {
      wrapper: Wrapper,
    });

    result.current.mutate({
      id: "loc-1",
      name: "Main Warehouse",
      notes: "Primary storage",
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const init = fetchMock.mock.calls[0][1] as RequestInit;

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/locations/loc-1",
      expect.anything(),
    );
    expect(init.method).toBe("PATCH");
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

  it("patches archived true", async () => {
    const fetchMock = mockFetchOnce({ ...updatedLocation, archived: true });
    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useUpdateLocationMutation(), {
      wrapper: Wrapper,
    });

    result.current.mutate({
      id: "loc-1",
      archived: true,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const init = fetchMock.mock.calls[0][1] as RequestInit;

    expect(init.method).toBe("PATCH");
    expect(init.body).toBe(JSON.stringify({ archived: true }));
  });
});

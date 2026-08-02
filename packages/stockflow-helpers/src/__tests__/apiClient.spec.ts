import { createApiClient } from "../apiClient";
import { clearAuth, setToken } from "../tokenStorage";

const originalFetch = globalThis.fetch;

const mockFetchOnce = (body: unknown = { ok: true }, status = 200) => {
  const fetchMock = jest.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response);

  globalThis.fetch = fetchMock;

  return fetchMock;
};

const getRequestHeaders = (fetchMock: jest.Mock): Headers => {
  const init = fetchMock.mock.calls[0][1] as RequestInit;

  return new Headers(init.headers);
};

describe("createApiClient", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("attaches the bearer token when one is stored", async () => {
    setToken("signed-jwt");
    const fetchMock = mockFetchOnce();

    await createApiClient().get("/products");

    expect(fetchMock).toHaveBeenCalledWith("/api/products", expect.anything());
    expect(getRequestHeaders(fetchMock).get("Authorization")).toBe(
      "Bearer signed-jwt",
    );
  });

  it("omits the authorization header when no token is stored", async () => {
    clearAuth();
    const fetchMock = mockFetchOnce();

    await createApiClient().post("/auth/login", {
      email: "alice@example.com",
      password: "secret123",
    });

    const headers = getRequestHeaders(fetchMock);

    expect(headers.get("Authorization")).toBeNull();
    expect(headers.get("Content-Type")).toBe("application/json");
  });

  it("keeps the request method and body intact", async () => {
    const fetchMock = mockFetchOnce();

    await createApiClient().post("/auth/login", { email: "a@b.com" });

    const init = fetchMock.mock.calls[0][1] as RequestInit;

    expect(init.method).toBe("POST");
    expect(init.body).toBe(JSON.stringify({ email: "a@b.com" }));
  });
});

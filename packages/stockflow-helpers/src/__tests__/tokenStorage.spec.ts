import {
  clearAuth,
  clearToken,
  clearUser,
  getToken,
  getUser,
  setToken,
  setUser,
  type AuthUser,
} from "../tokenStorage";

const mockUser: AuthUser = {
  id: "user-1",
  email: "alice@example.com",
  createdAt: "2026-07-16T12:00:00.000Z",
};

describe("tokenStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns null when no token is stored", () => {
    expect(getToken()).toBeNull();
  });

  it("stores and retrieves the access token", () => {
    setToken("signed-jwt");

    expect(getToken()).toBe("signed-jwt");
    expect(localStorage.getItem("stockflow.accessToken")).toBe("signed-jwt");
  });

  it("clears the stored access token", () => {
    setToken("signed-jwt");
    clearToken();

    expect(getToken()).toBeNull();
    expect(localStorage.getItem("stockflow.accessToken")).toBeNull();
  });

  it("returns null when no user is stored", () => {
    expect(getUser()).toBeNull();
  });

  it("stores and retrieves the authenticated user", () => {
    setUser(mockUser);

    expect(getUser()).toEqual(mockUser);
  });

  it("returns null when the stored user is not valid JSON", () => {
    localStorage.setItem("stockflow.user", "not-json");

    expect(getUser()).toBeNull();
  });

  it("returns null when the stored user is missing required fields", () => {
    localStorage.setItem(
      "stockflow.user",
      JSON.stringify({ email: "alice@example.com" }),
    );

    expect(getUser()).toBeNull();
  });

  it("clears the stored user", () => {
    setUser(mockUser);
    clearUser();

    expect(getUser()).toBeNull();
  });

  it("clears both the token and the user", () => {
    setToken("signed-jwt");
    setUser(mockUser);

    clearAuth();

    expect(getToken()).toBeNull();
    expect(getUser()).toBeNull();
  });
});

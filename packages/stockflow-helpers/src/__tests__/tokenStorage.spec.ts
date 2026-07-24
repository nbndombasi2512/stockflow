import { clearToken, getToken, setToken } from "../tokenStorage";

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
});

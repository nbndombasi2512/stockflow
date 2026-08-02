import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { getToken, getUser, setToken, setUser } from "stockflow-helpers";
import type { AuthUser } from "stockflow-helpers";
import { AuthProvider, useAuth } from "../index";

const navigateMock = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

const mockUser: AuthUser = {
  id: "user-1",
  email: "alice@example.com",
  createdAt: "2026-07-16T12:00:00.000Z",
};

const AuthConsumer = () => {
  const { user, token, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      <span data-testid="authenticated">{String(isAuthenticated)}</span>
      <span data-testid="token">{token ?? "none"}</span>
      <span data-testid="email">{user?.email ?? "none"}</span>
      <button
        type="button"
        data-testid="login"
        onClick={() => login({ accessToken: "signed-jwt", user: mockUser })}
      >
        Log in
      </button>
      <button type="button" data-testid="logout" onClick={logout}>
        Log out
      </button>
    </div>
  );
};

const setup = (queryClient = new QueryClient()) => {
  const user = userEvent.setup();

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <AuthProvider>
          <AuthConsumer />
        </AuthProvider>
      </MemoryRouter>
    </QueryClientProvider>,
  );

  return { user };
};

describe("AuthProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("starts unauthenticated when storage is empty", () => {
    setup();

    expect(screen.getByTestId("authenticated")).toHaveTextContent("false");
    expect(screen.getByTestId("token")).toHaveTextContent("none");
    expect(screen.getByTestId("email")).toHaveTextContent("none");
  });

  it("hydrates the token and user from storage", () => {
    setToken("stored-jwt");
    setUser(mockUser);

    setup();

    expect(screen.getByTestId("authenticated")).toHaveTextContent("true");
    expect(screen.getByTestId("token")).toHaveTextContent("stored-jwt");
    expect(screen.getByTestId("email")).toHaveTextContent("alice@example.com");
  });

  it("persists the token and user on login", async () => {
    const { user } = setup();

    await user.click(screen.getByTestId("login"));

    expect(screen.getByTestId("authenticated")).toHaveTextContent("true");
    expect(getToken()).toBe("signed-jwt");
    expect(getUser()).toEqual(mockUser);
  });

  it("clears state, storage, and the query cache on logout", async () => {
    setToken("stored-jwt");
    setUser(mockUser);
    const queryClient = new QueryClient();
    queryClient.setQueryData(["products"], [{ id: "product-1" }]);
    const { user } = setup(queryClient);

    await user.click(screen.getByTestId("logout"));

    expect(screen.getByTestId("authenticated")).toHaveTextContent("false");
    expect(getToken()).toBeNull();
    expect(getUser()).toBeNull();
    expect(queryClient.getQueryData(["products"])).toBeUndefined();
  });

  it("redirects to login on logout", async () => {
    setToken("stored-jwt");
    const { user } = setup();

    await user.click(screen.getByTestId("logout"));

    expect(navigateMock).toHaveBeenCalledWith("/login", { replace: true });
  });

  it("throws when used outside of the provider", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    expect(() => render(<AuthConsumer />)).toThrow(
      "useAuth must be used within an AuthProvider",
    );

    consoleError.mockRestore();
  });
});

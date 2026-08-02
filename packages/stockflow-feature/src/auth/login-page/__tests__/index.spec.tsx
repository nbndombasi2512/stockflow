import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { theme } from "stockflow-component";
import { ApiError, clearAuth, getToken, getUser } from "stockflow-helpers";
import { ThemeProvider } from "styled-components";
import { LoginPage } from "../index";
import { AuthProvider } from "../../auth-context";
import { useLoginMutation } from "../../use-login-mutation";

const navigateMock = jest.fn();
const mutateMock = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

jest.mock("../../use-login-mutation", () => ({
  useLoginMutation: jest.fn(),
}));

const useLoginMutationMock = useLoginMutation as jest.MockedFunction<
  typeof useLoginMutation
>;

function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <AuthProvider>{children}</AuthProvider>
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function setup(ui: ReactElement = <LoginPage />) {
  const user = userEvent.setup();
  const utils = render(ui, { wrapper: Providers });

  return {
    user,
    utils,
    emailInput: screen.getByTestId("login-email"),
    passwordInput: screen.getByTestId("login-password"),
    submitButton: screen.getByTestId("login-submit"),
  };
}

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clearAuth();
    useLoginMutationMock.mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useLoginMutation>);
  });

  it("renders email and password fields", () => {
    setup();

    expect(screen.getByTestId("login-page")).toBeInTheDocument();
    expect(screen.getByTestId("login-email")).toBeInTheDocument();
    expect(screen.getByTestId("login-password")).toBeInTheDocument();
    expect(screen.getByTestId("login-submit")).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    const { user, submitButton } = setup();

    await user.click(submitButton);

    expect(await screen.findByTestId("login-email-error")).toHaveTextContent(
      "Email is required",
    );
    expect(screen.getByTestId("login-password-error")).toHaveTextContent(
      "Password is required",
    );
    expect(mutateMock).not.toHaveBeenCalled();
  });

  it("stores the JWT and user, then navigates home on success", async () => {
    const loginUser = {
      id: "user-1",
      email: "alice@example.com",
      createdAt: "2026-07-16T12:00:00.000Z",
    };

    mutateMock.mockImplementation((_values, options) => {
      options?.onSuccess?.({
        accessToken: "signed-jwt",
        user: loginUser,
      });
    });

    const { user, emailInput, passwordInput, submitButton } = setup();

    await user.type(emailInput, "alice@example.com");
    await user.type(passwordInput, "secret123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith(
        {
          email: "alice@example.com",
          password: "secret123",
        },
        expect.objectContaining({
          onSuccess: expect.any(Function),
        }),
      );
    });
    expect(getToken()).toBe("signed-jwt");
    expect(getUser()).toEqual(loginUser);
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("shows an error message for invalid credentials", () => {
    useLoginMutationMock.mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: true,
      error: new ApiError(401, "Invalid credentials"),
    } as ReturnType<typeof useLoginMutation>);

    setup();

    expect(screen.getByTestId("login-form-error")).toHaveTextContent(
      "Invalid credentials",
    );
  });
});

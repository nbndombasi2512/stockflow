import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { theme } from "stockflow-component";
import { ApiError } from "stockflow-helpers";
import { ThemeProvider } from "styled-components";
import type { Location } from "../../types";
import { useCreateLocationMutation } from "../../use-create-location-mutation";
import { useUpdateLocationMutation } from "../../use-update-location-mutation";
import { LocationFormDialog } from "../index";

const navigateMock = jest.fn();
const createMutateMock = jest.fn();
const updateMutateMock = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

jest.mock("../../use-create-location-mutation", () => ({
  useCreateLocationMutation: jest.fn(),
}));

jest.mock("../../use-update-location-mutation", () => ({
  useUpdateLocationMutation: jest.fn(),
}));

const useCreateLocationMutationMock =
  useCreateLocationMutation as jest.MockedFunction<
    typeof useCreateLocationMutation
  >;
const useUpdateLocationMutationMock =
  useUpdateLocationMutation as jest.MockedFunction<
    typeof useUpdateLocationMutation
  >;

const mockLocation: Location = {
  id: "loc-1",
  name: "Main Warehouse",
  notes: "Primary storage",
  archived: false,
  createdAt: "2026-08-12T12:00:00.000Z",
};

const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>{children}</MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const setup = (ui: ReactElement) => {
  const user = userEvent.setup();
  const utils = render(ui, { wrapper: Providers });

  return { user, utils };
};

describe("LocationFormDialog", () => {
  beforeAll(() => {
    Object.defineProperty(window.HTMLElement.prototype, "hasPointerCapture", {
      configurable: true,
      value: jest.fn(),
    });
    Object.defineProperty(window.HTMLElement.prototype, "setPointerCapture", {
      configurable: true,
      value: jest.fn(),
    });
    Object.defineProperty(
      window.HTMLElement.prototype,
      "releasePointerCapture",
      {
        configurable: true,
        value: jest.fn(),
      },
    );
    Object.defineProperty(window.HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: jest.fn(),
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    useCreateLocationMutationMock.mockReturnValue({
      mutate: createMutateMock,
      isPending: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useCreateLocationMutation>);
    useUpdateLocationMutationMock.mockReturnValue({
      mutate: updateMutateMock,
      isPending: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useUpdateLocationMutation>);
  });

  it("shows a name required error and does not submit", async () => {
    const { user } = setup(
      <LocationFormDialog
        open
        mode="create"
        locations={[]}
        isLocationsLoading={false}
      />,
    );

    await user.click(screen.getByTestId("location-form-submit"));

    expect(
      await screen.findByTestId("location-form-name-error"),
    ).toHaveTextContent("Name is required");
    expect(createMutateMock).not.toHaveBeenCalled();
  });

  it("submits a create payload", async () => {
    const { user } = setup(
      <LocationFormDialog
        open
        mode="create"
        locations={[]}
        isLocationsLoading={false}
      />,
    );

    await user.type(screen.getByTestId("location-form-name"), "Main Warehouse");
    await user.type(
      screen.getByTestId("location-form-notes"),
      "Primary storage",
    );
    await user.click(screen.getByTestId("location-form-submit"));

    expect(createMutateMock).toHaveBeenCalledWith(
      {
        name: "Main Warehouse",
        notes: "Primary storage",
      },
      expect.objectContaining({
        onSuccess: expect.any(Function),
      }),
    );
  });

  it("prefills name and notes in edit mode", () => {
    setup(
      <LocationFormDialog
        open
        mode="edit"
        locationId="loc-1"
        locations={[mockLocation]}
        isLocationsLoading={false}
      />,
    );

    expect(screen.getByTestId("location-form-title")).toHaveTextContent(
      "Edit location",
    );
    expect(screen.getByTestId("location-form-name")).toHaveValue(
      "Main Warehouse",
    );
    expect(screen.getByTestId("location-form-notes")).toHaveValue(
      "Primary storage",
    );
  });

  it("archives a location after confirmation", async () => {
    const { user } = setup(
      <LocationFormDialog
        open
        mode="edit"
        locationId="loc-1"
        locations={[mockLocation]}
        isLocationsLoading={false}
      />,
    );

    await user.click(screen.getByTestId("location-form-archive"));

    expect(screen.getByTestId("location-archive-dialog")).toBeInTheDocument();

    await user.click(screen.getByTestId("location-archive-confirm"));

    expect(updateMutateMock).toHaveBeenCalledWith(
      {
        id: "loc-1",
        archived: true,
      },
      expect.objectContaining({
        onSuccess: expect.any(Function),
      }),
    );
  });

  it("shows an error message when the mutation fails", () => {
    useCreateLocationMutationMock.mockReturnValue({
      mutate: createMutateMock,
      isPending: false,
      isError: true,
      error: new ApiError(400, "Name already exists"),
    } as ReturnType<typeof useCreateLocationMutation>);

    setup(
      <LocationFormDialog
        open
        mode="create"
        locations={[]}
        isLocationsLoading={false}
      />,
    );

    expect(screen.getByTestId("location-form-error")).toHaveTextContent(
      "Name already exists",
    );
  });
});

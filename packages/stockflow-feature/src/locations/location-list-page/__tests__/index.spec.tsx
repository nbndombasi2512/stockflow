import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { theme } from "stockflow-component";
import { ThemeProvider } from "styled-components";
import type { Location } from "../../types";
import { LocationListPage } from "../index";
import { useLocationsQuery } from "../../use-locations-query";

jest.mock("../../use-locations-query", () => ({
  useLocationsQuery: jest.fn(),
}));

const useLocationsQueryMock = useLocationsQuery as jest.MockedFunction<
  typeof useLocationsQuery
>;

const mockLocations: Location[] = [
  {
    id: "loc-1",
    name: "Main Warehouse",
    notes: "Primary storage",
    archived: false,
    createdAt: "2026-08-12T12:00:00.000Z",
  },
  {
    id: "loc-2",
    name: "Old Annex",
    notes: null,
    archived: true,
    createdAt: "2026-07-01T12:00:00.000Z",
  },
];

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

const setup = (ui: ReactElement = <LocationListPage />) => {
  const utils = render(ui, { wrapper: Providers });

  return { utils };
};

describe("LocationListPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a loading state while locations are fetching", () => {
    useLocationsQueryMock.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      error: null,
    } as ReturnType<typeof useLocationsQuery>);

    setup();

    expect(screen.getByTestId("location-list-page")).toBeInTheDocument();
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(screen.queryByTestId("location-table")).not.toBeInTheDocument();
  });

  it("renders an empty state when there are no locations", () => {
    useLocationsQueryMock.mockReturnValue({
      data: [],
      isPending: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useLocationsQuery>);

    setup();

    expect(screen.getByTestId("location-table-empty")).toHaveTextContent(
      "No locations yet. Add one to get started.",
    );
  });

  it("renders an error message when the query fails", () => {
    useLocationsQueryMock.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      error: new Error("Request failed: 500"),
    } as ReturnType<typeof useLocationsQuery>);

    setup();

    expect(screen.getByTestId("location-list-error")).toHaveTextContent(
      "Request failed: 500",
    );
    expect(screen.queryByTestId("location-table")).not.toBeInTheDocument();
  });

  it("renders location rows with add and edit actions", () => {
    useLocationsQueryMock.mockReturnValue({
      data: mockLocations,
      isPending: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useLocationsQuery>);

    setup();

    expect(screen.getByText("Main Warehouse")).toBeInTheDocument();
    expect(screen.getByText("Primary storage")).toBeInTheDocument();
    expect(screen.getByTestId("location-status-loc-2")).toHaveTextContent(
      "Archived",
    );
    expect(screen.getByTestId("add-location")).toHaveAttribute(
      "href",
      "/locations?create=1",
    );
    expect(screen.getByTestId("location-edit-loc-1")).toHaveAttribute(
      "href",
      "/locations?edit=loc-1",
    );
  });
});

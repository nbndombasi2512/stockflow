import { render, screen } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { theme } from "stockflow-component";
import { ThemeProvider } from "styled-components";
import type { Location } from "../../types";
import { LocationTable } from "../index";

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
  return (
    <ThemeProvider theme={theme}>
      <MemoryRouter>{children}</MemoryRouter>
    </ThemeProvider>
  );
};

const setup = (
  ui: ReactElement = <LocationTable locations={mockLocations} />,
) => {
  const utils = render(ui, { wrapper: Providers });

  return { utils };
};

describe("LocationTable", () => {
  it("renders an empty state when there are no locations", () => {
    setup(<LocationTable locations={[]} />);

    expect(screen.getByTestId("location-table-empty")).toHaveTextContent(
      "No locations yet. Add one to get started.",
    );
  });

  it("renders name, notes, and archived state", () => {
    setup();

    expect(screen.getByText("Main Warehouse")).toBeInTheDocument();
    expect(screen.getByText("Primary storage")).toBeInTheDocument();
    expect(screen.getByTestId("location-status-loc-1")).toHaveTextContent(
      "Active",
    );
    expect(screen.getByText("Old Annex")).toBeInTheDocument();
    expect(screen.getByTestId("location-status-loc-2")).toHaveTextContent(
      "Archived",
    );
  });

  it("renders an edit link for each location", () => {
    setup();

    expect(screen.getByTestId("location-edit-loc-1")).toHaveAttribute(
      "href",
      "/locations?edit=loc-1",
    );
    expect(screen.getByTestId("location-edit-loc-2")).toHaveAttribute(
      "href",
      "/locations?edit=loc-2",
    );
  });
});

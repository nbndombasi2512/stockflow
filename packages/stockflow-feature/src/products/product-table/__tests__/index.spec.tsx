import { render, screen } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { theme } from "stockflow-component";
import { ThemeProvider } from "styled-components";
import type { Product } from "../../types";
import { ProductTable } from "../index";

const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "Pallet jack",
    sku: "SKU-001",
    description: "Warehouse pallet jack",
    category: "Equipment",
    unit: "each",
    reorderThreshold: 2,
    imageUrl: null,
    archived: false,
    createdAt: "2026-08-12T12:00:00.000Z",
  },
  {
    id: "prod-2",
    name: "Shipping box (L)",
    sku: "SKU-002",
    description: null,
    category: "Packaging",
    unit: "box",
    reorderThreshold: null,
    imageUrl: null,
    archived: false,
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
  ui: ReactElement = <ProductTable products={mockProducts} />,
) => {
  const utils = render(ui, { wrapper: Providers });

  return { utils };
};

describe("ProductTable", () => {
  it("renders an empty state when there are no products", () => {
    setup(<ProductTable products={[]} />);

    expect(screen.getByTestId("product-table-empty")).toHaveTextContent(
      "No products yet. Add one to get started.",
    );
  });

  it("renders name, SKU, category, and unit", () => {
    setup();

    expect(screen.getByText("Pallet jack")).toBeInTheDocument();
    expect(screen.getByText("SKU-001")).toBeInTheDocument();
    expect(screen.getByText("Equipment")).toBeInTheDocument();
    expect(screen.getByText("each")).toBeInTheDocument();
    expect(screen.getByText("Shipping box (L)")).toBeInTheDocument();
    expect(screen.getByText("SKU-002")).toBeInTheDocument();
    expect(screen.getByText("Packaging")).toBeInTheDocument();
    expect(screen.getByText("box")).toBeInTheDocument();
  });

  it("renders an edit link for each product", () => {
    setup();

    expect(screen.getByTestId("product-edit-prod-1")).toHaveAttribute(
      "href",
      "/products?edit=prod-1",
    );
    expect(screen.getByTestId("product-edit-prod-2")).toHaveAttribute(
      "href",
      "/products?edit=prod-2",
    );
  });
});

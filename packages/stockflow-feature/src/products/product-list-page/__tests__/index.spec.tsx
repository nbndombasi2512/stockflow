import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import type { InitialEntry } from "react-router";
import { theme } from "stockflow-component";
import { ThemeProvider } from "styled-components";
import type { Product } from "../../types";
import { ProductListPage } from "../index";
import { useProductsQuery } from "../../use-products-query";

jest.mock("../../use-products-query", () => ({
  useProductsQuery: jest.fn(),
}));

const useProductsQueryMock = useProductsQuery as jest.MockedFunction<
  typeof useProductsQuery
>;

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

const Providers = ({
  children,
  initialEntries = ["/products"],
}: {
  children: ReactNode;
  initialEntries?: InitialEntry[];
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const setup = (
  ui: ReactElement = <ProductListPage />,
  initialEntries?: InitialEntry[],
) => {
  const utils = render(ui, {
    wrapper: ({ children }) => (
      <Providers initialEntries={initialEntries}>{children}</Providers>
    ),
  });

  return { utils };
};

describe("ProductListPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a loading state while products are fetching", () => {
    useProductsQueryMock.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      error: null,
    } as ReturnType<typeof useProductsQuery>);

    setup();

    expect(screen.getByTestId("product-list-page")).toBeInTheDocument();
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(screen.queryByTestId("product-table")).not.toBeInTheDocument();
  });

  it("renders an empty state when there are no products", () => {
    useProductsQueryMock.mockReturnValue({
      data: [],
      isPending: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useProductsQuery>);

    setup();

    expect(screen.getByTestId("product-table-empty")).toHaveTextContent(
      "No products yet. Add one to get started.",
    );
  });

  it("renders an error message when the query fails", () => {
    useProductsQueryMock.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      error: new Error("Request failed: 500"),
    } as ReturnType<typeof useProductsQuery>);

    setup();

    expect(screen.getByTestId("product-list-error")).toHaveTextContent(
      "Request failed: 500",
    );
    expect(screen.queryByTestId("product-table")).not.toBeInTheDocument();
  });

  it("renders product rows with add and edit actions", () => {
    useProductsQueryMock.mockReturnValue({
      data: mockProducts,
      isPending: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useProductsQuery>);

    setup();

    expect(screen.getByText("Pallet jack")).toBeInTheDocument();
    expect(screen.getByText("SKU-001")).toBeInTheDocument();
    expect(screen.getByText("Equipment")).toBeInTheDocument();
    expect(screen.getByText("each")).toBeInTheDocument();
    expect(screen.getByTestId("add-product")).toHaveAttribute(
      "href",
      "/products?create=1",
    );
    expect(screen.getByTestId("product-edit-prod-1")).toHaveAttribute(
      "href",
      "/products?edit=prod-1",
    );
  });
});

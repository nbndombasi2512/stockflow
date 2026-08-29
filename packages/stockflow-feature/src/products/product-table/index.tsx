import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Product } from "../types";
import { StyledEditLink, StyledEmpty, StyledTable } from "./styles";

export interface ProductTableProps {
  products: Product[];
}

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("sku", { header: "SKU" }),
  columnHelper.accessor("category", { header: "Category" }),
  columnHelper.accessor("unit", { header: "Unit" }),
  columnHelper.display({
    id: "actions",
    header: "",
    cell: (info) => (
      <StyledEditLink
        to={`/products?edit=${info.row.original.id}`}
        data-testid={`product-edit-${info.row.original.id}`}
      >
        Edit
      </StyledEditLink>
    ),
  }),
];

export const ProductTable = ({ products }: ProductTableProps) => {
  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (products.length === 0) {
    return (
      <StyledEmpty data-testid="product-table-empty">
        No products yet. Add one to get started.
      </StyledEmpty>
    );
  }

  return (
    <StyledTable data-testid="product-table">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

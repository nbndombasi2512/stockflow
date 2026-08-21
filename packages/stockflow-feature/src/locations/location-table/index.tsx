import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Location } from "../types";
import {
  StyledEditLink,
  StyledEmpty,
  StyledNotes,
  StyledStatus,
  StyledTable,
} from "./styles";

export interface LocationTableProps {
  locations: Location[];
}

const columnHelper = createColumnHelper<Location>();

const columns = [
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("notes", {
    header: "Notes",
    cell: (info) => {
      const notes = info.getValue();
      const isEmpty = !notes;

      return (
        <StyledNotes $empty={isEmpty}>{isEmpty ? "—" : notes}</StyledNotes>
      );
    },
  }),
  columnHelper.accessor("archived", {
    header: "Status",
    cell: (info) => {
      const archived = info.getValue();

      return (
        <StyledStatus
          $archived={archived}
          data-testid={`location-status-${info.row.original.id}`}
        >
          {archived ? "Archived" : "Active"}
        </StyledStatus>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    cell: (info) => (
      <StyledEditLink
        to={`/locations?edit=${info.row.original.id}`}
        data-testid={`location-edit-${info.row.original.id}`}
      >
        Edit
      </StyledEditLink>
    ),
  }),
];

export const LocationTable = ({ locations }: LocationTableProps) => {
  const table = useReactTable({
    data: locations,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (locations.length === 0) {
    return (
      <StyledEmpty data-testid="location-table-empty">
        No locations yet. Add one to get started.
      </StyledEmpty>
    );
  }

  return (
    <StyledTable data-testid="location-table">
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

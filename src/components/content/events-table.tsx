import { useGoodEvents } from "@/hooks";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
// import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";

type EventEntry = {
  contexts: string[];
  event: Record<string, unknown>;
  eventType: string;
  rawEvent: Record<string, unknown>;
  schema: string;
};

const columnHelper = createColumnHelper<EventEntry>();

const columns = [
  columnHelper.accessor("eventType", {
    cell: (info) => info.getValue(),
    header: "Type",
  }),
  columnHelper.accessor("schema", {
    cell: (info) => info.getValue(),
    header: "Schema",
  }),
];

export function EventsTable() {
  const { goodEvents } = useGoodEvents();

  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data: goodEvents,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  if (!goodEvents) {
    return null;
  }

  return (
    <Table>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta: any = header.column.columnDef.meta;
              return (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  isNumeric={meta?.isNumeric}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  <chakra.span pl="4">
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === "desc"
                        ? "Desc"
                        : "Asc"
                      : null}
                  </chakra.span>
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta: any = cell.column.columnDef.meta;
              return (
                <Td key={cell.id} isNumeric={meta?.isNumeric}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

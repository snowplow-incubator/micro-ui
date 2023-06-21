// import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
// import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
// import {
//   Column,
//   useReactTable,
//   flexRender,
//   getCoreRowModel,
//   ColumnOrderState,
//   SortingState,
//   getSortedRowModel,
//   getFilteredRowModel,
//   createColumnHelper,
//   getPaginationRowModel,
// } from "@tanstack/react-table";
// import { useEffect, useState } from "react";
// import * as React from 'react';
// import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useGoodEvents, useBadEvents, mergeTwo } from "@/hooks";
import { DataGridPro, GridColDef, GridRowsProp } from '@mui/x-data-grid-pro';
import {
  Box,
  Button,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from "react";

type TableEventEntry = {
  id: string;
  contexts: string[];
  event: Record<string, unknown>;
  eventType: string;
  timestamp: string;
  rawEvent: Record<string, unknown>;
  schema: string;
  collectorPayload: string[],
  errors: string[],
};


type EventEntry = {
  id: string;
  contexts: string[];
  event: Record<string, unknown>;
  eventType: string;
  rawEvent: {
    parameters: {
      eid: string;
      dtm: string
    }
  } & Record<string, unknown>;
  schema: string;
  collectorPayload: string[],
  errors: string[],
  timestamp: string

};


const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
  { id: 4, col1: 'MUI1', col2: 'is Amazing' },
  { id: 5, col1: 'MUI2', col2: 'is Amazing' },
  { id: 6, col1: 'MUI3', col2: 'is Amazing' },
  { id: 7, col1: 'MUI4', col2: 'is Amazing' },
  { id: 8, col1: 'MUI5', col2: 'is Amazing' },
];
const columns: GridColDef[] = [
  { field: 'eventType', headerName: 'Event Type', width: 150 },
  { field: 'schema', headerName: 'Schema', width: 150 },
  { field: 'errors', headerName: 'Errors', width: 150 },
  { field: 'timestamp', headerName: 'Timestamp', width: 150 },
];

export function EventsTable() {
  const { goodEvents } = useGoodEvents();
  const { badEvents } = useBadEvents();
  const [events, setEvents] = useState<TableEventEntry[]>([])

  useEffect(() => {
    let newEvents: TableEventEntry[] = mergeTwo(badEvents, goodEvents)
    setEvents(newEvents)
  }, [goodEvents, badEvents])

  return (
    <DataGridPro
      rows={events}
      columns={columns}
      initialState={{
        columns: {
          columnVisibilityModel: {
            avatar: false,
            id: false,
          },
        },
      }}
      disableColumnFilter
      unstable_headerFilters
      slots={{
        headerFilterMenu: null,
      }} />
  );
}



// type EventEntry = {
//   contexts: string[];
//   event: Record<string, unknown>;
//   eventType: string;
//   rawEvent: Record<string, unknown>;
//   schema: string;
//   collectorPayload: string[],
//   errors: string[]
// };

// const columnHelper = createColumnHelper<EventEntry>();

// const columns = [
//   columnHelper.accessor("eventType", {
//     cell: (info) => info.getValue(),
//     header: "Type",
//   }),
//   columnHelper.accessor("schema", {
//     cell: (info) => info.getValue(),
//     header: "Schema",
//   }),
//   columnHelper.accessor("errors", {
//     cell: (info) => info.getValue(),
//     header: "Error",
//   }),
//   columnHelper.accessor("rawEvent.parameters.dtm", {
//     cell: (info) => info.getValue(),
//     header: "Timestamp",
//   }),
// ];

// export function EventsTable() {
//   const { goodEvents } = useGoodEvents();
//   const { badEvents } = useBadEvents();

//   const [columnVisibility, setColumnVisibility] = useState({})
//   const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])

//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [events, setEvents] = useState<EventEntry[]>(goodEvents)
//   useEffect(() => {
//     let newEvents: EventEntry[] = mergeTwo(badEvents, goodEvents)
//     setEvents(newEvents)
//     console.log(events)
//   }, [goodEvents, badEvents])

//   const table = useReactTable({
//     columns,
//     data: events,
//     enableFilters: true,
//     enableColumnFilters: true,
//     onColumnVisibilityChange: setColumnVisibility,
//     onColumnOrderChange: setColumnOrder,
//     getFilteredRowModel: getFilteredRowModel(),
//     getCoreRowModel: getCoreRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     state: {
//       sorting,
//       columnVisibility,
//       columnOrder
//     },
//   });

//   if (!events) {
//     return null;
//   }

//   return (
//     <div>
//       <div className="inline-block border border-black shadow rounded">
//         <div className="px-1 border-b border-black">
//           <label>
//             <input
//               {...{
//                 type: 'checkbox',
//                 checked: table.getIsAllColumnsVisible(),
//                 onChange: table.getToggleAllColumnsVisibilityHandler(),
//               }}
//             />{' '}
//             Toggle All
//           </label>
//         </div>
//         {table.getAllLeafColumns().map(column => {
//           return (
//             <div key={column.id} className="px-1">
//               <label>
//                 <input
//                   {...{
//                     type: 'checkbox',
//                     checked: column.getIsVisible(),
//                     onChange: column.getToggleVisibilityHandler(),
//                   }}
//                 />{' '}
//                 {column.id}
//               </label>
//             </div>
//           )
//         })}
//       </div>
//       <Table>


//         <Thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <Tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => {
//                 // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
//                 const meta: any = header.column.columnDef.meta;
//                 return (
//                   <Th
//                     key={header.id}
//                     className="flex"
//                     isNumeric={meta?.isNumeric}
//                   >
//                     <div>
//                       {flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                       {header.column.getCanFilter() ? (
//                         <div>
//                           <Filter column={header.column} table={table} />
//                         </div>
//                       ) : null}
//                     </div>
//                     <chakra.span onClick={header.column.getToggleSortingHandler()}>
//                       {header.column.getIsSorted() ? (header.column.getIsSorted() === "asc" ? <TriangleDownIcon /> : <TriangleUpIcon />) : "Sort"}
//                     </chakra.span>
//                     <chakra.span pl="4">
//                       {header.column.getIsSorted()
//                         ? header.column.getIsSorted() === "desc"
//                           ? "Desc"
//                           : "Asc"
//                         : null}
//                     </chakra.span>
//                   </Th>
//                 );
//               })}
//             </Tr>
//           ))}
//         </Thead>
//         <Tbody>
//           {table.getRowModel().rows.map((row) => (
//             <Tr key={row.id}>
//               {row.getVisibleCells().map((cell) => {
//                 // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
//                 const meta: any = cell.column.columnDef.meta;
//                 return (
//                   <Td key={cell.id} isNumeric={meta?.isNumeric}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </Td>
//                 );
//               })}
//             </Tr>
//           ))}
//         </Tbody>
//         <div className="flex items-center gap-2">
//           <button
//             className="border rounded p-1"
//             onClick={() => table.setPageIndex(0)}
//             disabled={!table.getCanPreviousPage()}
//           >
//             {'<<'}
//           </button>
//           <button
//             className="border rounded p-1"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             {'<'}
//           </button>
//           <button
//             className="border rounded p-1"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             {'>'}
//           </button>
//           <button
//             className="border rounded p-1"
//             onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//             disabled={!table.getCanNextPage()}
//           >
//             {'>>'}
//           </button>
//           <span className="flex items-center gap-1">
//             <div>Page</div>
//             <strong>
//               {table.getState().pagination.pageIndex + 1} of{' '}
//               {table.getPageCount()}
//             </strong>
//           </span>
//           <span className="flex items-center gap-1">
//             | Go to page:
//             <input
//               type="number"
//               defaultValue={table.getState().pagination.pageIndex + 1}
//               onChange={e => {
//                 const page = e.target.value ? Number(e.target.value) - 1 : 0
//                 table.setPageIndex(page)
//               }}
//               className="border p-1 rounded w-16"
//             />
//           </span>
//           <select
//             value={table.getState().pagination.pageSize}
//             onChange={e => {
//               table.setPageSize(Number(e.target.value))
//             }}
//           >
//             {[10, 20, 30, 40, 50].map(pageSize => (
//               <option key={pageSize} value={pageSize}>
//                 Show {pageSize}
//               </option>
//             ))}
//           </select>
//         </div>
//       </Table>
//     </div>

//   );
// }

// function Filter({
//   column,
//   table,
// }: {
//   column: Column<any, any>
//   table: ReactTable<any>
// }) {
//   const firstValue = table
//     .getPreFilteredRowModel()
//     .flatRows[0]?.getValue(column.id)

//   const columnFilterValue = column.getFilterValue()

//   return typeof firstValue === 'number' ? (
//     <div>
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[0] ?? ''}
//         onChange={e =>
//           column.setFilterValue((old: [number, number]) => [
//             e.target.value,
//             old?.[1],
//           ])
//         }
//         placeholder={`Min`}
//       />
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[1] ?? ''}
//         onChange={e =>
//           column.setFilterValue((old: [number, number]) => [
//             old?.[0],
//             e.target.value,
//           ])
//         }
//         placeholder={`Max`}
//       />
//     </div>
//   ) : (
//     <input
//       type="text"
//       value={(columnFilterValue ?? '') as string}
//       onChange={e => column.setFilterValue(e.target.value)}
//       placeholder={`Search...`}
//     />
//   )
// }
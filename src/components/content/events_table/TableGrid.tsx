import {
  DataGridPro,
  GridColDef,
  GridRowParams,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid-pro";
import { useCallback } from "react";
import { TableEventEntry } from ".";
import { ErrorPanel } from "./ErrorPanel";
import { Box } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: "valid",
    valueGetter: (params) => {
      return params.value ? "✅ " : "🔴 ";
    },
    headerName: "Valid",
    width: 50,
    hideable: false,
    filterable: false,
  },
  { field: "app_id", headerName: "App Id", width: 150 },
  { field: "eventType", headerName: "Event Type", width: 150 },
  { field: "schema", headerName: "Schema", width: 450 },
  {
    field: "errors",
    valueGetter: (params) => {
      return params.value[0];
    },
    headerName: "Errors",
    width: 250,
  },
  {
    field: "timestamp",
    valueGetter: (params) => {
      return new Date(parseInt(params.value)).toLocaleString();
    },
    headerName: "Timestamp",
    width: 200,
  },
];

export function TableGrid({ events }: { events: TableEventEntry[] }) {
  const getErrorPanel = useCallback(
    ({ row }: GridRowParams) =>
      row.valid === false ? <ErrorPanel row={row} /> : null,
    []
  );

  function CustomToolbar() {
    return (
      // TO DO: Add further options here
      <GridToolbarColumnsButton />
    );
  }

  return (
    <DataGridPro
      rows={events}
      columns={columns}
      pagination={true}
      pageSizeOptions={[10, 25]}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
        columns: {
          columnVisibilityModel: {
            avatar: false,
            id: false,
          },
        },
        filter: {
          filterModel: {
            items: [],
            quickFilterValues: [],
          },
        },
      }}
      disableColumnFilter
      unstable_headerFilters
      slots={{
        headerFilterMenu: null,
        toolbar: CustomToolbar,
      }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      }}
      getDetailPanelContent={getErrorPanel}
    />
  );
}

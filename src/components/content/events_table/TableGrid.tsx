import {
  DataGridPro,
  GridColDef,
  GridRowParams,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid-pro";
import { Stack, Paper, Typography } from "@mui/material";
import { useCallback } from "react";
import { TableEventEntry } from ".";

type Error = {
  errors: string[];
};

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

function ErrorPanel({ row: rowProp }: { row: Error }) {
  return (
    <Stack
      sx={{ py: 2, height: "100%", boxSizing: "border-box" }}
      direction="column"
    >
      <Paper sx={{ flex: 1, mx: "auto", width: "90%", p: 1 }}>
        <Stack direction="column" spacing={1} sx={{ height: 1 }}>
          <Typography variant="body2" color="textSecondary">
            Error Messages
          </Typography>
          <Typography variant="body1">{rowProp.errors[0]}</Typography>
          <Typography variant="body1">{rowProp.errors[1]}</Typography>
        </Stack>
      </Paper>
    </Stack>
  );
}

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
      pageSizeOptions={[5, 10, 25]}
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
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

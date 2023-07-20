import {
  DataGridPro,
  GridColDef,
  // GridExpandMoreIcon,
  GridRowParams,
  gridDetailPanelExpandedRowsContentCacheSelector,
  GRID_DETAIL_PANEL_TOGGLE_COL_DEF,
  GridRenderCellParams,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid-pro";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { isValidElement, useCallback } from "react";
import { TableEventEntry } from ".";
import { ErrorPanel } from "./ErrorPanel";
import { Box, Chip, IconButton, SvgIcon } from "@mui/material";
import SnowplowLogo from "./logo.svg";

const columns: GridColDef[] = [
  {
    ...GRID_DETAIL_PANEL_TOGGLE_COL_DEF,
    renderCell: (params) => (
      <CustomDetailPanelToggle
        id={params.id}
        value={params.value}
        isValid={params.row.valid}
      />
    ),
  },
  { field: "app_id", headerName: "App Id" },
  { field: "eventType", headerName: "Event Type" },
  {
    field: "valid",
    renderCell: (params) => {
      const isValid = params.value;

      return isValid ? (
        <Chip
          label="No Errors"
          color="successLight"
          sx={{ color: "#054F31" }}
        />
      ) : (
        <Chip
          label="Error while validating the event"
          color="errorLight"
          sx={{ color: "#8D2119" }}
        />
      );
    },
    headerName: "Status",
    hideable: false,
    filterable: false,
    width: 250,
  },
  {
    field: "timestamp",
    valueGetter: (params) => {
      return new Date(parseInt(params.value)).toLocaleString();
    },
    headerName: "Timestamp",
    minWidth: 175,
  },
  { field: "schema", headerName: "Schema" },
  {
    field: "errors",
    valueGetter: (params) => {
      return params.value[0];
    },
    headerName: "Errors",
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
      // <GridToolbarColumnsButton />
      <div></div>
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
            app_id: true,
            schema: false,
            errors: false,
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
      // unstable_headerFilters
      slots={{
        headerFilterMenu: null,
        toolbar: CustomToolbar,
        noRowsOverlay: CustomNoRowsOverlay,
      }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      }}
      getDetailPanelContent={getErrorPanel}
      autoHeight
    />
  );
}

function CustomNoRowsOverlay() {
  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        filter: "grayscale(0.7)",
      }}
    >
      <SvgIcon
        component={SnowplowLogo}
        viewBox="0 0 300 360"
        sx={{ width: 35, height: 35 }}
      />
      No Events Available
    </Box>
  );
}

function CustomDetailPanelToggle(
  props: Pick<GridRenderCellParams, "id" | "value"> & { isValid: boolean }
) {
  const { id, value: isExpanded, isValid } = props;
  const apiRef = useGridApiContext();

  // To avoid calling ´getDetailPanelContent` all the time, the following selector
  // gives an object with the detail panel content for each row id.
  const contentCache = useGridSelector(
    apiRef,
    gridDetailPanelExpandedRowsContentCacheSelector
  );

  // If the value is not a valid React element, it means that the row has no detail panel.
  const hasDetail = isValidElement(contentCache[id]);

  if (isValid) {
    return null;
  }

  return (
    <IconButton
      size="small"
      tabIndex={-1}
      disabled={!hasDetail}
      aria-label={isExpanded ? "Close" : "Open"}
    >
      {isExpanded ? (
        <RemoveCircleOutlineIcon fontSize="inherit" />
      ) : (
        <AddCircleOutlineIcon fontSize="inherit" />
      )}
    </IconButton>
  );
}

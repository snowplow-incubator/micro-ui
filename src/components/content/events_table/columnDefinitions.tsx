import {
  GRID_DETAIL_PANEL_TOGGLE_COL_DEF,
  GridColDef,
} from "@mui/x-data-grid-pro";
import { CustomDetailPanelToggle } from "./CustomDetailPanelToggle";
import { Chip } from "@mui/material";

export const columns: GridColDef[] = [
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
  { field: "schema", headerName: "Schema", width: 350 },
];

const initiallyHiddenColumns = {};

const fieldColumnsVisibility = columns
  .filter((column) => !column.field.match("__"))
  .reduce((accum, cur) => {
    accum[cur.field] = true;
    return accum;
  }, {});

export const initialVisibilityState = {
  ...fieldColumnsVisibility,
  ...initiallyHiddenColumns,
};

export const headerNameKeys = columns.reduce((accum, cur) => {
  accum[cur.field] = cur.headerName;
  return accum;
}, {});

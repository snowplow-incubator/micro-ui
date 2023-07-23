import {
  GRID_DETAIL_PANEL_TOGGLE_COL_DEF,
  GridColDef,
} from "@mui/x-data-grid-pro";
import { CustomDetailPanelToggle } from "./CustomDetailPanelToggle";
import { Chip } from "@mui/material";

export const makeObjectKeyString = (obj: any, val: string) => {
  const entries = Object.entries(obj);

  entries.map(([param, value]) => {
    if (param.match(/ue_px|cx/)) {
      return;
    }
    if (typeof value === "string") {
      val += `${param}=${value}`;
    }
    /* Array of objects case */
    if (Array.isArray(value)) {
      value.forEach((value) => {
        val += makeObjectKeyString(value, val);
      });
    }
    if (typeof value === "object" && value !== null) {
      val += makeObjectKeyString(value, val);
    }
  });

  return val;
};

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
  {
    field: "__payload",
    valueGetter: (params) => {
      let value = "";
      if (params.row.rawEvent) {
        value += makeObjectKeyString(params.row.rawEvent.parameters, value);
      }
      if (params.row.event) {
        value += makeObjectKeyString(params.row.event, value);
      }
      return value;
    },
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

const initiallyHiddenColumns = {
  __payload: false,
};

const fieldColumnsVisibility = columns
  .filter((column) => !column.field.match("__"))
  .reduce((accum, cur) => {
    // @ts-expect-error
    accum[cur.field] = true;
    return accum;
  }, {});

export const initialVisibilityState = {
  ...fieldColumnsVisibility,
  ...initiallyHiddenColumns,
};

export const headerNameKeys = columns.reduce((accum, cur) => {
  // @ts-expect-error
  accum[cur.field] = cur.headerName;
  return accum;
}, {});

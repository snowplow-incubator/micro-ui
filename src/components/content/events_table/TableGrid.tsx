import {
  DataGridPro,
  GridRowParams,
  GridToolbarContainer,
  GridToolbarContainerProps,
  GridToolbarQuickFilter,
  useGridRootProps,
} from "@mui/x-data-grid-pro";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { forwardRef, useCallback } from "react";
import { TableEventEntry } from ".";
import { ErrorPanel } from "./ErrorPanel";
import { CustomNoRowsOverlay } from "./CustomNoRowsOverlay";
import { columns } from "./columnDefinitions";
import { Tooltip, Typography } from "@mui/material";
import { GoodRowPanel } from "./GoodRowPanel";

const datagridInitialState = {
  pagination: { paginationModel: { pageSize: 10 } },
  filter: {
    filterModel: {
      items: [],
      quickFilterValues: [],
    },
  },
};

export function TableGrid({
  events,
  visibleColumns,
}: {
  events: TableEventEntry[];
  visibleColumns: Record<string | number, boolean>;
}) {
  const getErrorPanel = useCallback(
    ({ row }: GridRowParams) =>
      row.valid === false ? <ErrorPanel row={row} /> : <GoodRowPanel row={row} />,
    []
  );

  return (
    <DataGridPro
      rows={events}
      columns={columns}
      pagination={true}
      pageSizeOptions={[10, 25]}
      columnVisibilityModel={visibleColumns}
      initialState={datagridInitialState}
      slots={{
        headerFilterMenu: null,
        toolbar: GridCustomToolbar,
        noRowsOverlay: CustomNoRowsOverlay,
      }}
      getDetailPanelContent={getErrorPanel}
      autoHeight
    />
  );
}

export const GridCustomToolbar = forwardRef<
  HTMLDivElement,
  GridToolbarContainerProps
>(function GridToolbar(props, ref) {
  const { className, ...other } = props;
  const rootProps = useGridRootProps();

  // if (
  //   rootProps.disableColumnFilter &&
  //   rootProps.disableColumnSelector &&
  //   rootProps.disableDensitySelector
  // ) {
  //   return null;
  // }

  return (
    <GridToolbarContainer
      sx={{ display: "flex", alignSelf: "end" }}
      ref={ref}
      {...other}
    >
      <Tooltip
        placement="left"
        title={
          <>
            <Typography variant="body1">
              You can filter based on all event properties using the format:{" "}
              <br /> <code>$param=$value</code> <br /> e.g.
              <br />
              <code>eid=123456789</code>
            </Typography>
          </>
        }
      >
        <InfoOutlinedIcon />
      </Tooltip>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
});

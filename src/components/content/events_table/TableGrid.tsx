import {
  DataGridPro,
  GridRowParams,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarContainerProps,
  useGridRootProps,
} from "@mui/x-data-grid-pro";
import { forwardRef, useCallback } from "react";
import { TableEventEntry } from ".";
import { ErrorPanel } from "./ErrorPanel";
import { CustomNoRowsOverlay } from "./CustomNoRowsOverlay";
import { columns } from "./columnDefinitions";

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
      row.valid === false ? <ErrorPanel row={row} /> : null,
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
      // disableColumnFilter
      // unstable_headerFilters
      slots={{
        headerFilterMenu: null,
        // toolbar: GridToolbar,
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

// export const GridCustomToolbar = forwardRef<
//   HTMLDivElement,
//   GridToolbarContainerProps
// >(function GridToolbar(props, ref) {
//   const { className, ...other } = props;
//   const rootProps = useGridRootProps();

//   if (
//     rootProps.disableColumnFilter &&
//     rootProps.disableColumnSelector &&
//     rootProps.disableDensitySelector
//   ) {
//     return null;
//   }

//   return (
//     <GridToolbarContainer ref={ref} {...other}>
//       <GridToolbar />
//     </GridToolbarContainer>
//   );
// });

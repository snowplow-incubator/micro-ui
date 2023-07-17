import { useGoodEvents, useBadEvents, mergeTwo } from "@/hooks";
import { DataGridPro, GridColDef, GridRowParams, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid-pro';
import {
  Button,
  Grid,
  Stack,
  Paper,
  Typography,
} from '@mui/material'
import { useCallback, useEffect, useState } from "react";

type TableEventEntry = {
  app_id: string;
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

type Error = {
  errors: string[]
}

const columns: GridColDef[] = [
  {
    field: 'valid',
    valueGetter: (params) => {
      return params.value ? "✅ " : "🔴 "
    },
    headerName: 'Valid', width: 50,
    hideable: false,
    filterable: false,
  },
  { field: 'app_id', headerName: 'App Id', width: 150 },
  { field: 'eventType', headerName: 'Event Type', width: 150 },
  { field: 'schema', headerName: 'Schema', width: 450 },
  {
    field: 'errors', valueGetter: (params) => {
      return params.value[0]
    }, headerName: 'Errors', width: 250
  },
  {
    field: 'timestamp', valueGetter: (params) => {
      return new Date(parseInt(params.value)).toLocaleString()
    }, headerName: 'Timestamp', width: 200
  },

];

function ErrorPanel({ row: rowProp }: { row: Error }) {
  return (
    <Stack
      sx={{ py: 2, height: '100%', boxSizing: 'border-box' }}
      direction="column"
    >
      <Paper sx={{ flex: 1, mx: 'auto', width: '90%', p: 1 }}>
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


export function EventsTable() {
  const { goodEvents } = useGoodEvents();
  const { badEvents } = useBadEvents();
  const [events, setEvents] = useState<TableEventEntry[]>([])
  const [reset, setReset] = useState<boolean>(false)

  useEffect(() => {
    let newEvents: TableEventEntry[] = mergeTwo(badEvents, goodEvents)
    setEvents(newEvents)
  }, [goodEvents, badEvents])

  function handleAllClick() {
    let allEvent = mergeTwo(badEvents, goodEvents)
    setEvents(allEvent)
  }

  function handleBadClick() {
    let allEvent = mergeTwo(badEvents, goodEvents)
    const bad = allEvent.filter(item => item.valid === false)
    setEvents(bad)
  }

  // useEffect(() => {
  //   if (reset) {
  //     const resetReq = async () => {
  //       try {
  //         const res = await fetch(
  //           process.env.NEXT_PUBLIC_MICRO_HOSTNAME + "/micro/reset",
  //         );
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //     resetReq()
  //     setReset(false)
  //   }

  // }, [reset])

  // function handleReset() {
  //   setReset(true)
  // }

  const handleReset = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_MICRO_HOSTNAME + "/micro/reset",
      );
    } catch (err) {
      console.log(err);
    }
  }

  function handleGoodClick() {
    let allEvent = mergeTwo(badEvents, goodEvents)
    const good = allEvent.filter(item => item.valid === true)
    setEvents(good)
  }

  const getErrorPanel = useCallback(
    ({ row }: GridRowParams) =>
      row.valid === false ? <ErrorPanel row={row} /> : null,
    [],
  );

  function CustomToolbar() {
    return (
      // TO DO: Add further options here
      <GridToolbarColumnsButton />);
  }

  return (
    <Grid container >
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleReset} >
          Reset
        </Button>
        <Button onClick={() => handleAllClick()} >
          All
        </Button>
        <Button onClick={() => handleGoodClick()}>
          Good
        </Button>
        <Button onClick={() => handleBadClick()}>
          Bad
        </Button>
      </Grid>
      <Grid item>
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
          getDetailPanelContent={getErrorPanel} />
      </Grid>
    </Grid >
  );
}
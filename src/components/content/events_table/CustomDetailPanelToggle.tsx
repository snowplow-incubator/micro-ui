import { IconButton } from "@mui/material";
import {
  GridRenderCellParams,
  gridDetailPanelExpandedRowsContentCacheSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid-pro";
import { isValidElement } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export function CustomDetailPanelToggle(
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

  // if (isValid) {
  //   return null;
  // }

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

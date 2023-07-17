import { Button } from "@mui/material";
import { EventsFilterType } from ".";
import { ResetButton } from "../common";

export function TableFilters({
  handleFilter,
}: {
  handleFilter: (eventFilterType: EventsFilterType) => void;
}) {
  return (
    <>
      <ResetButton />
      <Button onClick={() => handleFilter("all")}>All</Button>
      <Button onClick={() => handleFilter("good")}>Good</Button>
      <Button onClick={() => handleFilter("bad")}>Bad</Button>
    </>
  );
}

import { Button } from "@mui/material";
import { EventsFilterType } from ".";

export function TableFilters({
  handleFilter,
}: {
  handleFilter: (eventFilterType: EventsFilterType) => void;
}) {
  return (
    <>
      <Button onClick={() => handleFilter("all")}>All</Button>
      <Button onClick={() => handleFilter("good")}>Good</Button>
      <Button onClick={() => handleFilter("bad")}>Bad</Button>
    </>
  );
}

import { Box, Button } from "@mui/material";
import { EventsFilterType } from ".";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

export function TableFilters({
  handleFilter,
  activeFilter,
}: {
  handleFilter: (eventFilterType: EventsFilterType) => void;
  activeFilter: EventsFilterType;
}) {
  const activeButtonStyle = {
    background: "#6638B8",
    color: "white",
    ":hover": { backgroundColor: "#6638B8" },
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        marginBottom: "8px",
      }}
    >
      <FilterAltOutlinedIcon
        color="primary"
        fontSize="large"
        sx={{ marginRight: "8px" }}
      />
      <Button
        sx={activeFilter === "all" ? activeButtonStyle : {}}
        size="large"
        onClick={() => handleFilter("all")}
      >
        All
      </Button>
      <Button
        sx={activeFilter === "good" ? activeButtonStyle : {}}
        size="large"
        onClick={() => handleFilter("good")}
      >
        Good
      </Button>
      <Button
        sx={activeFilter === "bad" ? activeButtonStyle : {}}
        size="large"
        onClick={() => handleFilter("bad")}
      >
        Bad
      </Button>
    </Box>
  );
}

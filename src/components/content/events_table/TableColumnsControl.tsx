import { Box, FormControlLabel, FormGroup, Switch } from "@mui/material";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import { headerNameKeys } from "./columnDefinitions";

export function TableColumnsControl({
  handleColumnsVisibilityChange,
  visibleColumns,
}: {
  handleColumnsVisibilityChange: (
    newColumnsState: Record<string | number, boolean>
  ) => void;
  visibleColumns: Record<string | number, boolean>;
}) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    handleColumnsVisibilityChange({
      ...visibleColumns,
      [event.target.name]: event.target.checked,
    });
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <ViewColumnIcon
        color="primary"
        fontSize="large"
        sx={{ marginRight: "8px" }}
      />
      <FormGroup sx={{ flexDirection: "row", justifyContent: "flex-start" }}>
        {Object.entries(visibleColumns).map(([fieldKey, visibility]) => {
          return (
            <FormControlLabel
              sx={{ marginLeft: 0 }}
              key={fieldKey}
              control={
                <Switch
                  onChange={handleChange}
                  checked={visibility}
                  name={fieldKey}
                />
              }
              label={headerNameKeys[fieldKey]}
            />
          );
        })}
      </FormGroup>
    </Box>
  );
}

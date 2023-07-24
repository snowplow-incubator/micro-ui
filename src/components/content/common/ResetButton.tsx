import { useMicroReset } from "@/hooks";
import { Button, SvgIcon, Typography } from "@mui/material";
import RotateIcon from "./rotate.svg";

export function ResetButton() {
  const { resetMicro } = useMicroReset();
  const handleReset = async () => {
    try {
      await resetMicro();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Button
      sx={{
        padding: "10px 26px",
        borderRadius: "8px",
        border: "4px solid #825CC5",
      }}
      onClick={handleReset}
    >
      <SvgIcon component={RotateIcon} />
      <Typography ml="16px" variant="h3">
        Reset
      </Typography>
    </Button>
  );
}

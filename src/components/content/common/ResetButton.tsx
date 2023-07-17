import { useMicroReset } from "@/hooks";
import { Button } from "@mui/material";

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
    <Button variant="contained" onClick={handleReset}>
      Reset
    </Button>
  );
}

import { useState, useEffect } from "react";
import { Alert as MuiAlert } from "@mui/material";

interface Props {
  severity: "error" | "success" | "info" | "warning";
  message: string;
  trigger: boolean;
  setTrigger: (trigger: boolean) => void;
  onClose?: () => void;
}

const Alert = ({ severity, message, trigger, setTrigger, onClose }: Props) => {
  const [alert, setAlert] = useState("");

  const handleAlert = () => {
    const alertTimeoutSec = 2000 * 2;
    let alertTimeout = undefined;
    clearInterval(alertTimeout);
    alertTimeout = setTimeout(() => {
      setAlert("");
      setTrigger(false);
      if (onClose) onClose();
    }, alertTimeoutSec);
    setAlert(message);
  };

  useEffect(() => {
    if (trigger) handleAlert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  const handleClose = () => {
    setAlert("");
    setTrigger(false);
    if (onClose) onClose();
  };

  return (
    <>
      {alert && (
        <MuiAlert
          variant='filled'
          severity={severity}
          style={{ backgroundColor: "red", color: "white" }}
          onClose={handleClose}
        >
          {alert}
        </MuiAlert>
      )}
    </>
  );
};

export default Alert;

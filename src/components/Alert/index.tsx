import { useState, useEffect } from "react";
import { Alert as MuiAlert } from "@mui/material";

interface Props {
  severity: "error" | "success" | "info" | "warning";
  message: string;
  trigger: boolean;
  setTrigger: (trigger: boolean) => void;
  onClose?: () => void;
  m?: string;
}

const Alert = ({ severity, message, trigger, setTrigger, onClose, m }: Props) => {
  const [alert, setAlert] = useState("");

  const handleAlert = () => {
    const alertTimeoutSec = 3000 * 2;
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
  }, [trigger, message]);

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
          style={{ backgroundColor: "red", color: "white", margin: m ?? "0px" }}
          onClose={handleClose}
        >
          {alert}
        </MuiAlert>
      )
      }
    </>
  );
};

export default Alert;

import { useState, useEffect } from "react";
import { Alert as MuiAlert } from "@mui/material"


interface Props {
  severity: "error" | "success" | "info" | "warning";
  message: string;
  trigger: boolean;
  setTrigger: (trigger: boolean) => void;
}



const Alert = ({ severity, message, trigger, setTrigger }: Props) => {
  const [alert, setAlert] = useState("")

  const handleAlert = () => {
    const alertTimeoutSec = 1500 * 2
    let alertTimeout = undefined
    clearInterval(alertTimeout)
    alertTimeout = setTimeout(() => { setAlert(''); setTrigger(false) }, alertTimeoutSec)
    setAlert(message);

  }

  useEffect(() => {
    if (trigger) handleAlert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])


  return (
    <>
      {alert && (<MuiAlert variant="filled" severity={severity} style={{ backgroundColor: "red", color: "white" }}
        onClose={() => setAlert('')}>
        {alert}
      </MuiAlert>)}

    </>)
}

export default Alert
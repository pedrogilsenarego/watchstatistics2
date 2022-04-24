import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { clearNotification } from "src/redux/general/general.actions";

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction='left' />;
}

interface SnackbarState {
  open: boolean;
  message: string;
  type: null | "success";
  color: string;
  bgcolor: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const DirectionSnackbar = () => {
  const mapState = (state: any) => ({
    general: state.general,
  });
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = React.useState<SnackbarState>({
    open: false,
    message: "",
    type: "success",
    color: "",
    bgcolor: "",
  });
  const { general } = useSelector(mapState);
  const { notificationMessage, notificationType } = general;
  const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  const handleClick =
    (Transition: React.ComponentType<TransitionProps>) => () => {
      setTransition(() => Transition);
      setSnackbar({
        ...snackbar,
        open: true,
        message: notificationMessage,
        type: notificationType,
      });
    };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false, message: "", type: null });
    dispatch(clearNotification);
  };

  React.useEffect(() => {
    handleClick(TransitionLeft);
  }, [notificationMessage]);

  return (
    <div>
      <Button onClick={handleClick(TransitionLeft)}>Right</Button>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbar.open}
        onClose={handleClose}
        TransitionComponent={transition}
        autoHideDuration={3000}
        key={transition ? transition.name : ""}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DirectionSnackbar;

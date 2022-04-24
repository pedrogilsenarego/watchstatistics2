import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSelector } from "react-redux";

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction='left' />;
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

  const [open, setOpen] = React.useState(false);
  const { general } = useSelector(mapState);
  const { notificationMessage, notificationType } = general;
  const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  const handleClick =
    (Transition: React.ComponentType<TransitionProps>) => () => {
      setTransition(() => Transition);
      setOpen(true);
    };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    handleClick(TransitionLeft);
  }, [notificationMessage, notificationType]);

  return (
    <div>
      <Button onClick={handleClick(TransitionLeft)}>Right</Button>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message='I love snacks'
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

import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import { useSelector, useDispatch } from "react-redux";
import { clearNotification } from "src/redux/general/general.actions";
import { BiErrorCircle } from "react-icons/bi";

interface SnackbarState {
  open: boolean;
  message: string;
  type: null | "success" | "fail";
  color: string;
  bgcolor: string;
  icon: any;
}

const INITIALSTATE = {
  open: false,
  message: "",
  type: null,
  icon: <BiErrorCircle />,
  color: "",
  bgcolor: "",
};

const DirectionSnackbar = () => {
  const mapState = (state: any) => ({
    general: state.general,
  });
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = React.useState<SnackbarState>({
    ...INITIALSTATE,
  });
  const { general } = useSelector(mapState);
  const { notificationMessage, notificationType } = general;

  const getSnackbarElements = (type: string) => {
    switch (type) {
      case "fail":
        return {
          icon: <BiErrorCircle />,
          color: "white",
          bgcolor: "red",
        };
      case "success":
        return {
          icon: <BiErrorCircle />,
          color: "darkGreen",
          bgcolor: "#DFF9F1",
        };
      default:
        return {
          icon: <BiErrorCircle />,
          color: "orange",
          bgcolor: "rgba(93, 119, 252, 0.1)",
        };
    }
  };

  React.useEffect(() => {
    const { color, icon, bgcolor } = getSnackbarElements(general.type);
    setSnackbar({
      ...snackbar,
      open: true,
      color: color,
      bgcolor: bgcolor,
      icon: icon,
      message: general.notificationMessage,
      type: general.notificationType,
    });
  }, [general]);

  const handleClose = () => {
    setSnackbar({ ...INITIALSTATE });
    dispatch(clearNotification);
  };

  return (
    <div>
      <Button
        onClick={() =>
          setSnackbar({
            ...snackbar,
            open: true,
            message: notificationMessage,
            type: notificationType,
          })
        }
      >
        Right
      </Button>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbar.open}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Box>
          {snackbar.icon}

          <Box>{snackbar.message}</Box>
        </Box>
      </Snackbar>
    </div>
  );
};

export default DirectionSnackbar;

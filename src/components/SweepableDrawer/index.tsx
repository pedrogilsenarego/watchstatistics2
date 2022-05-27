import * as React from "react";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Global } from "@emotion/react";
import { SwipeableDrawer as MuiSwipeableDrawer } from "@mui/material";
import { useBackBrowser } from "src/customHooks";
import { useDispatch, useSelector } from "react-redux";
import { modalId } from "src/redux/User/user.actions";

type Anchor = "top" | "left" | "bottom" | "right";
type Props = {
  position: Anchor;
  openDrawer: boolean;
  setOpenDrawer: (openDrawer: boolean) => void;
  children: any;
  fullWidth?: boolean;
  fullHeight?: boolean;
  id: number;
  clearBackground?: boolean;
  topRadius?: boolean;
  trigger: boolean;
  setTrigger: (trigger: boolean) => void;
};

const SwipeableDrawer = ({
  position,
  openDrawer,
  setOpenDrawer,
  fullWidth,
  fullHeight,
  children,
  id,
  clearBackground,
  topRadius,
  trigger,
  setTrigger,
}: Props) => {
  const dispatch = useDispatch();
  const mapState = ({ user }: any) => ({
    user: user,
  });
  const { user } = useSelector(mapState);
  const modId = user.modalId;
  const [open, setOpen] = React.useState(true);
  const drawerBleeding = 200;

  useBackBrowser(
    () => {
      setOpenDrawer(false);
    },
    openDrawer,
    modId
  );


  React.useEffect(() => {
    dispatch(modalId(openDrawer ? id : id - 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDrawer]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  React.useEffect(() => {
    toggleDrawer(trigger);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  const list = () => (
    <Box
      component='div'
      sx={{
        width: fullWidth ? "100vw" : "auto",
        height: fullHeight ? "100vh" : "auto",
        backgroundColor: "#18161E",
        padding: "10px",
        overflowY: "auto",
        borderRadius: topRadius ? "20px 20px 0 0" : "0 0 0 0",
      }}
      role='presentation'
    >
      {children}
    </Box>
  );

  const handleClose = () => {
    setOpenDrawer(false);
    toggleDrawer(false);
  };

  const handleOpen = () => {
    toggleDrawer(true);
  };

  return (
    <>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: "-5vh",
            overflow: "visible",
          },
        }}
      />
      <MuiSwipeableDrawer
        BackdropProps={{
          style: {
            backgroundColor: clearBackground ? "transparent" : "#00000066",
          },
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "transparent",
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        anchor={position}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
      >
        <Box
          component='div'
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          {list()}
        </Box>
      </MuiSwipeableDrawer>
    </>
  );
};

export default SwipeableDrawer;

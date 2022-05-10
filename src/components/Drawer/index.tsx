import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
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
};

const DrawerMine = ({
  position,
  openDrawer,
  setOpenDrawer,
  fullWidth,
  fullHeight,
  children,
  id,
}: Props) => {
  const dispatch = useDispatch();
  const mapState = ({ user }: any) => ({
    user: user,
  });
  const { user } = useSelector(mapState);
  const modId = user.modalId;

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

  const list = () => (
    <Box
      component='div'
      sx={{
        width: fullWidth ? "100vw" : "auto",
        height: fullHeight ? "100vh" : "auto",
        backgroundColor: "#18161E",
        padding: "10px",
        overflowY: "auto",
      }}
      role='presentation'
    >
      {children}
    </Box>
  );

  const handleClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div>
      <Drawer anchor={position} open={openDrawer} onClose={handleClose}>
        {list()}
      </Drawer>
    </div>
  );
};

export default DrawerMine;

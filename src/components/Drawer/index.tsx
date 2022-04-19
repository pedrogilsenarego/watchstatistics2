import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useBackBrowser } from "src/customHooks";

type Anchor = "top" | "left" | "bottom" | "right";
type Props = {
  position: Anchor;
  openDrawer: boolean;
  setOpenDrawer: (openDrawer: boolean) => void;
  children: any;
  fullWidth?: boolean;
};

const DrawerMine = ({
  position,
  openDrawer,
  setOpenDrawer,
  fullWidth,
  children,
}: Props) => {
  useBackBrowser(() => {
    setOpenDrawer(false);
  }, openDrawer);

  console.log(position, openDrawer);

  const list = () => (
    <Box
      component="div"
      sx={{
        width: fullWidth ? "100vw" : "auto",
        minHeight: "100vh",
        backgroundColor: "#18161E",
        padding: "10px",
        overflowY: "auto",
      }}
      role="presentation"
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

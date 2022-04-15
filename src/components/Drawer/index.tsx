import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

type Anchor = "top" | "left" | "bottom" | "right";
type Props = {
  position: Anchor;
  openDrawer: boolean;
  setOpenDrawer: (openDrawer: boolean) => void;
  children: any;
};

const DrawerMine = ({
  position,
  openDrawer,
  setOpenDrawer,
  children,
}: Props) => {
  const list = () => (
    <Box
      component="div"
      sx={{
        width: "auto",
        height: "100vh",
        backgroundColor: "#18161E",
        padding: "10px",
      }}
      role="presentation"
    >
      {children}
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor={position}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
};

export default DrawerMine;

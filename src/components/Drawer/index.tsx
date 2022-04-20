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
  id: number;
};

const DrawerMine = ({
  position,
  openDrawer,
  setOpenDrawer,
  fullWidth,
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
    (e: any) => {
      if (id === modId + 1) setOpenDrawer(false);
    },
    openDrawer,
    id,
    modId
  );

  console.log(id, modId, position);

  React.useEffect(() => {
    dispatch(modalId(openDrawer ? id : id - 1));
  }, [openDrawer]);

  const list = () => (
    <Box
      component='div'
      sx={{
        width: fullWidth ? "100vw" : "auto",
        minHeight: "100vh",
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

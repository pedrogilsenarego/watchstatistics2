import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

type Anchor = "top" | "left" | "bottom" | "right";
type Props = {
  position: Anchor;
  anchor: boolean;
  setAnchor: (anchor: boolean) => void;
};

const DrawerMine = ({ position, anchor, setAnchor }: Props) => {
  const [state, setState] = React.useState(false);

  const list = () => (
    <Box
      component="div"
      sx={{ width: "auto" }}
      role="presentation"
      onClick={() => setState(false)}
      onKeyDown={() => setState(false)}
    >
      Teste
    </Box>
  );
  console.log("anchor", anchor);

  return (
    <div>
      <Button onClick={() => setState(true)}>{position}</Button>
      <Drawer anchor={position} open={state} onClose={() => setState(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default DrawerMine;

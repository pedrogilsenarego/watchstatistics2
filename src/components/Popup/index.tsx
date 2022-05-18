import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";

interface Props {
  children: JSX.Element;
  title: string,
  openPopup: boolean;
  setOpenPopup?: (openPopup: boolean) => void
}

const Popup = ({ title, children, openPopup }: Props) => {


  return (
    <div>
      <Dialog open={openPopup} style={{ color: "black" }}>
        <DialogTitle>
          <div style={{ textAlign: "center" }}>
            <Typography variant='h6' component='div' style={{ color: "black" }}>
              {title}
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </div>
  );
};
export default Popup;

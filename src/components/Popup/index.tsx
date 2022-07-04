import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Divider,
} from "@material-ui/core";

interface Props {
  children: JSX.Element;
  title: string;
  openPopup: boolean;
  setOpenPopup?: (openPopup: boolean) => void;
  clickToClose?: boolean;
}

const Popup = ({
  title,
  children,
  openPopup,
  setOpenPopup,
  clickToClose,
}: Props) => {
  return (
    <div>
      <Dialog
        open={openPopup}
        style={{ color: "white" }}
        PaperProps={{ style: { backgroundColor: "#2874A6" } }}
        onClick={() => {
          if (clickToClose && setOpenPopup) setOpenPopup(false);
        }}
      >
        <DialogTitle>
          <div style={{ textAlign: "center" }}>
            <Typography variant='h6' component='div' style={{ color: "white", fontWeight: 700, letterSpacing: "3px" }}>
              {title}
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent dividers style={{ color: "white" }}>
          {children}
          <Divider
            style={{
              width: "100%",
              background: "#ffffff66",
              marginTop: "10px",
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Popup;

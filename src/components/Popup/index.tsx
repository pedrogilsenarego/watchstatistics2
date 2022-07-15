import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  Grid
} from "@material-ui/core";
import { Actions } from "./types"
import Button from "./ButtonPopup"

interface Props {
  children: JSX.Element;
  title: string;
  openPopup: boolean;
  setOpenPopup?: (openPopup: boolean) => void;
  clickToClose?: boolean;
  actions?: Actions[]
}

const Popup = ({
  title,
  children,
  openPopup,
  setOpenPopup,
  clickToClose,
  actions
}: Props) => {

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Dialog
        open={openPopup}
        style={{ color: "white" }}
        PaperProps={{
          style: {
            backgroundColor: "#2874A6",
            minWidth: mobile ? "90vw" : "40vw",
          },
        }}
        onClick={() => {
          if (clickToClose && setOpenPopup) setOpenPopup(false);
        }}
      >
        <DialogTitle>
          <div style={{ textAlign: "center" }}>
            <Typography
              variant='h6'
              component='div'
              style={{ color: "white", fontWeight: 700, letterSpacing: "3px" }}
            >
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
          <Grid container justifyContent="flex-end" style={{ marginTop: "10px" }}>
            {actions?.map((item, pos) => {
              return (
                <Button disabled={item.disabled} title={item.title} key={pos} onClick={item.onClick} />
              )
            })}
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Popup;

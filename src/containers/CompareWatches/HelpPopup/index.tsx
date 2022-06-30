import Popup from "src/components/Popup";
import CardMedia from "src/components/CardMedia";
import { Typography, Grid } from "@mui/material";

const LAPTOP_IMAGE = "https://i.imgur.com/fPuv6GA.png";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const HelpPopup = ({ open, setOpen }: Props) => {
  return (
    <Popup openPopup={open} setOpenPopup={setOpen} clickToClose title='How to add watches'>
      <Grid container rowGap={1} justifyContent="center">
        <Grid item>
          <Typography>
            Visit the pretended watch by searching it on <b style={{ color: "orange" }}>Browse</b>, and select
            the option of add to compare
          </Typography>
        </Grid>
        <Grid item>
          <CardMedia height='400px' image={LAPTOP_IMAGE} />
        </Grid>
      </Grid>
    </Popup>
  );
};

export default HelpPopup;

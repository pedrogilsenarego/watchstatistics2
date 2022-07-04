import Popup from "src/components/Popup";
import CardMedia from "src/components/CardMedia";
import { Typography, Grid, Tooltip, Avatar } from "@mui/material";
import { generalEndpoints } from "src/constants/endpoints";
import { useHistory } from "react-router-dom";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { useTheme, useMediaQuery } from "@mui/material";

const LAPTOP_IMAGE = "https://i.imgur.com/Vdt6aXo.png";
const LAPTOP_IMAGE1 = "https://i.imgur.com/cdnT5Su.png";
const MOBILE_IMAGE = "https://i.imgur.com/bd44c8Z.png";
const MOBILE_IMAGE1 = "https://i.imgur.com/gHT6OV8.png";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const HelpPopup = ({ open, setOpen }: Props) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const Icon = () => {
    const label = "Select this watch to compare with other watches";
    return (
      <Tooltip arrow placement='top' title={label}>
        <Avatar
          sx={{
            bgcolor: "#00000000",
            border: "solid 2px",
            borderColor: "#ffffffCE",
            width: "3vh",
            height: "3vh",
            cursor: "pointer",
          }}
        >
          <BsFillGrid1X2Fill size='1.5vh' color='#ffffffCE' />
        </Avatar>
      </Tooltip>
    );
  };

  const history = useHistory();
  return (
    <Popup
      openPopup={open}
      setOpenPopup={setOpen}
      clickToClose
      title='How to add watches for Comparison'
    >
      <Grid container rowGap={2} justifyContent='center'>
        <Grid item container columnGap={1}>
          <Grid item container justifyContent='center' alignItems="center">
            <Typography>
              On the&nbsp;
              <b
                onClick={() => history.push(generalEndpoints.BROWSE)}
                style={{ color: "orange" }}
              >
                Browsing Page
              </b>
              &nbsp; every watch has a &nbsp;
            </Typography>
            <Icon />
            <Typography style={{ textAlign: "center" }}>
              &nbsp; option to select it for comparison, this will add the watch
              to the list of watches that are currently being compared.
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <CardMedia
            height={mobile ? "350px" : "250px"}
            image={mobile ? MOBILE_IMAGE : LAPTOP_IMAGE1}
          />
        </Grid>
        <Grid item container columnGap={1}>
          <Grid item container justifyContent='center' alignItems="center">
            <Typography>
              Also, when exploring the watch details, the option&nbsp;
            </Typography>{" "}
            <Icon />{" "}
            <Typography>
              to add the watch for the compare list is present.
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <CardMedia
            height={mobile ? "350px" : "250px"}
            image={mobile ? MOBILE_IMAGE1 : LAPTOP_IMAGE}
          />
        </Grid>
        <Grid item>
          <Typography>
            {" "}
            If you need more help please reach us{" "}
            <b style={{ color: "orange" }}>Here</b>
          </Typography>
        </Grid>
      </Grid>
    </Popup>
  );
};

export default HelpPopup;

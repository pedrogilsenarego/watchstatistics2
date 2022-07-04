import Popup from "src/components/Popup";
import CardMedia from "src/components/CardMedia";
import { Typography, Grid, Tooltip, Avatar } from "@mui/material";
import { generalEndpoints } from "src/constants/endpoints";
import { useHistory } from "react-router-dom";
import { BsFillGrid1X2Fill } from "react-icons/bs";

const LAPTOP_IMAGE = "https://i.imgur.com/Vdt6aXo.png";
const LAPTOP_IMAGE1 = "https://i.imgur.com/cdnT5Su.png";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const HelpPopup = ({ open, setOpen }: Props) => {
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
      title='How to add watches for Comparisson'
    >
      <Grid container rowGap={2} justifyContent='center'>
        <Grid item container columnGap={1}>
          <Grid item>
            <Typography>
              On the{" "}
              <b
                onClick={() => history.push(generalEndpoints.BROWSE)}
                style={{ color: "orange" }}
              >
                Browsing Page
              </b>{" "}
              every watch has an option{" "}
            </Typography>
          </Grid>
          <Grid item>
            <Icon />
          </Grid>
          <Grid item>
            <Typography>
              to select it for comparisson, this will add the watch to
              the list of watches that are currently being compared.
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <CardMedia height='250px' image={LAPTOP_IMAGE1} />
        </Grid>
        <Grid item container columnGap={1}>
          <Grid item>
            <Typography>
              Also, when exploring the watch details, the option
            </Typography>
          </Grid>
          <Grid item>
            <Icon />
          </Grid>
          <Grid item>
            <Typography>
              {" "}
              to add the watch for the compare list is present.
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <CardMedia height='250px' image={LAPTOP_IMAGE} />
        </Grid>
        <Grid item>
          <Typography>
            {" "}
            If you need more help please reach us <b style={{ color: "orange" }}>Here</b>
          </Typography>
        </Grid>
      </Grid>
    </Popup>
  );
};

export default HelpPopup;

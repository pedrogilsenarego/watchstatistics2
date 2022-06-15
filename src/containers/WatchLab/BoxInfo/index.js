import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Grid, Button } from "@mui/material";
import {
  getBox,
  openBoxPartsPercentage,
  openBoxFragmentsPercentage,
} from "src/constants/gamification";
import Popup from "../../../components/Popup";
import { FaCoins } from "react-icons/fa";
import useBoxInfo from "./useBoxInfo";

const BoxInfo = () => {
  const {
    checkmark,
    handleGetWhiteBox,
    handleOpenWhiteBox,
    openBoxPopUp,
    setOpenBoxPopUp,
    popUpInf,
    getBoxDisabled,
    openBoxDisabled,
  } = useBoxInfo();

  return (
    <Container justifyContent='center'>
      <Paper
        style={{ background: "#0000001C", width: "350px", padding: "20px" }}
      >
        <Grid container alignItems='center' justifyContent='space-between'>
          <Grid item>
            <Typography variant='h5' style={{ color: "#ffffffE6" }}>
              White box {checkmark}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant='h5'
              style={{
                color: "#ffffffE6",
              }}
            >
              {getBox.WHITE_BOX} <FaCoins size='2.5vh' color='orange' />
            </Typography>
          </Grid>
        </Grid>
        <Divider
          style={{
            width: "100%",
            marginTop: "3px",
            background: "#ffffff66",
          }}
        />
        <Typography style={{ color: "#ffffffBF" }}>Grey Watch Part</Typography>
        <Typography style={{ color: "#ffffffBF" }}>
          {openBoxPartsPercentage.SECONDARY_PART}% Chance of a White Watch Part
        </Typography>
        <Typography style={{ color: "#ffffffBF" }}>
          {openBoxPartsPercentage.THIRD_PART}% Chance of a Light Green Part
        </Typography>
        <Typography style={{ color: "#ffffffBF" }}>
          {openBoxFragmentsPercentage.SECONDARY_FRAGMENTS_MIN}-
          {openBoxFragmentsPercentage.SECONDARY_FRAGMENTS_MAX} Fragments of Blue
          Box
        </Typography>
        <Typography style={{ color: "#ffffffBF" }}>
          {openBoxFragmentsPercentage.THIRD_FRAGMENTS}% Chance of Fragment of
          Purple Box
        </Typography>
        <Divider
          style={{
            width: "100%",
            marginTop: "8px",
            background: "#ffffff66",
          }}
        />
        <ButtonGroup style={{ marginTop: "10px" }}>
          <Button
            disabled={getBoxDisabled()}
            size='small'
            onClick={() => handleGetWhiteBox()}
            style={{
              color: getBoxDisabled() ? "grey" : "#ffffffBF",
              borderColor: "#ffffff40",
              border: "solid 1.5px",
            }}
          >
            Get
          </Button>
          <Button
            disabled={openBoxDisabled()}
            size='small'
            onClick={() => handleOpenWhiteBox()}
            style={{
              color: openBoxDisabled() ? "grey" : "#ffffffBF",
              borderColor: "#ffffff40",
              border: "solid 1.5px",
            }}
          >
            Open
          </Button>
        </ButtonGroup>
      </Paper>
      <Popup
        title='You just opened a Box!!'
        openPopup={openBoxPopUp}
        setOpenPopup={setOpenBoxPopUp}
        clickToClose
      >
        <Typography style={{ color: "black" }}>{popUpInf}</Typography>
      </Popup>
    </Container>
  );
};

export default BoxInfo;

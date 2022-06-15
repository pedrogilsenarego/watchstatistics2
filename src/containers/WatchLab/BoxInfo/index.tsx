import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Grid, Button } from "@mui/material";
import {
  getBox,
  openBoxPartsPercentage,
  openBoxFragmentsPercentage,
  openBoxPartsString,
} from "src/constants/gamification";
import Popup from "../../../components/Popup";
import { FaCoins } from "react-icons/fa";
import useBoxInfo from "./useBoxInfo";
import { TypeOfBox } from "src/containers/WatchLab/types";
import * as Styled from "./styles";

interface Props {
  typeOfBox: TypeOfBox;
}

const BoxInfo = ({ typeOfBox }: Props) => {
  const {
    checkmark,
    handleGetWhiteBox,
    handleOpenWhiteBox,
    openBoxPopUp,
    setOpenBoxPopUp,
    popUpInf,
    getBoxDisabled,
    openBoxDisabled,
    returnTypeOfBoxString,
  } = useBoxInfo({ typeOfBox });

  return (
    <Container>
      <Styled.Paper>
        <Grid container alignItems='center' justifyContent='space-between'>
          <Grid item>
            <Typography variant='h5' style={{ color: "#ffffffE6" }}>
              {returnTypeOfBoxString()} {checkmark}
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
        <Styled.Divider />
        <Typography style={{ color: "#ffffffBF" }}>
          {openBoxPartsString(typeOfBox).MAIN_PART} Watch Part
        </Typography>
        <Typography style={{ color: "#ffffffBF" }}>
          {openBoxPartsPercentage.SECONDARY_PART}% Chance of a{" "}
          {openBoxPartsString(typeOfBox).SECONDARY_PART} Watch Part
        </Typography>
        <Typography style={{ color: "#ffffffBF" }}>
          {openBoxPartsPercentage.THIRD_PART}% Chance of a{" "}
          {openBoxPartsString(typeOfBox).THIRD_PART} Part
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
      </Styled.Paper>
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

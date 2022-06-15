import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Grid, Button } from "@mui/material";
import {
  getBox,
  openBoxPartsPercentage,
  openBoxFragmentsPercentage,
  openBoxParts,
} from "src/constants/gamification";
import Popup from "../../../components/Popup";

import useBoxInfo from "./useBoxInfo";
import { TypeOfBox } from "src/containers/WatchLab/types";
import * as Styled from "./styles";

interface Props {
  typeOfBox: TypeOfBox;
}

const BoxInfo = ({ typeOfBox }: Props) => {
  const {
    checkmark,
    handleGetBox,
    handleOpenWhiteBox,
    openBoxPopUp,
    setOpenBoxPopUp,
    popUpInf,
    getBoxDisabled,
    openBoxDisabled,
    returnTypeOfBoxString,
    getIcon
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
              {getBox(typeOfBox)} {getIcon()}
            </Typography>
          </Grid>
        </Grid>
        <Styled.Divider />
        <Typography style={{ color: "#ffffffBF" }}>
          {openBoxParts(typeOfBox).MAIN_PART_STRING} Watch Part
        </Typography>
        <Typography style={{ color: "#ffffffBF" }}>
          {openBoxPartsPercentage.SECONDARY_PART}% Chance of a{" "}
          {openBoxParts(typeOfBox).SECONDARY_PART_STRING} Watch Part
        </Typography>
        <Typography style={{ color: "#ffffffBF" }}>
          {openBoxPartsPercentage.THIRD_PART}% Chance of a{" "}
          {openBoxParts(typeOfBox).THIRD_PART_STRING} Part
        </Typography>
        <Typography style={{ color: "#ffffffBF" }}>
          {openBoxFragmentsPercentage.SECONDARY_FRAGMENTS_MIN}-
          {openBoxFragmentsPercentage.SECONDARY_FRAGMENTS_MAX} Fragments of{" "}
          {openBoxParts(typeOfBox).SECONDARY_FRAGMENT_STRING}{" "}
          Box
        </Typography>
        <Typography style={{ color: "#ffffffBF" }}>
          {openBoxFragmentsPercentage.THIRD_FRAGMENTS}% Chance of Fragment of{" "}
          {openBoxParts(typeOfBox).THIRD_FRAGMENTS_STRING} Box
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
            onClick={() => handleGetBox()}
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

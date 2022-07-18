import Popup from "src/components/Popup";
import { Typography } from "@mui/material";
import {
  openBoxFragmentsPercentage,
  openBoxParts,
  openBoxPartsPercentage,
} from "src/constants/gamification";

interface Props {
  openPopup: boolean;
  setOpenPopup: (openPopup: boolean) => void;
  title: string;
  typeOfBox: string;
}

const BoxesPopup = ({ openPopup, setOpenPopup, title, typeOfBox }: Props) => {
  return (
    <>
      <Popup
        title={title}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        clickToClose
      >
        <>
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
            {openBoxParts(typeOfBox).SECONDARY_FRAGMENT_STRING} Box
          </Typography>
          <Typography style={{ color: "#ffffffBF" }}>
            {openBoxFragmentsPercentage.THIRD_FRAGMENTS}% Chance{" "}
            {(typeOfBox === "whiteBox" || typeOfBox === "blueBox") &&
              "of Fragment"}{" "}
            of {openBoxParts(typeOfBox).THIRD_FRAGMENTS_STRING}{" "}
            {(typeOfBox === "whiteBox" || typeOfBox === "blueBox") && "Box"}
          </Typography>
        </>
      </Popup>
    </>
  );
};

export default BoxesPopup;

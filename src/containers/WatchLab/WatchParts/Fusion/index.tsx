import * as GeneralStyles from "src/styles/styles";
import Button3 from "src/components/Buttons/Button3";
import { priceWatchParts } from "src/Utils/gamyfication";
import BoosterSelection from "./BoosterSelection";
import { Grid } from "@mui/material";

interface Props {
  fusionPrice: string;
  list: any;
  fusionMatchParts: boolean;
  ready: boolean;
  fusionGlass: string;
  fusionBracelet: string;
  fusionCase: string;
  fusionCrown: string;
  fusionMovement: string;
  collectionFull: boolean;
  setFusionPrice: (fusionPrice: string) => void;
  setReady: (ready: boolean) => void;
  handleFusionNewWatch: any;
  handleDeleteWatchParts: any;
  boostStatusFalse: any;
  boostStatusTrue: any;
  boostStatusFail: any;
  numberBoosters: any;
  setNumberBoosters: any;
  boostStatus: string;
}

const Fusion = ({
  fusionPrice,
  list,
  fusionMatchParts,
  ready,
  fusionGlass,
  fusionBracelet,
  fusionCase,
  fusionCrown,
  fusionMovement,
  collectionFull,
  setFusionPrice,
  setReady,
  handleFusionNewWatch,
  handleDeleteWatchParts,
  boostStatusFalse,
  boostStatusTrue,
  boostStatusFail,
  numberBoosters,
  setNumberBoosters,
  boostStatus
}: Props) => {

  const configBoosterSelection = {
    boostStatusFalse,
    boostStatusTrue,
    boostStatusFail,
    numberBoosters,
    setNumberBoosters,
    fusionPrice,
    boostStatus
  };

  return (
    <Grid item container xs={12} rowGap={1} style={{ marginTop: "20px" }}>
      <GeneralStyles.DashedGrid
        justifyContent='space-between'
        alignContent='center'
        style={{ display: "flex", width: "100%" }}
      >
        <GeneralStyles.BasicTypography fontSize='16px' textAlign='end'>
          New watch to be obtained: <b style={{ color: "orange" }}>{fusionPrice}</b>
        </GeneralStyles.BasicTypography>
      </GeneralStyles.DashedGrid>
      {list[1].items.length > 5 && (
        <Grid item xs={12} textAlign='end'>
          <GeneralStyles.BasicTypography color="orange" fontSize="14px">
            You have to many parts on the fusion machine
          </GeneralStyles.BasicTypography></Grid>
      )}
      {!fusionMatchParts && (
        <Grid item xs={12} textAlign='end'>
          <GeneralStyles.BasicTypography fontSize='14px' color='orange'>
            You have Parts that are incompatible (different price brackets)
          </GeneralStyles.BasicTypography>
        </Grid>
      )}

      {!ready &&
        fusionBracelet &&
        fusionCase &&
        fusionGlass &&
        fusionCrown &&
        fusionMovement &&
        fusionMatchParts &&
        list[1].items.length === 5 &&
        (!collectionFull ? (
          <Grid item xs={12} textAlign="end">
            <Button3
              title='Start Fusion'
              onClick={() => {
                setFusionPrice(priceWatchParts(list[1].items?.[0] || ""));
                setReady(true);
              }}
            /></Grid>
        ) : (
          <Grid item xs={12} textAlign="end">
            <GeneralStyles.BasicTypography color="orange" fontSize="14px">
              Your collection is full!
            </GeneralStyles.BasicTypography></Grid>
        ))}
      {ready && (
        <>
          <BoosterSelection {...configBoosterSelection} />
          <Grid item xs={12} textAlign="end">
            <Button3
              title='Fusion'
              onClick={() => {
                setReady(false);
                handleFusionNewWatch();
                handleDeleteWatchParts(list[1].items);
              }}
            /></Grid>
        </>
      )}
    </Grid>
  );
};

export default Fusion;

import * as Styled from "./styles";
import { Grid } from "@mui/material";
import Button1 from "src/components/Buttons/Button1";
import { rewards } from "src/constants/gamification";

interface Props {
  additionalData: { title: string; link: string }[];
}

const AdditionalData = ({ additionalData }: Props) => {
  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Styled.Box>
      <Grid container>
        <Grid item container xs={12}>
          {additionalData.length > 0 &&
            additionalData?.map((additionalData, pos: number) => {
              const { link, title } = additionalData;
              return (
                <Grid item xs={6} md={3} key={pos}>
                  <Button1
                    title={title}
                    onClick={() => openInNewTab(`${link}`)}
                  />
                </Grid>
              );
            })}
        </Grid>
        <Grid item xs={12}>
          {additionalData.length <= 0 && (
            <Styled.Typography>
              There is no links for this watch yet,{" "}
              <b style={{ color: "orange", cursor: "pointer" }}>click here</b>{" "}
              to add one or more link and win up to{" "}
              <b style={{ color: "orange" }}>
                {rewards.PRODUCT_ADDITIONAL_DATA * 4}
              </b>{" "}
              points.
            </Styled.Typography>
          )}
        </Grid>
      </Grid>
    </Styled.Box>
  );
};

export default AdditionalData;

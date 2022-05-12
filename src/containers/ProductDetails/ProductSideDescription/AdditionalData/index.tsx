import { useState, useMemo } from "react";
import * as Styled from "./styles";
import { Grid } from "@mui/material";
import Button1 from "src/components/Buttons/Button1";
import { rewards } from "src/constants/gamification";
import { MdAddCircle } from "react-icons/md";
import Popover from "src/components/Popover";
import { openWindowInNewTab } from "src/Utils";
import AddAdditionalData from "./AddAditionalData";

interface Props {
  additionalData: { title: string; link: string }[];
  currentUser: any;
}

const AdditionalData = ({ additionalData, currentUser }: Props) => {
  const [addAdditionalData, setAddAdditionalData] = useState(false);
  const [anchorPopover, setAnchorPopover] = useState<any>(null);

  const numberReviews = useMemo(() => {
    if (additionalData && additionalData !== undefined)
      return 4 - additionalData.length;
    else return 0;
  }, [additionalData]);

  return (
    <Styled.Box>
      <Grid container>
        {additionalData?.length > 0 && (
          <Grid item container columnSpacing={1} alignItems='center' xs={12}>
            {additionalData?.map((additionalData, pos: number) => {
              const { link, title } = additionalData;
              return (
                <Grid item key={pos}>
                  <Button1
                    title={title}
                    onClick={() => openWindowInNewTab(`${link}`)}
                  />
                </Grid>
              );
            })}
            {!addAdditionalData && currentUser && additionalData.length <= 4 && (
              <Grid item>
                <MdAddCircle
                  onMouseOver={(e) => {
                    setAnchorPopover(e.currentTarget);
                  }}
                  onMouseOut={() => {
                    setAnchorPopover(null);
                  }}
                  style={{ cursor: "pointer" }}
                  size='2em'
                  color='orange'
                  onClick={() => {
                    setAnchorPopover(null);
                    setAddAdditionalData(true);
                  }}
                />
              </Grid>
            )}
          </Grid>
        )}
        {!addAdditionalData && currentUser && additionalData.length <= 0 && (
          <Grid item xs={12}>
            <Styled.Typography>
              There is no links for this watch yet,{" "}
              <b
                style={{ color: "orange", cursor: "pointer" }}
                onClick={() => {
                  setAddAdditionalData(true);
                }}
              >
                click here
              </b>{" "}
              to add one or more link and win up to{" "}
              <b style={{ color: "orange" }}>
                {rewards.PRODUCT_ADDITIONAL_DATA * 4}
              </b>{" "}
              points.
            </Styled.Typography>
          </Grid>
        )}
        {addAdditionalData && (
          <AddAdditionalData setAddAdditionalData={setAddAdditionalData} />
        )}
      </Grid>
      <Popover
        anchor={anchorPopover}
        setAnchor={setAnchorPopover}
        message={`Add up to ${numberReviews} reviews to win up to ${Number(numberReviews) * rewards.PRODUCT_ADDITIONAL_DATA
          } points`}
      />
    </Styled.Box>
  );
};

export default AdditionalData;

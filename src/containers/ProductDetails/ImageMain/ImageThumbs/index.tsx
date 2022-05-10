import { useState, useMemo } from "react";
import { Grid, CardMedia } from "@mui/material";
import { MdAddCircle } from "react-icons/md";
import Popover from "src/components/Popover";
import * as Styled from "./styles";
import { rewards } from "src/constants/gamification";

interface Props {
  productThumbnail: "string"[];
  setMainImage: (mainImage: string) => void;
  mainImage: string;
  mobile: boolean;
  addAdditionalPictures: Boolean;
  setAddAdditionalPictures: (addAdditionalPictures: Boolean) => void;
}

const ImageThumbs = ({
  productThumbnail,
  setMainImage,
  mainImage,
  mobile,
  addAdditionalPictures,
  setAddAdditionalPictures,
}: Props) => {
  const [anchorPopover, setAnchorPopover] = useState<any>(null);

  const numberPictures = useMemo(() => {
    if (productThumbnail && productThumbnail !== undefined)
      return 4 - productThumbnail.length;
    else return 0;
  }, [productThumbnail]);

  return (
    <>
      <Grid container xs={12} sm={8}>
        {productThumbnail?.length > 0 && (
          <Grid
            item
            container
            columnSpacing={mobile ? 0.5 : 1}
            alignItems='center'
            justifyContent='flex-start'
            wrap='nowrap'
            style={{ overflow: "hidden" }}
            xs={12}
          >
            {productThumbnail?.map((item, pos) => {
              return (
                <Grid
                  item
                  key={pos}
                  onClick={() => {
                    setMainImage(item);
                  }}
                >
                  <CardMedia
                    style={{
                      cursor: "pointer",
                      border: mainImage === item ? "solid 1.5px" : "solid 0px",
                      borderRadius: "2px",
                      borderColor: mainImage === item ? "orange" : "ffffff00",
                    }}
                    component='img'
                    height='50px'
                    image={item}
                    alt=''
                  />
                </Grid>
              );
            })}
            {!addAdditionalPictures && productThumbnail.length < 4 && (
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
                    setAddAdditionalPictures(true);
                  }}
                />
              </Grid>
            )}
          </Grid>
        )}

        {!addAdditionalPictures && productThumbnail.length <= 0 && (
          <Grid item xs={12}>
            <Styled.Typography>
              There is no links for this watch yet,{" "}
              <b
                style={{ color: "orange", cursor: "pointer" }}
                onClick={() => {
                  setAddAdditionalPictures(true);
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
      </Grid>
      <Popover
        anchor={anchorPopover}
        setAnchor={setAnchorPopover}
        message={`Add up to ${numberPictures} pictures to win up to ${
          Number(numberPictures) * rewards.PRODUCT_PICTURE
        } points`}
      />
    </>
  );
};

export default ImageThumbs;

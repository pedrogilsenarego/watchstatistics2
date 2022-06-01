import { useState, useMemo } from "react";
import { Grid, CardMedia } from "@mui/material";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import Popover from "src/components/Popover";
import * as Styled from "./styles";
import { rewards } from "src/constants/gamification";
import { Typography } from "@material-ui/core";
import { useField } from "formik"

interface Props {
  productThumbnail: string[];
  setProductThumbnail: (productThumbnail: string[]) => void;
  setMainImage: (mainImage: string) => void;
  mainImage: string;
  mobile: boolean;
  addAdditionalPictures: Boolean;
  setAddAdditionalPictures: (addAdditionalPictures: Boolean) => void;
  currentUser: any;
  index: number;
  setIndex: (index: number) => void;
  newWatch: boolean;
  setOriginalPictureNewWatch: (originalPictureNewWatch: boolean) => void
}

const ImageThumbs = ({
  productThumbnail,
  setProductThumbnail,
  setMainImage,
  mainImage,
  mobile,
  addAdditionalPictures,
  setAddAdditionalPictures,
  currentUser,
  setIndex,
  newWatch,
  setOriginalPictureNewWatch
}: Props) => {
  const NO_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"
  const [anchorPopover, setAnchorPopover] = useState<any>(null);
  const [anchorPopoverDelete, setAnchorPopoverDelete] = useState<any>(null);
  const [removeAdditionalPictures, setRemoveAdditionalPictures] =
    useState(false);
  const [, , helpersProductThumbnail] = useField("productThumbnail")

  const numberPictures = useMemo(() => {
    if (productThumbnail && productThumbnail !== undefined)
      return 4 - productThumbnail.length;
    else return 0;
  }, [productThumbnail]);

  const handleRemoveThumb = (pos: number) => {
    const newArray = [...productThumbnail];
    newArray.splice(pos, 1);
    if (newArray.length === 0) {
      setOriginalPictureNewWatch(true)
      setAddAdditionalPictures(true)
      helpersProductThumbnail.setValue([])
      setRemoveAdditionalPictures(false);
      newArray.push(
        NO_IMAGE
      );
    }
    else helpersProductThumbnail.setValue(newArray)
    setProductThumbnail(newArray);

  };
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
            wrap='wrap-reverse'
            style={{ overflow: "hidden", marginLeft: mobile ? "-2px" : "5px" }}
            xs={12}
          >
            {productThumbnail?.map((item, pos) => {
              return (
                <Grid
                  item
                  key={pos}
                  onClick={() => {
                    setIndex(pos);
                    setMainImage(item);
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <CardMedia
                      style={{
                        filter: removeAdditionalPictures
                          ? "grayscale(100%) brightness(0.4)"
                          : "grayscale(0%) brightness(1)",
                        cursor: "pointer",
                        border:
                          mainImage === item ? "solid 1.5px" : "solid 0px",
                        borderRadius: "2px",
                        borderColor: mainImage === item ? "orange" : "ffffff00",
                      }}
                      component='img'
                      height='50px'
                      image={item}
                      alt=''
                    />
                    {removeAdditionalPictures && (
                      <MdRemoveCircle
                        style={{
                          backgroundColor: "yellow",
                          borderRadius: "2px",
                          cursor: "pointer",
                          position: "absolute",
                          top: "25%",
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                        size='1.7em'
                        color='#F80A0A66'
                        onClick={() => handleRemoveThumb(pos)}
                      />
                    )}
                  </div>
                </Grid>
              );
            })}
            {!addAdditionalPictures &&
              currentUser &&
              !removeAdditionalPictures &&
              productThumbnail.length < 4 && (
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
            {newWatch &&
              !addAdditionalPictures &&
              currentUser &&
              !removeAdditionalPictures && (
                <Grid item>
                  <MdRemoveCircle
                    onMouseOver={(e) => {
                      setAnchorPopoverDelete(e.currentTarget);
                    }}
                    onMouseOut={() => {
                      setAnchorPopoverDelete(null);
                    }}
                    style={{ cursor: "pointer" }}
                    size='2em'
                    color='red'
                    onClick={() => {
                      setAnchorPopoverDelete(null);
                      setRemoveAdditionalPictures(true);
                    }}
                  />
                </Grid>
              )}
            {removeAdditionalPictures && (
              <Grid item>
                <Typography
                  onClick={() => setRemoveAdditionalPictures(false)}
                  style={{ color: "red", cursor: "pointer" }}
                >
                  Cancel
                </Typography>
              </Grid>
            )}
          </Grid>
        )}

        {!addAdditionalPictures && currentUser && productThumbnail.length <= 0 && (
          <Grid item xs={12}>
            <Styled.Typography>
              There is no images for this watch yet,{" "}
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
        message={`Add up to ${numberPictures} pictures to win up to ${Number(numberPictures) * rewards.PRODUCT_PICTURE
          } points`}
      />
      <Popover
        anchor={anchorPopoverDelete}
        setAnchor={setAnchorPopoverDelete}
        message={`Remove pictures you don't like`}
      />
    </>
  );
};

export default ImageThumbs;

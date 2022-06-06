import * as GeneralStyled from "src/styles/styles";
import { Grid, CardMedia, Typography } from "@mui/material";
import { MdRemoveCircle } from "react-icons/md";

interface Props {
  productThumbnail: string[];
  handleRemoveThumb: any;
  setShowImageRemoveList: (showRemoveImageList: boolean) => void;
}

const MobileRemoveImageList = ({
  productThumbnail,
  handleRemoveThumb,
  setShowImageRemoveList,
}: Props) => {
  return (
    <GeneralStyled.DashedGrid
      item
      xs={12}
      container
      alignItems='center'
      columnGap={1}
      rowGap={1}
    >
      {" "}
      {productThumbnail?.map((item, pos) => {
        return (
          <Grid item key={pos} onClick={() => { }}>
            <div style={{ position: "relative" }}>
              <CardMedia
                style={{
                  filter: "grayscale(100%) brightness(0.4)",
                  cursor: "pointer",

                  borderRadius: "2px",
                }}
                component='img'
                height='50px'
                image={item}
                alt=''
              />
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
                size='2.5em'
                color='#F80A0A66'
                onClick={() => handleRemoveThumb(pos)}
              />
            </div>
          </Grid>
        );
      })}
      <Grid item>
        <Typography
          onClick={() => setShowImageRemoveList(false)}
          style={{ color: "red", cursor: "pointer" }}
        >
          Cancel
        </Typography>
      </Grid>
    </GeneralStyled.DashedGrid>
  );
};

export default MobileRemoveImageList;

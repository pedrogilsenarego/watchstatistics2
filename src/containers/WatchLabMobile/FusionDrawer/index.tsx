import { useSelector } from "react-redux";
import { Redux } from "src/redux/types";
import { Grid } from "@mui/material";
import { RiCloseFill } from "react-icons/ri";
import { arrangeFusion } from "src/Utils/gamyfication"

interface Props {
  setOpenDrawer: (openDrawer: boolean) => void;
}

const FusionDrawer = ({ setOpenDrawer }: Props) => {
  const watchParts = useSelector<Redux, string[] | []>(
    (state) => state.user.currentUser.watchParts
  );



  console.log(arrangeFusion(watchParts));

  return (
    <>
      <Grid container>
        <Grid
          container
          justifyContent='space-between'
          style={{
            marginTop: "-10px",
            position: "fixed",
            zIndex: 20,
            backgroundColor: "#18161E",
            paddingBottom: "10px",
            paddingTop: "10px",
          }}
        >
          <Grid item xs={4}>
            <RiCloseFill
              onClick={() => setOpenDrawer(false)}
              size='2.5em'
              color='lightGrey'
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default FusionDrawer;

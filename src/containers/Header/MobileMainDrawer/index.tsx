import { Grid } from "@mui/material";
import { RiCloseFill } from "react-icons/ri";

interface Props {
  setMobileDrawer: (mobileDrawer: boolean) => void;
}

const MobileMainDrawer = ({ setMobileDrawer }: Props) => {
  return (
    <>
      <Grid container>
        <Grid
          container
          item
          xs={12}
          alignItems='center'
          justifyContent='space-between'
        >
          <Grid item>
            <RiCloseFill
              onClick={() => setMobileDrawer(false)}
              size='2.5em'
              color='lightGrey'
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MobileMainDrawer;

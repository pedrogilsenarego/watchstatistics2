import { Paper, Grid, Tooltip, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { BsFillInboxFill } from "react-icons/bs";
import { FaCoins, FaPuzzlePiece } from "react-icons/fa";
import { GiGears } from "react-icons/gi";
import { GoRocket } from "react-icons/go";
import { AiOutlineCodeSandbox } from "react-icons/ai";
import { bagSizeHelper } from "src/Utils/gamyfication";
import { Redux } from "src/redux/types";

const mapState = (state: Redux) => ({
  currentUser: state.user.currentUser,
});

const Currencies = () => {
  const { currentUser } = useSelector(mapState);

  return (
    <Grid container justifyContent="center" columnGap={1}>
      <Paper
        style={{
          background: "#0000001C",
          position: "fixed",
          zIndex: "1000",
          marginTop: "90vh",
          padding: "10px",
          paddingRight: "10px",
          color: "#ffffffBE"
        }}
      >

        <BsFillInboxFill
          size='3vh'
          color={
            (currentUser?.collection?.length || 0) >=
              bagSizeHelper(currentUser?.experience)
              ? "red"
              : "white"
          }
        />
        {currentUser?.collection?.length || 0} /
        {bagSizeHelper(currentUser?.experience)}{" "}




        <GiGears

          size='3vh'
          color={
            (currentUser?.watchParts?.length || 0) >=
              bagSizeHelper(currentUser?.experience)
              ? "red"
              : "white"
          }
        />


        {" "}
        {currentUser?.watchParts?.length || 0}/
        {bagSizeHelper(currentUser?.experience)} {"     "}{" "}



        <GoRocket size='3vh' color='white' />{" "}
        {currentUser?.boosters || 0}




        <FaCoins size='3vh' color='orange' /> {currentUser?.points || 0}
        {"  "}
        <FaPuzzlePiece
          style={{ marginLeft: "5px" }}
          size='3vh'
          color='lightBlue'
        />{" "}
        {currentUser?.blueBoxFragments || 0}
        {"  "}
        <FaPuzzlePiece
          style={{ marginLeft: "5px" }}
          size='3vh'
          color='purple'
        />{" "}
        {currentUser?.purpleBoxFragments || 0}
        {"  "}
        <FaPuzzlePiece
          style={{ marginLeft: "5px" }}
          size='3vh'
          color='red'
        />{" "}
        {currentUser?.orangeBoxFragments || 0}



        <AiOutlineCodeSandbox size='3vh' color='white' />{" "}
        {currentUser?.whiteBox || 0}
        {"  "}
        <AiOutlineCodeSandbox
          style={{ marginLeft: "5px" }}
          size='3vh'
          color='lightBlue'
        />{" "}
        {currentUser?.blueBox || 0}
        {"  "}
        <AiOutlineCodeSandbox
          style={{ marginLeft: "5px" }}
          size='3vh'
          color='purple'
        />{" "}
        {currentUser?.purpleBox || 0}
        {"  "}
        <AiOutlineCodeSandbox
          style={{ marginLeft: "5px" }}
          size='3vh'
          color='red'
        />{" "}
        {currentUser?.orangeBox || 0}

      </Paper>
    </Grid>
  );
};

export default Currencies;

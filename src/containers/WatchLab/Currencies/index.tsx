import React from "react"
import { Paper, Grid, Tooltip, Box } from "@mui/material";
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

  const MyComponent = React.forwardRef(function MyComponent(props: any, ref: any) {
    //  Spread the props to the underlying DOM element.
    return <div {...props} ref={ref}><BsFillInboxFill
      size='3vh'
      style={{ cursor: "pointer" }}
      color={
        (currentUser?.collection?.length ||
          0) >= bagSizeHelper(currentUser?.experience)
          ? "red"
          : "white"
      }
    /></div>
  });

  return (
    <Grid container direction='column' alignItems='center'>
      <Paper
        style={{
          background: "#0000001C",
          position: "fixed",
          zIndex: "1000",
          marginTop: "91vh",
          padding: "10px",
          paddingRight: "10px",
          display: "flex",
          alignItems: "center",

        }}
      >
        <Box component="div" style={{ color: "#ffffffBF" }}>
          <Tooltip title="add" arrow >
            <MyComponent />
          </Tooltip>{" "}
          {currentUser?.collection?.length || 0} /
          {bagSizeHelper(currentUser?.experience)}{" "}
          <GiGears
            style={{ marginLeft: "5px" }}
            size='3vh'
            color={
              (currentUser?.watchParts?.length ||
                0) >= bagSizeHelper(currentUser?.experience)
                ? "red"
                : "white"
            }
          />{" "}
          {currentUser?.watchParts?.length || 0}/
          {bagSizeHelper(currentUser?.experience)} {"     "}{" "}
          <GoRocket style={{ marginLeft: "5px" }} size='3vh' color='white' />{" "}
          {currentUser?.boosters || 0}
        </Box>

        <Box component="div" style={{ color: "#ffffffBF", paddingLeft: "30px" }}>
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
        </Box>

        <Box component="div" style={{ color: "#ffffffBF", paddingLeft: "30px" }}>
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
        </Box>
      </Paper>
    </Grid>
  );
};

export default Currencies;

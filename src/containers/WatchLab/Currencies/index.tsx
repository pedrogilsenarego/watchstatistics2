import { Paper, Grid, Tooltip, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { BsFillInboxFill } from "react-icons/bs";
import { FaCoins, FaPuzzlePiece } from "react-icons/fa";
import { GiGears } from "react-icons/gi";
import { GoRocket } from "react-icons/go";
import { AiOutlineCodeSandbox } from "react-icons/ai";
import { bagSizeHelper } from "src/Utils/gamyfication";
import { Redux } from "src/redux/types";
import Item from "./item";

const mapState = (state: Redux) => ({
  currentUser: state.user.currentUser,
});

const Currencies = () => {
  const { currentUser } = useSelector(mapState);

  const ListElements = [
    <Item title='Watches on the Collection'>
      <>
        <BsFillInboxFill
          size='3vh'
          color={
            (currentUser?.collection?.length || 0) >=
              bagSizeHelper(currentUser?.experience)
              ? "red"
              : "white"
          }
        />
        <Typography>
          {currentUser?.collection?.length || 0}/
          {bagSizeHelper(currentUser?.experience)}{" "}
        </Typography>
      </>
    </Item>,
    <Item title='Watch Parts'>
      <>
        <GiGears
          size='3vh'
          color={
            (currentUser?.watchParts?.length || 0) >=
              bagSizeHelper(currentUser?.experience)
              ? "red"
              : "white"
          }
        />
        <Typography>
          {currentUser?.watchParts?.length || 0}/
          {bagSizeHelper(currentUser?.experience)} {"     "}{" "}
        </Typography>
      </>
    </Item>,
    <Item title='Boosters'>
      <>
        <GoRocket size='3vh' color='white' />
        <Typography>{currentUser?.boosters || 0}</Typography>
      </>
    </Item>,
    <Item title='Points'>
      <>
        <FaCoins size='3vh' color='orange' />
        <Typography>{currentUser?.points || 0}</Typography>
      </>
    </Item>,
  ];

  return (
    <Paper
      style={{
        background: "#0000001C",
        position: "fixed",
        zIndex: "1000",
        marginTop: "90vh",
        padding: "10px",
        paddingRight: "10px",
        color: "#ffffffBE",
        left: 0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Grid container justifyContent='center' alignItems='center' columnGap={1}>
        {ListElements.map((item) => item)}

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
      </Grid>
    </Paper>
  );
};

export default Currencies;

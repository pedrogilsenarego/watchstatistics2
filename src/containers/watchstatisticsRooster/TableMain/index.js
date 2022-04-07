import { useState, useEffect } from "react";

import {
  Button,
  Grid,
  Box,
  Container,
  Typography,
} from "@material-ui/core";
//import { makeStyles } from "@material-ui/core/styles";
import MainBody from "../MainBody";
import MainUsers from "../MainUsers";
import { makeStyles } from "@material-ui/core/styles";
import { BiImages } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountersStart } from "../../../redux/Products/products.actions";

const useStyles = makeStyles((theme) => ({
  subHeaderBox2: {
    background: theme.palette.home.primary,
    
    
    
    marginTop: "20vh",
  },
}));

const mapState = (state) => ({
  counters: state.productsData.counters,
});

// eslint-disable-next-line
const TableMain = () => {
  const classes = useStyles();
  const [table, setTable] = useState("main");
  const dispatch = useDispatch();
  const history = useHistory();
  const [loadedTopWatches, setLoadedTopWatches] = useState(false);
  const [loadedTopUsers, setLoadedTopUsers] = useState(false);

  const { counters } = useSelector(mapState);

  useEffect(
    () => {
      dispatch(fetchCountersStart());
    },
    // eslint-disable-next-line
    []
  );

  const handleLoadedTopWatches = () => {
    setLoadedTopWatches(true);
  };

  const configLoadedTopWatches = {
    handleLoadedTopWatches,
    loadedTopWatches,
  };

  const handleLoadedTopUsers = () => {
    setLoadedTopUsers(true);
  };

  const configLoadedTopUsers = {
    handleLoadedTopUsers,
    loadedTopUsers,
  };

  return (
    <Container maxWidth="xl" >
      <Box className={classes.subHeaderBox2}>
        <Grid container style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <Grid
            item
            container
            xs={6}
            
            alignItems="center"
          >
              <Button
                style={{ color: table === "main" ? "orange" : "white" }}
                onClick={(e) => {
                  setTable("main");
                }}
              >
                Watches
              </Button>
              <Button
                style={{ color: table === "third" ? "orange" : "white" }}
                onClick={(e) => {
                  setTable("third");
                }}
              >
                Users
              </Button>
           
           
          </Grid>
          <Grid
            item
            container
            xs={6}
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
              
           <Grid item>
            <Typography>Watches: {counters.products}</Typography></Grid><Grid>
            <BiImages
              onClick={() => {
                history.push("/browse/tiles");
              }}
              size="2em"
              style={{ cursor: "pointer" }}
            />
          </Grid></Grid>
        </Grid>
      </Box>
      {table === "main" && <MainBody {...configLoadedTopWatches} />}
      {table === "third" && <MainUsers {...configLoadedTopUsers} />}
    </Container>
  );
};

export default TableMain;

import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { Box, Grid } from "@mui/material"
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import InputBase from "../../forms/InputMUI";
import { useDispatch } from "react-redux";
import { MdAddCircle } from "react-icons/md";
import Popover from "src/components/Popover";
import { Form, Formik } from "formik";
import Select from "../../forms/SelectMUIFormik";
import { rewards } from "src/constants/gamification"
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as Details from "src/constants/productOptions"
import { RiCloseFill } from "react-icons/ri";
import  ButtonMUI from "src/components/Buttons/Button1Form";
import { addProductStart } from "../../../redux/Products/products.actions";
// components
import BottomComponents from "./BottomComponents";
import { FORM_VALIDATION } from "./validation";

const INITIAL_FORM_STATE = {
  movement: "",
  caseMaterial: "",
  caliber: "",
  waterResistance: "",
  caseSize: "",
  productionYearsStart: "",
  productionYearsEnd: "",
};

const useStyles = makeStyles((theme) => ({
  table: {
    backgroundColor: "#14587500 !important",
    background: "#14587500 !important",
    paddingTop: "9px",
    marginBottom: "10px",
  },
  tableCell: { fontSize: "18px !important", color: "#ffffffB3 !important" },
  textField: { border: "1.4px solid #ffffffB3", borderRadius: "4px" },
  select: {
    border: "1.4px solid #ffffffB3",
    borderRadius: "4px",
    color: "white",
    "& .MuiSelect-outlined": {
      paddingBottom: "3px",
      paddingTop: "3px",
    },
  },
  textBtn: {
    color: "#FFFFFF",
    border: "solid 2px",
    borderColor: "#ffffff66",
    marginRight: "15px",
    fontSize: "13px",
    borderRadius: "20px",
    "&:hover": {
      color: "#FFA500",
    },
    "&:active": {
      color: "#FFFFFF",
    },
  },
}));

const mapState = (state) => ({
  product: state.productsData.product,
  currentUser: state.user.currentUser,
});

// eslint-disable-next-line
const ProductSideList = ({ }) => {
  const { product, currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const { productID } = useParams();
  const [submitDetails, setSubmitDetails] = useState({});
  const [submitedDetails, setSubmitedDetails] = useState(false);

  const {
    productName,
    productBrand,
    productCategory,
    reference,
    movement,
    caseMaterial,
    caseSize,
    caliber,
    productPriceBrackets,
    waterResistance,
    productionYears,
    userID,
  } = product;
  const classes = useStyles();

  const handleSubmit = (e) => {
    const {
      movement,
      caseMaterial,
      caliber,
      waterResistance,
      caseSize,
      productionYearsStart,
      productionYearsEnd,
    } = e;
    const productionYears = productionYearsStart + "-" + productionYearsEnd;
    const values = {
      movement,
      productID,
      caseMaterial,
      productName,
      productBrand,
      caliber,
      productionYears,
      waterResistance,
      caseSize: caseSize + "mm",
    };
    if (caseMaterial === "") delete values.caseMaterial;
    if (movement === "") delete values.movement;
    if (caliber === "") delete values.caliber;
    if (waterResistance === "") delete values.waterResistance;
    if (caseSize === "") delete values.caseSize;
    if (productionYears === "-") delete values.productionYears;
    dispatch(addProductStart(values));
    setSubmitDetails(false);
    setSubmitedDetails(true);
  };

  const configBottomComponents = {
    userID,
    productBrand,
    productName,
    reference,
  };

  const CustomAddDetails = (value, name) => {
    const [anchorPopover, setAnchorPopover] = useState(null);

    return (<>
      {!submitDetails[name] && (<Grid container alignItems="center" justifyContent="flex-end" ><MdAddCircle
        onMouseOver={(e) => {
          setAnchorPopover(e.currentTarget);
        }}
        onMouseOut={() => {
          setAnchorPopover(null);
        }}
        style={{ cursor: "pointer" }}
        size='1.8em'
        color='orange'
        onClick={() => {setSubmitDetails({ ...submitDetails, [name]: true }); setAnchorPopover(null)}}
      />
        <Popover
          anchor={anchorPopover}
          setAnchor={setAnchorPopover}
          message={value !== 1 ? `Win ${value} points` : `Win ${value} point`}
        /></Grid>)}
    </>
    )
  }

  const calculatePossiblePoints = () => {
    return ((movement ? 0 : rewards.PRODUCT_MOVEMENT) + (caliber ? 0 : rewards.PRODUCT_CALIBER)+ (productionYears ? 0 : rewards.PRODUCT_YEARS) + (caseSize ? 0 : rewards.PRODUCT_CASE_SIZE) + (caseMaterial ? 0 : rewards.PRODUCT_CASE_MATERIAL) + (waterResistance ? 0 : rewards.PRODUCT_WATER_RESISTANCE) )
  }

  return (
    <Box>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        validationSchema={FORM_VALIDATION}
      >
        <Form>
          <Box
            color={"text.secondary"}
            sx={{ display: "flex", justifyContent: "space-between"}}
            borderRadius='10px'
            container
          >
            <Typography
              variant={"h6"}
              style={{  color: "#ffffff" }}
            >
              Details
            </Typography>
          
            {Object.values(submitDetails).some(element => element) && (
              <Grid container alignItems="center" justifyContent="flex-end"><ButtonMUI
               
                className={classes.textBtn}
              >
                Submit{" "}
              </ButtonMUI>
              <RiCloseFill color="orange" onClick={() => setSubmitDetails(false)} style={{cursor:"pointer"}} size="2em"/>,             
              </Grid>)}
          </Box>
          {currentUser && !Object.values(submitDetails).some(element => element) && (<Typography
              style={{
                color: "#ffffffBF",
                marginTop: "5px"
              }}
            >
              This Watch miss some details add those to win up to{" "}
              <b style={{ color: "orange" }}>{calculatePossiblePoints()}</b>{" "}
              points.
            </Typography>)}
          
          <TableContainer className={classes.table} component={Paper}>
            <Table size='small' aria-label='simple table'>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.tableCell}>Category</TableCell>
                  <TableCell className={classes.tableCell} align='right'>
                    {productCategory}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>Brand</TableCell>
                  <TableCell className={classes.tableCell} align='right'>
                    {productBrand}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>Model</TableCell>
                  <TableCell className={classes.tableCell} align='right'>
                    {productName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>Reference</TableCell>
                  <TableCell className={classes.tableCell} align='right'>
                    {reference}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>Movement</TableCell>
                  <TableCell className={classes.tableCell} align='right'>
                    {!movement && submitDetails.movement && (
                      <Select
                        className={classes.select}
                        size='small'
                        name='movement'
                        options={Details.movements}
                      />
                    )}
                    {movement || (!currentUser ? "-" : CustomAddDetails(rewards.PRODUCT_MOVEMENT, "movement"))}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className={classes.tableCell}>Caliber</TableCell>
                  <TableCell className={classes.tableCell} align='right'>
                    {!caliber && submitDetails.caliber && (
                      <InputBase
                        size='small'
                        style={{
                          width: "100px",
                          border: "1.4px solid #ffffffB3",
                          borderRadius: "4px",
                        }}
                        name='caliber'
                        inputProps={{
                          style: {
                            padding: 4,
                            color: "#ffffffB3",
                            width: "75px",
                          },
                        }}
                      ></InputBase>
                    )}
                    {caliber || (currentUser ? CustomAddDetails(rewards.PRODUCT_CALIBER, "caliber") : "-")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    Production Years
                  </TableCell>
                  <TableCell className={classes.tableCell} align='right'>
                    {!productionYears &&
                      submitDetails.years && [
                        <InputBase
                          size='small'
                          key='yearsStart'
                          style={{
                            width: "60px",
                            border: "1.4px solid #ffffffB3",
                            borderRadius: "4px",
                          }}
                          name='productionYearsStart'
                          inputProps={{
                            style: {
                              padding: 4,
                              color: "#ffffffB3",
                              width: "75px",
                            },
                          }}
                        ></InputBase>,
                        <InputBase
                          size='small'
                          key='yearsEnd'
                          style={{
                            width: "60px",
                            border: "1.4px solid #ffffffB3",
                            borderRadius: "4px",
                            marginLeft: "5px",
                          }}
                          name='productionYearsEnd'
                          inputProps={{
                            style: {
                              padding: 4,
                              color: "#ffffffB3",
                              width: "75px",
                            },
                          }}
                        ></InputBase>,
                      ]}
                    {productionYears || (currentUser ? CustomAddDetails(rewards.PRODUCT_YEARS, "years"):"-")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>Case Size</TableCell>
                  <TableCell className={classes.tableCell} align='right'>
                    {!caseSize && submitDetails.caseSize && (
                      <InputBase
                        size='small'
                        style={{
                          width: "100px",
                          border: "1.4px solid #ffffffB3",
                          borderRadius: "4px",
                        }}
                        name='caseSize'
                        inputProps={{
                          style: {
                            padding: 4,
                            color: "#ffffffB3",
                            width: "75px",
                          },
                        }}
                      ></InputBase>
                    )}
                    {caseSize || (currentUser ? CustomAddDetails(rewards.PRODUCT_CASE_SIZE, "caseSize"):"-")}{caseSize ? "mm": null}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    Case Material
                  </TableCell>
                  <TableCell className={classes.tableCell} align='right'>
                    {!caseMaterial && submitDetails.caseMaterial && (
                      <Select
                        name='caseMaterial'
                        className={classes.select}
                        size='small'
                        options={Details.caseMaterials}
                      />
                    )}
                    {caseMaterial || (currentUser ? CustomAddDetails(rewards.PRODUCT_CASE_MATERIAL, "caseMaterial"):"-")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    Water Res.
                  </TableCell>
                  <TableCell className={classes.tableCell} align='right'>
                    {!waterResistance && submitDetails.waterResistance && (
                      <Select
                        className={classes.select}
                        size='small'
                        name='waterResistance'
                        options={Details.waterResistance}
                      />
                    )}
                    {waterResistance || (currentUser ? CustomAddDetails(rewards.PRODUCT_WATER_RESISTANCE, "waterResistance"): "-")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>Price</TableCell>
                  <TableCell className={classes.tableCell} align='right'>
                    {productPriceBrackets}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Form>
      </Formik>
      <BottomComponents {...configBottomComponents} />

    </Box>
  );
};

export default ProductSideList;

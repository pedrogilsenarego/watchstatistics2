import React, { useState } from "react";
import { Typography, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import InputBase from "../../forms/InputMUI";
import { useDispatch } from "react-redux";

import ButtonMUI from "../../forms/ButtonMUI";
import { Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import Select from "../../forms/SelectMUIFormik";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { addProductStart } from "../../../redux/Products/products.actions";
// components
import BottomComponents from "./BottomComponents";

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
const ProductSideList = ({}) => {
  const { product } = useSelector(mapState);
  const dispatch = useDispatch();
  const { productID } = useParams();
  const [submitDetails, setSubmitDetails] = useState(false);
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

  return (
    <Box>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <Form>
          <Box
            color={"text.secondary"}
            sx={{ display: "flex", justifyContent: "space-between" }}
            borderRadius="10px"
            container
          >
            {!submitDetails && (
              <Typography
                variant={"h6"}
                style={{ paddingLeft: "15px", color: "#ffffff" }}
              >
                {submitedDetails ? "Details submited for approval" : "Details"}
              </Typography>
            )}
            {!submitDetails &&
              (!caseSize ||
                !waterResistance ||
                !caseMaterial ||
                !caliber ||
                !movement ||
                !productionYears) &&
              !submitedDetails && (
                <Button
                  size="small"
                  className={classes.textBtn}
                  onClick={() => setSubmitDetails(true)}
                >
                  Add +
                </Button>
              )}

            {submitDetails && [
              <ButtonMUI
                style={{ marginLeft: "15px" }}
                className={classes.textBtn}
              >
                Submit{" "}
              </ButtonMUI>,
              <Button
                className={classes.textBtn}
                onClick={() => setSubmitDetails(false)}
              >
                GoBack
              </Button>,
            ]}
          </Box>
          <TableContainer className={classes.table} component={Paper}>
            <Table size="small" aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell className={classes.tableCell}>Category</TableCell>
                  <TableCell className={classes.tableCell} align="right">
                    {productCategory}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>Brand</TableCell>
                  <TableCell className={classes.tableCell} align="right">
                    {productBrand}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>Model</TableCell>
                  <TableCell className={classes.tableCell} align="right">
                    {productName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>Reference</TableCell>
                  <TableCell className={classes.tableCell} align="right">
                    {reference}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>Movement</TableCell>
                  <TableCell className={classes.tableCell} align="right">
                    {!movement && submitDetails && (
                      <Select
                        className={classes.select}
                        size="small"
                        name="movement"
                        options={{
                          "": "Null",
                          Automatic: "Automatic",
                          Quartz: "Quartz",
                          MechaQuartz: "MechaQuartz",
                          Manual: "Manual",
                        }}
                      />
                    )}
                    {movement}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className={classes.tableCell}>Caliber</TableCell>
                  <TableCell className={classes.tableCell} align="right">
                    {!caliber && submitDetails && (
                      <InputBase
                        size="small"
                        style={{
                          width: "100px",
                          border: "1.4px solid #ffffffB3",
                          borderRadius: "4px",
                        }}
                        name="caliber"
                        inputProps={{
                          style: {
                            padding: 4,
                            color: "#ffffffB3",
                            width: "75px",
                          },
                        }}
                      ></InputBase>
                    )}
                    {caliber}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    Production
                  </TableCell>
                  <TableCell className={classes.tableCell} align="right">
                    {!productionYears &&
                      submitDetails && [
                        <InputBase
                          size="small"
                          key="yearsStart"
                          style={{
                            width: "60px",
                            border: "1.4px solid #ffffffB3",
                            borderRadius: "4px",
                          }}
                          name="productionYearsStart"
                          inputProps={{
                            style: {
                              padding: 4,
                              color: "#ffffffB3",
                              width: "75px",
                            },
                          }}
                        ></InputBase>,
                        <InputBase
                          size="small"
                          key="yearsEnd"
                          style={{
                            width: "60px",
                            border: "1.4px solid #ffffffB3",
                            borderRadius: "4px",
                            marginLeft: "5px",
                          }}
                          name="productionYearsEnd"
                          inputProps={{
                            style: {
                              padding: 4,
                              color: "#ffffffB3",
                              width: "75px",
                            },
                          }}
                        ></InputBase>,
                      ]}
                    {productionYears}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>Case Size</TableCell>
                  <TableCell className={classes.tableCell} align="right">
                    {!caseSize && submitDetails && (
                      <InputBase
                        size="small"
                        style={{
                          width: "100px",
                          border: "1.4px solid #ffffffB3",
                          borderRadius: "4px",
                        }}
                        name="caseSize"
                        inputProps={{
                          style: {
                            padding: 4,
                            color: "#ffffffB3",
                            width: "75px",
                          },
                        }}
                      ></InputBase>
                    )}
                    {caseSize}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    Case Material
                  </TableCell>
                  <TableCell className={classes.tableCell} align="right">
                    {!caseMaterial && submitDetails && (
                      <Select
                        name="caseMaterial"
                        className={classes.select}
                        size="small"
                        options={{
                          "": "Null",
                          Gold: "Gold",
                          "Stainless Steel": "Stainless Steel",
                          Titanium: "Titanium",
                          "White Gold": "White Gold",
                        }}
                      />
                    )}
                    {caseMaterial}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    Water Res.
                  </TableCell>
                  <TableCell className={classes.tableCell} align="right">
                    {!waterResistance && submitDetails && (
                      <Select
                        className={classes.select}
                        size="small"
                        name="waterResistance"
                        options={{
                          "": "Null",
                          None: "None",
                          "30 meters": "30meters",
                          "50 meters": "50meters",
                          "100 meters": "100meters",
                          "200 meters": "200meters",
                          "300 meters": "300meters",
                        }}
                      />
                    )}
                    {waterResistance}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>Price</TableCell>
                  <TableCell className={classes.tableCell} align="right">
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

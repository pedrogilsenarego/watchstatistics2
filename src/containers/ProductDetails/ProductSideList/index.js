import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { Box, Grid } from "@mui/material";
import Alert from "src/components/Alert";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { useDispatch } from "react-redux";
import { Form, Formik, useField } from "formik";
import SelectFormik from "src/components/Inputs/Select/SelectFormik";
import SelectFormikOnChange from "src/components/Inputs/Select/SelectFormikOnChange";
import { rewards } from "src/constants/gamification";
import TableRow from "@mui/material/TableRow";
import * as Details from "src/constants/productOptions";
import { RiCloseFill } from "react-icons/ri";
import Button3Formik from "src/components/Buttons/Button3Formik";
import { addProductListDetail } from "../../../redux/Products/products.actions";
import TextfieldFormik from "src/components/Inputs/Textfield/Textfield2Formik";
import watchTypes2 from "src/assets/data/watchTypes2.json";
import pricesBrackets2 from "src/assets/data/pricesBracket2.json";
import watchBrands2 from "src/assets/data/watchBrands2.json";
// components
import BottomComponents from "./BottomComponents";
import { FORM_VALIDATION } from "./validation";
import CustomAddCircle from "./CustomAddCircle";
import TextField2FormikOnChange from "src/components/Inputs/Textfield/Textfield2FormikOnChange";

const INITIAL_FORM_STATE = {
  reference: "",
  productName: "",
  productBrand: "",
  productPriceBrackets: "",
  productCategory: "",
  movement: "",
  caseMaterial: "",
  caliber: "",
  waterResistance: "",
  caseSize: "",
  productionYearsStart: "",
  productionYearsEnd: "",
};

const mapState = (state) => ({
  product: state.productsData.product,
  currentUser: state.user.currentUser,
});

// eslint-disable-next-line
const ProductSideList = ({
  productCategory,
  newWatch,
  setProductCategory,
  productPriceBrackets,
  setProductPriceBrackets,
  productBrand,
  setProductBrand,
  productName,
  setProductName,
  reference,
  setReference,
}) => {
  const { product, currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const productID = useParams();
  const [submitDetails, setSubmitDetails] = useState({});
  const [triggerAlert, setTriggerAlert] = useState(false);

  const [, , helpersProductCategory] = useField("productCategory");
  const [, , helpersProductPriceBrackets] = useField("productPriceBrackets");
  const [, , helpersProductBrand] = useField("productBrand");
  const [, , helpersProductName] = useField("productName");
  const [, , helpersReference] = useField("reference");

  const [productNameInput, setProductNameInput] = useState(true);
  const [referenceInput, setReferenceInput] = useState(true);

  const useStyles = makeStyles((theme) => ({
    table: {
      backgroundColor: "#14587500 !important",
      background: "#14587500 !important",
      paddingTop: "9px",
      marginBottom: "10px",
      cursor: newWatch ? "pointer" : "default",
    },
    tableCell: { fontSize: "18px !important", color: "#ffffffB3 !important" },
  }));

  const {
    movement,
    caseMaterial,
    caseSize,
    caliber,
    waterResistance,
    productionYears,
    userID,
  } = product;
  const classes = useStyles();

  const handleSubmit = (e, { resetForm }) => {
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
      currentUser,
      movement,
      productID,
      caseMaterial,
      productName,
      reference,
      productBrand,
      caliber,
      productionYears,
      waterResistance,
      caseSize: caseSize,
    };
    if (caseMaterial === "") delete values.caseMaterial;
    if (movement === "") delete values.movement;
    if (caliber === "") delete values.caliber;
    if (waterResistance === "") delete values.waterResistance;
    if (caseSize === "") delete values.caseSize;
    if (productionYears === "-") delete values.productionYears;
    dispatch(addProductListDetail(values));
    setSubmitDetails(false);
    resetForm();
  };

  const configBottomComponents = {
    userID,
    productBrand,
    productName,
    reference,
  };

  const handleSubmitDetails = (name) => {
    setSubmitDetails({ ...submitDetails, [name]: true });
  };
  const configCustomCircle = {
    submitDetails,
    handleSubmitDetails,
  };

  const calculatePossiblePoints = () => {
    return (
      (movement ? 0 : rewards.PRODUCT_MOVEMENT) +
      (caliber ? 0 : rewards.PRODUCT_CALIBER) +
      (productionYears ? 0 : rewards.PRODUCT_YEARS) +
      (caseSize ? 0 : rewards.PRODUCT_CASE_SIZE) +
      (caseMaterial ? 0 : rewards.PRODUCT_CASE_MATERIAL) +
      (waterResistance ? 0 : rewards.PRODUCT_WATER_RESISTANCE)
    );
  };

  return (
    <Box>
      <Formik
        enableReinitialize
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        onSubmit={(values, { resetForm }) => {
          Object.values(values).some((element) => element)
            ? handleSubmit(values, { resetForm })
            : setTriggerAlert(true);
        }}
        validationSchema={FORM_VALIDATION}
      >
        <Form>
          <Box
            color={"text.secondary"}
            sx={{ display: "flex", justifyContent: "space-between" }}
            borderRadius='10px'
            container
          >
            <Typography variant={"h6"} style={{ color: "#ffffff" }}>
              Details
            </Typography>

            {Object.values(submitDetails).some((element) => element) && (
              <Grid container alignItems='center' justifyContent='flex-end'>
                <Button3Formik title='Submit' />
                <RiCloseFill
                  color='orange'
                  onClick={() => setSubmitDetails(false)}
                  style={{ cursor: "pointer" }}
                  size='2em'
                />
              </Grid>
            )}
          </Box>
          <Box style={{ marginTop: "10px" }}>
            {currentUser &&
              !Object.values(submitDetails).some((element) => element) && (
                <Typography
                  style={{
                    color: "#ffffffBF",
                    marginTop: "5px",
                  }}
                >
                  This Watch miss some details add those to win up to{" "}
                  <b style={{ color: "orange" }}>{calculatePossiblePoints()}</b>{" "}
                  points.
                </Typography>
              )}
            {alert && (
              <>
                <Alert
                  message='Choose at least one field'
                  severity='error'
                  trigger={triggerAlert}
                  setTrigger={setTriggerAlert}
                />
              </>
            )}{" "}
          </Box>
          <TableContainer className={classes.table}>
            <Table size='small' aria-label='simple table'>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.tableCell} align='left'>
                    Category
                  </TableCell>
                  <TableCell
                    align='right'
                    onClick={() => {
                      if (newWatch) setProductCategory("");
                    }}
                  >
                    {productCategory === "" ? (
                      <SelectFormikOnChange
                        size='small'
                        customOnChange={(e) => {
                          helpersProductCategory.setValue(e);
                          setProductCategory(e);
                        }}
                        name='productCategory'
                        options={watchTypes2}
                      />
                    ) : (
                      <Typography className={classes.tableCell}>
                        {productCategory}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>Brand</TableCell>
                  <TableCell
                    align='right'
                    onClick={() => {
                      if (newWatch) setProductBrand("");
                    }}
                  >
                    {productBrand === "" ? (
                      <SelectFormikOnChange
                        size='small'
                        customOnChange={(e) => {
                          helpersProductBrand.setValue(e);
                          setProductBrand(e);
                        }}
                        name='productBrand'
                        options={watchBrands2}
                      />
                    ) : (
                      <Typography className={classes.tableCell}>
                        {productBrand}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>Model</TableCell>
                  <TableCell
                    align='right'
                    onClick={() => {
                      if (newWatch) setProductNameInput(true);
                    }}
                  >
                    {newWatch && productNameInput ? (
                      <TextField2FormikOnChange
                        show={productNameInput}
                        setShow={setProductNameInput}
                        name='productName'
                        customOnChange={(e) => {
                          helpersProductName.setValue(e);
                          setProductName(e);
                        }}
                      />
                    ) : (
                      <Typography className={classes.tableCell}>
                        {productName}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>Reference</TableCell>
                  <TableCell
                    className={classes.tableCell}
                    align='right'
                    onClick={() => {
                      if (newWatch) setReferenceInput(true);
                    }}
                  >
                    {newWatch && referenceInput ? (
                      <TextField2FormikOnChange
                        show={referenceInput}
                        setShow={setReferenceInput}
                        name='reference'
                        customOnChange={(e) => {
                          helpersReference.setValue(e);
                          setReference(e);
                        }}
                      />
                    ) : (
                      <Typography className={classes.tableCell}>
                        {reference}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>Movement</TableCell>
                  <TableCell className={classes.tableCell} align='right'>
                    {!movement && submitDetails.movement && (
                      <SelectFormik
                        size='small'
                        name='movement'
                        options={Details.movements}
                      />
                    )}
                    {movement ||
                      (!currentUser ? (
                        "-"
                      ) : (
                        <CustomAddCircle
                          value={rewards.PRODUCT_MOVEMENT}
                          name='movement'
                          {...configCustomCircle}
                        />
                      ))}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className={classes.tableCell}>Caliber</TableCell>
                  <TableCell className={classes.tableCell} align='right'>
                    {!caliber && submitDetails.caliber && (
                      <TextfieldFormik size='small' name='caliber' />
                    )}
                    {caliber ||
                      (currentUser ? (
                        <CustomAddCircle
                          value={rewards.PRODUCT_CALIBER}
                          name='caliber'
                          {...configCustomCircle}
                        />
                      ) : (
                        "-"
                      ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    Production Years
                  </TableCell>
                  <TableCell className={classes.tableCell} align='right'>
                    {!productionYears && submitDetails.years && (
                      <Grid container justifyContent='flex-end' columnGap={2}>
                        <Grid item xs={3}>
                          <TextfieldFormik
                            size='small'
                            key='yearsStart'
                            name='productionYearsStart'
                            placeholder='Start'
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextfieldFormik
                            size='small'
                            key='yearsEnd'
                            name='productionYearsEnd'
                            placeholder='End'
                          />
                        </Grid>
                      </Grid>
                    )}
                    {productionYears ||
                      (currentUser ? (
                        <CustomAddCircle
                          value={rewards.PRODUCT_YEARS}
                          name='years'
                          {...configCustomCircle}
                        />
                      ) : (
                        "-"
                      ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>Case Size</TableCell>
                  <TableCell className={classes.tableCell} align='right'>
                    {!caseSize && submitDetails.caseSize && (
                      <Grid container justifyContent='flex-end'>
                        <Grid item xs={3}>
                          <TextfieldFormik
                            size='small'
                            name='caseSize'
                            placeholder='mm'
                          />
                        </Grid>
                      </Grid>
                    )}
                    {caseSize ||
                      (currentUser ? (
                        <CustomAddCircle
                          value={rewards.PRODUCT_CASE_SIZE}
                          name='caseSize'
                          {...configCustomCircle}
                        />
                      ) : (
                        "-"
                      ))}
                    {caseSize ? "mm" : null}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    Case Material
                  </TableCell>
                  <TableCell className={classes.tableCell} align='right'>
                    {!caseMaterial && submitDetails.caseMaterial && (
                      <Grid container justifyContent='flex-end'>
                        <Grid item xs={8}>
                          <SelectFormik
                            name='caseMaterial'
                            size='small'
                            options={Details.caseMaterials}
                          />
                        </Grid>
                      </Grid>
                    )}
                    {caseMaterial ||
                      (currentUser ? (
                        <CustomAddCircle
                          value={rewards.PRODUCT_CASE_MATERIAL}
                          name='caseMaterial'
                          {...configCustomCircle}
                        />
                      ) : (
                        "-"
                      ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    Water Res.
                  </TableCell>
                  <TableCell className={classes.tableCell} align='right'>
                    {!waterResistance && submitDetails.waterResistance && (
                      <Grid container justifyContent='flex-end'>
                        <Grid item xs={8}>
                          <SelectFormik
                            size='small'
                            name='waterResistance'
                            options={Details.waterResistance}
                          />
                        </Grid>
                      </Grid>
                    )}
                    {waterResistance ||
                      (currentUser ? (
                        <CustomAddCircle
                          value={rewards.PRODUCT_MOVEMENT}
                          name='waterResistance'
                          {...configCustomCircle}
                        />
                      ) : (
                        "-"
                      ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>Price</TableCell>
                  <TableCell
                    align='right'
                    onClick={() => {
                      if (newWatch) setProductPriceBrackets("");
                    }}
                  >
                    {productPriceBrackets === "" ? (
                      <SelectFormikOnChange
                        size='small'
                        customOnChange={(e) => {
                          helpersProductPriceBrackets.setValue(e);
                          setProductPriceBrackets(e);
                        }}
                        name='productPriceBrackets'
                        options={pricesBrackets2}
                      />
                    ) : (
                      <Typography className={classes.tableCell}>
                        {productPriceBrackets}
                      </Typography>
                    )}
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

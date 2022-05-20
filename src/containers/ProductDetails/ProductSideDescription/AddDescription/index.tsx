import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { addProductDescription } from "src/redux/Products/products.actions";
import { useParams } from "react-router-dom";
import { Form, Formik, useField } from "formik";
import { FORM_VALIDATION } from "./validation";
import Button3Formik from "src/components/Buttons/Button3Formik";
import TextField2FormikOnChange from "src/components/Inputs/Textfield/Textfield2FormikOnChange";

interface Props {
  setOpen: (setClose: boolean) => void;
  newWatch: boolean;
  productDesc: string;
  setProductDesc: (productDesc: string) => void;
}

const AddDescription = ({
  setOpen,
  newWatch,
  productDesc,
  setProductDesc,
}: Props) => {
  const mapState = ({ user, productsData }: any) => ({
    currentUser: user.currentUser,
    product: productsData.product,
  });
  const params = useParams();
  const { currentUser, product } = useSelector(mapState);
  const dispatch = useDispatch();
  const { productBrand, productName, reference } = product;

  const [, , helpersProductDesc] = useField("productDesc");
  const [showNewDesc, setShowNewDesc] = useState(true);

  const handleSubmit = (values: { productDescInner: string }) => {
    const { productDescInner } = values;

    const payload = {
      productDesc: productDescInner,
      currentUser,
      productID: params,
      productBrand,
      productName,
      reference,
    };
    dispatch(addProductDescription(payload));
    setOpen(false);
  };

  return (
    <Formik
      initialValues={{ productDescInner: "" }}
      validationSchema={FORM_VALIDATION}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form>
        <Grid container rowSpacing={1}>
          <Grid item xs={12} >
            {newWatch ? (
              showNewDesc ? (
                <TextField2FormikOnChange
                  show={showNewDesc}
                  setShow={setShowNewDesc}
                  multiline
                  placeholder=''
                  name='productDesc'
                  customOnChange={(e: any) => {
                    helpersProductDesc.setValue(e);
                    setProductDesc(e);
                  }}
                />
              ) : (
                <Typography onClick={() => {
                  if (newWatch) setShowNewDesc(true);
                }} style={{
                  marginTop: "5px",
                  color: "#ffffffBF",
                  fontSize: "18px",
                  cursor: "pointer"
                }}>{productDesc}</Typography>
              )
            ) : (
              <TextField2FormikOnChange
                show={showNewDesc}
                setShow={setShowNewDesc}
                multiline
                placeholder=''
                name='productDescInner'
                customOnChange={() => console.log("")}
              />
            )}
          </Grid>

          <Grid
            item
            container
            xs={12}
            justifyContent='flex-end'
            columnSpacing={1}
            style={{
              marginTop: "5px",
              marginBottom: "5px",
            }}
          >
            {!newWatch && (<>
              <Grid item>
                <RiCloseFill
                  color='orange'
                  onClick={() => {
                    setOpen(false);
                  }}
                  style={{ cursor: "pointer" }}
                  size='2em'
                />
              </Grid>

              <Grid item>
                <Button3Formik title='Submit' />
              </Grid>
            </>)}
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default AddDescription;

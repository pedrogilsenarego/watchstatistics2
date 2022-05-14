import { Grid } from "@mui/material";
import Multiline2Formik from "src/components/Inputs/Muitline/Multiline2Formik";
import { RiCloseFill } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux";
import { addProductDescription } from "src/redux/Products/products.actions";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";
import Button3Formik from "src/components/Buttons/Button3Formik"

interface Props {
  setOpen: (setClose: boolean) => void;
}

const AddDescription = ({ setOpen }: Props) => {
  const mapState = ({ user, productsData }: any) => ({
    currentUser: user.currentUser,
    product: productsData.product,
  });
  const params = useParams();
  const { currentUser, product } = useSelector(mapState);

  const dispatch = useDispatch();

  const { productBrand, productName, reference } = product;

  const handleSubmit = (values: { productDesc: string }) => {
    const { productDesc } = values;
    const payload = {
      productDesc,
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
      initialValues={{ productDesc: "" }}
      validationSchema={FORM_VALIDATION}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form>
        <Grid container rowSpacing={1}>
          <Grid item xs={12}>
            <Multiline2Formik name='productDesc' placeholder='Add Description' />
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
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default AddDescription;

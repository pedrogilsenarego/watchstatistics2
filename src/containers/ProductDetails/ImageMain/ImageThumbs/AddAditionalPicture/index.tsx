import { i18n } from "src/translations/i18n";
import { Grid } from "@mui/material";
import Textfield from "src/components/Inputs/Textfield";
import Button1Form from "src/components/Buttons/Button1Form";
import Button2 from "src/components/Buttons/Button2";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";

import { addProductAdditionalData } from "src/redux/Products/products.actions";

interface Props {
  setAddAdditionalPicture: (addAdditionalPicture: boolean) => void;
}

const AddAdditionalPicture = ({ setAddAdditionalPicture }: Props) => {
  const INITIAL_FORM_STATE = {
    title: "",
    link: "",
  };

  const mapState = ({ user, productsData }: any) => ({
    currentUser: user.currentUser,
    product: productsData.product,
  });
  const { currentUser, product } = useSelector(mapState);
  const dispatch = useDispatch();
  const params = useParams();
  const { productBrand, productName, reference } = product;

  const handleSubmit = (e: any) => {
    const { title, link } = e;
    const payload = {
      additionalData: { title, link },
      currentUser,
      productID: params,
      productBrand,
      productName,
      reference,
    };
    dispatch(addProductAdditionalData(payload));
    setAddAdditionalPicture(false);
  };

  return (
    <Formik
      initialValues={{ ...INITIAL_FORM_STATE }}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={FORM_VALIDATION}
    >
      <Form>
        <Grid
          item
          xs={12}
          container
          alignItems='center'
          justifyContent='center'
          columnSpacing={1}
          rowSpacing={2}
          style={{ marginBottom: "10px" }}
        >
          <Grid textAlign='center' item xs={6} md={4}>
            <Textfield
              form
              name='title'
              placeholder={i18n.t(
                "placeholders.updateProduct.additionalData.title"
              )}
            />
          </Grid>

          <Grid item textAlign='center' xs={6} md={4}>
            <Textfield
              form
              name='link'
              placeholder={i18n.t(
                "placeholders.updateProduct.additionalData.link"
              )}
            />
          </Grid>
          <Grid
            item
            container
            xs={12}
            md={4}
            justifyContent='flex-end'
            columnSpacing={1}
          >
            <Grid item>
              <Button2
                title={i18n.t("buttons.cancel")}
                onClick={() => setAddAdditionalPicture(false)}
              />
            </Grid>
            <Grid item>
              <Button1Form title={i18n.t("buttons.submit")} />
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default AddAdditionalPicture;

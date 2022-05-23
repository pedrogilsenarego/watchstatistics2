import { i18n } from "src/translations/i18n";
import { Grid } from "@mui/material";
import Button3Formik from "src/components/Buttons/Button3Formik";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Formik, useField } from "formik";
import { FORM_VALIDATION } from "./validation";
import * as Styled from "./styles";
import { addProductAdditionalData } from "src/redux/Products/products.actions";
import TextfieldFormik from "src/components/Inputs/Textfield/Textfield2Formik";

interface Props {
  setAddAdditionalData: (addAdditionalData: boolean) => void;
  newWatch: boolean;
  additionalData: { title: string; link: string }[];
  setAdditionalData: (
    additionalData: any
  ) => void;
}

const AddAdditionalData = ({ setAddAdditionalData, newWatch, additionalData, setAdditionalData }: Props) => {
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
  const [, metaAdditionalData, helpersAdditionalData] = useField("additionalData")

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
    setAddAdditionalData(false);
  };

  const handleNewWatch = (e: any) => {
    const { title, link } = e
    console.log(title, link)
    setAdditionalData([...additionalData, { title, link }])
    helpersAdditionalData.setValue([...metaAdditionalData.value, { title, link }])
    console.log(additionalData, metaAdditionalData.value)
  }

  return (
    <Formik
      initialValues={{ ...INITIAL_FORM_STATE }}
      onSubmit={(values) => {
        if (newWatch)
          handleNewWatch(values);
        else handleSubmit(values)
      }}
      validationSchema={FORM_VALIDATION}
    >
      <Form>
        <Grid
          item
          xs={12}
          container
          alignItems='center'
          columnSpacing={1}
          rowSpacing={1}
          style={{ marginBottom: "10px", marginTop: "10px" }}
        >
          <Grid xs={12}>
            <Styled.Typography>
              {i18n.t("forms.updateProduct.review")}
            </Styled.Typography>
          </Grid>
          <Grid item xs={6} md={4} style={{ paddingLeft: 0 }}>
            <TextfieldFormik
              name='title'
              placeholder={i18n.t(
                "placeholders.updateProduct.additionalData.title"
              )}
            />
          </Grid>

          <Grid item xs={6} md={4}>
            <TextfieldFormik

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
              <RiCloseFill
                color='orange'
                onClick={() => setAddAdditionalData(false)}
                style={{ cursor: "pointer" }}
                size='2em'
              />
            </Grid>
            <Grid item>
              <Button3Formik title={i18n.t("buttons.submit")} />
            </Grid>

          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default AddAdditionalData;

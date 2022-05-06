import { useState, useRef, useEffect } from "react";
import { i18n } from "src/translations/i18n";
import { Grid, Divider } from "@mui/material";
import Textfield from "src/components/Inputs/Textfield";
import Button1Form from "src/components/Buttons/Button1Form";
import Button2 from "src/components/Buttons/Button2";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";
import * as Styled from "./styles";
import SugestedImages from "./SugestedImages";
import { addProductPicture } from "src/redux/Products/products.actions";

interface Props {
  setAddAdditionalPicture: (addAdditionalPicture: boolean) => void;
  setMainImage: any;
}

const AddAdditionalPicture = ({
  setAddAdditionalPicture,
  setMainImage,
}: Props) => {
  const [readySubmit, setReadySubmit] = useState(false);
  const INITIAL_FORM_STATE = {
    picture: "",
  };

  const mapState = ({ user, productsData }: any) => ({
    currentUser: user.currentUser,
    product: productsData.product,
  });
  const { currentUser, product } = useSelector(mapState);
  const dispatch = useDispatch();
  const params = useParams();
  const { productBrand, productName, reference } = product;
  const formRef = useRef<any>();

  const handleSubmit = (e: any) => {
    const { picture } = e;
    const payload = {
      productThumbnail: picture,
      currentUser,
      productID: params,
      productBrand,
      productName,
      reference,
    };
    dispatch(addProductPicture(payload));
    setAddAdditionalPicture(false);
  };

  const handleTestImage = (e: any) => {
    const { picture } = e;
    setMainImage(picture);
    setReadySubmit(true);
  };

  useEffect(() => {
    if (formRef?.current?.values) console.log(formRef.current.values);
    if (readySubmit && formRef?.current?.values) setReadySubmit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formRef?.current?.values]);

  return (
    <Formik
      initialValues={{ ...INITIAL_FORM_STATE }}
      innerRef={formRef}
      onSubmit={(values) => {
        if (readySubmit) {
          handleSubmit(values);
        } else {
          handleTestImage(values);
        }
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
          rowSpacing={2}
          style={{
            marginBottom: "20px",
            marginLeft: "10px",
          }}
        >
          <Grid item xs={12}>
            <Divider
              style={{
                width: "100%",
                background: "#ffffff66",
                marginBottom: "10px",
              }}
            />
          </Grid>
          <Grid xs={12}>
            <Styled.Typography>
              {i18n.t("forms.updateProduct.picture")}
            </Styled.Typography>
          </Grid>
          <Grid textAlign='center' style={{ marginTop: "5px" }}>
            <Textfield
              form
              name='picture'
              placeholder={i18n.t("placeholders.updateProduct.picture")}
            />
          </Grid>

          <Grid
            item
            container
            xs={12}
            alignItems='center'
            md={4}
            justifyContent='flex'
            columnSpacing={1}
          >
            <Grid item>
              <Button2
                title={i18n.t("buttons.cancel")}
                onClick={() => setAddAdditionalPicture(false)}
              />
            </Grid>
            {readySubmit ? (
              <Grid item>
                <Button1Form title={i18n.t("buttons.submit")} />
              </Grid>
            ) : (
              <Grid item>
                <Button1Form title={i18n.t("buttons.testImage")} />
              </Grid>
            )}
          </Grid>
        </Grid>
        <SugestedImages product={product} />
      </Form>
    </Formik>
  );
};

export default AddAdditionalPicture;

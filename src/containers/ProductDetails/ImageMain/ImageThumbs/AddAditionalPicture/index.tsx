import { useState } from "react";
import { i18n } from "src/translations/i18n";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Formik, useField } from "formik";
import { FORM_VALIDATION } from "./validation";
import * as Styled from "./styles";
import SugestedImages from "./SugestedImages";
import { addProductPicture } from "src/redux/Products/products.actions";
import Textfield2Formik from "src/components/Inputs/Textfield/Textfield2Formik";
import Button3Formik from "src/components/Buttons/Button3Formik";
import Button4Formik from "src/components/Buttons/Button4Formik";
import { RiCloseFill } from "react-icons/ri";
import { Typography } from "@material-ui/core";

interface Props {
  setAddAdditionalPicture: (addAdditionalPicture: boolean) => void;
  setMainImage: any;
  readySubmit: boolean;
  setReadySubmit: (readySubmit: boolean) => void;
  newWatch: boolean;
  setProductThumbnail: (productThumbnail: any) => void;
  productThumbnail: any;
}

const AddAdditionalPicture = ({
  setAddAdditionalPicture,
  setMainImage,
  readySubmit,
  setReadySubmit,
  newWatch,
  setProductThumbnail,
  productThumbnail,
}: Props) => {
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
  const [originalPictureNewWatch, setOriginalPictureNewWatch] =
    useState<boolean>(true);
  const { productBrand, productName, reference } = product;
  const [, metaProductThumbnail, helpersProductThumbnail] =
    useField("productThumbnail");

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
    setReadySubmit(false);
    setAddAdditionalPicture(false);
  };

  const handleTestImage = (e: any) => {
    const { picture } = e;
    setMainImage(picture);
    setReadySubmit(true);
  };

  const handleNewWatchAddPicture = (e: any) => {
    const { picture } = e;
    originalPictureNewWatch
      ? setProductThumbnail([picture])
      : setProductThumbnail([...productThumbnail, picture]);
    setOriginalPictureNewWatch(false)
    helpersProductThumbnail.setValue([...metaProductThumbnail.value, picture]);
  };

  return (
    <Formik
      initialValues={{ ...INITIAL_FORM_STATE }}
      onSubmit={(values) => {
        if (readySubmit) {
          if (newWatch) handleNewWatchAddPicture(values);
          else handleSubmit(values);
        } else {
          handleTestImage(values);
        }
      }}
      validationSchema={FORM_VALIDATION}
    >
      <Form
        onChange={() => {
          if (readySubmit) setReadySubmit(false);
        }}
      >
        <Grid
          item
          xs={12}
          container
          alignItems='center'
          columnSpacing={1}
          rowSpacing={2}
          style={{
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          <Grid xs={12} style={{ marginLeft: "10px" }}>
            <Styled.Typography>
              {i18n.t("forms.updateProduct.picture")}
            </Styled.Typography>
          </Grid>
          <Grid item container xs={12} alignItems='center' columnGap={1}>
            <Grid item>
              <Textfield2Formik
                name='picture'
                placeholder={i18n.t("placeholders.updateProduct.picture")}
              />
            </Grid>

            {readySubmit && !newWatch ? (
              <Grid item>
                <Button3Formik title={i18n.t("buttons.submit")} />
              </Grid>
            ) : (
              <>
                {!readySubmit && (
                  <Grid item>
                    <Button4Formik>{i18n.t("buttons.testImage")}</Button4Formik>
                  </Grid>
                )}

                {newWatch && readySubmit && (
                  <Grid item>
                    <Button3Formik title='Add image' />
                    <Typography style={{ color: "red" }}>
                      {metaProductThumbnail.error}
                    </Typography>
                  </Grid>
                )}
              </>
            )}
            {!newWatch && (
              <Grid item>
                <RiCloseFill
                  color='orange'
                  onClick={() => setAddAdditionalPicture(false)}
                  style={{ cursor: "pointer" }}
                  size='2em'
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        {!newWatch && (
          <Grid item>
            <SugestedImages product={product} />
          </Grid>
        )}
      </Form>
    </Formik>
  );
};

export default AddAdditionalPicture;

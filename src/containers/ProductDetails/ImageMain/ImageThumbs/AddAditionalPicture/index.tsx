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
import { DashedGrid as StyledDashedGrid } from "src/styles/styles"

interface Props {
  setAddAdditionalPicture: (addAdditionalPicture: boolean) => void;
  setMainImage: any;
  readySubmit: boolean;
  setReadySubmit: (readySubmit: boolean) => void;
  newWatch: boolean;
  setProductThumbnail: (productThumbnail: any) => void;
  productThumbnail: any;
  setIndexMini: (indexMini: number) => void
  originalPictureNewWatch: boolean;
  setOriginalPictureNewWatch: (originalPictureNewWatch: boolean) => void;
}

const AddAdditionalPicture = ({
  setAddAdditionalPicture,
  setMainImage,
  readySubmit,
  setReadySubmit,
  newWatch,
  setProductThumbnail,
  productThumbnail,
  setIndexMini,
  originalPictureNewWatch,
  setOriginalPictureNewWatch,

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

  const handleNewWatchAddPicture = (e: any, { resetForm }: any) => {
    const { picture } = e;
    setReadySubmit(false)
    resetForm()
    setIndexMini(originalPictureNewWatch ? 0 : productThumbnail.length);
    if (originalPictureNewWatch) {
      setProductThumbnail([picture])
    }
    else {
      setProductThumbnail([...productThumbnail, picture])
    }

    setOriginalPictureNewWatch(false)
    setAddAdditionalPicture(false);
    helpersProductThumbnail.setValue([...metaProductThumbnail.value, picture]);

  };

  return (
    <Formik
      initialValues={{ ...INITIAL_FORM_STATE }}
      onSubmit={(values, { resetForm }) => {
        if (readySubmit) {
          if (newWatch) handleNewWatchAddPicture(values, { resetForm });
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
        <StyledDashedGrid
          item
          xs={12}
          container
          alignItems='center'
          columnGap={1}
          rowGap={1}
        >
          <Grid xs={12}>
            <Styled.Typography>
              {i18n.t("forms.updateProduct.picture")}
            </Styled.Typography>
          </Grid>
          <Grid item container xs={12} alignItems='center' columnGap={1} style={{ marginBottom: "10px" }}>
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

                  </Grid>
                )}
              </>
            )}
            {(!originalPictureNewWatch || !newWatch) && (
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
        </StyledDashedGrid>
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

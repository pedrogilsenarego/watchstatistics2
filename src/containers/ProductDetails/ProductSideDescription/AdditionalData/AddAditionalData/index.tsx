import { useState } from "react";
import { i18n } from "src/translations/i18n";
import { Grid } from "@mui/material";
import Textfield from "src/components/Inputs/Textfield";
import Button1 from "src/components/Buttons/Button1";
import Button2 from "src/components/Buttons/Button2";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addProductAdditionalData } from "src/redux/Products/products.actions";

interface Props {
  setAddAdditionalData: (addAdditionalData: boolean) => void;
}

const AddAdditionalData = ({ setAddAdditionalData }: Props) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const mapState = ({ user, productsData }: any) => ({
    currentUser: user.currentUser,
    product: productsData.product,
  });
  const { currentUser, product } = useSelector(mapState);
  const dispatch = useDispatch();
  const params = useParams();
  const { productBrand, productName, reference } = product;

  const handleSubmit = () => {
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

  return (
    <Grid
      item
      xs={12}
      container
      alignItems='center'
      columnSpacing={1}
      rowSpacing={1}
      style={{ marginTop: "10px", marginBottom: "10px" }}
    >
      <Grid item xs={6} md={4}>
        <Textfield
          onChange={setTitle}
          placeholder={i18n.t(
            "placeholders.updateProduct.additionalData.title"
          )}
        />
      </Grid>

      <Grid item xs={6} md={4}>
        <Textfield
          onChange={setLink}
          placeholder={i18n.t("placeholders.updateProduct.additionalData.link")}
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
            onClick={() => setAddAdditionalData(false)}
          />
        </Grid>
        <Grid item>
          <Button1 onClick={handleSubmit} title={i18n.t("buttons.submit")} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddAdditionalData;

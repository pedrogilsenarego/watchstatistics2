import { useState } from "react";
import { Grid } from "@mui/material";
import Multiline from "src/components/Inputs/Muitline";
import Button1 from "src/components/Buttons/Button1";
import Button2 from "src/components/Buttons/Button2";
import { useDispatch, useSelector } from "react-redux";
import { addProductDescription } from "src/redux/Products/products.actions";
import { useParams } from "react-router-dom";

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
  const [description, setDescription] = useState("");

  const productReference =
    product.productBrand + " " + product.productName + " " + product.reference;

  const handleSubmitDescription = () => {
    const payload = {
      description,
      currentUser,
      productID: params,
      productReference,
    };
    dispatch(addProductDescription(payload));
    setOpen(false);
  };

  return (
    <Grid container rowSpacing={1}>
      <Grid item xs={12}>
        <Multiline placeholder='Add Description' onChange={setDescription} />
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
          <Button2
            title='Cancel'
            onClick={() => {
              setOpen(false);
            }}
          />
        </Grid>
        <Grid item>
          <Button1 title='Submit' onClick={() => handleSubmitDescription()} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddDescription;

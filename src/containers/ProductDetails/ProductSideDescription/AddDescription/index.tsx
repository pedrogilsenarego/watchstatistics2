import { useState } from "react";
import { Grid } from "@mui/material";
import Multiline from "src/components/Inputs/Muitline";
import Button1 from "src/components/Buttons/Button1";
import { useDispatch, useSelector } from "react-redux";
import { addProductDescription } from "src/redux/Products/products.actions";

interface Props {
  setOpen: (setClose: boolean) => void;
}

const AddDescription = ({ setOpen }: Props) => {
  const mapState = ({ user }: any) => ({
    currentUser: user.currentUser,
  });
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");

  const handleSubmitDescription = () => {
    const payload = {
      description,
      currentUser,
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
          marginBottom: "5px",
        }}
      >
        <Grid item>
          <Button1
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

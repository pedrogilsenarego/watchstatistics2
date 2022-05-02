import { useState } from "react";
import { Grid } from "@mui/material";
import Multiline from "src/components/Inputs/Muitline";
import Button1 from "src/components/Buttons/Button1";

interface Props {
  close: (setClose: boolean) => void;
}

const AddDescription = ({ close }: Props) => {
  const [description, setDescription] = useState("");

  const handleSubmitDescription = () => {};
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
              close(false);
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

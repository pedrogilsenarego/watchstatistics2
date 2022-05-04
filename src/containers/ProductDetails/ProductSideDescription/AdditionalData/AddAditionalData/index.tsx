import { useState } from "react";
import { i18n } from "src/translations/i18n";
import { Grid } from "@mui/material";
import Textfield from "src/components/Inputs/Textfield";

const AddAdditionalData = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  return (
    <Grid
      item
      xs={12}
      container
      columnSpacing={1}
      style={{ marginTop: "20px", marginBottom: "10px" }}
    >
      <Grid item xs={4}>
        <Textfield
          onChange={setTitle}
          placeholder={i18n.t(
            "placeholders.updateProduct.additionalData.title"
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Textfield
          onChange={setUrl}
          placeholder={i18n.t("placeholders.updateProduct.additionalData.link")}
        />
      </Grid>
    </Grid>
  );
};

export default AddAdditionalData;

import { useState } from "react";
import { i18n } from "src/translations/i18n";
import { Grid } from "@mui/material";
import Textfield from "src/components/Inputs/Textfield";
import Button1 from "src/components/Buttons/Button1";
import Button2 from "src/components/Buttons/Button2";

interface Props {
  setAddAdditionalData: (addAdditionalData: boolean) => void;
}

const AddAdditionalData = ({ setAddAdditionalData }: Props) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  return (
    <Grid
      item
      xs={12}
      container
      alignItems='center'
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
      <Grid item container xs={4} justifyContent='flex-end' columnSpacing={1}>
        <Grid item>
          <Button2
            title={i18n.t("buttons.cancel")}
            onClick={() => setAddAdditionalData(false)}
          />
        </Grid>
        <Grid item>
          <Button1 title={i18n.t("buttons.submit")} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddAdditionalData;

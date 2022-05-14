import * as Styled from "./styles";
import { useField } from "formik";
import { Container } from "@mui/material"

interface Props {
  placeholder?: string;
  onChange?: (value: string) => void;
  name?: string;
  form?: boolean;
}

const Multiline = ({ placeholder, onChange, name, form }: Props) => {
  const [field, meta] = useField(name ?? "");
  const configTextField = form
    ? {
      ...field,
      error: false,
      helperText: "",
    }
    : {
      error: false,
      helperText: null,
      onChange: (e: any) => onChange && onChange(e.target.value),
    };

  if (form && meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return (
    <Container
      style={{
        backgroundColor: "white",
        height: "202px",
        padding: "0px",

        borderRadius: "4px",
      }}
    >
      <Styled.TextField
        multiline
        fullWidth
        rows={8}
        {...configTextField}
        placeholder={placeholder}
      />
    </Container>

  );
};

export default Multiline;

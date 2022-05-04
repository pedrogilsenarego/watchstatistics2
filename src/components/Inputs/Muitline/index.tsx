import * as Styled from "./styles";
import { useField } from "formik";

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
    <>
      <Styled.TextField
        multiline
        fullWidth
        rows={8}
        {...configTextField}
        placeholder={placeholder}
      />
    </>
  );
};

export default Multiline;

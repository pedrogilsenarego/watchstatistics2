import * as Styled from "./styles";
import { useFormikContext } from "formik";

interface Props {
  children?: JSX.Element;
  title?: string;
}

const Button4Formik = ({ title, children }: Props) => {
  const { submitForm } = useFormikContext();

  return (
    <Styled.Typography onClick={() => submitForm()}>
      {title}
      {children}
    </Styled.Typography>
  );
};

export default Button4Formik;

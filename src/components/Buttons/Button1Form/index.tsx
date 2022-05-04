import * as Styled from "./styles";
import { useFormikContext } from "formik";

interface Props {
  children?: JSX.Element;
  title?: string;
}

const Button1 = ({ title, children }: Props) => {
  const { submitForm } = useFormikContext();

  return (
    <Styled.Button onClick={() => submitForm()}>
      {title}
      {children}
    </Styled.Button>
  );
};

export default Button1;

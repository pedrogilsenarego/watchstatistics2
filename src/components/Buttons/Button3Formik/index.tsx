import * as Styled from "./styles";
import { useFormikContext } from "formik";

interface Props {
  children?: JSX.Element;
  title?: string;
  customOnClick?: any;
}

const Button1 = ({ title, children, customOnClick }: Props) => {
  const { submitForm } = useFormikContext();

  return (
    <Styled.Button
      variant='contained'
      onClick={() => {
        submitForm();
        if (customOnClick) customOnClick();
      }}
    >
      {title}
      {children}
    </Styled.Button>
  );
};

export default Button1;

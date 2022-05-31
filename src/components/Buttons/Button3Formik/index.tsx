import * as Styled from "./styles";
import { useFormikContext } from "formik";

interface Props {
  children?: JSX.Element;
  title?: string;
  customOnClick?: any;
  fullWidth?: boolean;

}

const Button1 = ({ title, children, customOnClick, fullWidth, }: Props) => {
  const { submitForm } = useFormikContext();

  return (
    <Styled.Button
      fullWidth={fullWidth ? true : false}
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

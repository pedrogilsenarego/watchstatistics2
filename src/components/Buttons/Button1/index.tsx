import * as Styled from "./styles";
import { useFormikContext } from "formik";

interface Props {
  children?: JSX.Element;
  title?: string;
  onClick?: () => void;
  form?: Boolean;
}

const Button1 = ({ title, onClick, children, form }: Props) => {
  //const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    //if (form) submitForm();
    if (onClick) onClick();
    else return;
  };

  return (
    <Styled.Button onClick={handleSubmit}>
      {title}
      {children}
    </Styled.Button>
  );
};

export default Button1;

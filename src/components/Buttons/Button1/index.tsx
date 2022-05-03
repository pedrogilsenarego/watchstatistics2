import * as Styled from "./styles";

interface Props {
  children?: JSX.Element;
  title?: string;
  onClick?: () => void;
}

const Button1 = ({ title, onClick, children }: Props) => {
  return (
    <Styled.Button onClick={onClick}>
      {title}
      {children}
    </Styled.Button>
  );
};

export default Button1;

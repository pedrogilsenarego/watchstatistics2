import * as Styled from "./styles";

interface Props {
  children?: JSX.Element;
  title?: string;
  onClick?: () => void;
}

const Button3 = ({ title, onClick, children }: Props) => {
  return (
    <Styled.Button onClick={onClick} variant="contained">
      {title}
      {children}
    </Styled.Button>
  );
};

export default Button3;

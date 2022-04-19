import * as Styled from "./styles";

interface Props {
  title: string;
  onClick?: () => void;
}

const Button1 = ({ title, onClick }: Props) => {
  return <Styled.Button onClick={onClick}>{title}</Styled.Button>;
};

export default Button1;

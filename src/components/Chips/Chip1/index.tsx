import * as Styled from "./styles";

interface Props {
  title: string;
  onClick?: () => void;
  color?: string;
  bColor?: string;
}

const Chip1 = ({ title, onClick, color, bColor }: Props) => {
  return <Styled.Chip color={color} bColor={bColor} onClick={onClick}>{title}</Styled.Chip>;
};

export default Chip1;

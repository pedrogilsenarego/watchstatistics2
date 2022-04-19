import * as Styled from "./styles";

interface Props {
  title: string;
  onClick?: () => void;
}

const Chip1 = ({ title, onClick }: Props) => {
  return <Styled.Chip onClick={onClick}>{title}</Styled.Chip>;
};

export default Chip1;

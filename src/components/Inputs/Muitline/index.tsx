import * as Styled from "./styles";

interface Props {
  placeholder?: string;
}

const Multiline = ({ placeholder }: Props) => {
  return (
    <>
      <Styled.TextField
        multiline
        fullWidth
        rows={8}
        placeholder={placeholder}
      />
    </>
  );
};

export default Multiline;

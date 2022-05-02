import * as Styled from "./styles";

interface Props {
  placeholder?: string;
  onChange: (value: string) => void;
}

const Multiline = ({ placeholder, onChange }: Props) => {
  return (
    <>
      <Styled.TextField
        multiline
        fullWidth
        rows={8}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </>
  );
};

export default Multiline;

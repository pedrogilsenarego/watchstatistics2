import * as Styled from "./styles";

interface Props {
  placeholder?: string;
  onChange: (value: string) => void;
}

const Textfield = ({ placeholder, onChange }: Props) => {
  return (
    <>
      <Styled.TextField
        size='small'
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </>
  );
};

export default Textfield;

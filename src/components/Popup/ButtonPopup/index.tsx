import { Button } from "@mui/material";
interface Props {
  title: string;
  onClick: any;
  disabled?: boolean;
}

const ButtonPopup = ({ title, onClick, disabled }: Props) => {
  return (
    <Button
      disabled={disabled ? true : false}
      style={{ color: disabled ? "lightGrey" : "white", letterSpacing: "1px", fontSize: "13px" }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default ButtonPopup;

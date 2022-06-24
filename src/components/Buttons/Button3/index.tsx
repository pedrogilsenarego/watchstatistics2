import * as Styled from "./styles";
import { Ellipsis } from "react-spinners-css";
import { Typography } from "@material-ui/core";

interface Props {
  children?: JSX.Element;
  title?: string;
  onClick?: () => void;
  loading?: boolean;
}

const Button3 = ({ title, onClick, children, loading }: Props) => {
  return (
    <Styled.Button
      onClick={onClick}
      variant='contained'
      style={{ overflow: "hidden" }}
    >
      {loading && <Ellipsis color='orange' size={30} style={{ position: "absolute" }} />}

      <>
        <Typography style={{ color: loading ? "transparent" : "white", fontSize: "14px" }}>
          {title}
          {children}
        </Typography>
      </>
    </Styled.Button>
  );
};

export default Button3;

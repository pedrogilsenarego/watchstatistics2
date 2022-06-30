import { Grid, Container, Button } from "@mui/material";
import * as GeneralStyled from "src/styles/styles";

type ButtonProps = {
  name: string;
  onClick?: any;
};

interface Props {
  listButtons?: ButtonProps[];
  rightEntries?: any;
  marginTop?: string;
  justifyContent?: string;
}

const TopHeader = ({ listButtons, rightEntries, marginTop, justifyContent }: Props) => {
  return (
    <Grid
      container
      xs={12}
      style={{
        backgroundColor: "#154A6799",
        marginTop: marginTop || "100px",
        padding: "5px",
      }}
    >
      <Container>
        <Grid container alignItems='center' justifyContent={justifyContent || 'space-between'}>
          <Grid item>
            {listButtons?.map((button: ButtonProps, pos: number) => (
              <Button key={pos} style={{ color: "white" }} onClick={button.onClick}>
                {button.name}
              </Button>
            ))}
          </Grid>
          <Grid item style={{ display: "flex" }}>
            {rightEntries?.map((entry: any, pos: number) => (
              <GeneralStyled.BasicTypography fontSize='14px' key={pos}>
                {entry}
              </GeneralStyled.BasicTypography>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default TopHeader;

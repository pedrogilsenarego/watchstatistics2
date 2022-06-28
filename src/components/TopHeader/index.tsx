import { Grid, Container, Button } from "@mui/material"
import * as GeneralStyled from "src/styles/styles"

type ButtonProps = {
  name: string;
  onClick?: () => void;
}

interface Props {
  listButtons?: ButtonProps[];
  rightEntries?: string[];
}

const TopHeader = ({ listButtons, rightEntries }: Props) => {
  return (
    <Grid
      container
      xs={12}
      style={{ backgroundColor: "#154A6799", marginTop: "100px", padding: "5px" }}
    >
      <Container>
        <Grid container alignItems='center'
          justifyContent='space-between'>
          <Grid item>
            {listButtons?.map((button: ButtonProps, pos: number) => (
              <Button key={pos} style={{ color: "white" }}>{button.name}</Button>
            ))}
          </Grid>
          <Grid item>
            <GeneralStyled.BasicTypography fontSize='14px'>
              {rightEntries?.map((entry: string, pos: number) => (
                <div key={pos}>{entry} {rightEntries?.length < pos && (<p> | </p>)}</div>
              ))}
            </GeneralStyled.BasicTypography>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

export default TopHeader
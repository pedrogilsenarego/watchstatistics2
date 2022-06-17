import { Grid, Tooltip } from "@mui/material";

interface Props {
  children: JSX.Element;
  title: string;
}

const Item = ({ children, title }: Props) => {
  return (
    <Tooltip title={title} placement="top" arrow>
      <Grid item columnGap={0.5} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        {children}
      </Grid>
    </Tooltip>
  )
}

export default Item
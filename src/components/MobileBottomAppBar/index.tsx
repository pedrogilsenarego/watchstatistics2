import { Grid, Typography } from "@mui/material";

interface Button {
  title?: string;
  icon?: JSX.Element;
  onClick?: () => void;
}

interface Props {
  listButtons: Button[];
}

const MobileBottomAppBar = ({ listButtons }: Props) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent='space-around'
      sx={{
        width: "100%",
        bottom: 0,
        height: "60px",
        position: "fixed",
        backgroundColor: "#154A67",
        zIndex: "1000",
      }}
    >
      {listButtons.map((button, pos) => {
        return (
          <Grid item key={pos} textAlign='center' onClick={button.onClick}>
            {button.icon}
            <Typography style={{ marginTop: "-1px", color: "lightGrey" }}>
              {button.title}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MobileBottomAppBar;

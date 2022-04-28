import { Grid, Container } from "@mui/material";
import { TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    "& .MuiOutlinedInput-input": { color: "white" },
    "& . MuiInputLabel-root": {
      color: "#ffffffB3",
    },
    "& .MuiInputLabel-root": { color: "grey" },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffff",
      borderWidth: "2px",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "black",
    },
    "&:hover .MuiInputLabel-root": { color: "grey" },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffffB3",
    },
    "&  .MuiOutlinedInput-input": {
      color: "black",
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      color: "#ffffffB3",
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#ffffffB3" },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffffB3",
    },
  },
}));

const AddDescriptionModal = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} style={{ marginTop: "10px" }}>
        <Container
          style={{
            backgroundColor: "white",
            height: "170px",
            padding: "0px",

            borderRadius: "4px",
          }}
        >
          <TextField
            name='productDesc'
            className={classes.textField}
            multiline
            InputLabelProps={{ shrink: false }}
            rows={6}
            placeholder='Description from Watch'
          />
        </Container>
      </Grid>
    </Grid>
  );
};

export default AddDescriptionModal;

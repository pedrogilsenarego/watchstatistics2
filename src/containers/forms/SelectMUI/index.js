import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem } from "@material-ui/core";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root2: {},
  formSelect: {
    "& .MuiOutlinedInput-input": { color: "white" },
    "& . MuiInputLabel-root": {
      color: "#ffffffB3",
    },
    "& .MuiInputLabel-root": { color: "#ffffffB3" },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffffB3",
      borderWidth: "2px",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "#FFA500",
    },
    "&:hover .MuiInputLabel-root": { color: "#ffffff" },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffffB3",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "#ffffffB3",
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#ffffffB3" },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffffB3",
    },
  },
  select: {},
  menuItem: {},
});

const FormSelect = ({
  options,
  defaultValue,
  handleChange,
  label,

  ...otherProps
}) => {
  const classes = useStyles();
  if (!Array.isArray(options) || options.length < 1) return null;

  return (
    <Box className={classes.root2} sx={{ minWidth: 120 }}>
      <FormControl size="small" className={classes.formSelect} fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>

        <Select
          style={{ backgroundColor: "#04040680" }}
          MenuProps={{
            sx: {
              "&& .Mui-selected": {
                color: "#FFA500",
              },
              "& .MuiPaper-root": {
                backgroundColor: "#04040680",
                color: "#ffffffB3",
              },
            },
          }}
          className={classes.select}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={defaultValue}
          onChange={handleChange}
          {...otherProps}
        >
          {options.map((option, index) => {
            const { value, name } = option;

            return (
              <MenuItem className={classes.menuItem} key={index} value={value}>
                {name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FormSelect;

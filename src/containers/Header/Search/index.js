import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Typography, Box, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { FiSearch } from "react-icons/fi";

const WATCHES_INFO =
  "https://us-central1-fir-auth0-9b4cb.cloudfunctions.net/api/watchcorrelations";

const useStyles = makeStyles((theme) => ({
  textField: {
    [`& fieldset`]: {
      borderRadius: 12,
      background: "#ffffff1A",
    },

    "& .MuiOutlinedInput-input": { color: "white" },
    "& . MuiInputLabel-root": {
      color: "#ffffffB3",
    },
    "& .MuiInputLabel-root": { color: "grey" },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffff00",
      borderWidth: "1.5px",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "white",
    },
    "&:hover .MuiInputLabel-root": { color: "grey" },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffff1A",
    },
    "&  .MuiOutlinedInput-input": {
      color: "white",
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

const Search = ({ isMatch }) => {
  const history = useHistory();
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [searchHover, setSearchHover] = useState(false);
  const wrapperRef = useRef(null);
  const classes = useStyles();

  const getDataFromApi = async () => {
    try {
      const response = await axios.get(WATCHES_INFO);
      const data = response.data;

      setOptions(data);
    } catch (error) {
      console.error();
    }
  };

  useEffect(
    () => {
      getDataFromApi();
    },
    // eslint-disable-next-line
    []
  );
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };
  const handleSearch = (search) => {
    history.push(`/product/${search}`);
    setDisplay(false);
    setSearch("");
  };

  return (
    <>
      <TextField
        variant="outlined"
        className={classes.textField}
        style={{
          marginLeft: isMatch ? "20px" : "20px",
          marginTop: isMatch ? "5px" : "-2px",
          minWidth: isMatch ? "230px" : "0px",
        }}
        name="search"
        size="small"
        autoComplete="off"
        placeholder={searchHover ? `${options.length} watches` : "Search"}
        value={search}
        InputProps={{
          endAdornment: isMatch ? null : <FiSearch color="#ffffff66" />,
        }}
        onChange={(event) => {
          setDisplay(true);
          setSearch(event.target.value);
        }}
        onMouseEnter={() => {
          setSearchHover(true);
        }}
        onMouseLeave={() => {
          setSearchHover(false);
        }}
      />
      {display && search.length > 2 && (
        <Box
          ref={wrapperRef}
          style={{
            backgroundColor: "#000000E6",
            position: "absolute",
            borderRadius: "8px",
            padding: "10px",
            marginLeft: isMatch ? "10px" : "23.2vw",

            minWidth: "200px",
            minHeight: "50px",
            marginTop: isMatch ? "10vh" : "10px",
          }}
        >
          {options

            .filter(
              ({ name }) =>
                name.toLowerCase().indexOf(search.toLowerCase()) > -1
            )
            .map((item, pos) => {
              return (
                <Typography
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleSearch(item.id);
                  }}
                  key={pos}
                >
                  {item.name}
                </Typography>
              );
            })}
        </Box>
      )}
    </>
  );
};

export default Search;

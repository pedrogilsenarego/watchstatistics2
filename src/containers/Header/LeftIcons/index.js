import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { BsGraphUp } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { VscHome } from "react-icons/vsc";

import Search from "../Search";

const useStyles = makeStyles((theme) => ({
	textBtn: {
		color: "#FFFFFF",
		fontSize: "13px",
		"&:hover": {
			color: "#FFA500"
		},
		"&:active": {
			color: "#FFFFFF"
		}
	},
	textField: {
		"& .MuiOutlinedInput-input": { color: "white" },
		"& . MuiInputLabel-root": {
			color: "#ffffffB3"
		},
		"& .MuiInputLabel-root": { color: "grey" },
		"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
			borderColor: "#ffffff",
			borderWidth: "2px"
		},
		"&:hover .MuiOutlinedInput-input": {
			color: "white"
		},
		"&:hover .MuiInputLabel-root": { color: "grey" },
		"&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
			borderColor: "#ffffffB3"
		},
		"&  .MuiOutlinedInput-input": {
			color: "white"
		},
		"& .MuiOutlinedInput-root.Mui-focused": {
			color: "#ffffffB3"
		},
		"& .MuiInputLabel-root.Mui-focused": { color: "#ffffffB3" },
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
			borderColor: "#ffffffB3"
		}
	}
}));

const LeftIcons = ({ handleSupportOpen, handleWatchstatisticsOpen }) => {
	const classes = useStyles();

	return (
		<div>
			<Button
				className={classes.textBtn}
				component={NavLink}
				disableRipple
				to="/"
				exact
			>
				<VscHome fontSize="1.5em" />
				&nbsp;Home
			</Button>

			<Button
				aria-controls="watchstatistics"
				className={classes.textBtn}
				disableRipple
				onClick={(e) => handleWatchstatisticsOpen(e)}
			>
				{" "}
				<BsGraphUp />
				&nbsp;WatchStatistics
			</Button>

			<Button
				aria-controls="support"
				disableRipple
				className={classes.textBtn}
				onClick={(e) => handleSupportOpen(e)}
			>
				<AiOutlineInfoCircle fontSize="1.5em" />
				&nbsp; Ecosystem
			</Button>
			<Search />
		</div>
	);
};

export default LeftIcons;

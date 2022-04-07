import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AiOutlineMessage } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { useHistory } from "react-router-dom";

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
	}
}));

const RightIconsBigUser = ({ messageStatus, handleMyAccountOpen }) => {
	const classes = useStyles();
	const history = useHistory();
	const activeStyle = { color: "#FFA500" };

	return [
		[
			<Button
				aria-controls="messages"
				key="messages"
				className={classes.textBtn}
				activestyle={activeStyle}
				disableRipple
				onClick={() => {
					history.push(`/messages`);
				}}
			>
				<AiOutlineMessage fontSize="1.5em" />
				&nbsp;Messages ({messageStatus})
			</Button>,
			<Button
			key="myAccount"
				className={classes.textBtn}
				activestyle={activeStyle}
				aria-controls="myAccount"
				disableRipple
				onClick={(e) => handleMyAccountOpen(e)}
			>
				<VscAccount fontSize="1.5em" />
				&nbsp;My Account
			</Button>
		]
	];
};

export default RightIconsBigUser;

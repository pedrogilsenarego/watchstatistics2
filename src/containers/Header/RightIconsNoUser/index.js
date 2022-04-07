import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

const RightIconsNoUser = ({ handleSignupOpen, handleLoginOpen, search }) => {
	const classes = useStyles();
	const activeStyle = { color: "#FFA500" };

	return (
		<>
			{!search && (
				<Button
					aria-controls="login"
					disableRipple
					className={classes.textBtn}
					activestyle={activeStyle}
					onClick={(e) => handleLoginOpen(e)}
					style={{
						marginTop: "2px",
						border: "solid 2px",
						borderColor: "orange",
						borderRadius: "14px"
					}}
				>
					Enter
				</Button>
			)}
		</>
	);
};

export default RightIconsNoUser;

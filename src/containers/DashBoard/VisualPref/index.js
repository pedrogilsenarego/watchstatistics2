import { Typography } from "@material-ui/core";
import React from "react";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";

import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import { updateUserPreferences } from "../../../redux/User/user.actions";
import { useTheme } from "@material-ui/core";

const mapState = ({ user }) => ({
	currentUser: user.currentUser
});

const VisualPref = (props) => {
	const dispatch = useDispatch();
	const { currentUser } = useSelector(mapState);
	const theme = useTheme();

	const CustomSwitch = styled(Switch)(({ theme }) => ({
		"& .MuiSwitch-switchBase.Mui-checked": {
			color: "#154A6799",
			"&:hover": {
				backgroundColor: alpha("#154A6799", theme.palette.action.hoverOpacity)
			}
		},
		"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
			backgroundColor: "#154A6799"
		}
	}));

	const configData = {
		...currentUser,
		userID: currentUser.id,
		backgroundImageOff: currentUser.backgroundImageOff ? false : true,
		flag: "backgroundImage"
	};
	const handleSetImageBackGround = () => {
		dispatch(updateUserPreferences(configData));
	};

	const configDataTheme = {
		...currentUser,
		userID: currentUser.id,
		theme: currentUser.theme ? false : true,
		flag: "theme"
	};
	const handleSetTheme = () => {
		dispatch(updateUserPreferences(configDataTheme));
	};

	const label = { inputProps: { "aria-label": "Switch demo" } };

	return (
		<Container>
			<Typography style={{ paddingTop: "20px" }}>Global Theme</Typography>
			<Typography style={{ color: theme.palette.text.faded }}>
				Set here if you prefer a light or dark theme here
			</Typography>

			<Container
				style={{
					marginTop: "20px",
					paddingLeft: "0px",
					display: "flex",
					alignItems: "center"
				}}
			>
				<CustomSwitch
					size="small"
					onClick={() => {
						handleSetTheme();
					}}
					checked={!currentUser.theme}
					{...label}
					color="primary"
				/>
				{!currentUser.theme && (
					<Typography style={{ marginLeft: "10px" }}>
						Dark Theme is on
					</Typography>
				)}
				{currentUser.theme && (
					<Typography style={{ marginLeft: "10px" }}>
						Ligh Theme is on
					</Typography>
				)}
			</Container>
			<Divider
				style={{
					width: "100%",
					marginTop: "15px",
					background: theme.palette.text.faded3
				}}
			/>
			<Typography style={{ paddingTop: "60px" }}>Watch Details</Typography>
			<Typography style={{ color: theme.palette.text.faded }}>
				You can change if the background image is shown when visualizing a watch
			</Typography>

			<Container
				style={{
					marginTop: "20px",
					paddingLeft: "0px",
					display: "flex",
					alignItems: "center"
				}}
			>
				<CustomSwitch
					size="small"
					onClick={() => {
						handleSetImageBackGround();
					}}
					checked={currentUser.backgroundImageOff}
					{...label}
					color="primary"
				/>
				{currentUser.backgroundImageOff && (
					<Typography style={{ marginLeft: "10px" }}>
						Background Image is currently On
					</Typography>
				)}
				{!currentUser.backgroundImageOff && (
					<Typography style={{ marginLeft: "10px" }}>
						Background Image is currently Off
					</Typography>
				)}
			</Container>
			<Divider
				style={{
					width: "100%",
					marginTop: "15px",
					background: theme.palette.text.faded3
				}}
			/>
		</Container>
	);
};

export default VisualPref;

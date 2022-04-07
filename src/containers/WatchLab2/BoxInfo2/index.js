import React, { useState } from "react";

import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { updateBoxStatus } from "../../../redux/User/user.actions";
import Popup from "../../controls/Popup";
import { useSelector, useDispatch } from "react-redux";
import { FaPuzzlePiece } from "react-icons/fa";
import { getRandomInt, getRandomPart, percentageLoot } from "../helpers.js";

const mapState = (state) => ({
	currentUser: state.user.currentUser
});

const BoxInfo = () => {
	const { currentUser } = useSelector(mapState);
	const dispatch = useDispatch();
	const [openBoxPopUp, setOpenBoxPopUp] = useState(false);
	const [popUpInf, setPopUpInfo] = useState(null);
	var checkmark = "\u00BB";

	const bagSize = () => {
		if (currentUser.experience < 20) return 10;
		if (currentUser.experience < 100) return 12;
		if (currentUser.experience < 200) return 14;
		if (currentUser.experience < 500) return 16;
		if (currentUser.experience < 1500) return 18;
		if (currentUser.experience < 5000) return 20;
		else return 15;
	};

	const itemsBag = () => {
		if (!currentUser.watchParts) return "";
		else return currentUser.watchParts;
	};

	const blueboxDisabled = () => {
		if (!currentUser.blueBoxFragments || currentUser.blueBoxFragments < 10) {
			return true;
		} else return false;
	};

	const blueboxDisabled2 = () => {
		if (
			!currentUser.blueBox ||
			currentUser.blueBox < 1 ||
			(currentUser.watchParts && currentUser.watchParts.length >= bagSize())
		) {
			return true;
		} else return false;
	};

	const BlueBoxes = () => {
		if (!currentUser.blueBox) return 0;
		else return currentUser.blueBox;
	};

	const handleGetBlueBox = () => {
		const configData = {
			...currentUser,
			flag: "getBluebox",
			blueBoxFragments: currentUser.blueBoxFragments - 10,
			blueBox: BlueBoxes() + 1,
			userID: currentUser.id
		};
		dispatch(updateBoxStatus(configData));
	};

	const orangeBoxFragments = () => {
		if (!currentUser.orangeBoxFragments) return 0;
		else return currentUser.orangeBoxFragments;
	};

	const purpleBoxFragments = () => {
		if (!currentUser.purpleBoxFragments) return 0;
		else return currentUser.purpleBoxFragments;
	};

	const handleOpenBlueBox = () => {
		const a = [getRandomPart("white")];
		if (percentageLoot(20) === 1) {
			a.push(getRandomPart("lightGreen"));
		}
		if (percentageLoot(1) === 1) {
			a.push(getRandomPart("darkGreen"));
		}
		let b = [...a];
		var c = b.map((s) => s.slice(1));

		if (currentUser.watchParts) {
			a.unshift(...itemsBag());
		}
		const configData = {
			...currentUser,
			flag: "openBluebox",
			blueBox: BlueBoxes() - 1,
			purpleBoxFragments: purpleBoxFragments() + getRandomInt(1, 3),
			orangeBoxFragments: orangeBoxFragments() + percentageLoot(5),
			watchParts: a,
			userID: currentUser.id
		};
		dispatch(updateBoxStatus(configData));
		setOpenBoxPopUp(true);
		setPopUpInfo(
			"You just received: " +
				Number(configData.purpleBoxFragments - purpleBoxFragments()) +
				" Purple Box Fragments, " +
				Number(configData.orangeBoxFragments - orangeBoxFragments()) +
				" Orange Box Fragments, " +
				c
		);
	};

	return (
		<Container
			justifyContent="center"
			style={{
				paddingTop: "25vh"
			}}
		>
			<Paper
				style={{ background: "#0000001C", width: "350px", padding: "20px" }}
			>
				<div style={{ display: "flex", alignItems: "center" }}>
					<Typography variant="h5" style={{ color: "#ffffffE6" }}>
						Blue box {checkmark}
					</Typography>
					<Typography
						variant="subtitle 2"
						style={{
							color: "#ffffffE6",
							marginLeft: "140px",
							marginTop: "4px"
						}}
					>
						10 <FaPuzzlePiece size="3vh" color="lightBlue" />
					</Typography>
				</div>
				<Divider
					style={{
						width: "100%",
						marginTop: "3px",
						background: "#ffffff66"
					}}
				/>
				<Typography style={{ color: "#ffffffBF" }}>White Watch Part</Typography>
				<Typography style={{ color: "#ffffffBF" }}>
					20% Chance of a Light Green Part
				</Typography>
				<Typography style={{ color: "#ffffffBF" }}>
					1% Chance of a Dark Green Watch Part
				</Typography>
				<Typography style={{ color: "#ffffffBF" }}>
					1-3 Fragments of Purple Box
				</Typography>
				<Typography style={{ color: "#ffffffBF" }}>
					5% Chance of Fragment of Orange Box
				</Typography>
				<Divider
					style={{
						width: "100%",
						marginTop: "8px",
						background: "#ffffff66"
					}}
				/>
				<ButtonGroup style={{ marginTop: "10px" }}>
					<Button
						disabled={blueboxDisabled()}
						size="small"
						onClick={() => handleGetBlueBox()}
						style={{
							color: blueboxDisabled() ? "grey" : "#ffffffBF",
							borderColor: "#ffffff40",
							border: "solid 1.5px"
						}}
					>
						Get
					</Button>
					<Button
						disabled={blueboxDisabled2()}
						size="small"
						onClick={() => handleOpenBlueBox()}
						style={{
							color: blueboxDisabled2() ? "grey" : "#ffffffBF",
							borderColor: "#ffffff40",
							border: "solid 1.5px"
						}}
					>
						Open
					</Button>
				</ButtonGroup>
			</Paper>
			<Popup
				title="You just opened a Box!!"
				openPopup={openBoxPopUp}
				setOpenPopup={setOpenBoxPopUp}
			>
				<Typography style={{ color: "black" }}>{popUpInf}</Typography>
			</Popup>
		</Container>
	);
};

export default BoxInfo;

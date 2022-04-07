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
import { FaCoins } from "react-icons/fa";
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

	function points() {
		if (currentUser) return currentUser.points ? currentUser.points : 0;
		else return 0;
	}

	function whiteBox() {
		if (currentUser) return currentUser.whiteBox ? currentUser.whiteBox : 0;
		else return 0;
	}

	const whiteboxDisabled = () => {
		if (points() < 4) {
			return true;
		} else return false;
	};

	const whiteboxDisabled2 = () => {
		if (
			whiteBox() < 1 ||
			(currentUser.watchParts && currentUser.watchParts.length >= bagSize())
		) {
			return true;
		} else return false;
	};

	const whiteBoxes = () => {
		if (!currentUser.whiteBox) return 0;
		else return currentUser.whiteBox;
	};

	const handleGetWhiteBox = () => {
		const configData = {
			...currentUser,
			flag: "getWhitebox",
			points: currentUser.points - 4,
			whiteBox: whiteBoxes() + 1,
			userID: currentUser.id
		};
		dispatch(updateBoxStatus(configData));
	};

	const blueBoxFragments = () => {
		if (!currentUser.blueBoxFragments) return 0;
		else return currentUser.blueBoxFragments;
	};

	const purpleBoxFragments = () => {
		if (!currentUser.purpleBoxFragments) return 0;
		else return currentUser.purpleBoxFragments;
	};

	const handleOpenWhiteBox = () => {
		const a = [getRandomPart("grey")];

		if (percentageLoot(20) === 1) {
			a.push(getRandomPart("white"));
		}
		if (percentageLoot(1) === 1) {
			a.push(getRandomPart("lightGreen"));
		}
		let b = [...a];
		var c = b.map((s) => s.slice(1));

		if (currentUser.watchParts) {
			a.unshift(...itemsBag());
		}
		const configData = {
			...currentUser,
			flag: "openWhitebox",
			whiteBox: whiteBoxes() - 1,
			blueBoxFragments: blueBoxFragments() + getRandomInt(1, 3),
			purpleBoxFragments: purpleBoxFragments() + percentageLoot(5),
			watchParts: a,
			userID: currentUser.id
		};
		dispatch(updateBoxStatus(configData));
		setOpenBoxPopUp(true);
		setPopUpInfo(
			"You received: " +
				Number(configData.blueBoxFragments - blueBoxFragments()) +
				" Blue Box Fragments, " +
				Number(configData.purpleBoxFragments - purpleBoxFragments()) +
				" Purple Box Fragments, " +
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
						White box {checkmark}
					</Typography>
					<Typography
						variant="subtitle 2"
						style={{
							color: "#ffffffE6",
							marginLeft: "140px",
							marginTop: "4px"
						}}
					>
						4 <FaCoins size="3vh" color="orange" />
					</Typography>
				</div>
				<Divider
					style={{
						width: "100%",
						marginTop: "3px",
						background: "#ffffff66"
					}}
				/>
				<Typography style={{ color: "#ffffffBF" }}>Grey Watch Part</Typography>
				<Typography style={{ color: "#ffffffBF" }}>
					20% Chance of a White Watch Part
				</Typography>
				<Typography style={{ color: "#ffffffBF" }}>
					1% Chance of a Light Green Part
				</Typography>
				<Typography style={{ color: "#ffffffBF" }}>
					1-3 Fragments of Blue Box
				</Typography>
				<Typography style={{ color: "#ffffffBF" }}>
					5% Chance of Fragment of Purple Box
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
						disabled={whiteboxDisabled()}
						size="small"
						onClick={() => handleGetWhiteBox()}
						style={{
							color: whiteboxDisabled() ? "grey" : "#ffffffBF",
							borderColor: "#ffffff40",
							border: "solid 1.5px"
						}}
					>
						Get
					</Button>
					<Button
						disabled={whiteboxDisabled2()}
						size="small"
						onClick={() => handleOpenWhiteBox()}
						style={{
							color: whiteboxDisabled2() ? "grey" : "#ffffffBF",
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

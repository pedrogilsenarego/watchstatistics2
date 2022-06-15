import React from "react";

import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { BsFillInboxFill } from "react-icons/bs";
import { FaCoins } from "react-icons/fa";
import { FaPuzzlePiece } from "react-icons/fa";
import { GiGears } from "react-icons/gi";
import { GoRocket } from "react-icons/go";
import { AiOutlineCodeSandbox } from "react-icons/ai";

const mapState = (state) => ({
	currentUser: state.user.currentUser
});

const Currencies = () => {
	const { currentUser } = useSelector(mapState);

	const bagSize = () => {
		if (Experience() < 20) return 10;
		if (Experience() < 100) return 12;
		if (Experience() < 200) return 14;
		if (Experience() < 500) return 16;
		if (Experience() < 1500) return 18;
		if (Experience() < 5000) return 20;
		else return 15;
	};

	function collection() {
		if (currentUser)
			return currentUser.collection ? currentUser.collection.length : 0;
		else return 0;
	}

	function Experience() {
		if (currentUser) return currentUser.experience ? currentUser.experience : 0;
		else return 0;
	}

	function Points() {
		if (currentUser) return currentUser.points ? currentUser.points : 0;
		else return 0;
	}

	function watchParts() {
		if (currentUser)
			return currentUser.watchParts ? currentUser.watchParts : [];
		else return [];
	}

	function Boosters() {
		if (currentUser) return currentUser.boosters ? currentUser.boosters : 0;
		else return 0;
	}

	const whiteBoxes = () => {
		if (currentUser) return currentUser.whiteBox ? currentUser.whiteBox : 0;
		else return 0;
	};

	const BlueBoxes = () => {
		if (currentUser) return currentUser.blueBox ? currentUser.blueBox : 0;
		else return 0;
	};

	const PurpleBoxes = () => {
		if (currentUser) return currentUser.purpleBox ? currentUser.purpleBox : 0;
		else return 0;
	};

	const blueBoxFragments = () => {
		if (currentUser)
			return currentUser.blueBoxFragments ? currentUser.blueBoxFragments : 0;
		else return 0;
	};

	const purpleBoxFragments = () => {
		if (currentUser)
			return currentUser.purpleBoxFragments
				? currentUser.purpleBoxFragments
				: 0;
		else return 0;
	};

	const orangeBoxFragments = () => {
		if (currentUser)
			return currentUser.orangeBoxFragments
				? currentUser.orangeBoxFragments
				: 0;
		else return 0;
	};
	return (
		<Grid container direction="column" alignItems="center">
			<Paper
				style={{
					background: "#0000001C",
					position: "fixed",

					marginTop: "91vh",
					padding: "10px",
					paddingRight: "10px",
					display: "flex",
					alignItems: "center"
				}}
			>
				<Typography style={{ color: "#ffffffBF" }}>
					<BsFillInboxFill size="3vh" color="white" /> {collection()}/
					{bagSize()}{" "}
					<GiGears style={{ marginLeft: "5px" }} size="3vh" color="white" />{" "}
					{watchParts().length}/{bagSize()} {"     "}{" "}
					<GoRocket style={{ marginLeft: "5px" }} size="3vh" color="white" />{" "}
					{Boosters()}
				</Typography>

				<Typography style={{ color: "#ffffffBF", paddingLeft: "30px" }}>
					<FaCoins size="3vh" color="orange" /> {Points()}
					{"  "}
					<FaPuzzlePiece
						style={{ marginLeft: "5px" }}
						size="3vh"
						color="lightBlue"
					/>{" "}
					{blueBoxFragments()}
					{"  "}
					<FaPuzzlePiece
						style={{ marginLeft: "5px" }}
						size="3vh"
						color="purple"
					/>{" "}
					{purpleBoxFragments()}
					{"  "}
					<FaPuzzlePiece
						style={{ marginLeft: "5px" }}
						size="3vh"
						color="red"
					/>{" "}
					{orangeBoxFragments()}
				</Typography>

				<Typography style={{ color: "#ffffffBF", paddingLeft: "30px" }}>
					<AiOutlineCodeSandbox size="3vh" color="white" /> {whiteBoxes()}
					{"  "}
					<AiOutlineCodeSandbox
						style={{ marginLeft: "5px" }}
						size="3vh"
						color="lightBlue"
					/>{" "}
					{BlueBoxes()}
					{"  "}
					<AiOutlineCodeSandbox
						style={{ marginLeft: "5px" }}
						size="3vh"
						color="purple"
					/>{" "}
					{PurpleBoxes()}
					{"  "}
					<AiOutlineCodeSandbox
						style={{ marginLeft: "5px" }}
						size="3vh"
						color="red"
					/>{" "}
					0
				</Typography>
			</Paper>
		</Grid>
	);
};

export default Currencies;

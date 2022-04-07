import React, { useState, useEffect } from "react";
import Slider from "./Slider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import CentralButtons from "./CentralButtons";
import BoxInfo from "./BoxInfo";
import BoxInfo2 from "./BoxInfo2";
import BoxInfo3 from "./BoxInfo3";
import Currencies from "./Currencies";
import WatchParts from "./WatchParts";

const mapState = (state) => ({
	currentUser: state.user.currentUser
});

const WatchLab2 = () => {
	const [boxInfoMenu, setBoxInfoMenu] = useState("whiteBox");
	const [x, setX] = useState(0);
	const [bagFull, setBagFull] = useState(false);
	const [collectionFull, setCollectionFull] = useState(false);
	const { currentUser } = useSelector(mapState);

	const bagSize = () => {
		if (getExperience() < 20) return 10;
		if (getExperience() < 100) return 12;
		if (getExperience() < 200) return 14;
		if (getExperience() < 500) return 16;
		if (getExperience() < 1500) return 18;
		if (getExperience() < 5000) return 20;
		else return 15;
	};

	function watchParts() {
		if (currentUser)
			return currentUser.watchParts ? currentUser.watchParts : [];
		else return [];
	}

	function collection() {
		if (currentUser)
			return currentUser.collection ? currentUser.collection : [];
		else return [];
	}

	function getExperience() {
		if (currentUser) return currentUser.experience ? currentUser.experience : 0;
		else return 0;
	}

	useEffect(
		() => {
			if (watchParts() >= bagSize()) {
				setBagFull(true);
			} else setBagFull(false);
		},
		// eslint-disable-next-line
		[watchParts()]
	);

	useEffect(
		() => {
			if (collection() && collection() >= bagSize()) {
				setCollectionFull(true);
			} else setCollectionFull(false);
		},
		// eslint-disable-next-line
		[collection()]
	);

	const data = [
		{
			title: "Available Parts",
			items: watchParts()
		},
		{ title: "Fusion Machine", items: [] },
		{ title: "Parts Shreder", items: [] }
	];

	const configCentralButtons = {
		boxInfoMenu,
		setBoxInfoMenu,
		setX,
		x
	};

	const configSlider = {
		x
	};

	const configWatchParts = {
		data,
		bagFull,
		collectionFull,
		setBagFull
	};

	return (
		<div>
			<Currencies />
			<Box style={{ height: "100vh", background: "black" }}>
				<Grid container style={{ position: "absolute", zIndex: "2" }}>
					<Grid item xs={4} justifyContent="center">
						{boxInfoMenu === "whiteBox" && <BoxInfo />}
						{boxInfoMenu === "blueBox" && <BoxInfo2 />}
						{boxInfoMenu === "purpleBox" && <BoxInfo3 />}
					</Grid>
					<Grid item xs={4}>
						<CentralButtons {...configCentralButtons} />
					</Grid>
					<Grid item xs={4}></Grid>
				</Grid>
				<Slider {...configSlider} />
			</Box>

			<Box style={{ height: "100vh", backgroundColor: "#2d4967" }}>
				<WatchParts {...configWatchParts} />
			</Box>
		</div>
	);
};

export default WatchLab2;
// #C84E15
// #8686af

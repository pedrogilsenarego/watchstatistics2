import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Box from "@mui/material/Box";
const CentralButtons = ({ boxInfoMenu, setBoxInfoMenu, setX, x }) => {
	const [leftMenu, setLeftMenu] = useState(false);
	const [rightMenu, setRightMenu] = useState(false);
	function whichInfoMenu(button, boxInfoMenu) {
		if (button === "rightButton") {
			if (boxInfoMenu === "whiteBox") return "blueBox";
			if (boxInfoMenu === "blueBox") return "purpleBox";
			if (boxInfoMenu === "purpleBox") return "purpleBox";
		}
		if (button === "leftButton") {
			if (boxInfoMenu === "purpleBox") return "blueBox";
			if (boxInfoMenu === "blueBox") return "whiteBox";
			if (boxInfoMenu === "whiteBox") return "whiteBox";
		}
	}

	function doIGo(button, boxInfoMenu) {
		if (button === "rightButton") {
			if (boxInfoMenu === "whiteBox") return goRight();
			if (boxInfoMenu === "blueBox") return goRight();
			if (boxInfoMenu === "purpleBox") return null;
		}
		if (button === "leftButton") {
			if (boxInfoMenu === "purpleBox") return goLeft();
			if (boxInfoMenu === "blueBox") return goLeft();
			if (boxInfoMenu === "whiteBox") return null;
		}
	}

	const goLeft = () => {
		setX(x + 100);
	};
	const goRight = () => {
		setX(x - 100);
	};

	return (
		<div>
			{" "}
			<Box
				style={{
					paddingTop: "43vh",
					display: "flex",
					justifyContent: "space-between"
				}}
			>
				<Avatar
					onMouseEnter={() => {
						setLeftMenu(true);
					}}
					onMouseLeave={() => {
						setLeftMenu(false);
					}}
					onClick={() => {
						setBoxInfoMenu(whichInfoMenu("leftButton", boxInfoMenu));
						doIGo("leftButton", boxInfoMenu);
					}}
					style={{
						cursor: "pointer",
						backgroundColor:
							leftMenu && boxInfoMenu !== "whiteBox" ? "#00000066" : "#00000026"
					}}
				>
					<AiFillCaretLeft
						style={{ color: "#ffffffCC", paddingRight: "2px" }}
						size="4vh"
					/>
				</Avatar>
				<Avatar
					onMouseEnter={() => {
						setRightMenu(true);
					}}
					onMouseLeave={() => {
						setRightMenu(false);
					}}
					onClick={() => {
						setBoxInfoMenu(whichInfoMenu("rightButton", boxInfoMenu));
						doIGo("rightButton", boxInfoMenu);
					}}
					style={{
						cursor: "pointer",
						backgroundColor:
							rightMenu && boxInfoMenu !== "purpleBox"
								? "#00000066"
								: "#00000026"
					}}
				>
					<AiFillCaretRight
						style={{ color: "#ffffffCC", paddingLeft: "2px" }}
						size="4vh"
					/>
				</Avatar>
			</Box>
		</div>
	);
};

export default CentralButtons;

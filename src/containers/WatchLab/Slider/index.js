import React from "react";
import Container from "@mui/material/Container";
import Boxes from "../Boxes";
import Boxes2 from "../Boxes2";
import Boxes3 from "../Boxes3";

const Slider = ({ x }) => {
	const configBox = {
		x
	};

	let sliderArr = [
		<Boxes {...configBox} />,
		<Boxes2 {...configBox} />,
		<Boxes3 {...configBox} />,
		4
	];

	return (
		<div style={{ height: "100vh", width: "100%", display: "flex" }}>
			{sliderArr.map((item, index) => {
				return (
					<Container
						style={{
							minWidth: "100%",
							zIndex: "1",
							transition: "0.5s",
							transform: `translateX(${x}%)`
						}}
						key={index}
					>
						{item}
					</Container>
				);
			})}
		</div>
	);
};

export default Slider;

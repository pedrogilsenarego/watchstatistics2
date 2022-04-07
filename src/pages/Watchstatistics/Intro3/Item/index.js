import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { useHistory } from "react-router-dom";

const Item = ({ title, path, icon, color }) => {
	const [hover, setHover] = useState(false);
	const history = useHistory();
	return (
		<Grid
			item
			xs={6}
			onClick={() => history.push(path)}
			onMouseEnter={() => {
				setHover(true);
			}}
			onMouseLeave={() => {
				setHover(false);
			}}
			style={{ transition: "transform 350ms ease-in" }}
		>
			<Box
				style={{
					textAlign: "center",
					cursor: "pointer",
					border: "solid 1.5px",
					borderRadius: "10px",
					borderColor: "hotpink",
					padding: "10px",
					backgroundColor: "#0D0D0F",
					transform: hover ? "scale(1.05)" : "scale(1)",
					boxShadow: hover ? "0 0 1.5rem hsl(0 0% 100%)" : null
				}}
			>
				{icon}
				<Typography style={{ color: color ? color : "hotPink" }}>
					{title}
				</Typography>
			</Box>
		</Grid>
	);
};

export default Item;

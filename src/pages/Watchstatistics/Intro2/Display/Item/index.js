import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@material-ui/core";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@material-ui/core";

const Item = ({ item, pos, filterType }) => {
	const [hover, setHover] = useState(false);
	const history = useHistory();
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<Grid item xs={6} style={{ transition: "transform 350ms ease-in" }}>
			<Paper
				onClick={() => {
					history.push(`/product/${item.documentID}`);
				}}
				onMouseEnter={() => {
					setHover(true);
				}}
				onMouseLeave={() => {
					setHover(false);
				}}
				style={{
					height: "110px",
					backgroundColor: "#18161E",
					padding: "10px",
					cursor: "pointer",
					transform: hover ? "scale(1.05)" : "scale(1)"
				}}
			>
				<Grid item container spacing={0.5}>
					<Grid item xs={8}>
						<Typography style={{ color: "hotPink" }}>
							{filterType} #{pos + 1}
						</Typography>
						<Typography style={{ color: "white" }}>
							{item.productBrand} {item.productName}
						</Typography>
						<Typography style={{ color: "#ffffff66" }}>
							{item.reference}
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<CardMedia
							component="img"
							height={isMatch ? "50" : "80"}
							image={item.productThumbnail[0]}
							alt={item.productName}
							style={{ borderRadius: "8px" }}
						/>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
};

export default Item;

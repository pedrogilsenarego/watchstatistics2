import React from "react";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router";
import CardMedia from "@mui/material/CardMedia";

const Item = ({ item }) => {
	const history = useHistory();

	return (
		<>
			<CardMedia
				style={{ cursor: "pointer" }}
				component="img"
				height="90vh"
				image={item.productThumbnail[0]}
				alt={item.productName}
				onClick={() => history.push(`/product/${item.documentID}`)}
			/>

			<Typography
				fontSize={"12px"}
				style={{ marginTop: "5px", fontWeight: "500" }}
			>
				{item.productBrand} {item.productName}: {item.reference}
			</Typography>
			<Typography fontSize={"12px"} style={{ color: "#ffffff66" }}>
				Votes: {item.numberVotesOwn + item.numberVotesNotOwn} . Score:{" "}
				{item.avgTotal}
			</Typography>
			<Typography fontSize={"12px"} style={{ color: "#ffffff66" }}>
				{item.userID}
			</Typography>
		</>
	);
};

export default Item;

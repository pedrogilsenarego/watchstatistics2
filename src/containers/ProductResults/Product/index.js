import React, { useState } from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, CardMedia, Box } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles((theme) => ({
	root: {},
	media: {
		height: "45vh"
	},
	media2: {
		height: "45vh",
		"&:hover": {
			transform: "scale(1.2)",
			transition: "all 3s ease-in-out 50ms"
		}
	},
	imageWrapper: {
		overflow: "hidden",
		height: "45vh"
	},

	text: {
		color: "#ffffff",
		fontSize: "13px",
		textAlign: "center",
		fontFamily: "'Comfortaa', cursive"
	}
}));

const Product = (product) => {
	const [onMouse, setOnMouse] = useState(true);
	const history = useHistory();

	const {
		documentID,
		productThumbnail,
		productName,
		productBrand,
		avgTotal,
		reference,
		numberVotesOwn,
		numberVotesNotOwn
	} = product;
	if (!documentID || !productThumbnail || !productName) return null;

	// eslint-disable-next-line
	const classes = useStyles();

	return (
		<Box className={classes.root} alt={productName} key={reference}>
			{onMouse && (
				<CardMedia
					className={classes.media}
					image={productThumbnail[0]}
					onClick={() => setOnMouse(false)}
					onMouseEnter={() => setOnMouse(false)}
				/>
			)}
			{!onMouse && (
				<div className={classes.imageWrapper}>
					<CardMedia
						className={classes.media2}
						image={productThumbnail[0]}
						style={{
							position: "relative",
							cursor: "pointer"
						}}
						onMouseLeave={() => setOnMouse(true)}
						onClick={() => history.push(`/product/${documentID}`)}
					>
						{" "}
						<Box
							height={"100%"}
							bgcolor="#040406B3"
							style={{
								cursor: "pointer"
							}}
						>
							{" "}
							<Grid
								container
								spacing={0}
								direction="column"
								alignItems="center"
								justifyContent="center"
							>
								<Typography
									style={{
										cursor: "pointer",
										paddingTop: "90px"
									}}
									className={classes.text}
									onMouseEnter={() => setOnMouse(false)}
									onClick={() => history.push(`/product/${documentID}`)}
								>
									<strong>
										{productBrand} {productName}
									</strong>
								</Typography>

								<Divider style={{ width: "80%", background: "white" }} />
								<Typography
									style={{
										cursor: "pointer",
										paddingTop: "10px"
									}}
									className={classes.text}
									onMouseEnter={() => setOnMouse(false)}
									onClick={() => history.push(`/product/${documentID}`)}
								>
									<strong>Ref:</strong> {reference}
								</Typography>
								<Typography
									style={{
										cursor: "pointer"
									}}
									className={classes.text}
									onMouseEnter={() => setOnMouse(false)}
									onClick={() => history.push(`/product/${documentID}`)}
								>
									<strong>Score:</strong> {avgTotal}
								</Typography>
								<Typography
									style={{
										cursor: "pointer"
									}}
									className={classes.text}
									onMouseEnter={() => setOnMouse(false)}
									onClick={() => history.push(`/product/${documentID}`)}
								>
									<strong>Votes:</strong> {numberVotesNotOwn + numberVotesOwn}
								</Typography>
							</Grid>
						</Box>
					</CardMedia>
				</div>
			)}
		</Box>
	);
};

export default Product;

/* <Typography gutterBottom variant="h5" component="h2">
						{productBrand} - {productName}
					</Typography>
					<Typography>Score: {avgTotal}</Typography>
					<Typography>Votes: {numberVotesNotOwn + numberVotesOwn}</Typography> */

/* <Button
						component={NavLink}
						to={`/product/${documentID}`}
						size="small"
						color="secondary"
					>
						Vote Here
					</Button>; */

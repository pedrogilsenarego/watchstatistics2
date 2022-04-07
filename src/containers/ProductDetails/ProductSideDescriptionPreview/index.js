import React from "react";
import { Typography, Box, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	textBtn: {
		color: "#FFFFFF",
		fontSize: "13px",
		"&:hover": {
			color: "#FFA500"
		},
		"&:active": {
			color: "#FFFFFF"
		}
	}
}));

// eslint-disable-next-line
const ProductSideDescriptionPreview = (product) => {
	const { productDesc, additionalData } = product;

	const classes = useStyles();

	const openInNewTab = (url) => {
		const newWindow = window.open(url, "_blank", "noopener,noreferrer");
		if (newWindow) newWindow.opener = null;
	};

	return (
		<div>
			<Box
				color={"text.secondary"}
				borderRadius="10px"
				sx={{ minHeight: "70.4vh" }}
			>
				<Typography
					variant={"h6"}
					style={{ paddingLeft: "10px", color: "#ffffff" }}
				>
					Description
				</Typography>
				<Box
					overflow="hidden"
					sx={{
						minHeight: "60vh",

						height: "100%",
						position: "relative",
						paddingTop: "10px"
					}}
				>
					<Typography
						dangerouslySetInnerHTML={{ __html: productDesc }}
						align="justify"
						style={{
							width: "100%",
							paddingLeft: "10px",
							paddingRight: "10px",
							paddingBottom: "10px",
							maxHeight: "60vh",
							position: "absolute",
							overflow: "scroll",
							color: "#ffffffBF"
						}}
					/>
				</Box>
			</Box>
			<Box sx={{ paddingLeft: "10px", paddingRight: "10px" }}>
				<Divider style={{ background: "white" }} />
			</Box>
			<Box
				color={"text.secondary"}
				borderRadius="10px"
				style={{ marginTop: "5px" }}
			>
				<Grid container>
					{additionalData &&
						additionalData.map((additionalData, pos) => {
							return (
								<Grid xs={6} md={3}>
									<Button
										className={classes.textBtn}
										align="justify"
										style={{ width: "100%", padding: "10px" }}
										onClick={() => openInNewTab(`${additionalData.link}`)}
									>
										{additionalData.title}
									</Button>
								</Grid>
							);
						})}
				</Grid>
			</Box>
		</div>
	);
};

export default ProductSideDescriptionPreview;

//className={classes.legend}
//			dangerouslySetInnerHTML={{ __html: productDesc }}

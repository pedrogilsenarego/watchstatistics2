import React, { useState } from "react";

import SideDescriptionPreview from "../../components/ProductDetails/ProductSideDescriptionPreview";
import { makeStyles } from "@material-ui/core/styles";
import { BsXDiamond } from "react-icons/bs";

import { Parallax } from "react-parallax";

import {
	Grid,
	Card,
	CardMedia,
	CardContent,
	IconButton,
	Box
} from "@material-ui/core";
import ProductSideListPreview from "../../components/ProductDetails/ProductSideListPreview";

const image1 =
	"https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2018/09/17/5595aa2e-863a-4243-ad43-87437f688e78/scuba-diving";
const image2 =
	"https://upload.wikimedia.org/wikipedia/commons/e/e7/Bluebells_%2834146232732%29.jpg";
const image3 =
	"https://www.idesignarch.com/wp-content/uploads/Buckingham-Palace-Throne-Room.jpg";

const image4 = "https://wallpaperaccess.com/full/465780.jpg";
const image5 =
	"https://assets-prd.formulae.cloud/-/media/images/news/2020/september/formula-e-grid-shot-start.jpg?modified=20200924095253&cx=0.5&cy=0.8&cw=1440&ch=707&hash=A789C5D311486689FF8C7780CA9E3249";

const useStyles = makeStyles((theme) => ({
	root: {},

	filter: {},

	media: {
		height: "94vh",
		textAlign: "right",
		paddingTop: "86vh",
		paddingRight: "5px"
	},
	side: {
		height: "94vh"
	},
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
const ProductDetails = (configPreview) => {
	const {
		productThumbnail,
		productBackground,
		productCategory,
		productName,
		productDesc,
		additionalData
	} = configPreview;
	const [mainImage, setMainImage] = useState(null);

	const configSideDesc = {
		productDesc: productDesc,
		additionalData: additionalData
	};

	const configSideList = {};

	const classes = useStyles();

	const bgImage = () => {
		if (productBackground) return productBackground;
		if (productCategory === "field") return image2;
		if (productCategory === "divers") return image1;
		if (productCategory === "dress") return image3;
		if (productCategory === "pilot") return image4;
		if (productCategory === "racing") return image5;
	};

	return (
		<Box>
			<Parallax style={{}} bgImage={bgImage()} strength={300}>
				<Box
					className={classes.filter}
					height={"100%"}
					style={{
						position: "relative"
					}}
				>
					<Grid
						container
						spacing={1}
						style={{
							paddingTop: "70px",
							paddingLeft: "10px",
							paddingRight: "10px"
						}}
					>
						<Grid item xs={12}>
							<Box alt={productName}>
								{!mainImage && (
									<CardMedia
										className={classes.media}
										image={productThumbnail[0]}
									>
										{productThumbnail &&
											productThumbnail.map((productThumbnail, pos) => {
												return (
													<IconButton
														className={classes.textBtn}
														onClick={(e) => {
															setMainImage(productThumbnail);
														}}
													>
														<BsXDiamond fontSize="1.5em" />
													</IconButton>
												);
											})}
									</CardMedia>
								)}
								{mainImage && (
									<CardMedia className={classes.media} image={mainImage}>
										{productThumbnail &&
											productThumbnail.map((productThumbnail, pos) => {
												return (
													<IconButton
														className={classes.textBtn}
														onClick={(e) => {
															setMainImage(productThumbnail);
														}}
													>
														<BsXDiamond fontSize="1.5em" />
													</IconButton>
												);
											})}
									</CardMedia>
								)}
							</Box>
						</Grid>

						<Grid item xs={12}>
							<Card style={{ backgroundColor: "#04040699" }}>
								<CardContent style={{ padding: "5px" }}>
									<SideDescriptionPreview {...configSideDesc} />
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12}>
							<Card
								style={{ backgroundColor: "#04040699", marginBottom: "10px" }}
							>
								<CardContent style={{ padding: "5px" }}>
									<ProductSideListPreview {...configSideList} />
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Box>
			</Parallax>
		</Box>
	);
};

export default ProductDetails;

import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Item from "./Item";

import { BiAddToQueue, BiTrophy } from "react-icons/bi";
import { GoMirror } from "react-icons/go";
import { BsInboxesFill } from "react-icons/bs";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@material-ui/core";

const Intro3 = () => {
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Container
			maxWidth={"md"}
			style={{
				marginBottom: "200px",
				marginTop: isMatch ? "10vh" : "20vh"
			}}
		>
			<Grid container style={{ perspective: "50rem" }}>
				<Grid
					item
					xs={4}
					md={6}
					style={{
						textTransform: "uppercase",
						marginTop: "25px",
						transform: isMatch ? "translateX(20px)" : null
					}}
				>
					<Typography variant={isMatch ? "h7" : "h4"} fontWeight={600}>
						Explore different features, a{" "}
					</Typography>
					<Typography
						fontWeight={600}
						variant={isMatch ? "h6" : "h3"}
						style={{ color: "hotpink" }}
					>
						community
					</Typography>
					<Typography fontWeight={600} variant={isMatch ? "h7" : "h4"}>
						{" "}
						dynamic project
					</Typography>
					<Typography>Share your ideas and help us growth</Typography>
					<Button
						variant="contained"
						style={{
							backgroundImage:
								"linear-gradient(90deg, rgba(214,121,41,1) 50%, rgba(193,74,27,1) 100%)",
							marginTop: "5px"
						}}
					>
						Here
					</Button>
				</Grid>
				<Grid
					container
					item
					xs={8}
					md={6}
					spacing={1}
					style={{ transform: "rotateY(-40deg)" }}
				>
					<svg width="0" height="0">
						<linearGradient
							id="orange-blue-gradient"
							x1="100%"
							y1="100%"
							x2="0%"
							y2="0%"
						>
							<stop stopColor="darkBlue" offset="0%" />
							<stop stopColor="hotPink" offset="100%" />
						</linearGradient>
					</svg>
					<Item
						title="Compare"
						color="purple"
						path="/watchstatistics/comparewatches"
						icon={
							<GoMirror
								fontSize={"4em"}
								style={{ fill: "url(#orange-blue-gradient)" }}
							/>
						}
					/>
					<svg width="0" height="0">
						<linearGradient
							id="orange-gradient"
							x1="100%"
							y1="100%"
							x2="0%"
							y2="0%"
						>
							<stop stopColor="#ffffff" offset="0%" />
							<stop stopColor="#D97116" offset="100%" />
						</linearGradient>
					</svg>
					<Item
						title="Submit"
						color="orange"
						icon={
							<BiAddToQueue
								fontSize={"4em"}
								style={{ fill: "url(#orange-gradient)" }}
							/>
						}
					/>
					<svg width="0" height="0">
						<linearGradient
							id="blue-gradient"
							x1="100%"
							y1="100%"
							x2="0%"
							y2="0%"
						>
							<stop stopColor="#7a6ded" offset="0%" />
							<stop stopColor="#591885" offset="100%" />
						</linearGradient>
					</svg>
					<Item
						title="Build and trade"
						color="#591885"
						icon={
							<BsInboxesFill
								fontSize={"4em"}
								style={{ fill: "url(#blue-gradient)" }}
							/>
						}
					/>
					<Item
						title="Play games"
						icon={<BiTrophy fontSize={"4em"} color="hotPink" />}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Intro3;

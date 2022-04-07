import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import Typist from "react-typist";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@material-ui/core";

const svgVariants = {
	hidden: { rotate: -180 },
	visible: { rotate: 0, transition: { animation: 1 } }
};

const pathVariants = {
	hidden: {
		opacity: 0,
		pathLength: 0
	},
	visible: {
		opacity: 1,
		pathLength: 1,
		transition: {
			duration: 3,
			ease: "easeInOut"
		}
	}
};

const Intro4 = () => {
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

	const [scrollY, setScrollY] = useState(0);

	function logit() {
		setScrollY(window.pageYOffset);
	}

	useEffect(() => {
		function watchScroll() {
			window.addEventListener("scroll", logit);
		}
		watchScroll();
		return () => {
			window.removeEventListener("scroll", logit);
		};
	});

	return (
		<Container
			maxWidth={isMatch ? "xs" : "sm"}
			style={{
				marginTop: isMatch ? "10vh" : "20vh",

				padding: "20px"
			}}
		>
			{scrollY > 200 && (
				<Grid
					alignItems="center"
					justifyContent="center"
					container
					style={{ color: "hotPink" }}
				>
					<Grid item style={{ position: "absolute", marginLeft: "20vw" }}>
						<Typist
							cursor={{ show: false, hideWhenDone: true, hideWhenDoneDelay: 0 }}
						>
							<Typography style={{}}>
								Contribute to a new ecosystem for watch lovers
							</Typography>
						</Typist>
					</Grid>
					<motion.svg
						variants={svgVariants}
						initial="hidden"
						animate="visible"
						fill="hotPink"
						viewBox="0 0 100 101"
					>
						<motion.path
							variants={pathVariants}
							class="fil0 str0"
							d="M84.2163432,86.4589839 C75.2720219,94.8564365 63.2366828,100 50,100 C22.3857625,100 0,77.6142375 0,50 C0,22.3857625 22.3857625,1.13686838e-13 50,1.13686838e-13 C63.1983248,1.13686838e-13 75.2022585,5.11379605 84.1385074,13.4680944 L76.3546493,21.2519525 C69.4138659,14.8856019 60.1606984,11 50,11 C28.4608948,11 11,28.4608948 11,50 C11,71.5391052 28.4608948,89 50,89 C60.1990671,89 69.4837363,85.0849972 76.4331793,78.67582 L84.2163432,86.4589839 L84.2163432,86.4589839 Z"
						/>
					</motion.svg>
				</Grid>
			)}
		</Container>
	);
};

export default Intro4;

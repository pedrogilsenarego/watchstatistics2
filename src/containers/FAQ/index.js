import React from "react";

import {
	Grid,
	Box,
	Paper,
	Typography,
	useMediaQuery,
	useTheme
} from "@material-ui/core";

const FAQ = () => {
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<div style={{minHeight: "50vh"}}>
			<Grid container justifyContent="center" style={{ marginTop: "120px" }}>
				<Paper
					style={{ width: isMatch ? "95vw" : "75vw", background: "#196B91" }}
				>
					<Box style={{ margin: "10px" }}>
						<Grid container>
							<Grid item xs={12}>
								<Typography style={{ fontSize: "30px" }}>FAQ</Typography>
							</Grid>
							<Grid item xs={12} style={{ marginTop: "20px" }}>
								<Typography style={{ fontSize: "16px", fontWeight: 600 }}>
									How do I get Points?
								</Typography>
								<Typography style={{ marginTop: "5px", fontSize: "14px" }}>
									At this moment there are three ways of gaining points:
									<br />
									1. Voting for Watches - 1 point
									<br />
									2. Submiting new Watches - 4 points
									<br />
									3. Adding details on Watches - 0.5 point/each
								</Typography>
							</Grid>
						</Grid>
					</Box>
				</Paper>
			</Grid>
		</div>
	);
};

export default FAQ;

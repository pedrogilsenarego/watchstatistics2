import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { fetchMarketProductsStart } from "../../redux/Market/market.actions";
import Item from "./Item";

const mapState = (state) => ({
	marketData: state.marketData.marketProducts,
	currentUser: state.user.currentUser
});

const Market = () => {
	const { marketData, currentUser } = useSelector(mapState);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchMarketProductsStart({}));
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<Grid
				container
				spacing={2}
				style={{ marginTop: "100px" }}
				justifyContent="center"
			>
				<Grid item xs={12}>
					<Container style={{ backgroundColor: "#154A6799" }}>
						<Button style={{ color: "white" }}>Market</Button>
					</Container>
				</Grid>
				<Grid item xs={12}>
					<Container style={{}}>
						{marketData.map((item, pos) => {
							const configItem = { item, pos, marketData, currentUser };
							return <Item key={pos} {...configItem} />;
						})}
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};

export default Market;

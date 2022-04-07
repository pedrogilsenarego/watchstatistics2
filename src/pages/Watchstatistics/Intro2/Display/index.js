import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { fetchProductsStart } from "../../../../redux/Products/products.actions";
import Item from "./Item";

const mapState = (state) => ({
	products: state.productsData.products
});

const Display = () => {
	const dispatch = useDispatch();
	const { products } = useSelector(mapState);

	const { data } = products;

	const pageSize = 4;
	const filterType = "Divers";
	const filter = "productCategory";

	useEffect(
		() => {
			dispatch(fetchProductsStart({ pageSize, filterType, filter }));
		},
		// eslint-disable-next-line
		[]
	);

	return (
		<div style={{}}>
			<Grid container spacing={1} style={{ display: "flex" }}>
				{data &&
					data.map((item, pos) => {
						const configItem = { item, pos, filter, filterType };
						return <Item key={pos} {...configItem} />;
					})}
			</Grid>
		</div>
	);
};

export default Display;

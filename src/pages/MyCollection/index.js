import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { fetchMyCollectionStart } from "../../redux/Products/products.actions";

import Item from "./Item";

const mapState = (state) => ({
	currentUser: state.user.currentUser,
	products: state.productsData.myCollection
});

const MyCollection = () => {
	const { currentUser, products } = useSelector(mapState);
	const dispatch = useDispatch();

	const myCollection = currentUser.collection ? currentUser.collection : [];

	useEffect(
		() => {
			dispatch(fetchMyCollectionStart({ myCollection }));
		},
		// eslint-disable-next-line
		[]
	);

	if (!Array.isArray(products)) return null;

	if (products.length < 1) {
		return (
			<div>
				<p>No search Results</p>
			</div>
		);
	}

	const bagSize = () => {
		if (getExperience() < 20) return 10;
		if (getExperience() < 100) return 12;
		if (getExperience() < 200) return 14;
		if (getExperience() < 500) return 16;
		if (getExperience() < 1500) return 18;
		if (getExperience() < 5000) return 20;
		else return 15;
	};

	const getExperience = () => {
		if (currentUser) return currentUser.experience ? currentUser.experience : 0;
		else return 0;
	};

	const getCollection = () => {
		if (currentUser)
			return currentUser.collection ? currentUser.collection.length : 0;
		else return 0;
	};

	const relativePosFunct2 = () => {
		let newArray = [];
		for (let i = 0; i < myCollection.length; i++) {
			for (let j = 0; j < products.length; j++) {
				if (products[j].documentID === myCollection[i]) {
					newArray.push(j);
					break;
				}
			}
		}
		return newArray;
	};

	const relativePos = products ? relativePosFunct2() : [];

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
						<Button style={{ color: "white" }}>All Watches</Button>

						<Button style={{ float: "right" }}>
							{getCollection()}/{bagSize()}
						</Button>
					</Container>
				</Grid>
				<Container>
					<Grid
						item
						container
						spacing={1}
						xs={12}
						style={{ marginTop: "20px" }}
					>
						{currentUser.collection &&
							myCollection.map((item, pos) => {
								const configItem = { item, pos, relativePos, products };
								return <Item item={item} key={pos} {...configItem} />;
							})}
					</Grid>
				</Container>
			</Grid>
		</div>
	);
};

export default MyCollection;

/*  */

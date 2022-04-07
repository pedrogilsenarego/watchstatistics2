import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { buyMarketProduct } from "../../../redux/Market/market.actions";
import {
	updateCollectionStatus,
	updateSellerStatus
} from "../../../redux/User/user.actions";

const Item = ({ item, pos, marketData, currentUser }) => {
	const dispatch = useDispatch();
	const [funds, setFunds] = useState(false);

	useEffect(() => {
		if (currentUser.points >= item.price) setFunds(true);
	}, [currentUser.points, item.price]);

	const handleBuyItem = () => {
		if (currentUser.points >= item.price) {
			const newCollection = currentUser.collection
				? currentUser.collection
				: [];
			newCollection.push(item.productID);
			const configUpdateCollection = {
				...currentUser,
				flag: "buy",
				userID: currentUser.id,
				collection: newCollection,
				points: currentUser.points - item.price
			};

			dispatch(updateCollectionStatus(configUpdateCollection));

			const configBuyItem = {
				documentID: item.documentID
			};
			dispatch(buyMarketProduct(configBuyItem));

			const newMessage = {
				from: "watchstatistics",
				message: `Congratulation you sold your ${item.productBrand} ${item.productName} ${item.reference}, you added ${item.price} points to your currency`,
				date: new Date()
			};

			const configSellerUpdate = {
				userID: item.UserUID,
				points: item.price,
				messages: newMessage
			};
			dispatch(updateSellerStatus(configSellerUpdate));
		}
	};

	return (
		<div style={{ display: "flex" }}>
			<Typography>
				{item.productBrand} {item.productName} {item.reference} {item.price}
			</Typography>
			<Button disabled={!funds} onClick={() => handleBuyItem()}>
				Buy
			</Button>
		</div>
	);
};

export default Item;

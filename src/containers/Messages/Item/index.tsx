import React from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { removeMessage } from "../../../redux/User/user.actions";

interface Props {
	item: { from: string; message: string };
	pos: number;
	messages: Array<object>;
	id: string;
}

const Item = ({ item, pos, messages, id }: Props) => {
	const dispatch = useDispatch();

	const handleDeleteMessage = (pos: number) => {
		const newArrayMessages = messages;
		newArrayMessages.splice(pos, 1);
		const configDeleteMessage = {
			messages: newArrayMessages,
			userID: id
		};
		dispatch(removeMessage(configDeleteMessage));
	};

	return (
		<div style={{ display: "flex" }}>
			<p>
				{item.from} - {item.message}
			</p>
			<Button
				onClick={() => {
					handleDeleteMessage(pos);
				}}
			>
				Delete
			</Button>
		</div>
	);
};

export default Item;

import React from "react";
import Item from "./Item";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { clearMessages } from "../../redux/User/user.actions";

const mapState = (state) => ({
	currentUser: state.user.currentUser
});

const Messages = () => {
	const { currentUser } = useSelector(mapState);
	const dispatch = useDispatch();
	const { messages, id } = currentUser;

	const handleClearMessages = () => {
		const configClearMessages = {
			...currentUser,
			userID: id,
			messages: []
		};
		dispatch(clearMessages(configClearMessages));
	};

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
						<Button style={{ color: "white" }}>Messages</Button>
						<Button
							onClick={() => {
								handleClearMessages();
							}}
							style={{ color: "white" }}
						>
							Clear Messages
						</Button>
					</Container>
				</Grid>
				<Grid item xs={12}>
					<Container style={{}}>
						{currentUser.messages &&
							messages.map((item, pos) => {
								const configItem = { item, pos, messages, id };
								return <Item {...configItem} />;
							})}
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};

export default Messages;

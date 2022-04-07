import React from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Typography
} from "@material-ui/core";
 
const Popup = (props) => {
	const { title, children, openPopup, setOpenPopup } = props;

	return (
		<div>
			<Dialog
				open={openPopup}
				onClick={() => {
					setOpenPopup(false);
				}}
				style={{ color: "black" }}
			>
				<DialogTitle>
					<div style={{ textAlign: "center" }}>
						<Typography variant="h6" component="div" style={{ color: "black" }}>
							{title}
						</Typography>
					</div>
				</DialogTitle>
				<DialogContent dividers>{children}</DialogContent>
			</Dialog>
		</div>
	);
};
export default Popup;

import React from "react";

import { WhatsappShareButton } from "react-share";
import { WhatsappIcon } from "react-share";

const FacebookShare = ({ ...otherProps }) => {
	const { quote, url } = otherProps;
	return (
		<WhatsappShareButton
			title={quote}
			url={url}
			style={{ transform: "translateY(2px)" }}
		>
			<WhatsappIcon iconFillColor="white" size="6vh" round={true} />
		</WhatsappShareButton>
	);
};

export default FacebookShare;

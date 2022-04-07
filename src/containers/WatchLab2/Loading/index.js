import React from "react";

const Loading = () => {
	return <React.Suspense fallback="loading...">Loading...</React.Suspense>;
};

export default Loading;

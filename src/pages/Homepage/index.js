import React from "react";
import WatchstatisticsSubHeader from "../../containers/watchstatisticsRooster/WatchstatisticsSubHeader";

import { useSelector } from "react-redux";
import HomePageComponent from "../../containers/Homepage";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

const HomePage = () => {
  const { currentUser } = useSelector(mapState);
  return (
    <div style={{ minHeight: "55vh" }}>
      <WatchstatisticsSubHeader {...currentUser} />
      <HomePageComponent />
    </div>
  );
};

export default HomePage;

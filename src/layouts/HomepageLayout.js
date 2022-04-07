import React from "react";
import Header from "../containers/Header";
import Footer from "../containers/Footer";

const HomepageLayout = (props) => {
  return (
    <div className="fullHeight">
      <Header {...props} />
      {props.children}
      <Footer {...props} />
    </div>
  );
};

export default HomepageLayout;

import React from "react";
import Header from "../containers/Header";
import Footer from "../containers/Footer";

const HomepageLayout = (props) => {
  return (
    < >
      <Header {...props} />
      {props.children}
      <Footer {...props} />
    </>
  );
};

export default HomepageLayout;

import React from "react";
import Header from "../containers/Header";
import Footer from "../containers/Footer";

const MainLayout = (props) => {
  return (
    <div>
      <Header {...props} />
      {props.children}
      <Footer {...props} />
    </div>
  );
};

export default MainLayout;

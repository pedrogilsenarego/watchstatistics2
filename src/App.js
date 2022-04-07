import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import "./default.scss";
import { checkUserSession } from "./redux/User/user.actions";

//hoc
import WithAuth from "./hoc/withAuth";
import WithAdminAuth from "./hoc/withAdminAuth";

//pages
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import MyCollection from "./pages/MyCollection";
import Admin from "./pages/Admin";
import ProductDetails from "./pages/ProductDetails";
import ProductDetailsPreview from "./pages/ProductDetailsPreview";
import FAQ from "./pages/FAQ";
import Watchstatistics from "./pages/Watchstatistics";
import AddWatch from "./pages/Watchstatistics/AddWatch";
import CompareWatches from "./pages/CompareWatches";
import WatchLaboratory2 from "./containers/WatchLab2";
import Market from "./pages/Market";
import Messages from "./pages/Messages";
import Browse from "./containers/Browse";
import Order from "./pages/Order";

// layouts
import HomepageLayout from "./layouts/HomepageLayout";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import DashBoardLayout from "./layouts/DashboardLayout";
import WatchLab from "./layouts/WatchLab";

//components
import CookiePolicy from "./components/CookiePolicy";

import {
  StyledEngineProvider,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { darkTheme, lightTheme } from "./styles/MUITheme";
import { useSelector } from "react-redux";
import HomePage from "./pages/Homepage";
import SubmitFeedback from "./pages/SubmitFeedback";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

const App = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);

  useEffect(
    () => {
      dispatch(checkUserSession());
    },
    // eslint-disable-next-line
    []
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider
        theme={
          currentUser
            ? !currentUser.theme
              ? darkTheme
              : lightTheme
            : darkTheme
        }
      >
        <CssBaseline />
        <CookiePolicy />
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                currentUser ? (
                  <HomepageLayout>
                    <HomePage />
                  </HomepageLayout>
                ) : (
                  <MainLayout>
                    <Watchstatistics />
                  </MainLayout>
                )
              }
            />

            <Route
              exact
              path="/watchstatistics/comparewatches"
              render={() => (
                <MainLayout>
                  <CompareWatches />
                </MainLayout>
              )}
            />
            <Route
              exact
              path="/browse"
              render={() => (
                <MainLayout>
                  <Browse />
                </MainLayout>
              )}
            />
            <Route
              exact
              path="/watchstatistics/watchlaboratory"
              render={() => (
                <WithAuth>
                  <WatchLab>
                    <WatchLaboratory2 />
                  </WatchLab>
                </WithAuth>
              )}
            />
            <Route
              exact
              path="/messages"
              render={() => (
                <WithAuth>
                  <MainLayout>
                    <Messages />
                  </MainLayout>
                </WithAuth>
              )}
            />

            <Route
              exact
              path="/watchstatistics/addwatch"
              render={() => (
                <WithAuth>
                  <WatchLab>
                    <AddWatch />
                  </WatchLab>
                </WithAuth>
              )}
            />
            <Route
              exact
              path="/watchstatistics/market"
              render={() => (
                <WithAuth>
                  <MainLayout>
                    <Market />
                  </MainLayout>
                </WithAuth>
              )}
            />
            <Route
              exact
              path="/browse/tiles"
              render={() => (
                <WatchLab>
                  <Search />
                </WatchLab>
              )}
            />
            <Route
              path="/search/:filterType"
              render={() => (
                <WatchLab>
                  <Search />
                </WatchLab>
              )}
            />
            <Route
              path="/product/:productID"
              render={() => (
                <MainLayout>
                  <ProductDetails />
                </MainLayout>
              )}
            />
            <Route
              path="/product/preview"
              render={() => (
                <WithAuth>
                  <MainLayout>
                    <ProductDetailsPreview />
                  </MainLayout>
                </WithAuth>
              )}
            />
            <Route
              path="/FAQ"
              render={() => (
                <MainLayout>
                  <FAQ />
                </MainLayout>
              )}
            />

            <Route
              path="/dashboard"
              render={() => (
                <WithAuth>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </WithAuth>
              )}
            />
            <Route
              path="/mycollection"
              render={() => (
                <WithAuth>
                  <MainLayout>
                    <MyCollection />
                  </MainLayout>
                </WithAuth>
              )}
            />
            <Route
              path="/order/:orderID"
              render={() => (
                <WithAuth>
                  <DashBoardLayout>
                    <Order />
                  </DashBoardLayout>
                </WithAuth>
              )}
            />
            <Route
              path="/admin"
              render={() => (
                <WithAdminAuth>
                  <AdminLayout>
                    <Admin />
                  </AdminLayout>
                </WithAdminAuth>
              )}
            />
            <Route
              path="/submitfeedback"
              render={() => (
                <WithAuth>
                  <MainLayout>
                    <SubmitFeedback />
                  </MainLayout>
                </WithAuth>
              )}
            />
          </Switch>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;

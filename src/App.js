import { useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import "./default.scss";
import { checkUserSession } from "./redux/User/user.actions";

//hoc
import WithAuth from "./hoc/withAuth";
import WithAdminAuth from "./hoc/withAdminAuth";
import ScrollToTop from "./hoc/ScrollToTop";
//pages
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import MyCollection from "./containers/MyCollection";
import Admin from "./pages/Admin";
import ProductDetails from "./pages/ProductDetails";
import FAQ from "./pages/FAQ";
import Watchstatistics from "./pages/Watchstatistics";
import CompareWatches from "./pages/CompareWatches";
import WatchLaboratory2 from "./containers/WatchLab";
import Market from "src/containers/Market";
import Messages from "./pages/Messages";
import Browse from "./containers/Browse";
import Order from "./pages/Order";
import Mapper from "./containers/Mapper";
import DevelopmentPoles from "./containers/DevelopmentPoles";

// layouts
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import DashBoardLayout from "./layouts/DashboardLayout";
import WatchLab from "./layouts/WatchLab";

//components
import CookiePolicy from "./components/CookiePolicy";
import { Ellipsis } from "react-spinners-css";

import {
  StyledEngineProvider,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { darkTheme, lightTheme } from "./styles/MUITheme";
import { useSelector } from "react-redux";
import HomePage from "./pages/Homepage";
import SubmitFeedback from "./pages/SubmitFeedback";
import Snackbar from "./components/SnackBar";
import { generalEndpoints } from "./constants/endpoints";
import { saveLastEndpoint } from "./redux/general/general.actions";
import Shop from "./containers/Shop";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUser } = useSelector(mapState);

  useEffect(
    () => {
      dispatch(checkUserSession());
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(saveLastEndpoint(location.pathname));
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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
        <Snackbar />
        <CookiePolicy />
        <ScrollToTop />
        <Suspense
          fallback={
            <Ellipsis
              color='orange'
              size={100}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "auto",
                marginBottom: "auto",
              }}
            />
          }
        >
          <div className='App'>
            <Switch>
              <Route
                exact
                path='/'
                render={() =>
                  currentUser ? (
                    <MainLayout>
                      <HomePage />
                    </MainLayout>
                  ) : (
                    <MainLayout>
                      <Watchstatistics />
                    </MainLayout>
                  )
                }
              />

              <Route
                exact
                path={generalEndpoints.COMPARE_WATCHES}
                render={() => (
                  <MainLayout>
                    <CompareWatches />
                  </MainLayout>
                )}
              />
              <Route
                exact
                path={generalEndpoints.SHOP}
                render={() => (
                  <MainLayout>
                    <Shop />
                  </MainLayout>
                )}
              />
              <Route
                exact
                path='/mapper'
                render={() => (
                  <MainLayout>
                    <Mapper />
                  </MainLayout>
                )}
              />
              <Route
                exact
                path='/development-poles'
                render={() => (
                  <MainLayout>
                    <DevelopmentPoles />
                  </MainLayout>
                )}
              />
              <Route
                exact
                path='/browse'
                render={() => (
                  <MainLayout>
                    <Browse />
                  </MainLayout>
                )}
              />
              <Route
                exact
                path={generalEndpoints.WATCH_LABORATORY}
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
                path='/messages'
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
                path={generalEndpoints.SUBMIT_WATCHES}
                render={() => (
                  <WithAuth>
                    <MainLayout>
                      <ProductDetails />
                    </MainLayout>
                  </WithAuth>
                )}
              />

              <Route
                exact
                path={generalEndpoints.MARKET}
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
                path='/browse/tiles'
                render={() => (
                  <WatchLab>
                    <Search />
                  </WatchLab>
                )}
              />
              <Route
                path='/search/:filterType'
                render={() => (
                  <WatchLab>
                    <Search />
                  </WatchLab>
                )}
              />
              <Route
                path='/product/:productID'
                render={() => (
                  <MainLayout>
                    <ProductDetails />
                  </MainLayout>
                )}
              />

              <Route
                path='/FAQ'
                render={() => (
                  <MainLayout>
                    <FAQ />
                  </MainLayout>
                )}
              />

              <Route
                path='/dashboard'
                render={() => (
                  <WithAuth>
                    <MainLayout>
                      <Dashboard />
                    </MainLayout>
                  </WithAuth>
                )}
              />
              <Route
                path='/mycollection'
                render={() => (
                  <WithAuth>
                    <MainLayout>
                      <MyCollection />
                    </MainLayout>
                  </WithAuth>
                )}
              />
              <Route
                path='/order/:orderID'
                render={() => (
                  <WithAuth>
                    <DashBoardLayout>
                      <Order />
                    </DashBoardLayout>
                  </WithAuth>
                )}
              />
              <Route
                path='/admin'
                render={() => (
                  <WithAdminAuth>
                    <AdminLayout>
                      <Admin />
                    </AdminLayout>
                  </WithAdminAuth>
                )}
              />
              <Route
                path='/submitfeedback'
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
        </Suspense>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;

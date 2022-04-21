import { useHistory } from "react-router-dom";

const useBackBrowser = (
  callback: Function,
  openDrawer: boolean,
  modId: number
) => {
  const history = useHistory();
  if (openDrawer) {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
      callback();
    };
  } else {
    if (modId === -1)
      window.onpopstate = () => {
        history.push("/");
      };
  }
};

export default useBackBrowser;

import { useHistory } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import { Redux } from "src/redux/types";
import { removeLastEndpoint } from "src/redux/general/general.actions";

const mapState=(state:Redux) =>({
  pathHistory:state.general.history
})

const useBackBrowser = (
  callback: Function,
  openDrawer: boolean,
  modId: number
) => {
  const { pathHistory } = useSelector(mapState);
  const dispatch = useDispatch()
  console.log("las",pathHistory)
  const history = useHistory();
  if (openDrawer) {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
      callback();
    };
  } else {
    if (modId === -1)
      window.onpopstate = (event) => {
        event.preventDefault();
        history.push(pathHistory[pathHistory.length-2] || "/");
        dispatch(removeLastEndpoint())
      };
  }
};

export default useBackBrowser;

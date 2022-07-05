import { Redux } from "src/redux/types";
import { useSelector } from "react-redux";

const mapState = (state: Redux) => ({
  currentUser: state.user.currentUser,
});
const useGoodiesList = () => {
  const { currentUser } = useSelector(mapState);
  const handleAction = () => null;
  return {handleAction, currentUser}
}

export default useGoodiesList
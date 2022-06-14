import { useEffect, useState } from "react";
import {useTheme, useMediaQuery } from "@mui/material"
import { useHistory } from "react-router-dom";
import { Redux } from "src/redux/types";
import { useSelector } from "react-redux";
import {rank} from "src/Utils/gamyfication"

const mapState = (state: Redux) => ({
  currentUser: state.user.currentUser,
});

const useSubHeader = () => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { experience, displayName, userVotes } = currentUser;
  const [progress, setProgress] = useState<number | undefined>();
  const getRank = rank(experience || 0)
  const numberVotes = userVotes?.length > 0 ? userVotes?.length - 1 : 0;

  useEffect(() => {
   setProgress(getRank?.progress)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const avatarLetter = () => {
    if (displayName) {
      let str = displayName;
      let firstLetter = str.charAt(0);
      return firstLetter;
    } else return null;
  };
 
  return { history, mobile, currentUser, theme, progress, avatarLetter, getRank, numberVotes}
}

export default useSubHeader
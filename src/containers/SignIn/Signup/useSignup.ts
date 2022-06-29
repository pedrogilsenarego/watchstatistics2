import  { useEffect, useState } from "react";
import { Redux } from "src/redux/types";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUpUserStart } from "../../../redux/User/user.actions";
import { useTheme, useMediaQuery } from "@mui/material";

const mapState = (state:Redux) => ({
  currentUser: state.user.currentUser,
  general: state.general,
});


const useSignup = () => {
  const dispatch = useDispatch();
  const { currentUser, general } = useSelector(mapState);
  const history = useHistory();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [triggerAlert, setTriggerAlert] = useState(false);
  const [terms, setTerms] = useState(false);


  useEffect(
    () => {
      if (currentUser) {
        history.goBack();
      }
    },
    // eslint-disable-next-line
    [currentUser]
  );

  const handleFormSubmit = (event: any) => {
    const { displayName, email, password, confirmPassword } = event;
    dispatch(
      signUpUserStart({
        displayName,
        email,
        password,
        confirmPassword,
      })
    );
    setTriggerAlert(true);
    return false;
  };


  return {handleFormSubmit, mobile, setTerms, terms, dispatch, triggerAlert, setTriggerAlert, general}
}

export default useSignup
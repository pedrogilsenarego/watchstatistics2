import userTypes from "./user.types";
import { handleUpdateBoxState } from "./user.utils";

const INITIAL_STATE = {
  currentUser: null,
  resetPasswordSuccess: false,
  userErr: [],
  users: [],
  cookiePolicy: false,
  modalId: -1,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.ACCEPT_COOKIE_POLICY:
      return {
        ...state,
        cookiePolicy: action.payload,
      };
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        userErr: [],
      };
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload,
      };
    case userTypes.USER_ERROR:
      return {
        ...state,
        userErr: action.payload,
      };
    case userTypes.RESET_USER_STATE:
    case userTypes.SIGN_OUT_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    case userTypes.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case userTypes.SET_PREFERENCES:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userTypes.UPDATE_BOX_STATE:
      return {
        ...state,
        currentUser:
          action.payload.flag !== "multipleShop"
            ? action.payload
            : handleUpdateBoxState({
                prevCurrentUser: state.currentUser,
                listItems: action.payload.listItems,
              }),
      };
    case userTypes.UPDATE_COLLECTION_STATE:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userTypes.CLEAR_MESSAGES:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userTypes.REMOVE_MESSAGE:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userTypes.MODAL_ID:
      return {
        ...state,
        modalId: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

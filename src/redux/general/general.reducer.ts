import generalTypes from "./general.types";

const INITIAL_STATE = {
  loading: false,
  notificationMessage: "",
  notificationType: null,
};

interface Action {
  type: string;
  payload: string;
}

const generalReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case generalTypes.ENABLE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case generalTypes.DISABLE_LOADING:
      return {
        ...state,
        loading: false,
      };
    case generalTypes.UPDATE_SUCCESS_NOTIFICATION:
      return {
        ...state,
        notificationMessage: action.payload,
        notificationType: "sucess",
      };
    case generalTypes.CLEAR_NOTIFICATION:
      return {
        ...state,
        notificationMessage: "",
        notificationType: null,
      };
    default:
      return state;
  }
};

export default generalReducer;

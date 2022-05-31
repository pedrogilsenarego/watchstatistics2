import generalTypes from "./general.types";

const INITIAL_STATE = {
  loading: false,
  notificationMessage: "",
  notificationType: null,
  apiRequestMessage: "",
  apiRequestType: null,
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
        notificationType: "success",
      };
    case generalTypes.UPDATE_FAIL_NOTIFICATION:
      return {
        ...state,
        notificationMessage: action.payload,
        notificationType: "fail",
      };
    case generalTypes.UPDATE_INFORMATION_NOTIFICATION:
      return {
        ...state,
        notificationMessage: action.payload,
        notificationType: "information",
      };
    case generalTypes.CLEAR_NOTIFICATION:
      return {
        ...state,
        notificationMessage: "",
        notificationType: null,
      };
    case generalTypes.UPDATE_SUCCESS_API_REQUEST:
      return {
        ...state,
        apiRequestMessage: action.payload,
        apiRequestType: "success",
      };
    case generalTypes.UPDATE_FAIL_API_REQUEST:
      return {
        ...state,
        apiRequestMessage: action.payload,
        apiRequestType: "fail",
      };
    case generalTypes.CLEAR_API_REQUEST:
      return {
        ...state,
        apiRequestMessage: "",
        apiRequestType: null,
      };
    default:
      return state;
  }
};

export default generalReducer;

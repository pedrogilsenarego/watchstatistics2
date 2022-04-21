import generalTypes from "./general.types";

const INITIAL_STATE = {
  loading: false,
};

interface Action {
  type: string;
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
    default:
      return state;
  }
};

export default generalReducer;

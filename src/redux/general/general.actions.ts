import generalTypes from "./general.types";

export const enableLoading = () => ({
  type: generalTypes.ENABLE_LOADING,
});

export const disableLoading = () => ({
  type: generalTypes.DISABLE_LOADING,
});

export const updateSuccessNotification = (message: string) => ({
  type: generalTypes.UPDATE_SUCCESS_NOTIFICATION,
  payload: message,
});

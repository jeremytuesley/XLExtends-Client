import { ActionTypes } from "./app";

export const setAdminData = (adminData) => (dispatch) =>
  dispatch({ payload: { adminData }, type: ActionTypes.ADMIN_DATA_SET });

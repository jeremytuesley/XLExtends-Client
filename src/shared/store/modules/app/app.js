export const ActionTypes = { ADMIN_DATA_SET: "app/ADMIN_DATA_SET" };

const initialState = { adminData: null };

export const appReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case ActionTypes.ADMIN_DATA_SET:
      return { ...state, adminData: payload.adminData };
    default:
      return state;
  }
};

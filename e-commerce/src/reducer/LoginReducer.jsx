export const LoginReducer = (state, action) => {
  if (action.type == "SET_LOGIN_TOKEN") {
    return {
      ...state,
      token: action.payload,
    };
  }
};

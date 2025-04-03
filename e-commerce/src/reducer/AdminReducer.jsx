const AdminReducer = (state, action) => {
  switch (action.type) {
    case "SET_ADMIN_DATA":
      return {
        ...state,
        adminData: Array.isArray(action.payload) ? action.payload : [],
      };
    case "UPDATE_SELECT_VALUE": {
      return {
        ...state,
        selectedValue: action.payload,
      };
    }
    default:
      return state;
  }
};

export default AdminReducer;

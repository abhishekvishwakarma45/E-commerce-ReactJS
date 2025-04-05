const AdminReducer = (state, action) => {
  switch (action.type) {
    case "SET_ADMIN_DATA":
      return {
        ...state,
        adminData: Array.isArray(action.payload) ? action.payload : [],
      };
    case "SET_ORDER_DATA":
      return {
        ...state,
        order: Array.isArray(action.payload) ? action.payload : [],
      };

    case "SET_USER_DATA": {
      return {
        ...state,
        allUsers: action.payload,
      };
    }

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

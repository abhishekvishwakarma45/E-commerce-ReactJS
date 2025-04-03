import React, { createContext, useContext, useEffect, useReducer } from "react";
import AdminReducer from "../reducer/AdminReducer";

const adminInitialState = {
  selectedValue: "",
  adminData: [],
};

const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AdminReducer, adminInitialState);

  useEffect(() => {
    const getAdminData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await fetch("ecommerce/product/get");

        const data = await response.json();
        dispatch({ type: "SET_ADMIN_DATA", payload: data });
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    getAdminData();
  }, []);

  const updateSelectValue = (value) => {
    dispatch({ type: "UPDATE_SELECT_VALUE", payload: value });
  };

  return (
    <AdminContext.Provider value={{ state, updateSelectValue }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};

export default AdminContext;

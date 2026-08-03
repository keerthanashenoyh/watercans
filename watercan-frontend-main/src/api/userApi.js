import axiosConfig from "../config/axiosConfig";

export const createUser = async (userData) => {
  try {
    const response = await axiosConfig.post("/user/create", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Server error" };
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axiosConfig.post("/user/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Server error" };
  }
};
  
  export const forgotPassword = async (email) => {
    try {
      const response = await axiosConfig.post("/user/forgot-password", { email });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Server error");
    }
  };

  export const getUserByFirebaseId = async (UID) => {
    try {
      const response = await axiosConfig.get(`/user/get-user-by-firebase-id/${UID}`);
      console.log("Response data:", response.data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Server error");
    }
  };

  export const getUserById = async (user_id) => {
    try {
      const response = await axiosConfig.get("/user/get-all-users/${user_id}", { user_id });
      console.log("Response data:", response.data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Server error");
    }
  };

  export const getVendorsByUserId = async (user_id) => {
    try {
      const response = await axiosConfig.get(`/vendor/getVendorsByUserId/${user_id}`);
      console.log("Response data:", response.data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Server error");
    }
  };

  export const updateVendorsByUserId = async (user_id, updateData) => {
    
    try {
      const response = await axiosConfig.put(`vendor/updateVendorsByUserId/${user_id}`, updateData);
      console.log("Updated data:", response.data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Server error");
    }
  };
  
  
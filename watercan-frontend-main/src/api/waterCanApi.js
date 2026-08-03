import axiosConfig from "../config/axiosConfig";

export const createWaterCan = async (waterCanData) => {
    try {
      const response = await axiosConfig.post("/watercan/create", waterCanData);
      return response.data;
    } catch (error) {
      console.error("Create Water Can Error:", error.response || error);
      throw error.response ? error.response.data : new Error("Server error");
    }
  };
  

export const getAllWaterCans = async () => {
    try {
        const response = await axiosConfig.get("/watercan/getAllWatercans");
        console.log("Response data:", response.data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Server error");
    }
};

export const getWaterCanById = async (waterCanId) => {
    try {
        const response = await axiosConfig.get(`/watercan/getWatercanById/${waterCanId}`);
        console.log("Response data:", response.data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Server error");
    }
};

export const updateWaterCan = async (waterCanId, waterCanData) => {
    try {
        const response = await axiosConfig.put(`/watercan/updateWatercanById/${waterCanId}`, waterCanData);
        console.log("Response data:", response.data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Server error");
    }
};



export const deleteWaterCan = async (waterCanId) => {
    try {
        const response = await axiosConfig.delete(`/watercan/deleteWatercanById/${waterCanId}`);
        console.log("Response data:", response.data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Server error");
    }
};

export const getVendorById = async (vendorId) => {
    try {
        console.log("Fetching vendor with ID:", vendorId); // Debugging line
        const response = await axiosConfig.get(`/vendor/getVendorById/${vendorId}`);
        console.log("Full API Response:", response.data);
        return response.data.data; // vendor object
    } catch (error) {
        console.error("API Error:", error);
        const errMessage = error?.response?.data?.message || "Server error";
        throw new Error(errMessage);
    }
};





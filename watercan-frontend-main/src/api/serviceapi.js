import axiosConfig from "../config/axiosConfig";

export const createApplication = async (applicationData) => {
  try {
    const response = await axiosConfig.post(
      "/vendorapplication",
      applicationData,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response ? error.response.data : new Error("Server error");
  }
};


export const getApplication = async () => {
  try {
    const response = await axiosConfig.get("/vendorapplication/getAllApplications");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
}

export const approveApplication = async (applicationId) => {
  try {
    const response = await axiosConfig.put(
      `/vendorapplication/approve/${applicationId}`
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};

export const rejectApplication = async (id) => {
  try {
    const response = await axiosConfig.put(
      `/vendorapplication/reject/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};


export const getAllOrders = async () => {
  try {
      const response = await axiosConfig.get("/order/getAllOrders");
      return response.data;
  } catch (error) {
      console.error("Error fetching orders:", error);
      throw error.response ? error.response.data : new Error("Server error");
  }
}

export const getOrdersByVendor = async (vendor_Id) => {
  
  try {
    console.log("Fetching orders for vendor ID:", vendor_Id);
    const response = await axiosConfig.get(`/order/getOrdersByVendor/${vendor_Id}`);
    return response.data.data; 
} catch (error) {
    console.error("Error fetching vendor orders:", error);
    return [];
}
};

export const updateOrder = async (orderId, updatedData) => {
  try {
      const response = await axiosConfig.put(`/order/updateOrder/${orderId}`, updatedData);
      return response.data;
  } catch (error) {
      throw error.response ? error.response.data : new Error("Server error");
  }
}

export const fetchPincodeDetails = async (search) => {
  try {
    if (!search) throw new Error("Search term is required");

    const response = await axiosConfig.post("/vendorapplication/api/pincode", { search }); 
    console.log("Pincode Details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching pincode details:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Failed to fetch pincode details" };
  }
};

export const getApplicationByUserId = async (user_id) => {
  try {
    const response = await axiosConfig.get(
      `/vendorapplication/user/${user_id}`
    );

    // ALWAYS return array safely
    return {
      data: response.data || []
    };

  } catch (error) {
    console.error(
      "Error fetching application:",
      error.response?.data || error.message
    );

    return { data: [] };
  }
};
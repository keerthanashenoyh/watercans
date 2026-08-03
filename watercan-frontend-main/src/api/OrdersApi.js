import axiosConfig from "../config/axiosConfig";

export const CreateOrders = async (orderData) => {
    try {
        const response = await axiosConfig.post("/order/createOrderByVendorUserId", orderData);
        console.log("Response data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Create Order Error:", error.response || error);
        throw error.response ? error.response.data : new Error("Server error");
    }
};

export const getOrdersByVendor = async (vendorUserId) => {
    try {
        const response = await axiosConfig.get(`/order/getOrdersByVendorUserId/${vendorUserId}`);
        console.log("trestyjhgfds:", response.data);
        return response.data;
    } catch (error) {
        console.error("Get Orders by Vendor Error:", error.response || error);
        throw error.response ? error.response.data : new Error("Server error");
    }
};

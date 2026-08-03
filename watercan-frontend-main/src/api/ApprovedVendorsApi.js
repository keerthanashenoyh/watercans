import axiosConfig from "../config/axiosConfig";

export const getApprovedVendors = async () => {
    try {
      const response = await axiosConfig.get("/vendor/getAllVendors");
      console.log("Approved vendors data:", response.data); // Log the response data
      return response.data;
    } catch (error) {
        console.error("Error fetching approved vendors:", error);
        throw error;
        }
    };

    export const restrictVendorById = async (id) => {
        try {
          // Log the ID to ensure it's being passed correctly
          console.log("Restricting vendor with ID:", id);
      
          const response = await axiosConfig.put(`/vendor/restrictVendor/${id}`);
          console.log("Restrict vendor response:", response.data);
          return response.data;
        } catch (error) {
          console.error("Error restricting vendor:", error.response?.data || error.message);
          throw error;
        }
      };

      export const unrestrictVendorById = async (id) => {
        try {
          // Log the ID to ensure it's being passed correctly
          console.log("Unrestricting vendor with ID:", id);
      
          const response = await axiosConfig.put(`/vendor/unrestrictVendor/${id}`);
          console.log("Unrestrict vendor response:", response.data);
          return response.data;
        } catch (error) {
          console.error("Error unrestricting vendor:", error.response?.data || error.message);
          throw error;
        }
      };
      
import axios from "axios";
import { apiBaseUrl } from "../constants/constants";

export const customerList = async (data) => {
    const headerData = { Authorization: `Bearer ${data}` };
    try {
      const response = await axios.get(`${apiBaseUrl}/frontend/getAll`, {
        headers: headerData,
      });
      if (response.status == 200) {
        return response;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      return {
        data: "",
        response: err.message,
        status: 400,
      };
    }
  };

  export const deleteCustomer = async (id,adminToken) => {
    const headerData = { Authorization: `Bearer ${adminToken}` };
    console.log(headerData,"headerData")
    try {
      const response = await axios.delete(
        `${apiBaseUrl}/frontend/deleteCustomer/${id}`,
        {
          headers: headerData,
        }
      );
      if (response?.data?.success == true) {
        return response;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      return {
        data: "",
        response: err.response,
        status: 400,
      };
    }
  };
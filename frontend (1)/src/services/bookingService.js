import axios from "axios";

import { apiBaseUrl } from "../constants/constants";


export const createBooking = async (formData, adminToken) => {
    const headerData = { Authorization: `Bearer ${adminToken}` };
    try {
      const response = await axios.post(
        `${apiBaseUrl}/frontend/booking/reserveTable`,
        formData,
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
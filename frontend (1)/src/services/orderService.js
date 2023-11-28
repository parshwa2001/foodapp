
import axios from "axios";
import { apiBaseUrl } from "../constants/constants";

export const placeOrder = async (formData, userToken) => {
    const headerData = { Authorization: `Bearer ${userToken}` };
    try {
      const response = await axios.post(
        `${apiBaseUrl}/frontend/order/buy`,
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

  export const bookReservation = async (formData, userToken) => {
    const headerData = { Authorization: `Bearer ${userToken}` };
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

  export const orderList = async (data) => {
    const headerData = { Authorization: `Bearer ${data}` };
    try {
        const response = await axios.get(`${apiBaseUrl}/frontend/order/userOrder`, {
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
import axios from "axios";
import { apiBaseUrl } from "../constants/constants";

export const orderList = async (data) => {
  const headerData = { Authorization: `Bearer ${data}` };
  try {
    const response = await axios.get(`${apiBaseUrl}/frontend/order/getOrder`, {
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

export const bookingList = async (data) => {
  const headerData = { Authorization: `Bearer ${data}` };
  try {
    const response = await axios.get(`${apiBaseUrl}/frontend/booking/allBooking`, {
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

export const cancelOrder = async (token, Status, id) => {
  const formData = {
    Status, id
  }
  const headerData = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.put(`${apiBaseUrl}/frontend/order/cancel/${id}`, formData, {
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

export const cancelReservation = async (token, bookingStatus, id) => {
  const formData = {
    bookingStatus, id
  }
  const headerData = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.put(`${apiBaseUrl}/frontend/booking/cancel/${id}`, formData, {
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
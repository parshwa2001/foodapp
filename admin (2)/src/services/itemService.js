import axios from "axios";

import { apiBaseUrl } from "../constants/constants";

export const itemList = async (data) => {
  // const headerData = { Authorization: `Bearer ${data}` };
  try {
    const response = await axios.get(`${apiBaseUrl}/admin/getAllItem`,);
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

export const addItem = async (formData, adminToken) => {
  const headerData = { Authorization: `Bearer ${adminToken}` };
  try {
    const response = await axios.post(
      `${apiBaseUrl}/admin/item/addItem`,
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

export const singleItemList = async (data, id) => {
  const headerData = { Authorization: `Bearer ${data}` };
  try {
    const response = await axios.get(`${apiBaseUrl}/admin/item/get/${id}`, {
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

export const editItem = async (formData, adminToken, id) => {
  const headerData = { Authorization: `Bearer ${formData.adminToken}` };
  try {
    const response = await axios.put(
      `${apiBaseUrl}/admin/item/editItem/${formData.id}`,
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

export const deleteItem = async (id, adminToken) => {
  const headerData = { Authorization: `Bearer ${adminToken}` };
  console.log(headerData, "headerData")
  try {
    const response = await axios.delete(
      `${apiBaseUrl}/admin/item/delete/${id}`,
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
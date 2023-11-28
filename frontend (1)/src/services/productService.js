import axios from "axios";
import { apiBaseUrl } from "../constants/constants";

export const itemList = async (data) => {
  const headerData = { Authorization: `Bearer ${data}` };
  try {
    const response = await axios.get(`${apiBaseUrl}/admin/getAllItem`, {
      headers: headerData,
    });
    if (response.status === 200) {
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

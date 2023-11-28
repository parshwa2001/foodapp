import axios from "axios";
import { apiBaseUrl } from "../constants/constants";
import { message } from "antd";

export const register = async (data) => {
    console.log(data, "data")
    try {
        const response = await axios.post(`${apiBaseUrl}/frontend/register`, data);
        return response;
        // if (response.status == 200) {
        //     console.log("200")
        //     return response;
        // } else {
        //     console.log(response.data.message,"201")
        //     return response.data,message
        //     // throw new Error(response.data.message);
        // }
    } catch (err) {
        return {
            data: "",
            response: err.message,
            status: 400,
        };
    }
};
export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/frontend/login`, { ...user });
        return response;
    } catch (error) {
        console.log(error)
    }

};
export const changePassword = async (user) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/admin/changePassword`, { ...user });
        return response;
    } catch (error) {
        console.log(error)
    }

};

export const getUser = async (id) => {
    const token = localStorage.getItem("user_token");
    const headerData = { Authorization: `Bearer ${token}` };

    try {
        const response = await axios.get(`${apiBaseUrl}/frontend/getUser/${id}`, { headers: headerData });
        return response;
    } catch (error) {
        console.log(error)
    }

};

export const updateUser = async (adminId, data, adminToken) => {

    const headerData = { Authorization: `Bearer ${adminToken}` };

    try {
        const response = await axios.put(`${apiBaseUrl}/admin/updateProfile/${adminId}`, data, {
            headers: headerData,
        });
        return response;
    } catch (error) {
        console.log(error)
    }

};
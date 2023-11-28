import axios from "axios";
import { apiBaseUrl } from "../constants/constants";

export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/admin/signin`, { ...user });
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
    try {
        const response = await axios.get(`${apiBaseUrl}/admin/getUser/${id}`,);
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
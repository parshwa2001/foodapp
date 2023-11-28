import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import logo from '../../assets/logo3.jpg'
import * as authService from "../../services/authService"
import { ToastContainer, toast } from "react-toastify";
const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const adminId = localStorage.getItem("userid_");
    const admin_token = localStorage.getItem("admin_token")
    const [err, setErr] = useState({});


    const getUser = async () => {
        setLoading(true);
        if (adminId) {
            const response = await authService.getUser(adminId);
            if (response?.status === 200) {
                setName(
                    response && response?.data && response?.data?.data?.name
                        ? response?.data?.data?.name
                        : ""
                );
                setEmail(
                    response && response?.data && response?.data?.data?.email
                        ? response?.data?.data?.email
                        : ""
                );
                setLoading(false);
            } else {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        getUser();
    }, [adminId]);

    const validation = () => {
        console.log("sdfffd")
        let isValid = true;
        const formError = {};
        const regex = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        if (!email) {
            isValid = false;
            formError["email"] = "Email is required";
        } else if (!regex.test(email)) {
            isValid = false;
            formError["email"] = "Please enter a valid email address";
        }
        if (!name) {
            isValid = false;
            formError["name"] = "Name is required";
        } else if (name.trim() === "") {
            isValid = false;
            formError["name"] = "Please enter name";
        }
        setErr(formError);
        return isValid;
    };

    const handleEditProfile = async (e) => {
        e.preventDefault();
        if (validation()) {
            const data = {
                name: name.trim(),
                email: email
            }
            console.log(data,"data")
            const response = await authService.updateUser(adminId, data, admin_token);
            if (response?.status === 200) {
                toast.success(response?.data?.message);
                setLoading(false);
            } else {
                setLoading(false);
                toast.error(response?.data?.message);
            }
        }

    }

    return (
        <>
            <ToastContainer />
            <div className='row'>
                <div className='col-lg-6 mx-auto'>
                    <div className="profile_card">
                        <div className="text-center">
                            <p className='medium_font'>Admin Details</p>
                            <Spin spinning={loading}>
                                <img src={logo} alt="userimage" className='profile_img' />
                            </Spin>
                        </div>
                        <div className="mt-4">
                            <label className='small_font'>Name</label>
                            <input className="input_fields" value={name ? name : ""} onChange={(e) => {
                                setName(e.target.value);
                            }} />
                            <article className='text-danger so_small_font'>{err.name}</article>
                            <label className='small_font mt-4'>Email</label>
                            <input className="input_fields" value={email ? email : ""} onChange={(e) => {
                                setEmail(e.target.value);
                            }} />
                            <article className='text-danger so_small_font'>{err.email}</article>
                            <div className="mx-auto mt-4" style={{ width: "40%" }}>
                                <button onClick={handleEditProfile} className='common_btn mt-3' type='submit'>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../server.js";

const adminLogin = createAsyncThunk("admin/login", async (secretKey) => {
    try {
        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post(`${server}/api/v1/admin/verify`, { secretKey }, config);
        return data.message;
    } catch (err) {
        return err.response?.data?.message;
    }
});

const adminGet = createAsyncThunk("admin/getAdminData", async () => {
    try {
        const config = {
            withCredentials: true
        };
        const { data } = await axios.get(`${server}/api/v1/admin/`, config);  // Changed to GET request
        return data.adminData;
    } catch (err) {
        return err.response?.data?.message;
    }
});

const adminLogOut = createAsyncThunk("admin/logout", async () => {
    try {
        const config = {
            withCredentials: true
        };
        const { data } = await axios.get(`${server}/api/v1/admin/logout`, config);  // Changed to GET request
        return data.message;
    } catch (err) {
        return err.response?.data?.message;
    }
});

export { adminLogin, adminGet ,adminLogOut};

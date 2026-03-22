import axios from "axios";

const ACCESS_KEY = import.meta.env.VITE_JSONBIN_API_KEY;
const URL = import.meta.env.VITE_JSONBIN_URL;

export const fetchBountyData = async () => {
    const response = await axios.get(`${URL}/latest?meta=false`, {
        headers: { 
            "X-Access-Key": ACCESS_KEY
         }
    });
    return response.data;
};

export const saveBountyData = async (data) => {
    await axios.put(URL, data, {
        headers: {
            "X-Access-Key": ACCESS_KEY,
            "Content-Type": "application/json"
        }
    });
};

export const fetchUserData = async () => {
    const response = await axios.get(`${URL}/latest?meta=false`, {
        headers: { 
            "X-Access-Key": ACCESS_KEY,
            "X-JSON-Path": "$.players"
         }
    });
    return response.data;
};

export const saveUserData = async (data) => {
    await axios.put(URL, data, {
        headers: {
            "X-Access-Key": ACCESS_KEY,
            "Content-Type": "application/json"
        }
    });
};
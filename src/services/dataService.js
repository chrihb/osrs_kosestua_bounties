import axios from "axios";

const ACCESS_KEY = import.meta.env.VITE_JSONBIN_API_KEY;
const BOUNTY_URL = import.meta.env.VITE_JSONBIN_BOUNTY_URL;
const USER_URL = import.meta.env.VITE_JSONBIN_USER_URL;

const headers = { "X-Access-Key": ACCESS_KEY };
const jsonHeaders = { ...headers, "Content-Type": "application/json" };

export const fetchBountyData = async () => {
    const response = await axios.get(`${BOUNTY_URL}/latest?meta=false`, { headers });
    return response.data;
};

export const saveBountyData = async (data) => {
    await axios.put(BOUNTY_URL, data, { headers: jsonHeaders });
};

export const fetchUserData = async () => {
    const response = await axios.get(`${USER_URL}/latest?meta=false`, { headers });
    return response.data;
};

export const saveUserData = async (data) => {
    await axios.put(USER_URL, data, { headers: jsonHeaders });
};

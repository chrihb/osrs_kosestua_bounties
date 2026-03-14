import axios from "axios";

const MASTER_KEY = import.meta.env.VITE_JSONBIN_API_KEY;
const URL = import.meta.env.VITE_JSONBIN_URL;

export const fetchBountyData = async () => {
    const response = await axios.get(`${URL}/latest?meta=false`, {
        headers: { "X-Master-Key": MASTER_KEY }
    });
    return response.data;
};

export const saveBountyData = async (data) => {
    await axios.put(URL, data, {
        headers: {
            "X-Master-Key": MASTER_KEY,
            "Content-Type": "application/json"
        }
    });
};
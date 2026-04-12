import axios from "axios";

const WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
const KEY = import.meta.env.VITE_DISCORD_API_KEY;

export const sendCompletionRequest = async ({ bountyId, playerId, contributorIds, imageFile }) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("bountyId", bountyId);
    formData.append("playerId", playerId);
    contributorIds.forEach(id => formData.append("contributorIds", id));

    await axios.post(WEBHOOK_URL, formData, {
        headers: {"X-Api-Key": KEY}
    });
};
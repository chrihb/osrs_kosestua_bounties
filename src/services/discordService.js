import axios from "axios";

const WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

export const sendCompletionRequest = async ({ bountyId, playerId, contributorIds, imageFile }) => {
    const contributorLine = contributorIds.length
        ? `\nContributors: ${contributorIds.map(id => `\`${id}\``).join(', ')}`
        : '';

    const formData = new FormData();
    formData.append('files[0]', imageFile);
    formData.append('payload_json', JSON.stringify({
        content: `**Completion Request**\nBounty: \`${bountyId}\`\nPlayer: \`${playerId}\`${contributorLine}`
    }));

    await axios.post(WEBHOOK_URL, formData);
};

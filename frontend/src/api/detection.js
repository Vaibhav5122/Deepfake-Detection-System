import client from './client';

/**
 * Sends image, video, or audio to the backend for deepfake analysis.
 * @param {string} endpoint - 'image', 'video', or 'audio'
 * @param {File} file - The uploaded media file object
 * @returns {Promise<object>} The JSON response containing prediction, confidence, and reason.
 */
export const detectMedia = async (endpoint, file, axiosConfig = {}) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await client.post(`/api/detect/${endpoint}`, formData, axiosConfig);
    return response.data;
};

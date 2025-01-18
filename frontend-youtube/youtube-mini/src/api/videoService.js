import apiClient from "./apiClient";

// lấy danh sách video type
export const getVideoTypes = async () => {
    try {
        const response = await apiClient.get("/sidebar");
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
import apiClient from "./apiClient";

export const login = async (payload) => { //payload: email, pass_word
    try {
        console.log("payload login: ", payload);
        const response = await apiClient.post("/auth/login", payload);
        console.log("response login: ", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const register = async (payload) => { // payload: email, pass_word, full_name
    try {
        console.log("payload register: ", payload);
        const response = await apiClient.post("/auth/register", payload);
        console.log("response register: ", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
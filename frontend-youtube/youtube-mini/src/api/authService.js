import apiClient from "./apiClient";

export const login = async (payload) => { //payload: email, pass_word
    try {
        console.log("payload login: ", payload);
        const response = await apiClient.post("/auth/login", payload, {
            withCredentials: true, // setting để FE nhận được cookie từ BE
        });
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

export const forgotPassword = async (payload) => { // payload: email
    try {
        const response = await apiClient.post("/auth/forgot-password", payload);
        return response;
    } catch (error) {
        throw error;
    }
}

export const resetPassword = async (payload) => {
    // payload: email, newPassword, code (nhận được từ email)
    try {
        const response = await apiClient.post("/auth/reset-password", payload);
        return response;
    } catch (error) {
        throw error;
    }
}

export const loginFacebook = async(payload) => {
    // payload: name, email, id
    try {
        const response = await apiClient.post("/auth/login-facebook", payload);
        return response;
    } catch (error) {
        throw error;
    }

}
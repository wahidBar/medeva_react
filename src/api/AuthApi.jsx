import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const login = async ({ username, password }) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    const { token, user, photo } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("photo", photo);

    return { token, user, photo };
};
export const logout = async () => {
    const token = localStorage.getItem("token");

    await axios.post(`${API_URL}/logout`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    localStorage.clear();
};
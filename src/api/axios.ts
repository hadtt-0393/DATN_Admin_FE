import axios from "axios";

export const BASE_URL = "http://localhost:5000/api";
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
axiosInstance.interceptors.request.use((config) => {
    const tokenJson = localStorage.getItem("accessToken");
    // const token = tokenJson ? JSON.parse(tokenJson) : null;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGY3MTE3YzFhZGZhOTA4MzQzOGIzNiIsInJvbGUiOiJzdGFmZiIsImlhdCI6MTcxNjgzODU0NCwiZXhwIjoxNzE2OTI0OTQ0fQ.qzGV58fp_iqDeC1b1b6NuB_JzaG885Xn-5nfJIXXZz0"
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
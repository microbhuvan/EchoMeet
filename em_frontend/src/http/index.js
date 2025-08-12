import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const sendOtp = (data) => api.post("/api/send-otp", data);
export const verifyOtp = (data) => api.post("/api/verify-otp", data);
export const activate = (data) => api.post("/api/activate", data);
export const logout = () => api.post("/api/logout");

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        // Try to refresh the token
        await axios.get(`${BASE_URL}/api/refresh`, {
          withCredentials: true,
        });

        return api.request(originalRequest);
      } catch (err) {
        console.log("Token refresh failed:", err.message);
        // If refresh fails, redirect to login or handle accordingly
        // This will be handled by the component that made the request
      }
    }
    throw error;
  }
);

export default api;

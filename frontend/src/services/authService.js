import api from "./api";

export const loginUser = (data) => api.post("/login.php", data);
export const registerUser = (data) => api.post("/register.php", data);

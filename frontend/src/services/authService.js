
// service/auth
import API from '../libs/axiosInstance';

export const get = () => API.get('/');

export const login = (email, password) =>
  API.post("/auth/login", { email, password });

export const getProfile = () =>
  API.get("/auth/profile");

export const logout = () =>
  API.post("/auth/logout");

  


import API from '../libs/axiosInstance';

export const get = () => API.get('/');

export const login = (username, password) =>
  API.post("/auth/login", { username, password });

export const logout = (token) =>
  API.post("/auth/logout", {}, {
    headers: { Authorization: `Bearer ${token}` },
  });


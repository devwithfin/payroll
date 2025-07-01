import API from '../libs/axiosInstance';

export const get = () => API.get('/');

export const login = (username, password) =>
  API.post("/login", { username, password });

export const logout = (token) =>
  API.post("/logout", {}, {
    headers: { Authorization: `Bearer ${token}` },
  });


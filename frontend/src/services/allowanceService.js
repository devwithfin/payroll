// service/allowanc
import API from '../libs/axiosInstance';

export const getAllAllowances = () => API.get('/allowances');

export const getAllowanceById = (id) =>
  API.get(`/allowances/${id}`);

export const createAllowance = (data) =>
  API.post('/allowances', data);

export const updateAllowance = (id, data) =>
  API.put(`/allowances/${id}`, data);

export const deleteAllowance = (id) =>
  API.delete(`/allowances/${id}`);

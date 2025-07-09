// services/position
import API from '../libs/axiosInstance';

export const getAllPositions = () => API.get('/positions');

export const getPositionById = (id) => API.get(`/positions/${id}`);

export const createPosition = (data) =>
  API.post('/positions', data);

export const updatePosition = (id, data) =>
  API.put(`/positions/${id}`, data);

export const deletePosition = (id) =>
  API.delete(`/positions/${id}`);

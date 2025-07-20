// service/overtime-rate
import API from '../libs/axiosInstance';

export const getAllOvertimeRates = () => 
  API.get('/overtime-rates');

export const getOvertimeRateById = (id) =>
  API.get(`/overtime-rates/${id}`);

export const createOvertimeRate = (data) =>
  API.post('/overtime-rates', data);

export const updateOvertimeRate = (id, data) =>
  API.put(`/overtime-rates/${id}`, data);

export const deleteOvertimeRate = (id) =>
  API.delete(`/overtime-rates/${id}`);

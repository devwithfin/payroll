// service/deduction
import API from '../libs/axiosInstance';

export const getAllDeductions = () => API.get('/deductions');

export const getDeductionById = (id) =>
  API.get(`/deductions/${id}`);

export const createDeduction = (data) =>
  API.post('/deductions', data);

export const updateDeduction = (id, data) =>
  API.put(`/deductions/${id}`, data);

export const deleteDeduction = (id) =>
  API.delete(`/deductions/${id}`);

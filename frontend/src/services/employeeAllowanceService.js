// service/employee-allowance
import API from '../libs/axiosInstance';

export const getAllEmployeeAllowances = () => API.get('/employee-allowances');

export const getEmployeeAllowanceById = (id) =>
  API.get(`/employee-allowances/${id}`);

export const createEmployeeAllowance = (data) =>
  API.post('/employee-allowances', data);

export const updateEmployeeAllowance = (id, data) =>
  API.put(`/employee-allowances/${id}`, data);

export const deleteEmployeeAllowance = (id) =>
  API.delete(`/employee-allowances/${id}`);

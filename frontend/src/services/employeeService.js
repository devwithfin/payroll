// service/employee
// services/department
import API from '../libs/axiosInstance';

export const getAllEmployees = () => API.get('/employees');

export const getEmployeeById = (id) => API.get(`/employees/${id}`);

export const createEmployee = (data) =>
  API.post('/employees', data);

export const updateEmployee = (id, data) =>
  API.put(`/employees/${id}`, data);

export const deleteEmployee = (id) =>
  API.delete(`/employees/${id}`);

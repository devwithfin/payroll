// service/employee-deduction
import API from '../libs/axiosInstance';

export const getAllEmployeeDeductions = () =>
  API.get('/employee-deductions');

export const getEmployeeDeductionById = (id) =>
  API.get(`/employee-deductions/${id}`);

export const createEmployeeDeduction = (data) =>
  API.post('/employee-deductions', data);

export const updateEmployeeDeduction = (id, data) =>
  API.put(`/employee-deductions/${id}`, data);

export const deleteEmployeeDeduction = (id) =>
  API.delete(`/employee-deductions/${id}`);

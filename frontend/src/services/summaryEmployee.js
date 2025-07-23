import API from '../libs/axiosInstance';

export const getEmployeeSummary = (employeeId) =>
  API.get(`/employee-summary/${employeeId}`);

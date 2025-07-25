// services/payroll-period
import API from '../libs/axiosInstance';

export const getAllPayrollPeriods = () => API.get('/payroll-periods');

export const getPayrollPeriodById = (id) => API.get(`/payroll-periods/${id}`);

export const getPayrollDetailsByPeriod = (id) =>
  API.get(`/payroll-details/by-period/${id}`);

export const createPayrollPeriod = (payload) =>
  API.post('/payroll-periods', payload);

export const updatePayrollPeriod = (id, payload) =>
  API.put(`/payroll-periods/${id}`, payload);

export const deletePayrollPeriod = (id) =>
  API.delete(`/payroll-periods/${id}`);

export const draftPayroll = (id) => API.post(`/payroll-periods/draft-payroll/${id}`);

export const finalizePayroll = (id) =>
  API.post(`/payroll-periods/final-payroll/${id}`);

export const transferPayroll = (id) =>
  API.post(`/pay/${id}`);

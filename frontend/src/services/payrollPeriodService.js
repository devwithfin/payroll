// service/payroll-period
import API from '../libs/axiosInstance';

export const getAllPayrollPeriods = () => API.get('/payroll-periods');

export const getPayrollPeriodById = (id) => API.get(`/payroll-periods/${id}`);

export const createPayrollPeriod = (payload) => API.post('/payroll-periods', payload);

export const updatePayrollPeriod = (id, payload) => API.put(`/payroll-periods/${id}`, payload);

export const deletePayrollPeriod = (id) => API.delete(`/payroll-periods/${id}`);


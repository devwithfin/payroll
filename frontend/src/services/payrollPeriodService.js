// service/payroll-period
import API from '../libs/axiosInstance';

export const getAllPayrollPeriods = () => API.get('/payroll-periods');

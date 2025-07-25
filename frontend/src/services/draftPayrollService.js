// service/draft-payroll
import API from '../libs/axiosInstance';

export const getDraftPayroll =  (period_id) => API.get(`${API}/draft-payroll/${period_id}`)

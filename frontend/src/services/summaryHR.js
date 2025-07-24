import API from '../libs/axiosInstance';

export const getHRSummary = () =>
  API.get(`/hr-summary`);

// service/overtime-requests
// services/overtimeRequestService.js
import API from '../libs/axiosInstance';

export const getAllOvertimeRequests = () => 
  API.get('/overtime-requests');

export const getOvertimeRequestsByEmployee = (employeeId) => 
  API.get(`/overtime-requests/employee/${employeeId}`);

export const createOvertimeRequest = (data) => 
  API.post('/overtime-requests', data);

export const approveOvertimeRequest = (requestId, data) => 
  API.put(`/overtime-requests/approve/${requestId}`, data);

export const deleteOvertimeRequest = (requestId) => 
  API.delete(`/overtime-requests/${requestId}`);

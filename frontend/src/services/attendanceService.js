// service/attendance
import API from '../libs/axiosInstance';

export const getAllAttendances = () => API.get('/attendances');

export const getAttendanceByEmployeeId = (id) => API.get(`/attendances/employee/${id}`);

export const clockIn = (data) => API.post("/attendances/clock-in", data);

export const clockOut = (data) =>
  API.post("/attendances/clock-out", data);

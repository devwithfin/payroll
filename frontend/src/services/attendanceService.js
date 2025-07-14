// service/position
import API from '../libs/axiosInstance';

export const getAllAttendances = () => API.get('/attendances');

export const geAllAttendanceById = (id) => API.get(`/attendances/${id}`);

// export const createAllAttendance = (data) =>
//   API.post('/attendances', data);

// export const updateAllAttendance = (id, data) =>
//   API.put(`/attendances/${id}`, data);

// export const deleteAllAttendance = (id) =>
//   API.delete(`/attendances/${id}`);

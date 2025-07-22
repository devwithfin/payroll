// service/account
import API from "../libs/axiosInstance";

export const getAllAccounts = () => API.get("/accounts");

export const updateAccountPassword = (id_user, data) =>
  API.put(`/accounts/${id_user}`, data);

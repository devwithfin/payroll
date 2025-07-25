// service/account
import API from "../libs/axiosInstance";

export const getAllAccounts = () => API.get("/account-users");

export const updateAccountPassword = (id_user, data) =>
  API.put(`/account-users/${id_user}`, data);

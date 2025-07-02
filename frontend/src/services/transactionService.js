// services/transactionService.js
import API from "../libs/api";

export const getTransactionSummary = () => API.get("/transactions/summary");

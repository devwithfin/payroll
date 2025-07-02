// hooks/summaryData
import { useEffect, useState } from "react";
import { getTransactionSummary } from "../services/transactionService";

const useSummaryData = () => {
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    transactionToday: 0,
    totalUser: 0,
    totalSales: 0,
    totalPurchases: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTransactionSummary();
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to fetch summary:", err);
      }
    };

    fetchData();
  }, []);

  return { summary };
};

export default useSummaryData;

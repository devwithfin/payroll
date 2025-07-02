// components/dashboard/SummaryCard
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faFileInvoiceDollar,
  faIdCard,
  faCartFlatbed,
} from "@fortawesome/free-solid-svg-icons";
// import utils/formatCurrency
import { formatRupiah } from "../utils/formatCurrency";
// import hooks/useSummaryData
import useSummaryData from "../../hooks/useSummaryData";

function SummaryCard() {
  const { summary } = useSummaryData();

  const cards = [
    {
      title: "Purchases Total",
      value: formatRupiah(summary?.totalPurchases ?? 0),
      icon: faWallet,
      color: "primary",
    },
    {
      title: "Sales Total",
      value: formatRupiah(summary?.totalSales ?? 0),
      icon: faCartFlatbed,
      color: "warning",
    },
    {
      title: "Today Transaction",
      value: (summary?.transactionToday ?? 0).toLocaleString(),
      icon: faFileInvoiceDollar,
      color: "success",
    },
    {
      title: "Total User",
      value: (summary?.totalUser ?? 0).toLocaleString(),
      icon: faIdCard,
      color: "info",
    },
  ];

  return (
    <div className="row">
      {cards.map((card, idx) => (
        <div className="col-xl-3 col-md-6 mb-4" key={idx}>
          <div className="card shadow-sm h-100 py-2 border-0 position-relative overflow-hidden">
            <div
              className={`bg-${card.color} position-absolute`}
              style={{ left: 0, top: 0, width: "4px", height: "100%" }}
            ></div>

            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div
                    className={`fw-medium text-${card.color} text-uppercase mb-1`}
                    style={{ fontSize: "12px" }}
                  >
                    {card.title}
                  </div>
                  <div
                    className="mb-0 fw-bold text-secondary"
                    style={{ fontSize: "18px" }}
                  >
                    {card.value}
                  </div>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={card.icon}
                    size="2x"
                    className="ms-3"
                    style={{ color: "#DDDFEB" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryCard;

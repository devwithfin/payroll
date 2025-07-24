// src/components/hr/SummaryCard.jsx
export default function SummaryCard({ title, value, change, changeText }) {
  const isPositive = change >= 0;
  return (
    <div className="bg-white p-4 rounded-4 shadow-sm border h-100">
      <small className="text-muted">{title}</small>
      <h3 className="fw-bold my-1">{value}</h3>
      <span className={`small fw-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
        {isPositive ? `+${change}` : `${change}`} {changeText}
      </span>
    </div>
  );
}

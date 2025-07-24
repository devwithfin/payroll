import React from "react";

const SummaryCard = ({ title, value, unit }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border flex flex-col justify-between h-32">
      <small className="text-gray-500 text-sm">{title}</small>
      <h2 className="text-2xl font-bold text-gray-800">
        {value}
        {unit && <span className="text-base text-gray-500 ml-1">{unit}</span>}
      </h2>
    </div>
  );
};

export default SummaryCard;

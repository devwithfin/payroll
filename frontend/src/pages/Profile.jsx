// pages/hr/profile.js
import React, { useCallback, useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Personal");
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
  try {
    const res = await getProfile();
    setUser(res.data.user || null);
  } catch (error) {
    if (error.response?.status === 401) {
      navigate("/login");
    } else {
      toast.error("Failed to fetch profile data");
    }
  }
}, [navigate]);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    fetchProfile();
  }
}, [fetchProfile]);

  if (!user) return null;

  const employee = user.employee || {};

  const renderInput = (label, value) => (
    <div className="mb-3 col-md-6">
      <label className="form-label fw-semibold">{label}</label>
      <input
        type="text"
        value={value || "-"}
        disabled
        className="form-control bg-light text-dark"
      />
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "Personal":
        return (
          <div className="row">
            {renderInput("Full Name", employee.full_name)}
            {renderInput("NIK", employee.employee_nik)}
            {renderInput("Birth Date", employee.dob)}
            {renderInput("Gender", employee.gender === "M" ? "Man" : "Woman")}
            {renderInput("Address", employee.address)}
            {renderInput(
              "Marital Status",
              employee.pt_kp?.startsWith("K") ? "Married" : "Single"
            )}
            {renderInput(
              "Number of Dependents",
              employee.pt_kp?.slice(2) || employee.pt_kp?.slice(1) || "0"
            )}
          </div>
        );
      case "Contact":
        return (
          <div className="row">
            {renderInput("Phone Number", employee.phone_number)}
            {renderInput("Email", employee.email)}
          </div>
        );
      case "Job":
        return (
          <div className="row">
            {renderInput(
              "Department Name",
              employee.department.department_name
            )}
            {renderInput("Position Name", employee.position.position_name)}
            {renderInput("Employment Status", employee.employment_status)}
            {renderInput("Join Date", employee.join_date)}
            {renderInput("NPWP Number", employee.npwp_number)}
            {renderInput("Role", user.role)}
          </div>
        );
      case "Account Bank":
        return (
          <div className="row">
            {renderInput("Bank Name", employee.bank_name)}
            {renderInput("Account Number", employee.bank_account_number)}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container ">
      <h3 className="mb-4">My Profile</h3>
      <ul className="nav nav-tabs mb-4">
        {["Personal", "Contact", "Job", "Account Bank"].map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
      <div className="bg-white p-4 border rounded shadow-sm">
        {renderTabContent()}
      </div>
    </div>
  );
}

// pages/hr/profile.js
import React, { useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile();
    }
  }, []);

  const fetchProfile = async () => {
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
  };

  if (!user) return null;

  const employee = user.employee || {};

  return (
    <div className="container mt-4">
      <h2>My Profile</h2>

      <div className="mt-3">
        <h4>Account Info</h4>
        <p><strong>Role:</strong> {user.role}</p>

        <h4 className="mt-4">Employee Info</h4>
        <p><strong>NIK:</strong> {employee.employee_nik}</p>
        <p><strong>Full Name:</strong> {employee.full_name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Gender:</strong> {employee.gender === "M" ? "Male" : "Female"}</p>
        <p><strong>Date of Birth:</strong> {employee.dob}</p>
        <p><strong>Address:</strong> {employee.address}</p>
        <p><strong>Employment Status:</strong> {employee.employment_status}</p>
        <p><strong>Join Date:</strong> {employee.join_date}</p>
        <p><strong>NPWP:</strong> {employee.npwp_number}</p>
        <p><strong>PTKP:</strong> {employee.pt_kp}</p>
        <p><strong>Bank Name:</strong> {employee.bank_name}</p>
        <p><strong>Bank Account Number:</strong> {employee.bank_account_number}</p>
      </div>
    </div>
  );
}

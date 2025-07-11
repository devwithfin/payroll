// components/modals/employee/AddModal.jsx
import React, { useState } from "react";
import BaseModal from "../../common/BaseModal";
import Swal from "sweetalert2";

export default function AddModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    full_name: "",
    position_id: "",
    department_id: "",
    employee_nik: "",
    dob: "",
    address: "",
    phone_number: "",
    email: "",
    employment_status: "",
    join_date: "",
    npwp_number: "",
    pt_kp: "",
    role: "Employee",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { full_name, employee_nik, email } = formData;
    if (!full_name.trim() || !employee_nik.trim() || !email.trim()) {
      Swal.fire({
        icon: "error",
        title: "Incomplete or Invalid Data",
        text: "Please fill in required fields: Full Name, NIK, Email.",
      });
      return;
    }

    const finalData = {
      ...formData,
      position_id: Number(formData.position_id),
      department_id: Number(formData.department_id),
      role: "Employee", // penting untuk hindari error di backend
    };

    onSave(finalData);
  };

  return (
    <BaseModal
      title="Add New Employee"
      onClose={onClose}
      footer={
        <>
          <button
            className="btn"
            style={{ backgroundColor: "#6c757d", color: "#fff" }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn"
            style={{ backgroundColor: "#107189", color: "#fff" }}
            onClick={handleSubmit}
          >
            Save
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Input label="Full Name" field="full_name" value={formData.full_name} onChange={handleChange} />
            <Select label="Position ID" field="position_id" value={formData.position_id} onChange={handleChange} options={[1, 2, 9]} />
            <Select label="Department ID" field="department_id" value={formData.department_id} onChange={handleChange} options={[1, 2, 6]} />
            <Input label="NIK" field="employee_nik" value={formData.employee_nik} onChange={handleChange} />
            <Input label="Birth Date" field="dob" type="date" value={formData.dob} onChange={handleChange} />
            <Input label="Address" field="address" value={formData.address} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <Input label="Phone Number" field="phone_number" value={formData.phone_number} onChange={handleChange} />
            <Input label="Email" field="email" value={formData.email} onChange={handleChange} />
            <Input label="Employment Status" field="employment_status" value={formData.employment_status} onChange={handleChange} />
            <Input label="Join Date" field="join_date" type="date" value={formData.join_date} onChange={handleChange} />
            <Input label="NPWP Number" field="npwp_number" value={formData.npwp_number} onChange={handleChange} />
            <Select label="PTKP" field="pt_kp" value={formData.pt_kp} onChange={handleChange} options={["TK0", "K1", "K2"]} />
          </div>
        </div>
      </form>
    </BaseModal>
  );
}

// Input Text
function Input({ label, field, value, onChange, type = "text" }) {
  return (
    <div className="mb-3">
      <label className="form-label fw-medium">{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(field, e.target.value)}
        className="form-control"
        style={{ border: "1px solid #ccc" }}
      />
    </div>
  );
}

// Dropdown / Select
function Select({ label, field, value, onChange, options }) {
  return (
    <div className="mb-3">
      <label className="form-label fw-medium">{label}</label>
      <select
        className="form-control"
        value={value || ""}
        onChange={(e) => onChange(field, e.target.value)}
        style={{ border: "1px solid #ccc" }}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

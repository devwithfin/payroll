import React, { useState, useEffect } from "react";
import BaseModal from "../../common/BaseModal";
import Swal from "sweetalert2";

export default function EditModal({ employee, onClose, onSave }) {
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

  useEffect(() => {
    if (employee) {
      setFormData({
        full_name: employee.full_name || "",
        position_id: employee.position_id || "",
        department_id: employee.department_id || "",
        employee_nik: employee.employee_nik || "",
        dob: employee.dob || "",
        address: employee.address || "", // <-- ini harus bener
        phone_number: employee.phone_number || "",
        email: employee.email || "",
        employment_status: employee.employment_status || "",
        join_date: employee.join_date || "",
        npwp_number: employee.npwp_number || "",
        pt_kp: employee.pt_kp || "",
      });
    }
  }, [employee]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.full_name.trim() === "" ||
      formData.employee_nik.trim() === "" ||
      formData.email.trim() === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Incomplete or Invalid Data",
        text: "Please fill in required fields: Full Name, NIK, Email.",
      });
      return;
    }

    onSave({
      id: employee.id || employee.employee_id,
      ...formData,
    });
  };

  return (
    <BaseModal
      title="Edit Employee"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn"
            style={{ backgroundColor: "#107189", color: "#fff" }}
            onClick={handleSubmit}
          >
            Update
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Input label="Full Name" value={formData.full_name} onChange={(v) => handleChange("full_name", v)} />
            <Select
              label="Position ID"
              value={formData.position_id}
              onChange={(v) => handleChange("position_id", v)}
              options={[2, 9, 1]}
            />
            <Select
              label="Department ID"
              value={formData.department_id}
              onChange={(v) => handleChange("department_id", v)}
              options={[2, 6, 1]}
            />
            <Input label="NIK" value={formData.employee_nik} onChange={(v) => handleChange("employee_nik", v)} />
            <Input label="Birth Date" type="date" value={formData.dob} onChange={(v) => handleChange("dob", v)} />
            <Input label="Address" value={formData.address} onChange={(v) => handleChange("address", v)} />
          </div>
          <div className="col-md-6">
            <Input label="Phone Number" value={formData.phone_number} onChange={(v) => handleChange("phone_number", v)} />
            <Input label="Email" value={formData.email} onChange={(v) => handleChange("email", v)} />
            <Input label="Status" value={formData.employment_status} onChange={(v) => handleChange("employment_status", v)} />
            <Input label="Join Date" type="date" value={formData.join_date} onChange={(v) => handleChange("join_date", v)} />
            <Input label="NPWP" value={formData.npwp_number} onChange={(v) => handleChange("npwp_number", v)} />
            <Select
              label="PTKP"
              value={formData.pt_kp}
              onChange={(v) => handleChange("pt_kp", v)}
              options={["TK0", "K1", "K2"]}
            />
          </div>
        </div>
      </form>
    </BaseModal>
  );
}

// Input biasa
function Input({ label, value, onChange, type = "text" }) {
  return (
    <div className="mb-3">
      <label className="form-label fw-medium">{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="form-control"
        style={{ border: "1px solid #ccc" }}
      />
    </div>
  );
}

// Input dropdown
function Select({ label, value, onChange, options }) {
  return (
    <div className="mb-3">
      <label className="form-label fw-medium">{label}</label>
      <select
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ border: "1px solid #ccc" }}
      >
        <option value="">-- Select --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

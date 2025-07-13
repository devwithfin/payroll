// components/modals/employee/add-modal
import React, { useState, useEffect } from "react";
import BaseModal from "../../common/BaseModal";
import Swal from "sweetalert2";
import { getAllDepartments } from "../../../services/departmentService";
import { getAllPositions } from "../../../services/positionService";

export default function AddModal({ onClose, onSave }) {
  const [activeTab, setActiveTab] = useState("personal");

  const [formData, setFormData] = useState({
    full_name: "",
    employee_nik: "",
    dob: "",
    gender: "",
    address: "",
    phone_number: "",
    email: "",
    department_id: "",
    position_id: "",
    employment_status: "",
    join_date: "",
    npwp_number: "",
    marital_status: "",
    number_of_dependents: "",
    role: "Employee",
    bank_name: "",
    bank_account_number: "",
  });

  const [departments, setDepartments] = useState([]);
  const [allPositions, setAllPositions] = useState([]);
  const [filteredPositions, setFilteredPositions] = useState([]);

  const bankOptions = [
    { value: "Bank Central Asia", label: "Bank Central Asia" },
    { value: "BBank Rakyat Indonesia", label: "Bank Rakyat Indonesia" },
    { value: "Bank Negara Indonesia", label: "Bank Negara Indonesia" },
    { value: "Mandiri", label: "Bank Mandiri" },
    { value: "Bank Tabungan Negara", label: "Bank Tabungan Negara" },
  ];

  useEffect(() => {
    getAllDepartments()
      .then((res) => setDepartments(res.data?.data || []))
      .catch(() => Swal.fire("Error", "Failed to fetch departments", "error"));

    getAllPositions()
      .then((res) => setAllPositions(res.data?.data || []))
      .catch(() => Swal.fire("Error", "Failed to fetch positions", "error"));
  }, []);

  useEffect(() => {
    const selectedDeptId = parseInt(formData.department_id);
    if (isNaN(selectedDeptId)) {
      setFilteredPositions([]);
      return;
    }

    const filtered = allPositions.filter(
      (p) => Number(p.department_id) === selectedDeptId
    );

    setFilteredPositions(filtered);
    setFormData((prev) => ({ ...prev, position_id: "" }));
  }, [formData.department_id, allPositions]);

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

    // Gabungkan marital_status + number_of_dependents jadi 1 field ptkp
    const pt_kp = `${formData.marital_status}${formData.number_of_dependents}`;

    const finalData = {
      ...formData,
      department_id: Number(formData.department_id),
      position_id: Number(formData.position_id),
      pt_kp, // hasil konversi
    };

    delete finalData.marital_status;
    delete finalData.number_of_dependents;

    onSave(finalData);
  };

  const genderOptions = [
    { value: "M", label: "Man" },
    { value: "W", label: "Woman" },
  ];

  const maritalStatusOptions = [
    { value: "TK", label: "Not Married" },
    { value: "K", label: "Married" },
  ];

  const dependentsOptions = [
    { value: "0", label: "0 Dependents" },
    { value: "1", label: "1 Dependent" },
    { value: "2", label: "2 Dependents" },
    { value: "3", label: "3 Dependents" },
  ];

  const employmentOptions = [
    "Permanent",
    "Contract",
    "Probation",
    "Outsourced",
    "Intern",
    "Resigned",
  ];

  const roleOptions = ["Employee", "HR", "Finance"];

  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "contact", label: "Contact Info" },
    { id: "job", label: "Job Info" },
    { id: "bank", label: "Bank Info" },
  ];

  return (
    <BaseModal
      title="Add New Employee"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Save
          </button>
        </>
      }
    >
      <ul className="nav nav-tabs mb-3">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.id}>
            <button
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              type="button"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <div
          className="tab-content"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          {activeTab === "personal" && (
            <>
              <Input label="Full Name" field="full_name" value={formData.full_name} onChange={handleChange} />
              <Input label="NIK" field="employee_nik" value={formData.employee_nik} onChange={handleChange} />
              <Input label="Birth Date" type="date" field="dob" value={formData.dob} onChange={handleChange} />
              <Select label="Gender" field="gender" value={formData.gender} onChange={handleChange} options={genderOptions} useLabel />
              <Input label="Address" field="address" value={formData.address} onChange={handleChange} />
              <Select label="Marital Status" field="marital_status" value={formData.marital_status} onChange={handleChange} options={maritalStatusOptions} useLabel />
              <Select label="Number of Dependents" field="number_of_dependents" value={formData.number_of_dependents} onChange={handleChange} options={dependentsOptions} useLabel />
            </>
          )}

          {activeTab === "contact" && (
            <>
              <Input label="Phone Number" field="phone_number" value={formData.phone_number} onChange={handleChange} />
              <Input label="Email" field="email" value={formData.email} onChange={handleChange} />
            </>
          )}

          {activeTab === "job" && (
            <>
              <Select
                label="Department"
                field="department_id"
                value={formData.department_id}
                onChange={handleChange}
                options={departments.map((d) => ({
                  value: d.department_id,
                  label: d.department_name,
                }))}
                useLabel
              />
              <Select
                label="Position"
                field="position_id"
                value={formData.position_id}
                onChange={handleChange}
                options={filteredPositions.map((p) => ({
                  value: p.position_id,
                  label: p.position_name,
                }))}
                useLabel
              />
              <Select label="Employment Status" field="employment_status" value={formData.employment_status} onChange={handleChange} options={employmentOptions.map(e => ({ value: e, label: e }))} useLabel />
              <Input label="Join Date" type="date" field="join_date" value={formData.join_date} onChange={handleChange} />
              <Input label="NPWP Number" field="npwp_number" value={formData.npwp_number} onChange={handleChange} />
              <Select label="Role" field="role" value={formData.role} onChange={handleChange} options={roleOptions.map(r => ({ value: r, label: r }))} useLabel />
            </>
          )}

          {activeTab === "bank" && (
            <>
              <Select
                label="Bank Name"
                field="bank_name"
                value={formData.bank_name}
                onChange={handleChange}
                options={bankOptions}
                useLabel
              />
              <Input label="Bank Account Number" field="bank_account_number" value={formData.bank_account_number} onChange={handleChange} />
            </>
          )}
        </div>
      </form>
    </BaseModal>
  );
}

// Reusable input component
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

// Reusable select component
function Select({ label, field, value, onChange, options, useLabel = false }) {
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
          <option key={opt.value} value={opt.value}>
            {useLabel ? opt.label : opt}
          </option>
        ))}
      </select>
    </div>
  );
}

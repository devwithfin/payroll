// components/modals/employee/edit-modal
import React, { useState, useEffect } from "react";
import BaseModal from "../../common/BaseModal";
import Swal from "sweetalert2";
import { getAllDepartments } from "../../../services/departmentService";
import { getAllPositions } from "../../../services/positionService";

export default function EditModal({ employee, onClose, onSave }) {
  const [activeTab, setActiveTab] = useState("personal");

  const [departments, setDepartments] = useState([]);
  const [allPositions, setAllPositions] = useState([]);
  const [filteredPositions, setFilteredPositions] = useState([]);

  const [formData, setFormData] = useState({
    full_name: "",
    employee_nik: "",
    dob: "",
    gender: "",
    address: "",
    phone_number: "",
    email: "",
    marital_status: "",
    dependents: "",
    position_id: "",
    department_id: "",
    employment_status: "",
    join_date: "",
    npwp_number: "",
    role: "Employee",
    bank_name: "",
    bank_account_number: "",
  });

  const employmentOptions = [
    "Permanent", "Contract", "Probation", "Outsourced", "Intern", "Resigned",
  ];

  const genderOptions = [
    { value: "M", label: "Male" },
    { value: "W", label: "Female" },
  ];

  const maritalOptions = [
    { value: "TK", label: "Not Married" },
    { value: "K", label: "Married" },
  ];

  const dependentOptions = [
    "0", "1", "2", "3"
  ];

  const bankOptions = [
    "Bank Central Asia", "Bank Rakyat Indonesia", "Bank Rakyat Indonesia", "Bank Mandiri", "Bank Tabungan Negara"
  ];

  useEffect(() => {
    if (employee) {
      const { pt_kp = "" } = employee;
let marital_status = "";
let dependents = "0";

if (pt_kp.startsWith("TK")) {
  marital_status = "TK";
  dependents = pt_kp.slice(2) || "0";
} else if (pt_kp.startsWith("K")) {
  marital_status = "K";
  dependents = pt_kp.slice(1) || "0";
}


      setFormData({
        full_name: employee.full_name || "",
        employee_nik: employee.employee_nik || "",
        dob: employee.dob || "",
        gender: employee.gender || "",
        address: employee.address || "",
        phone_number: employee.phone_number || "",
        email: employee.email || "",
        marital_status,
        dependents,
        position_id: employee.position_id || "",
        department_id: employee.department_id || "",
        employment_status: employee.employment_status || "",
        join_date: employee.join_date || "",
        npwp_number: employee.npwp_number || "",
        role: employee.role || "Employee",
        bank_name: employee.bank_name || "",
        bank_account_number: employee.bank_account_number || "",
      });
    }
  }, [employee]);

  useEffect(() => {
    getAllDepartments().then(res => setDepartments(res.data?.data || []));
    getAllPositions().then(res => setAllPositions(res.data?.data || []));
  }, []);

  useEffect(() => {
    const selected = parseInt(formData.department_id);
    if (!isNaN(selected)) {
      const filtered = allPositions.filter(p => Number(p.department_id) === selected);
      setFilteredPositions(filtered);
    } else {
      setFilteredPositions([]);
    }
  }, [formData.department_id, allPositions]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.full_name || !formData.employee_nik || !formData.email) {
      return Swal.fire("Error", "Full Name, NIK, and Email are required", "error");
    }

    const pt_kp = `${formData.marital_status}${formData.dependents}`;

    const finalData = {
      id: employee.id || employee.employee_id,
      ...formData,
      pt_kp,
      position_id: Number(formData.position_id),
      department_id: Number(formData.department_id),
    };

    onSave(finalData);
  };

  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "contact", label: "Contact Info" },
    { id: "job", label: "Job Info" },
    { id: "bank", label: "Bank Info" },
  ];

  return (
    <BaseModal
      title="Edit Employee"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Update</button>
        </>
      }
    >
      <ul className="nav nav-tabs mb-3">
        {tabs.map(tab => (
          <li className="nav-item" key={tab.id}>
            <button
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <div className="tab-content" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {activeTab === "personal" && (
            <>
              <Input label="Full Name" field="full_name" value={formData.full_name} onChange={handleChange} />
              <Input label="NIK" field="employee_nik" value={formData.employee_nik} onChange={handleChange} />
              <Input label="Birth Date" type="date" field="dob" value={formData.dob} onChange={handleChange} />
              <Select label="Gender" field="gender" value={formData.gender} onChange={handleChange} options={genderOptions} />
              <Input label="Address" field="address" value={formData.address} onChange={handleChange} />
              <Select label="Marital Status" field="marital_status" value={formData.marital_status} onChange={handleChange} options={maritalOptions} />
              <Select label="Number of Dependents" field="dependents" value={formData.dependents} onChange={handleChange} options={dependentOptions.map(d => ({ value: d, label: d }))} />
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
                options={departments.map((d) => ({ value: d.department_id, label: d.department_name }))}
              />
              <Select
                label="Position"
                field="position_id"
                value={formData.position_id}
                onChange={handleChange}
                options={filteredPositions.map((p) => ({ value: p.position_id, label: p.position_name }))}
              />
              <Select label="Employment Status" field="employment_status" value={formData.employment_status} onChange={handleChange} options={employmentOptions.map(e => ({ value: e, label: e }))} />
              <Input label="Join Date" type="date" field="join_date" value={formData.join_date} onChange={handleChange} />
              <Input label="NPWP Number" field="npwp_number" value={formData.npwp_number} onChange={handleChange} />
              <Select label="Role" field="role" value={formData.role} onChange={handleChange} options={["Employee", "HR", "Finance"].map(r => ({ value: r, label: r }))} />
            </>
          )}

          {activeTab === "bank" && (
            <>
              <Select label="Bank Name" field="bank_name" value={formData.bank_name} onChange={handleChange} options={bankOptions.map(b => ({ value: b, label: b }))} />
              <Input label="Bank Account Number" field="bank_account_number" value={formData.bank_account_number} onChange={handleChange} />
            </>
          )}
        </div>
      </form>
    </BaseModal>
  );
}

function Input({ label, field, value, onChange, type = "text" }) {
  return (
    <div className="mb-3">
      <label className="form-label fw-medium">{label}</label>
      <input
        type={type}
        className="form-control"
        value={value || ""}
        onChange={(e) => onChange(field, e.target.value)}
        style={{ border: "1px solid #ccc" }}
      />
    </div>
  );
}

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
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

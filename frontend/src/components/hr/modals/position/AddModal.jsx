// components/modals/position/add-modal
import React, { useState, useEffect } from "react";
import BaseModal from "../../../common/BaseModal";
import Swal from "sweetalert2";
import { getAllDepartments } from "../../../../services/departmentService";

export default function AddModal({ onClose, onSave }) {
  const [positionName, setPositionName] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [jobAllowance, setJobAllowance] = useState(""); 
  const [departmentId, setDepartmentId] = useState("");

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllDepartments()
      .then((res) => {
        const data = res.data?.data || [];
        setDepartments(data);
      })
      .catch((err) => {
        console.error("Failed to fetch departments", err);
        Swal.fire("Error", "Failed to fetch departments", "error");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!positionName.trim() || !baseSalary || !jobAllowance || !departmentId) {
      Swal.fire({
        icon: "error",
        title: "Incomplete or Invalid Data",
        text: "Please fill in all fields correctly.",
      });
      return;
    }

    onSave({
      position_name: positionName.trim(),
      base_salary: Number(baseSalary),
      job_allowance: Number(jobAllowance), 
      department_id: Number(departmentId),
    });
  };

  return (
    <BaseModal
      title="Add New Position"
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
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-medium">Position Name</label>
          <input
            type="text"
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
            className="form-control"
            placeholder="e.g. Backend Developer"
            style={{ border: "1px solid #ccc" }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">Base Salary</label>
          <input
            type="number"
            value={baseSalary}
            onChange={(e) => setBaseSalary(e.target.value)}
            className="form-control"
            placeholder="e.g. 5000000"
            style={{ border: "1px solid #ccc" }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">Job Allowance</label>
          <input
            type="number"
            value={jobAllowance}
            onChange={(e) => setJobAllowance(e.target.value)}
            className="form-control"
            placeholder="e.g. 1000000"
            style={{ border: "1px solid #ccc" }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">Department</label>
          <select
            className="form-control"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
            style={{ border: "1px solid #ccc" }}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.department_id} value={dept.department_id}>
                {dept.department_name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </BaseModal>
  );
}
  
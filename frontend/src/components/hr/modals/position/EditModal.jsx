// components/modals/position/edit-modal
import React, { useState, useEffect } from "react";
import BaseModal from "../../../common/BaseModal";
import Swal from "sweetalert2";
import { getAllDepartments } from "../../../../services/departmentService";

export default function EditModal({ position, onClose, onSave }) {
  const [positionName, setPositionName] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [jobAllowance, setJobAllowance] = useState("");  
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    if (position) {
      setPositionName(position.position_name || "");
      setBaseSalary(position.base_salary || "");
      setJobAllowance(position.job_allowance || "");  
      setDepartmentId(position.department_id || "");
    }
  }, [position]);

  useEffect(() => {
    getAllDepartments()
      .then((res) => {
        setDepartments(res.data?.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch departments", err);
        Swal.fire("Error", "Failed to fetch departments", "error");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!positionName.trim() || !baseSalary || !departmentId || jobAllowance === "") {
      Swal.fire({
        icon: "error",
        title: "Incomplete or Invalid Data",
        text: "Please fill in all fields correctly.",
      });
      return;
    }

    onSave({
      id: position.position_id,
      position_name: positionName.trim(),
      base_salary: Number(baseSalary),
      job_allowance: Number(jobAllowance),
      department_id: Number(departmentId),
    });
  };

  return (
    <BaseModal
      title="Edit Position"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Update
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
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">Base Salary</label>
          <input
            type="number"
            value={baseSalary}
            onChange={(e) => setBaseSalary(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">Job Allowance</label>
          <input
            type="number"
            value={jobAllowance}
            onChange={(e) => setJobAllowance(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">Department</label>
          <select
            className="form-control"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d.department_id} value={d.department_id}>
                {d.department_name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </BaseModal>
  );
}

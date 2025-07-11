// components/modal/department/add
import React, { useState, useEffect } from "react";
import BaseModal from "../../common/BaseModal";
import Swal from "sweetalert2";
import axios from "axios";

export default function AddModal({ onClose, onSave }) {
  const [departmentName, setDepartmentName] = useState("");
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/positions")
      .then((res) => setPositions(res.data.data))
      .catch((err) => console.error("Failed to fetch positions", err));

    axios
      .get("http://localhost:4000/api/v1/departments")
      .then((res) => setDepartments(res.data.data))
      .catch((err) => console.error("Failed to fetch departments", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!departmentName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Data",
        text: "Please fill in the department name.",
      });
      return;
    }

    if (!selectedPosition || !selectedDepartment || !gender || !status) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Data",
        text: "Please select all dropdowns.",
      });
      return;
    }

    const newData = {
      department_name: departmentName.trim(),
      position_id: selectedPosition,
      department_id: selectedDepartment,
      gender,
      status,
    };

    onSave(newData);
  };

  return (
    <BaseModal
      title="Add Department"
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
            Save
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Department Name</label>
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            className="form-control"
            placeholder="e.g. Human Resources"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Position</label>
          <select
            className="form-select"
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
          >
            <option value="">-- Select Position --</option>
            {positions.map((pos) => (
              <option key={pos.position_id} value={pos.position_id}>
                {pos.position_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Department</label>
          <select
            className="form-select"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">-- Select Department --</option>
            {departments.map((dept) => (
              <option key={dept.department_id} value={dept.department_id}>
                {dept.department_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">-- Select Gender --</option>
            <option value="W">W</option>
            <option value="M">M</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Employee Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">-- Select Status --</option>
            <option value="Permanent">Permanent</option>
            <option value="Contract">Contract</option>
            <option value="Probation">Probation</option>
            <option value="Outsourced">Outsourced</option>
            <option value="Intern">Intern</option>
            <option value="Resigned">Resigned</option>
          </select>
        </div>
      </form>
    </BaseModal>
  );
}

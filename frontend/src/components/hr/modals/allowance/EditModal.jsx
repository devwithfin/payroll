// components/hr/modals/allowance/edit-modal
import React, { useEffect, useState } from "react";
import BaseModal from "../../../common/BaseModal";
import { updateEmployeeAllowance } from "../../../../services/employeeAllowanceService";
import { getAllEmployees } from "../../../../services/employeeService";
import { getAllAllowances } from "../../../../services/allowanceService";
import { toast } from "react-toastify";

export default function EditModal({ data, onClose }) {
  const [employees, setEmployees] = useState([]);
  const [allowances, setAllowances] = useState([]);
  const [form, setForm] = useState({
    allowance_id: "",
    amount: "",
    effective_date: "",
    end_date: "",
  });

  useEffect(() => {
    getAllEmployees()
      .then((res) => setEmployees(res.data.data))
      .catch(() => toast.error("Failed to load employees"));

    getAllAllowances()
  .then((res) => setAllowances(res.data.data))  
  .catch(() => toast.error("Failed to load allowances"));
  }, []);

  useEffect(() => {
    if (data) {
      setForm({
        allowance_id: data.allowance_id || "",
        amount: data.amount || "",
        effective_date: data.effective_date || "",
        end_date: data.end_date || "",
      });
    }
  }, [data]);

  useEffect(() => {
    const selectedAllowance = allowances.find(
      (a) => String(a.allowance_id) === String(form.allowance_id)
    );
    const selectedEmployee = employees.find(
      (e) => String(e.employee_id) === String(data.employee_id)
    );

    if (!selectedAllowance || !selectedEmployee) return;

    if (selectedAllowance.default_amount !== null) {
      setForm((prev) => ({
        ...prev,
        amount: selectedAllowance.default_amount,
      }));
    } else if (
      selectedAllowance.allowance_name.toLowerCase().includes("jabatan")
    ) {
      setForm((prev) => ({
        ...prev,
        amount: selectedEmployee?.job_allowance || 0,
      }));
    }
  }, [form.allowance_id, allowances, employees, data.employee_id]);

  const handleSubmit = async () => {
    const { amount, effective_date, end_date } = form;

    if (!form.allowance_id || !amount || !effective_date || !end_date) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      await updateEmployeeAllowance(data.emp_allowance_id, {
        allowance_id: form.allowance_id,
        amount,
        effective_date,
        end_date,
      });
      toast.success("Allowance updated successfully");
      onClose();
    } catch (err) {
      toast.error("Failed to update allowance");
      console.error(err);
    }
  };

  return (
    <BaseModal
      title="Edit Employee Allowance"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
            <button
            className="btn"
            style={{ backgroundColor: "#1071B9", color: "#fff" }}
            onClick={handleSubmit}
          >
            Update
          </button>
        </>
      }
    >
      <div className="mb-3">
        <label className="form-label">Employee</label>
        <input
          className="form-control"
          value={data.full_name || "-"}
          disabled
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Allowance</label>
        <select
          className="form-select"
          value={form.allowance_id}
          onChange={(e) =>
            setForm({ ...form, allowance_id: e.target.value })
          }
        >
          <option value="">-- Select Allowance --</option>
          {allowances.map((a) => (
            <option key={a.allowance_id} value={a.allowance_id}>
              {a.allowance_name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Amount</label>
        <input
          type="number"
          className="form-control"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Effective Date</label>
        <input
          type="date"
          disabled
          className="form-control"
          value={form.effective_date}
          onChange={(e) =>
            setForm({ ...form, effective_date: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">End Date</label>
        <input
          type="date"
          disabled
          className="form-control"
          value={form.end_date}
          onChange={(e) =>
            setForm({ ...form, end_date: e.target.value })
          }
        />
      </div>
    </BaseModal>
  );
}

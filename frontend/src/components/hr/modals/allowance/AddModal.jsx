// components/modals/allowance/add-modal
import React, { useEffect, useState } from "react";
import BaseModal from "../../../common/BaseModal";
import { createEmployeeAllowance } from "../../../../services/employeeAllowanceService";
import { getAllEmployees } from "../../../../services/employeeService";
import { getAllAllowances } from "../../../../services/allowanceService";
import { getAllPayrollPeriods } from "../../../../services/payrollPeriodService";
import { toast } from "react-toastify";

export default function AddModal({ onClose }) {
  const [employees, setEmployees] = useState([]);
  const [allowances, setAllowances] = useState([]);
  const { employee_id, allowance_id } = form;
  const [form, setForm] = useState({
    employee_id: "",
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
      .then((res) => setAllowances(res.data))
      .catch(() => toast.error("Failed to load allowances"));

    getAllPayrollPeriods()
      .then((res) => {
        const periods = res.data.data;
        const today = new Date();

        const currentPeriod = periods.find((p) => {
          const start = new Date(p.start_date);
          const end = new Date(p.end_date);
          return today >= start && today <= end;
        });

        if (currentPeriod) {
          setForm((prev) => ({
            ...prev,
            effective_date: currentPeriod.start_date,
            end_date: currentPeriod.end_date,
          }));
        } else {
          toast.warn("No active payroll period found for today");
        }
      })
      .catch(() => toast.error("Failed to load payroll periods"));
  }, []);

  useEffect(() => {
  if (!employee_id || !allowance_id) return;

  const allowance = allowances.find(
    (a) => String(a.allowance_id) === String(allowance_id)
  );
  const employee = employees.find(
    (e) => String(e.employee_id) === String(employee_id)
  );

  if (!allowance || !employee) return;

  if (allowance.default_amount !== null) {
    setForm((prev) => ({ ...prev, amount: allowance.default_amount }));
  } else if (allowance.allowance_name.toLowerCase().includes("tunjangan jabatan")) {
    setForm((prev) => ({ ...prev, amount: employee.job_allowance || "" }));
  }
}, [employee_id, allowance_id, allowances, employees]);

  const handleSubmit = async () => {
    const { employee_id, allowance_id, effective_date, end_date } = form;
    if (!employee_id || !allowance_id || !effective_date || !end_date) {
      toast.warn("Please complete all fields");
      return;
    }

    try {
      await createEmployeeAllowance(form);
      toast.success("Employee Allowance successfully");
      onClose();
    } catch {
      toast.error("Failed to add Employee Allowance allowance");
    }
  };

  return (
    <BaseModal
      title="Add Employee Allowance"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </>
      }
    >
      <div className="mb-3">
        <label className="form-label">Employee</label>
        <select
          className="form-select"
          value={form.employee_id}
          onChange={(e) =>
            setForm({ ...form, employee_id: e.target.value, amount: "" })
          }
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.employee_id} value={emp.employee_id}>
              {emp.full_name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Allowance</label>
        <select
          className="form-select"
          value={form.allowance_id}
          onChange={(e) =>
            setForm({ ...form, allowance_id: e.target.value, amount: "" })
          }
        >
          <option value="">Select Allowance</option>
          {allowances.map((alw) => (
            <option key={alw.allowance_id} value={alw.allowance_id}>
              {alw.allowance_name}
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
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <div className="form-text">
         Leave blank if you want it to be automatic from default/position
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Effective Date</label>
        <input
          type="date"
          className="form-control"
          value={form.effective_date}
          readOnly
        />
      </div>

      <div className="mb-3">
        <label className="form-label">End Date</label>
        <input
          type="date"
          className="form-control"
          value={form.end_date}
          readOnly
        />
      </div>
    </BaseModal>
  );
}

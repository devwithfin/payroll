// components/modals/deduction/add-modal
import React, { useEffect, useState } from "react";
import BaseModal from "../../../common/BaseModal";
import { createEmployeeDeduction } from "../../../../services/employeeDeductionService";
import { getAllEmployees } from "../../../../services/employeeService";
import { getAllDeductions } from "../../../../services/deductionService";
import { getAllPayrollPeriods } from "../../../../services/payrollPeriodService";
import { toast } from "react-toastify";

export default function AddModal({ onClose }) {
  const [employees, setEmployees] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    deduction_id: "",
    amount: "",
    effective_date: "",
    end_date: "",
  });

  useEffect(() => {
    getAllEmployees()
      .then((res) => setEmployees(res.data.data))
      .catch(() => toast.error("Failed to load employees"));

    getAllDeductions()
      .then((res) => setDeductions(res.data.data))
      .catch(() => toast.error("Failed to load deductions"));

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

  const handleSubmit = async () => {
    const { employee_id, deduction_id, amount, effective_date, end_date } =
      form;
    if (
      !employee_id ||
      !deduction_id ||
      !amount ||
      !effective_date ||
      !end_date
    ) {
      toast.warning("Please complete all fields");
      return;
    }

    try {
      await createEmployeeDeduction(form);
      toast.success("Employee deduction added successfully");
      onClose();
    } catch (err) {
      toast.error("Failed to add employee deduction");
      console.error(err);
    }
  };

  return (
    <BaseModal
      title="Add Employee Deduction"
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
          onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
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
        <label className="form-label">Deduction</label>
        <select
          className="form-select"
          value={form.deduction_id}
          onChange={(e) => setForm({ ...form, deduction_id: e.target.value })}
        >
          <option value="">Select Deduction</option>
          {deductions.map((ded) => (
            <option key={ded.deduction_id} value={ded.deduction_id}>
              {ded.deduction_name}
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

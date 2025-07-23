// components/modals/deduction/EditModal.jsx
import React, { useEffect, useState } from "react";
import BaseModal from "../../../common/BaseModal";
import { updateEmployeeDeduction } from "../../../../services/employeeDeductionService";
import { getAllDeductions } from "../../../../services/deductionService";
import { toast } from "react-toastify";

export default function EditModal({ data, onClose }) {
  const [deductions, setDeductions] = useState([]);
  const [form, setForm] = useState({
    deduction_id: "",
    amount: "",
    effective_date: "",
    end_date: "",
  });

  useEffect(() => {
    getAllDeductions()
      .then((res) => setDeductions(res.data.data))
      .catch(() => toast.error("Failed to load deductions"));
  }, []);

  useEffect(() => {
    if (data) {
      setForm({
        deduction_id: data.deduction_id || "",
        amount: data.amount || "",
        effective_date: data.effective_date || "",
        end_date: data.end_date || "",
      });
    }
  }, [data]);

  const handleSubmit = async () => {
    const { deduction_id, amount, effective_date, end_date } = form;

    if (!deduction_id || !amount || !effective_date || !end_date) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      await updateEmployeeDeduction(data.emp_deduction_id, form);
      toast.success("Deduction updated successfully");
      onClose();
    } catch (err) {
      toast.error("Failed to update deduction");
      console.error(err);
    }
  };

  return (
    <BaseModal
      title="Edit Employee Deduction"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Save Changes
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
        <label className="form-label">Deduction</label>
        <select
          className="form-select"
          value={form.deduction_id}
          onChange={(e) =>
            setForm({ ...form, deduction_id: e.target.value })
          }
        >
          <option value="">-- Select Deduction --</option>
          {deductions.map((d) => (
            <option key={d.deduction_id} value={d.deduction_id}>
              {d.deduction_name}
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

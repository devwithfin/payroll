// pages/hr/employees
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Table from "../../components/common/Table";
import AddModal from "../../components/modals/employee/AddModal";
import EditModal from "../../components/modals/employee/EditModal";

import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../services/EmployeeService";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
  try {
    const res = await getAllEmployees();
    console.log("EMPLOYEES DATA:", res.data.data); 
    setEmployees(res.data.data);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    toast.error("Failed to fetch employee data");
  }
}

  const handleSave = async (data) => {
    try {
      const res = await createEmployee(data);
      setEmployees([res.data.data, ...employees]); //tampilkan di baris atas
      setShowAddModal(false);
      toast.error("Employee added succesfully");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to save employee";
      toast.error(msg);
    }
  };

  const handleUpdate = async (data) => {
  try {
    await updateEmployee(data.id, data);
    await fetchEmployees(); // ambil ulang seluruh data
    setShowEditModal(false);
    toast.success("Employee updated successfully");
  } catch (err) {
    const msg = err.response?.data?.message || "Failed to update employee";
    toast.error(msg);
  }
};


  const handleDelete = (row) => {
  Swal.fire({
    title: "Are you sure?",
    text: `Delete employee "${row.full_name}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#1071b9",
    confirmButtonText: "Yes!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const employeeId = row.employee_id || row.id; // ✅ Pastiin ID-nya aman
        if (!employeeId) {
          toast.error("Invalid employee ID");
          return;
        }

        await deleteEmployee(employeeId);
        setEmployees(employees.filter((e) => (e.employee_id || e.id) !== employeeId));
        toast.success("Employee deleted successfully");
      } catch (err) {
        const msg = err.response?.data?.message || "Failed to delete employee";
        toast.error(msg);
        console.error("DELETE ERROR:", err);
      }
    }
  });
};

  const renderColumnsWithPage = (currentPage, perPage) =>  [
    { name: "#", selector: (row, index) => (currentPage - 1) * perPage + index + 1, width: "50px"},
    { name: "Full Name", selector: (row) => row.full_name, sortable: true },
    { name: "Position", selector: (row) => row.position_id  },
    { name: "Department", selector: (row) => row.department_id },
    { name: "NIK", selector: (row) => row.employee_nik },
    { name: "Birth Date", selector: (row) => row.dob },
    { name: "Address", selector: (row) => row.address },
    { name: "Phone", selector: (row) => row.phone_number },
    { name: "Email", selector: (row) => row.email },
    { name: "Status", selector: (row) => row.employment_status },
    { name: "Join Date", selector: (row) => row.join_date },
    { name: "NPWP", selector: (row) => row.npwp_number },
    { name: "PTKP", selector: (row) => row.pt_kp },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-warning text-white"
            title="Edit"
            onClick={() => {
              setSelectedEmployee(row);
              setShowEditModal(true);
          }}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button
            className="btn btn-sm btn-danger"
            title="Delete"
            onClick={() => handleDelete(row)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-1">
      <Table 
        title="Employee Data"
        data={employees}
        renderColumnsWithPage={renderColumnsWithPage}
        onAdd={() => setShowAddModal(true)}
      />

      {showAddModal && (
        <AddModal onClose={() => setShowAddModal(false)} onSave={handleSave} />
      )}

      {showEditModal && (
        <EditModal
          employee={selectedEmployee}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}

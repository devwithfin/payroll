// pages/hr/account-activation
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Table from "../../components/common/Table";
import EditModal from "../../components/hr/modals/account-activation/EditModal";
import { getAllAccounts } from "../../services/AccountService";

export default function AccountActivation() {
  const [accounts, setAccounts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await getAllAccounts();
      setAccounts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch account data:", error);
      toast.error("Failed to fetch account data");
    }
  };

  const handleUpdate = () => {
    setShowEditModal(false);
    fetchAccounts();
    toast.success("Account activated successfully");
  };

  const getStatusBadge = (status) => {
    const lower = status?.toLowerCase();
    let bg = "#6c757d";

    if (lower === "active") bg = "#198754";
    else if (lower === "not active") bg = "#dc3545";

    return (
      <span
        className="badge text-white text-capitalize"
        style={{
          backgroundColor: bg,
          minWidth: "100px",
          textAlign: "center",
          padding: "0.35rem 0.75rem",
          fontSize: "0.85rem",
          borderRadius: "0.5rem",
        }}
      >
        {status || "Unknown"}
      </span>
    );
  };

  const renderColumnsWithPage = (currentPage, perPage) => [
    {
      name: "#",
      selector: (row, index) => (currentPage - 1) * perPage + index + 1,
      width: "50px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width:"500px"
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) =>
        new Intl.DateTimeFormat("id-ID", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date(row.created_at)),
      sortable: true,
    },
      {
      name: "Status",
      selector: (row) => getStatusBadge(row.password ? "Active" : "Not Active"),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => {
            setSelectedAccount(row);
            setShowEditModal(true);
          }}
          className="btn btn-sm btn-warning text-white"
          title="Activate Account"
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
      ),
      width: "100px",
    },
  ];

  return (
    <div className="container mx-auto p-1">
      <Table
        title="Account Activation"
        data={accounts}
        renderColumnsWithPage={renderColumnsWithPage}
        showAddButton={false}
      />

      {showEditModal && selectedAccount && (
        <EditModal
          account={selectedAccount}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}

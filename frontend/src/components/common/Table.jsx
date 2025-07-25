// components/common/table
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const customStyles = {
  table: {
    style: {
      borderCollapse: "collapse",
      border: "1px solid #ddd",
    },
  },
  rows: {
    style: {
      height: "50px",
      borderBottom: "1px solid #ddd",
    },
  },
  headCells: {
    style: {
      fontWeight: "bold",
      fontSize: "14px",
      textAlign: "center",
      backgroundColor: "#ffffff",
      color: "#333333",
      borderBottom: "1px solid #ddd",
      borderRight: "1px solid #ddd",
      padding: "10px",
    },
  },
  cells: {
    style: {
      textAlign: "left",
      padding: "10px",
      borderRight: "1px solid #ddd",
    },
  },
};

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const SearchInput = styled.input`
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const Select = styled.select`
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default function Table({
  title = "Data",
  data = [],
  columns = [],
  renderColumnsWithPage,
  onAdd,
  showAddButton = true,
  customControls = null,
}) {
  const [filterText, setFilterText] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = data.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(filterText.toLowerCase())
  );

  const totalRows = filteredItems.length;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const displayedColumns = renderColumnsWithPage
    ? renderColumnsWithPage(currentPage, perPage)
    : columns;

  return (
    <div className="card border-0" style={{ width: "100%" }}>
      <div className="card-header py-0" style={{ backgroundColor: "#fff" }}>
        <div className="d-flex mb-2 justify-content-between align-items-center">
          <h6 className="mb-0" style={{ color: "#1071B9" }}>
            {title}
          </h6>
          {showAddButton && (
            <button
              onClick={onAdd}
              className="btn btn-sm d-flex align-items-center gap-2"
              style={{
                backgroundColor: "#1071B9",
                borderColor: "#1071B9",
                color: "#fff",
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
              Add {title}
            </button>
          )}
        </div>
      </div>

      <div className="card-body px-3 py-2">
        <ControlsWrapper>
          <div>
            <Select value={perPage} onChange={handlePerPageChange}>
              {[5, 10, 15, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Select>
            <label className="mx-2">entries per page</label>
          </div>
          <div className="d-flex gap-2 align-items-center">
            {customControls}
            <SearchInput
              type="text"
              placeholder="Search..."
              value={filterText}
              onChange={(e) => {
                setFilterText(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </ControlsWrapper>

        <DataTable
          className="mt-3"
          columns={displayedColumns}
          data={currentItems}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          paginationPerPage={perPage}
          highlightOnHover
          striped
          dense
          responsive
          noHeader
          fixedHeader
          fixedHeaderScrollHeight="400px"
          customStyles={customStyles}
          paginationComponentOptions={{ noRowsPerPage: true }}
          subHeader={false}
        />
      </div>
    </div>
  );
}

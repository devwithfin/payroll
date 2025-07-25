import React from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";

const customStyles = {
  table: {
    style: {
      borderCollapse: "collapse",
      border: "1px solid #ddd",
    },
  },
  rows: {
    style: {
      height: "48px",
      borderBottom: "1px solid #ddd",
    },
  },
  headCells: {
    style: {
      fontWeight: "bold",
      fontSize: "14px",
      textAlign: "center",
      backgroundColor: "#fff",
      color: "#333",
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

const Wrapper = styled.div`
  width: 100%;
  .rdt_Table {
    border-radius: 12px;
    overflow: hidden;
  }
`;

export default function SimpleTable({ data = [], columns = [] }) {
  return (
    <Wrapper>
      <DataTable
        columns={columns}
        data={data}
        noHeader
        pagination={false}
        highlightOnHover
        striped
        dense
        responsive
        customStyles={customStyles}
      />
    </Wrapper>
  );
}

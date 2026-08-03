import styled from "styled-components";
import { Table } from "antd";

export const Container = styled.div`
  padding: 20px;
  max-width: 100%;
  margin-left: 35px;
  text-align: center;
`;

export const StyledHeading = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 15px;
  text-align: center;

  @media (max-width: 1360px) {
    font-size: 18px;
  }
`;

export const StyledTable = styled(Table)`
  .ant-table {
    border-radius: 8px; 
    overflow: hidden;
  }

  .ant-table-thead > tr > th {
    color: black !important; 
    font-weight: bold;
    text-align: center;
    width: 200px;
  }

  .ant-table-tbody > tr > td {
    text-align: center;
    padding: 12px;
  }

  .ant-table-tbody > tr {
    transition: background-color 0.3s ease, transform 0.3s ease;
    cursor: pointer;
    position: relative;
  }

  .ant-table-tbody > tr:hover {
    background-color: #2290AC20 !important;
    transform: translateY(-4px) translateZ(-4px);
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
  }

  :where(.css-dev-only-do-not-override-tjsggz).ant-table-wrapper 
  .ant-table-tbody 
  .ant-table-row 
  > .ant-table-cell-row-hover {
    background: none;
  }

  .ant-table-row:hover {
    background-color: #f0f5ff !important;
  }

  @media (max-width: 1360px) {
    .ant-table-thead > tr > th {
      font-size: 12px;
      padding: 10px;
    }

    .ant-table-tbody > tr > td {
      font-size: 10px;
      padding: 8px;
    }

    .ant-pagination .ant-pagination-item {
      font-size: 10px;
      min-width: 22px;
      height: 22px;
      line-height: 20px;
      margin: auto 0;
    }
  }
`;

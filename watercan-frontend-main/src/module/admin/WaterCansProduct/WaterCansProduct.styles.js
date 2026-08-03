import styled from "styled-components";
import { Table } from "antd";

export const Container = styled.div`
  padding: 20px;
  max-width: 100%;
  margin-left: 35px;
  text-align: center;
`;

export const StyledButton = styled.button`
  background: #2290AC;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 16px;
  text-align: center;

  &:hover {
    background: #2290ac60;
  }

  @media (max-width: 1360px) {
    font-size: 14px;
    padding: 8px 12px;
  }

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


export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  width: 500px;

  @media (max-width: 1360px) {
    width: 400px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 22px;

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
  position: relative; /* important to allow transform without affecting layout */
}

.ant-table-tbody > tr:hover {
  background-color: #2290AC20 !important;
  transform:  translateY(-4px) translateZ(-4px)  ; /* move up slightly */
  border-top-left-radius: 50px;
  border-bottom-right-radius: 50px;
}


:where(.css-dev-only-do-not-override-tjsggz).ant-table-wrapper .ant-table-tbody .ant-table-row >.ant-table-cell-row-hover {
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

    .ant-table-tbody > tr > td {
      padding: 10px;
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
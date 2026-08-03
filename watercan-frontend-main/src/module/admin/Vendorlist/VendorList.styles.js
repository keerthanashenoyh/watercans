import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
    margin-left: 40px;

     .modal{
     width: 300px;
     }
`;

export const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 20px;

    @media (max-width: 1360px) {
        font-size: 18px;
        margin-bottom: 10px;
    }
`;

export const FilterContainer = styled.div`
    display: flex;
    justify-content: end;   
    margin-bottom: 15px;
    
    span {
        font-size: 16px;
        margin-right: 10px;
        font-weight: bold;
    }

    @media (max-width: 1360px) {
    margin-bottom: 10px;

        span {
            font-size: 12px;
            margin-right: 5px;
        }
    }
`;

export const StyledTable = styled.div`
    .ant-table {
        background: #fff;
        border-radius: 8px;
    }

    .ant-table-thead > tr > th {
        background: #fff;
        font-weight: bold;
        text-align: center;
    }

    .ant-table-tbody > tr > td {
        text-align: center;
    }

    .ant-table-wrapper .ant-table-tbody>tr>td{
        padding: 5px;
    }

    .ant-pagination {
        text-align: center;
        margin-top: 20px;
    }
        :where(.css-dev-only-do-not-override-tjsggz).ant-spin-nested-loading .ant-spin-container {
    position: relative;
    transition: opacity 0.3s;
    height: 35vh;
}

    a {
        color: #1890ff;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

     :where(.css-dev-only-do-not-override-tjsggz).ant-modal .ant-modal-content {
        width: 100px;
    }

`;

export const ModalContent = styled.div`


    p {
        font-size: 18px;
        margin: 8px 0;
        color: #333;

        @media (max-width: 1360px) {
            font-size: 12px;
        }
    }

    strong {
        color: #000;
    }

`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    button {
        width: 45%;
        font-size: 16px;

        @media (max-width: 1360px) {
            font-size: 12px;
        }
    }
`;

export const OrderStatus = styled.div`
  font-weight: bold;
  font-size: 16px;
  padding: 5px 6px;
  border-radius: 10px;
  display: inline-block; 
  width: 90%;
  text-align: center;
  cursor: pointer;
  
color: ${({ status }) =>
    status === "pending" ? "orange" :
    status === "approved" ? "green" :
    status === "rejected" ? "red" : "black"};

background-color: ${({ status }) =>
    status === "pending" ? "rgba(255, 166, 0, 0.38)" :
    status === "approved" ? "rgba(20, 255, 71, 0.53)" :
    status === "rejected" ? "rgba(255, 0, 0, 0.31)" : "rgba(200, 200, 200, 0.3)"};

border: 0.5px solid ${({ status }) =>
    status === "pending" ? "orange" :
    status === "approved" ? "green" :
    status === "rejected" ? "red" : "black"};

    @media (max-width: 1360px) {
    width: 70%;
    padding: 2px 3px;
    font-size: 12px;
  }
`;

export const CustomModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const CustomModalWrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  width: 30%;
  padding: 24px;
  position: relative;
`;

export const CustomModalBox = styled.div`
  max-height: 80vh;
  overflow-y: auto;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 16px;
  background: transparent;
  border: none;
  font-size: 28px;
  cursor: pointer;
`;

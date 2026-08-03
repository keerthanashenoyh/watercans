import styled from "styled-components";
import { Modal } from "antd";

export const Container = styled.div`
    padding: 20px 0;
    margin-left: 40px;
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
    justify-content: center;
    align-items: center;   
    margin-bottom: 15px;
    
    .span {
        font-size: 16px;
        margin-right: 10px;
        font-weight: bold;

        @media (max-width: 1360px) {
            font-size: 14px;
        }
    }

    @media (max-width: 1360px) {
    
    .ant-select-single{
    font-size: 10px;
    height: 25px;
    }
    .ant-select .ant-select-arrow{
    right: 20px;
    }

    .ant-select-single.ant-select-show-arrow .ant-select-selection-item {
    font-size: 10px;}

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

    .ant-pagination {
        text-align: center;
        margin-top: 20px;
    }

    :where(.css-dev-only-do-not-override-tjsggz).ant-table-wrapper .ant-table-tbody>tr>td {
        padding: 5px;
    }

    a {
        color: #1890ff;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    @media (max-width: 1360px) {
        .ant-table-thead > tr > th {
            font-size: 12px;
        }

        .ant-table-tbody > tr > td {
            font-size: 10px;
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

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    padding: 24px;
    border-radius: 10px;
  }
  .ant-modal-title {
    text-align: center;
    font-size: 22px;
    font-weight: bold;
  }

  @media (max-width: 1360px) {
    .ant-modal-title {
      font-size: 18px;
    }
      .ant-modal-content{
      padding: 10px;
      width: 350px;
      margin: 0 auto;}
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 16px;
  color: #444;
`;

export const DetailRow = styled.p`
  margin: 0;
  strong {
    font-weight: 600;
    color: #222;
  }

    @media (max-width: 1360px) {
        font-size: 12px;
        margin-bottom: 5px;
        strong {
            font-size: 14px;
        }

    }
`;

export const OrderStatus = styled.div`
  font-weight: bold;
  padding: 7px 8px;
  border-radius: 10px;
  display: inline-block; 
  width: 40%;
  text-align: center;
  
color: ${({ status }) =>
    status === "Order placed" ? "orange" :
    status === "confirmed" ? "blue" :  // Darker Orange
    status === "Shipped" ? "purple" :
    status === "Delivered" ? "green" :
    status === "Cancelled" ? "red" : "black"};

background-color: ${({ status }) =>
    status === "Order placed" ? "rgba(255, 165, 0, 0.3)" :
    status === "confirmed" ? "rgba(113, 123, 219, 0.3)" :  // Darker Orange Background
    status === "Shipped" ? "rgba(146, 59, 146, 0.29)" :
    status === "Delivered" ? "rgba(20, 255, 71, 0.4)" :
    status === "Cancelled" ? "rgba(255, 0, 0, 0.3)" : "rgba(200, 200, 200, 0.3)"};

border: 0.5px solid ${({ status }) =>
    status === "Order placed" ? "orange" :
    status === "confirmed" ? "blue" :  // Darker Orange Border
    status === "Shipped" ? "purple" :
    status === "Delivered" ? "green" :
    status === "Cancelled" ? "red" : "black"};

    @media (max-width: 1360px) {
        font-size: 10px;
        width: 60%;
        padding: 5px 8px;
    }
`;

export const TitleContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px
`;

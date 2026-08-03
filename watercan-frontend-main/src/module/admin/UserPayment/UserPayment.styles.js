import styled from "styled-components";

export const Container = styled.div`
`;

export const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
`;

export const FilterContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;

    label {
        margin-right: 10px;
        font-size: 16px;
        color: #333;
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

    .created {
  font-weight: bold;
  padding: 5px 6px;
  border-radius: 10px;
  display: inline-block; 
  width: 90%;
  text-align: center;
  cursor: pointer;
background: #2290AC;
    color: white;
    text-decoration: none;
    transition: background 0.3s ease;
    }

    :where(.css-dev-only-do-not-override-tjsggz).ant-table-wrapper .ant-table-tbody>tr>td {
        padding: 5px;
    }

    a:hover {
        text-decoration: underline;
    }
`;

export const ModalContent = styled.div`
    p {
        font-size: 16px;
        margin: 8px 0;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

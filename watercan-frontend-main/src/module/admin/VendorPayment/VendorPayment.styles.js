import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    // max-width: 95%;
    margin-left: 40px;
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

    a {
        color: #1890ff;
        font-weight: bold;
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

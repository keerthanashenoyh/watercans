// CreateWaterCanForm.styles.js
import styled from "styled-components";

export const FormContainer = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 10px;

  form {
    display: flex;
    flex-direction: column;
  }

  .ant-form-item {
    margin-bottom: 15px;
  }

  .ant-btn {
    width: 150px;
  }

  .ant-modal .ant-modal-title{
    text-align: center;
  }

  .ant-form-item .ant-form-item-control-input-content {
    display: flex;
    justify-content: flex-end;
    align-items: end;
    margin-top: 5px;
  }

  .ant-form-item .ant-form-item-control-input{
      min-height: 0px;
  }

  @media (max-width: 1360px) {
    padding: 10px;

    form {
      flex-direction: column;
    }

    .ant-form-item {
      margin-bottom: 5px;
    }

    .ant-btn {
      font-size: 12px;
      padding: 2px 5px;
      width: 100px;
    }

    .ant-form-item .ant-form-item-label >label{
      font-size: 12px;
    }

    :where(.css-dev-only-do-not-override-tjsggz).ant-input{
      font-size: 10px;
    }

    :where(.css-dev-only-do-not-override-tjsggz).ant-form-vertical .ant-form-item:not(.ant-form-item-horizontal) .ant-form-item-label{
      padding: 0px;
    }

  }



`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 1360px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

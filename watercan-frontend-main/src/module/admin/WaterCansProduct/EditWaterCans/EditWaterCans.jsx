import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getWaterCanById, updateWaterCan } from "../../../../api/waterCanApi";
import { Form, Input, InputNumber, Button } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormContainer = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 10px;

  .ant-form-item {
    margin-bottom: 15px;
  }

  .ant-btn {
    width: 150px;
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
.ant-input-number .ant-input-number-input {
  font-size: 12px;
  padding: 2px 5px;}
  }

`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 20%;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 1360px) {
    width: 100px;
    font-size: 12px;
    padding: 5px;
    margin-top: 10px;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 1360px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const EditWaterCan = ({ onSuccess, onClose, isEditMode, initialData }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWaterCanData = async () => {
      if (isEditMode && initialData) {
        try {
          const response = await getWaterCanById(initialData._id);
          const data = response.data;
          form.setFieldsValue({
            Brand: data.Brand || "",
            MRP: data.MRP || "",
            selling_price: data.selling_price || "",
            capacityInLiters: data.capacityInLiters || "",
          });
        } catch (error) {
          console.error("Error fetching water can data:", error);
        }
      }
    };
    fetchWaterCanData();
  }, [isEditMode, initialData, form]);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const { MRP, selling_price } = values;
  
    try {
      await updateWaterCan(initialData._id, { MRP, selling_price });
      toast.success("Water Can updated successfully!");
      onSuccess();
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Failed to update water can");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };
  

  return (
    <FormContainer>
      <Title>Edit Water Can</Title>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Brand"
          name="Brand"
          rules={[
            { required: true, message: "Please enter brand name" },
            {
              pattern: /^[A-Za-z\s]+$/,
              message: "Brand name should contain only letters",
            },
          ]}
        >
          <Input placeholder="Enter brand"  disabled/>
        </Form.Item>

        <Form.Item
  label="MRP"
  name="MRP"
  rules={[{ required: true, message: "Please enter MRP" }]}
>
  <InputNumber
    min={1}
    style={{ width: "100%" }}
    onKeyPress={(e) => {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault(); // block non-digit keys
      }
    }}
    onPaste={(e) => {
      const pasted = e.clipboardData.getData("text");
      if (!/^\d+$/.test(pasted)) {
        e.preventDefault(); // block pasted content if not all digits
      }
    }}
  />
</Form.Item>

<Form.Item
  label="Selling Price"
  name="selling_price"
  rules={[{ required: true, message: "Please enter selling price" }]}
>
  <InputNumber
    min={1}
    style={{ width: "100%" }}
    onKeyPress={(e) => {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    }}
    onPaste={(e) => {
      const pasted = e.clipboardData.getData("text");
      if (!/^\d+$/.test(pasted)) {
        e.preventDefault();
      }
    }}
  />
</Form.Item>


        <Form.Item
          label="Capacity (Litres)"
          name="capacityInLiters"
          rules={[{ required: true, message: "Please enter capacity in litres" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} disabled />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <SubmitButton type="submit">
            {isLoading ? "Updating..." : "Update"}
          </SubmitButton>
        </div>
      </Form>
      <ToastContainer />
    </FormContainer>
  );
};

export default EditWaterCan;

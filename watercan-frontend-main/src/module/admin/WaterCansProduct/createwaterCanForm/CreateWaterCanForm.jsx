import React, { useState } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { createWaterCan } from "../../../../api/waterCanApi";
import { FormContainer, Title } from "./CreateWaterCanForm.styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateWaterCanForm = ({ onSuccess, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await createWaterCan(values);
      toast.success("Water can created successfully!");

      form.resetFields(); // Clear form fields
      onSuccess(); // Fetch updated data
      setTimeout(() => { onClose(); // Close modal if applicable
        window.location.reload(); // Refresh the page
      }, 1000); // You can adjust delay if needed
    } catch (error) {
      console.error("Error creating water can:", error);
      toast.error("Failed to create water can");
    } finally {
      setLoading(false);
    }
  };
  
  // Restrict non-letter keys in Brand
  const restrictToLetters = (e) => {
    const char = String.fromCharCode(e.which);
    if (!/^[a-zA-Z\s]+$/.test(char)) {
      e.preventDefault();
    }
  };

  // Restrict non-digit keys
  const restrictToDigits = (e) => {
    if (e.key && !/[\d]/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Custom validator to block alphabetic characters in number fields
  const noAlphabetsValidator = (_, value) => {
    if (value && /[a-zA-Z]/.test(value.toString())) {
      return Promise.reject(new Error("Alphabets are not allowed"));
    }
    return Promise.resolve();
  };

  return (
    <FormContainer>
      <Title>Create Water Can</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
  label="Brand"
  name="Brand"
  validateTrigger="onChange"
  rules={[
    { required: true, message: "Please enter brand name" },
    {
      pattern: /^[A-Za-z\s]+$/,
      message: "Only letters and spaces are allowed",
    },
  ]}
>
  <Input
    placeholder="Enter brand"
    onKeyPress={(e) => {
      if (!/[a-zA-Z\s]/.test(e.key)) {
        e.preventDefault();
      }
    }}
    onPaste={(e) => {
      const pasted = e.clipboardData.getData("Text");
      if (!/^[A-Za-z\s]+$/.test(pasted)) {
        e.preventDefault();
        toast.error("Only letters and spaces are allowed");
      }
    }}
  />
</Form.Item>


<Form.Item
  label="MRP"
  name="MRP"
  validateTrigger="onChange"
  rules={[
    { required: true, message: "Please enter MRP" },
    {
      validator: (_, value) => {
        if (value && /[a-zA-Z]/.test(value)) {
          return Promise.reject(new Error("Alphabets are not allowed"));
        }
        return Promise.resolve();
      },
    },
  ]}
>
  <Input
    placeholder="Enter MRP"
    onChange={(e) => {
      const inputValue = e.target.value.replace(/[^0-9]/g, ""); // remove non-digits
      form.setFieldsValue({ MRP: inputValue });
    }}
  />
</Form.Item>

<Form.Item
  label="Selling Price"
  name="selling_price"
  validateTrigger="onChange"
  rules={[
    { required: true, message: "Please enter selling price" },
    {
      validator: (_, value) => {
        if (value && /[a-zA-Z]/.test(value)) {
          return Promise.reject(new Error("Alphabets are not allowed"));
        }
        return Promise.resolve();
      },
    },
  ]}
>
  <Input
    placeholder="Enter selling price"
    onChange={(e) => {
      const inputValue = e.target.value.replace(/[^0-9]/g, ""); // remove non-digits
      form.setFieldsValue({ selling_price: inputValue });
    }}
  />
</Form.Item>

<Form.Item
  label="Capacity (Litres)"
  name="capacityInLiters"
  validateTrigger="onChange"
  rules={[
    { required: true, message: "Please enter capacity in litres" },
    {
      validator: (_, value) => {
        if (value && /[a-zA-Z]/.test(value)) {
          return Promise.reject(new Error("Alphabets are not allowed"));
        }
        return Promise.resolve();
      },
    },
  ]}
>
  <Input
    placeholder="Enter capacity"
    onChange={(e) => {
      const inputValue = e.target.value.replace(/[^0-9]/g, ""); // remove non-digits
      form.setFieldsValue({ capacityInLiters: inputValue });
    }}
  />
</Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer />
    </FormContainer>
  );
};

export default CreateWaterCanForm;

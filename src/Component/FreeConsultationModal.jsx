import React, { useContext, useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { getGradient } from "../themes/theme";
import { ThemeContext } from "../themes/ThemeProvider";

const { Option } = Select;

export default function FreeConsultationModal({ open, onClose }) {
  const [form] = Form.useForm();
  const theme = useContext(ThemeContext);

  const handleFinish = (values) => {
    console.log("Form Submitted:", values);
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={700}
      bodyStyle={{ padding: "2rem" }}
      className="custom-modal"
    >
      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">Book Your Free Consultation</h2>
      <p className="text-gray-500 mb-6">
        Fill out the form below and our team will get in touch with you.
      </p>

      {/* Form */}
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        requiredMark="optional"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: "Please enter your phone" }]}
          >
            <Input placeholder="Enter your phone" />
          </Form.Item>
        </div>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email", message: "Enter valid email" }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item name="projectType" label="Project Type">
            <Select defaultValue="Complete Home Interior">
              <Option value="Complete Home Interior">Complete Home Interior</Option>
              <Option value="Modular Kitchen">Modular Kitchen</Option>
              <Option value="Living Room Design">Living Room Design</Option>
            </Select>
          </Form.Item>

          <Form.Item name="budget" label="Budget Range">
            <Select defaultValue="Under ₹2 Lakhs">
              <Option value="Under ₹2 Lakhs">Under ₹2 Lakhs</Option>
              <Option value="₹2 - ₹5 Lakhs">₹2 - ₹5 Lakhs</Option>
              <Option value="Above ₹5 Lakhs">Above ₹5 Lakhs</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item name="details" label="Additional Details">
          <Input.TextArea
            placeholder="Tell us about your vision, style preferences, specific requirements..."
            rows={4}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="h-12 font-semibold"
            style={{
              background: getGradient(theme),
              border: "none",
            }}
          >
            Book Free Consultation
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

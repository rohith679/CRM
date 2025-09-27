"use client";
import React, { useState } from "react";
import { Modal, Form, Input, Button, FloatButton } from "antd";
import { FileTextOutlined } from "@ant-design/icons"; // 📝 Quote icon

export default function Quote() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Quote Request:", values);
    // 🔗 Send to API here
    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      {/* Floating Button */}
      <FloatButton
        type="primary"
        icon={<FileTextOutlined />} // 👈 add icon here
        style={{ right: 24, bottom: 24 }}
        onClick={() => setOpen(true)}
      />

      {/* Modal */}
      <Modal
        title="Request a Quote"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <p className="text-gray-500 mb-4">
          Fill out the form and our team will get back to you shortly.
        </p>

        <Form form={form} layout="vertical" onFinish={handleFinish}>
          {/* Full Name */}
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input placeholder="Your full name" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          {/* Phone */}
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input placeholder="+91 99526 38166" />
          </Form.Item>

          {/* Service / Product Details */}
          <Form.Item
            label="Service / Product Details"
            name="details"
            rules={[{ required: true, message: "Please provide details" }]}
          >
            <Input.TextArea
              rows={3}
              placeholder="Example: Submersible pump, installation required..."
            />
          </Form.Item>

          {/* Buttons */}
          <Form.Item>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Submit Request
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

"use client";
import React, { useState } from "react";
import { Modal, Form, Input, Button, FloatButton } from "antd";
import { CalendarOutlined } from "@ant-design/icons"; // 📅 booking icon
import { ScheduleOutlined } from "@ant-design/icons";

export default function BookServices() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Booking Request:", values);
    // 🔗 You can send to API here
    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      {/* Floating Button */}
      <FloatButton
        shape="circle"
        icon={<ScheduleOutlined />}
        type="primary"
        style={{ right: 24, bottom: 24, backgroundColor: "green" }}
        onClick={() => setOpen(true)}
        tooltip="Book Service"
      />

      {/* Modal */}
      <Modal
        title="Book Service"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <p className="text-gray-500 mb-4">
          Please provide your details below, and our team will contact you to
          confirm your booking.
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
              { type: "email", message: "Please enter a valid email" },
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
            rules={[
              { required: true, message: "Please enter service details" },
            ]}
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
                Booking Request
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

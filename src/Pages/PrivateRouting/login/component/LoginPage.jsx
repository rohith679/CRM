"use client";

import React from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import useAuth from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function LoginPage() {
  const { login, loading } = useAuth();

  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password } = values;
    const result = await login(email, password);

    if (result.success) {
      message.success("Login successful!");
      // redirect or navigate to dashboard

      navigate("/admin/service");
    } else {
      message.error(result.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-96 shadow-lg rounded-xl">
        <Title level={3} className="text-center mb-6">
          Login
        </Title>

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

import React, { useContext } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { motion, AnimatePresence } from "framer-motion";
const { Option } = Select;
import quickService from "../Hooks/quickService";
import { ThemeContext } from "../themes/ThemeProvider";
import { getGradient } from "../themes/theme";

function QuickServiceModal({ open, onClose }) {
  const [form] = Form.useForm();
  const { createService, loading } = quickService();
  const theme = useContext(ThemeContext);

  const handleFinish = async (values) => {
    const res = await createService(values);
    if (res) {
      form.resetFields();
      onClose?.();
    } else {
      message.error(res.message || "Failed to submit service request");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 h-screen flex items-center justify-center z-[1000] bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✖
            </button>

            {/* Title */}
            <h2
              className="text-2xl font-bold text-center mb-6"
              style={{
                background: getGradient(theme),
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              BOOK FREE CONSULTATION
            </h2>

            {/* Form */}
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              preserve={false}
              className="space-y-4"
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input
                  placeholder="Enter your full name"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input
                  placeholder="Enter your phone number"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                label="Service Type"
                name="serviceType"
                rules={[{ required: true, message: "Please select a service" }]}
              >
                <Select
                  placeholder="Choose service type"
                  className="rounded-lg"
                  dropdownStyle={{ borderRadius: "12px" }}
                >
                  <Option value="electrical">Electrical</Option>
                  <Option value="plumbing">Plumbing</Option>
                  <Option value="motor">Motor Repair</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Message" name="message">
                <Input.TextArea
                  rows={3}
                  placeholder="Describe your issue (optional)"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ background: getGradient(theme), color: "white" }}
                  htmlType="submit"
                  block
                  loading={loading}
                  className="h-12 rounded-xl font-semibold shadow-md hover:shadow-lg"
                >
                  BOOK FREE CONSULTATION
                </Button>
              </Form.Item>
            </Form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default QuickServiceModal;

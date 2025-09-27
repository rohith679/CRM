"use client";
import { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Select,
  Checkbox,
  Rate,
  message,
} from "antd";
import useReviews from "../hooks/ReviewHooks"; // 👈 your hook

const { TextArea } = Input;

export default function ReviewModal({ open, onClose, onSubmit }) {
  const [form] = Form.useForm();
  const [rating, setRating] = useState(1);
  const { createReview, loading } = useReviews(); // hook returns loading state

  const handleFinish = async (values) => {
    const payload = {
      ...values,
      rating,
      agree: values.consent || false, // map consent -> agree
    };

    const res = await createReview(payload);

    if (res.success) {
      message.success("✅ Review submitted successfully!");
      onSubmit?.(res.review); // callback to parent
      onClose?.();
      form.resetFields();
      setRating(0);
    } else {
      message.error(`❌ ${res.message}`);
    }
  };

  return (
    <Modal
      title="Add Your Review"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        preserve={false}
      >
        {/* Name + Email */}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>

        {/* Organization */}
        <Form.Item label="Organization" name="organization">
          <Input placeholder="Company or designation" />
        </Form.Item>

        {/* Rating */}
        <Form.Item
          label="Rating"
          required
          tooltip="Please rate from 1 to 5 stars"
        >
          <Rate value={rating} onChange={setRating} />
        </Form.Item>

        {/* Category */}
        <Form.Item
          label="Review Category"
          name="category"
          initialValue="Overall Experience"
        >
          <Select>
            <Select.Option value="Overall Experience">
              Overall Experience
            </Select.Option>
            <Select.Option value="Product Quality">
              Product Quality
            </Select.Option>
            <Select.Option value="Service Quality">
              Service Quality
            </Select.Option>
            <Select.Option value="Customer Support">
              Customer Support
            </Select.Option>
            <Select.Option value="Installation Service">
              Installation Service
            </Select.Option>
          </Select>
        </Form.Item>

        {/* Review Text */}
        <Form.Item
          label="Review"
          name="review"
          rules={[{ required: true, message: "Please write your review" }]}
        >
          <TextArea rows={4} placeholder="Share your experience with us..." />
        </Form.Item>

        {/* Consent */}
        <Form.Item
          name="consent"
          valuePropName="checked"
          initialValue={true} // 👈 checkbox checked by default
        >
          <Checkbox>I agree to publish this review on the website</Checkbox>
        </Form.Item>

        {/* Buttons */}
        <Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading} // 👈 spinner here
            >
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

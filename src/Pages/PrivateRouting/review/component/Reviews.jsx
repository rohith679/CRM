"use client";

import React, { useState } from "react";
import { Table, Button, Space, Modal, Rate, Form, Input, message } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import useReviews from "../../../Public/LandingPage/hooks/ReviewHooks";
import exportToExcel from "../../../../utils/excel";

function ReviewTable() {
  const {
    reviews,
    loading,
    error,
    deleteReview,
    handleCreateSubmit,
    handleEditSubmit,
  } = useReviews();

  const [viewModal, setViewModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [selectedReview, setSelectedReview] = useState(null);
  const [editingReview, setEditingReview] = useState(null);

  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const handleDownload = () => {
    exportToExcel(reviews, "reviews.xlsx", {
      name: "Customer Name",
      email: "Email",
      organization: "Organization",
      category: "Category",
      review: "Review",
      rating: "Rating",
      createAt: "Created At",
    });
  };
  // modal submitting states
  const [createSubmitting, setCreateSubmitting] = useState(false);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // ✅ Table Columns
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Organization", dataIndex: "organization", key: "organization" },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedReview(record);
              setViewModal(true);
            }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingReview(record);
              editForm.setFieldsValue(record);
              setEditModal(true);
            }}
          />
          <Button
            danger
            loading={deletingId === record._id}
            icon={<DeleteOutlined />}
            onClick={async () => {
              setDeletingId(record._id);
              const res = await deleteReview(record._id);
              if (res.success) message.success(res.message);
              else message.error(res.message);
              setDeletingId(null);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* ➕ Create Button */}
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateModal(true)}
        >
          Create Review
        </Button>
        <Button onClick={handleDownload}> Download Excel </Button>
      </div>

      <Table
        columns={columns}
        dataSource={reviews}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      {/* 👁 View Modal */}
      <Modal
        title="Review Details"
        open={viewModal}
        onCancel={() => setViewModal(false)}
        footer={[
          <Button key="close" onClick={() => setViewModal(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedReview && (
          <Form layout="vertical">
            <Form.Item label="Name">
              <Input value={selectedReview.name} disabled />
            </Form.Item>
            <Form.Item label="Email">
              <Input value={selectedReview.email} disabled />
            </Form.Item>
            <Form.Item label="Organization">
              <Input value={selectedReview.organization} disabled />
            </Form.Item>
            <Form.Item label="Rating">
              <Rate disabled defaultValue={selectedReview.rating} />
            </Form.Item>
            <Form.Item label="Category">
              <Input value={selectedReview.category} disabled />
            </Form.Item>
            <Form.Item label="Review">
              <Input.TextArea rows={3} value={selectedReview.review} disabled />
            </Form.Item>
            <Form.Item label="Date">
              <Input
                value={
                  selectedReview.createAt
                    ? new Date(selectedReview.createAt).toLocaleString()
                    : "N/A"
                }
                disabled
              />
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* ✏️ Edit Modal */}
      <Modal
        title="Edit Review"
        open={editModal}
        onCancel={() => setEditModal(false)}
        onOk={handleEditSubmit(
          editForm,
          editingReview?._id,
          () => setEditModal(false),
          setEditSubmitting
        )}
        okText="Save"
        confirmLoading={editSubmitting}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="organization" label="Organization">
            <Input />
          </Form.Item>
          <Form.Item name="rating" label="Rating">
            <Rate />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Input />
          </Form.Item>
          <Form.Item name="review" label="Review">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* ➕ Create Modal */}
      <Modal
        title="Create Review"
        open={createModal}
        onCancel={() => setCreateModal(false)}
        onOk={handleCreateSubmit(
          createForm,
          () => setCreateModal(false),
          setCreateSubmitting
        )}
        okText="Create"
        confirmLoading={createSubmitting}
      >
        <Form form={createForm} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="organization" label="Organization">
            <Input />
          </Form.Item>
          <Form.Item name="rating" label="Rating">
            <Rate />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Input />
          </Form.Item>
          <Form.Item name="review" label="Review">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ReviewTable;

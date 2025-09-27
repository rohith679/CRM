"use client";

import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  message,
  Spin,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import useQuickService from "../../../../Hooks/quickService";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { exportToExcel } from "../../../../utils/excel";
const { Option } = Select;

function ServiceTable() {
  const {
    quickServices,
    loading,
    error,
    deleteService,
    handleCreateSubmit,
    handleEditSubmit,
  } = useQuickService();

  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [viewingService, setViewingService] = useState(null);
  const [editingService, setEditingService] = useState(null);

  const [form] = Form.useForm();
  const [createForm] = Form.useForm();

  // modal submitting states
  const [createSubmitting, setCreateSubmitting] = useState(false);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleDownload = () => {
    exportToExcel(quickServices, "quick-services.xlsx", {
      name: "Customer Name",
      phone: "Phone Number",
      serviceType: "Service Type",
      message: "Customer Message",
      createAt: "Created At",
    });
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Service Type", dataIndex: "serviceType", key: "serviceType" },
    { title: "Message", dataIndex: "message", key: "message" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setViewingService(record);
              setViewModalVisible(true);
            }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingService(record);
              form.setFieldsValue(record);
              setEditModalVisible(true);
            }}
          />
          <Button
            danger
            loading={deletingId === record._id}
            icon={<DeleteOutlined />}
            onClick={async () => {
              setDeletingId(record._id);
              const success = await deleteService(record._id);
              if (success) message.success("Service deleted!");
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
          onClick={() => setCreateModalVisible(true)}
        >
          Create Service
        </Button>
        <Button onClick={handleDownload}>Download Excel</Button>
      </div>

      {/* 📋 Table */}
      {loading ? (
        <Spin />
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <Table
          columns={columns}
          dataSource={quickServices}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      )}

      {/* 👁 View Modal */}
      <Modal
        title="Service Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {viewingService && (
          <div>
            <p>
              <b>Name:</b> {viewingService.name}
            </p>
            <p>
              <b>Phone:</b> {viewingService.phone}
            </p>
            <p>
              <b>Service Type:</b> {viewingService.serviceType}
            </p>
            <p>
              <b>Message:</b> {viewingService.message}
            </p>
            <p>
              <b>Date:</b>{" "}
              {viewingService.createAt
                ? new Date(viewingService.createAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
        )}
      </Modal>

      {/* ✏️ Edit Modal */}
      <Modal
        title="Edit Service"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleEditSubmit(
          form,
          editingService?._id,
          () => setEditModalVisible(false),
          setEditSubmitting
        )}
        okText="Save"
        confirmLoading={editSubmitting}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item
            name="serviceType"
            label="Service Type"
            rules={[{ required: true, message: "Please select service type" }]}
          >
            <Select>
              <Option value="plumbing">Plumbing</Option>
              <Option value="electrical">Electrical</Option>
              <Option value="cleaning">Cleaning</Option>
            </Select>
          </Form.Item>
          <Form.Item name="message" label="Message">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* ➕ Create Modal */}
      <Modal
        title="Create Service"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onOk={handleCreateSubmit(
          createForm,
          () => setCreateModalVisible(false),
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
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item
            name="serviceType"
            label="Service Type"
            rules={[{ required: true, message: "Please select service type" }]}
          >
            <Select>
              <Option value="plumbing">Plumbing</Option>
              <Option value="electrical">Electrical</Option>
              <Option value="cleaning">Cleaning</Option>
            </Select>
          </Form.Item>
          <Form.Item name="message" label="Message">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ServiceTable;

"use client";

import React, { useState } from "react";
import { Table, Button, Space, Modal, message, Spin, Form, Input } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import useContact from "../../../../Hooks/useContact";
import exportToExcel from "../../../../utils/excel";

function ContactTable() {
  const {
    contacts,
    loading,
    error,
    deleteContact,
    handleCreateSubmit,
    handleEditSubmit,
  } = useContact();

  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const [viewingContact, setViewingContact] = useState(null);
  const [editingContact, setEditingContact] = useState(null);

  const [form] = Form.useForm();
  const [createForm] = Form.useForm();

  // modal submitting states
  const [createSubmitting, setCreateSubmitting] = useState(false);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null); // per-row delete loading

  const handleDownload = () => {
    exportToExcel(contacts, "contacts.xlsx", {
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      createAt: "Created At",
    });
  };
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setViewingContact(record);
              setViewModalVisible(true);
            }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingContact(record);
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
              const success = await deleteContact(record._id);
              if (success) message.success("Contact deleted!");
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
          Create Contact
        </Button>
        <Button onClick={handleDownload}>Download Excel</Button>
      </div>

      {loading ? (
        <Spin />
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <Table
          columns={columns}
          dataSource={contacts}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      )}

      {/* 👁 View Modal */}
      <Modal
        title="Contact Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {viewingContact && (
          <div>
            <p>
              <b>Name:</b> {viewingContact.name}
            </p>
            <p>
              <b>Email:</b> {viewingContact.email}
            </p>
            <p>
              <b>Phone:</b> {viewingContact.phone}
            </p>
            <p>
              <b>Message:</b> {viewingContact.message}
            </p>
            <p>
              <b>Date:</b>{" "}
              {viewingContact.createAt
                ? new Date(viewingContact.createAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
        )}
      </Modal>

      {/* ✏️ Edit Modal */}
      <Modal
        title="Edit Contact"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleEditSubmit(
          form,
          editingContact?._id,
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
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email", message: "Enter valid email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="message" label="Message">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* ➕ Create Modal */}
      <Modal
        title="Create Contact"
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
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email", message: "Enter valid email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="message" label="Message">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ContactTable;

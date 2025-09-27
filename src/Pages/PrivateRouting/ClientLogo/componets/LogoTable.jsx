import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  message,
  Spin,
  Form,
  Upload,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import useLogo from "../../../../Hooks/useLogo"; // Custom hook to handle logos
import useUpload from "../../../../Hooks/useUpload";

function LogosTable() {
  const {
    logos,
    loading,
    error,
    deleteLogo,
    handleCreateSubmit,
    handleEditSubmit,
  } = useLogo();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [createSubmitting, setCreateSubmitting] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [viewLogo, setViewLogo] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const { fileUpload } = useUpload({
    onUpload: (url) => {
      console.log("Uploaded Image URL:", url);
      form.setFieldsValue({ imageUrl: url });  // Update form field with new URL
    },
  });

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl", // Ensure we are using imageUrl consistently
      key: "imageUrl",
      render: (imageUrl) => (
        <img
          src={imageUrl}
          alt="logo"
          style={{
            width: 50, // Set a smaller size for table display
            height: 50,
            objectFit: "cover",
            borderRadius: 6,
          }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setViewLogo(record); // Pass the entire record here
              setViewModalVisible(true);
            }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingId(record._id);
              form.setFieldsValue(record); // Set fields using imageUrl
              setEditModalVisible(true);
            }}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setDeletingId(record._id);
              setDeleteModalVisible(true);
            }}
          />
        </Space>
      ),
    },
  ];

  const handleDelete = async () => {
    const success = await deleteLogo(deletingId);
    if (success) {
      message.success("Logo deleted!");
    } else {
      message.error("Failed to delete logo.");
    }
    setDeleteModalVisible(false);
    setDeletingId(null);
  };

  return (
    <>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateModalVisible(true)}
        >
          Create Logo
        </Button>
      </div>

      {loading ? (
        <Spin />
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <Table
          columns={columns}
          dataSource={logos}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      )}

      <Modal
        title="View Logo"
        visible={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="ok" onClick={() => setViewModalVisible(false)}>
            OK
          </Button>,
        ]}
      >
        <div>
          {viewLogo?.imageUrl && ( // Ensure it's imageUrl
            <img
              src={viewLogo?.imageUrl}
              alt="view"
              style={{
                width: "100%",
                maxHeight: 300,
                objectFit: "cover",
                borderRadius: 6,
              }}
            />
          )}
        </div>
      </Modal>

      {/* Create Modal */}
      <Modal
        title="Create Logo"
        visible={createModalVisible}
        onCancel={() => {
          form.resetFields();
          setCreateModalVisible(false);
        }}
        confirmLoading={createSubmitting}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              form.resetFields();
              setCreateModalVisible(false);
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={createSubmitting}
            onClick={() =>
              handleCreateSubmit(
                form,
                () => setCreateModalVisible(false),
                setCreateSubmitting
              )
            }
          >
            Create
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Upload"
            name="imageUrl" // Make sure the name here is 'imageUrl'
            rules={[{ required: true, message: "Please upload an image" }]}

          >
            <Upload
              listType="picture-card"
              customRequest={({ file, onSuccess, onError }) => {
                fileUpload(
                  { target: { files: [file] } },
                  null,
                  (url) => {
                    form.setFieldsValue({ imageUrl: url }); // Ensure imageUrl field is updated
                    onSuccess();
                  },
                  (error) => {
                    onError(error);
                  }
                );
              }}
              showUploadList={false}
              maxCount={1}
            >
              <div>
                <UploadOutlined /> Upload Image
              </div>
            </Upload>
            {form.getFieldValue("imageUrl") && (
              <img
                src={form.getFieldValue("imageUrl")}
                alt="preview"
                style={{
                  width: "100%",
                  maxHeight: 180,
                  objectFit: "cover",
                  marginTop: 8,
                  borderRadius: 6,
                }}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Logo"
        visible={editModalVisible}
        onCancel={() => {
          form.resetFields();
          setEditModalVisible(false);
        }}
        confirmLoading={createSubmitting}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              form.resetFields();
              setEditModalVisible(false);
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={createSubmitting}
            onClick={() =>
              handleEditSubmit(
                form,
                editingId,
                () => setEditModalVisible(false),
                setCreateSubmitting
              )
            }
          >
            Save Changes
          </Button>,
        ]}
      >
        <Form.Item
          label="Upload"
          name="imageUrl" // Make sure this is always imageUrl
          rules={[{ required: true, message: "Please upload an image" }]}

        >
          <Upload
            listType="picture-card"
            customRequest={({ file, onSuccess, onError }) => {
              fileUpload(
                { target: { files: [file] } },
                null,
                (url) => {
                  form.setFieldsValue({ imageUrl: url });
                  onSuccess();
                },
                (error) => {
                  onError(error);
                }
              );
            }}
            showUploadList={false}
            maxCount={1}
          >
            <div>
              <UploadOutlined /> Upload Image
            </div>
          </Upload>
          {form.getFieldValue("imageUrl") && (
            <img
              key={form.getFieldValue("imageUrl")}
              src={form.getFieldValue("imageUrl")}
              alt="preview"
              style={{
                width: "100%",
                maxHeight: 180,
                objectFit: "cover",
                marginTop: 8,
                borderRadius: 6,
              }}
            />
          )}
        </Form.Item>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onOk={handleDelete}
      >
        <p>Are you sure you want to delete this logo?</p>
      </Modal>
    </>
  );
}

export default LogosTable;

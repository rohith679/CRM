import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  message,
  Spin,
  Form,
  Select,
  Upload,
  Input,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import useBanter from "../../../../Hooks/useBanter";
import useUpload from "../../../../Hooks/useUpload";

function BanterTable() {
  const {
    banters,
    loading,
    error,
    deleteBanter,
    handleCreateSubmit,
    updateBanter 
  } = useBanter();

  const { fileUpload, isLoading } = useUpload({
    onUpload: (url) => {
      console.log("Uploaded Image URL:", url);
      form.setFieldsValue({ image: url });
    },
  });

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [createSubmitting, setCreateSubmitting] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [viewBanter, setViewBanter] = useState(null);

  const sectionOptions = [
    "Motors & Pumps",
    "Wires & Accessories",
    "Switches & Accessories",
    "Lighting Solutions",
    "Faucets & Sanitarywares",
    "Plumbing Products",
    "Home Appliances",
  ];

  const columns = [
    { title: "Section", dataIndex: "section", key: "section" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Image", dataIndex: "image", key: "image" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setViewBanter(record);
              setViewModalVisible(true);
            }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingId(record._id);
              form.setFieldsValue(record);
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
    const success = await deleteBanter(deletingId);
    if (success) {
      message.success("Banter deleted!");
    } else {
      message.error("Failed to delete banter.");
    }
    setDeleteModalVisible(false);
    setDeletingId(null);
  };

  // When the modal is triggered, set the form values to match the editingId
  useEffect(() => {
    if (editingId) {
      const currentBanter = banters.find((banter) => banter._id === editingId);
      if (currentBanter) {
        form.setFieldsValue({
          title: currentBanter.title,
          section: currentBanter.section,
          image: currentBanter.image, // Set the initial image URL here
        });
      }
    }
  }, [editingId, form, banters]);

  // Handle Edit Submission
  const handleEditSubmit = async (form, editingId, closeModal, setSubmitting) => {
    try {
      setSubmitting(true);
      // Validate form fields asynchronously
      const values = await form.validateFields();
      console.log("Form Values Before Submit:", values); // Debugging: Check form values

      // Ensure the image URL (field name should be 'image' as per your form definition)
      if (!values.image) {
        message.error("Please upload an image.");
        setSubmitting(false);
        return;
      }

      // Call your updateBanter API, assuming it's asynchronous
      const success = await updateBanter(editingId, {
        ...values,
        image: values.image, // Use 'image' here since it's the field in the form
      });

      if (success) {
        message.success("Banter updated!");
        form.resetFields();
        closeModal();
      } else {
        message.error("Failed to update Banter.");
      }
    } catch (err) {
      console.error("Validation failed:", err);
      message.error("There was an error while updating the Banter.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Create Button */}
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
          Create Banter
        </Button>
      </div>

      {loading ? (
        <Spin />
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <Table
          columns={columns}
          dataSource={banters}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      )}

      {/* View Modal */}
      <Modal
        title="View Banter"
        visible={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="ok" onClick={() => setViewModalVisible(false)}>
            OK
          </Button>,
        ]}
      >
        {/* Display the title, section, and image */}
        <div>
          <h3>Title: {viewBanter?.title}</h3> {/* Display the title */}
          <h3>Section: {viewBanter?.section}</h3> {/* Display the section */}
          {viewBanter?.image && (
            <img
              src={viewBanter?.image}
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
        title="Create Banter"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
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
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input a title" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="section"
            label="Section"
            rules={[{ required: true, message: "Please select a section" }]}
          >
            <Select placeholder="Select Section">
              {sectionOptions.map((section) => (
                <Select.Option key={section} value={section}>
                  {section}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Upload"
            name="image" // Make sure the field is 'image'
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <Upload
              listType="picture-card"
              customRequest={({ file, onSuccess, onError }) => {
                fileUpload(
                  { target: { files: [file] } },
                  null,
                  (url) => {
                    form.setFieldsValue({ image: url });
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

            {isLoading && <p>Uploading...</p>}

            {!isLoading && form.getFieldValue("image") && (
              <img
                src={form.getFieldValue("image")}
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
        title="Edit Banter"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
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
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input a title" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="section"
            label="Section"
            rules={[{ required: true, message: "Please select a section" }]}
          >
            <Select placeholder="Select Section">
              {sectionOptions.map((section) => (
                <Select.Option key={section} value={section}>
                  {section}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Upload"
            name="image" // Ensure this is 'image'
          >
            <Upload
              listType="picture-card"
              customRequest={({ file, onSuccess, onError }) => {
                fileUpload(
                  { target: { files: [file] } },
                  null,
                  (url) => {
                    form.setFieldsValue({ image: url });
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

            {isLoading && <p>Uploading...</p>}

            {!form.getFieldValue("image") && editingId && (
              <img
                src={banters.find((banter) => banter._id === editingId)?.image}
                alt="current"
                style={{
                  width: "100%",
                  maxHeight: 180,
                  objectFit: "cover",
                  marginTop: 8,
                  borderRadius: 6,
                }}
              />
            )}

            {!isLoading && form.getFieldValue("image") && (
              <img
                src={form.getFieldValue("image")}
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

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onOk={handleDelete}
      >
        <p>Are you sure you want to delete this banter?</p>
      </Modal>
    </>
  );
}

export default BanterTable;

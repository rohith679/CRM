"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Drawer,
  Form,
  Input,
  Select,
  message,
} from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useUpload from "../../../../Hooks/useUpload";
import useHomeSectionMedia from "../../../../Hooks/useHomeMedia"; // ✅ import API hook

function HomeSectionMedia() {
  const [viewModal, setViewModal] = useState(false);
  const [editDrawer, setEditDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form] = Form.useForm();

  // ✅ Hook for API
  const { sections, fetchSections, updateSection, loading } =
    useHomeSectionMedia();

  // ✅ Hook for uploads
  const { fileUpload, isLoading } = useUpload({
    onUpload: (url) => {
      // when upload is done → update form
      form.setFieldsValue({ url });
    },
  });

  // ✅ Table Columns
  const columns = [
    { title: "Section Name", dataIndex: "sectionName", key: "sectionName" },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url.length > 30 ? url.slice(0, 30) + "..." : url}
        </a>
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
              setSelectedItem(record);
              setViewModal(true);
            }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedItem(record);
              form.setFieldsValue(record);
              setEditDrawer(true);
            }}
          />
        </Space>
      ),
    },
  ];

  // ✅ Handle edit save
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (selectedItem?._id) {
        const ok = await updateSection(selectedItem._id, values);
        if (ok) {
          message.success("Updated successfully!");
          setEditDrawer(false);
          setSelectedItem(null);
          // fetchSections(false); // refresh list
        }
      }
    } catch (err) {
      message.error("Please fix form errors.");
    }
  };

  useEffect(() => {
    fetchSections(false);
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={sections}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        rowClassName={(record) =>
          record.sectionName === "Top Banner" ? "top-banner-row" : ""
        }
      />

      {/* ✅ Modal for viewing details */}
      <Modal
        title="Section Details"
        open={viewModal}
        onCancel={() => setViewModal(false)}
        footer={null}
      >
        {selectedItem && (
          <Form layout="vertical">
            <Form.Item label="Section Name">
              <Input value={selectedItem.sectionName} disabled />
            </Form.Item>
            <Form.Item label="Type">
              <Input value={selectedItem.type} disabled />
            </Form.Item>
            <Form.Item label="Preview">
              {selectedItem.type === "image" ? (
                <img
                  src={selectedItem.url}
                  alt="preview"
                  style={{
                    width: "100%",
                    maxHeight: 200,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />
              ) : (
                <video
                  src={selectedItem.url}
                  controls
                  style={{
                    width: "100%",
                    maxHeight: 200,
                    borderRadius: 6,
                    background: "#000",
                  }}
                />
              )}
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* ✅ Drawer for editing */}
      <Drawer
        title="Edit Section"
        open={editDrawer}
        onClose={() => setEditDrawer(false)}
        width={400}
        extra={
          <Space>
            <Button onClick={() => setEditDrawer(false)}>Cancel</Button>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Section Name"
            name="sectionName"
            rules={[{ required: true, message: "Please enter section name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please select type" }]}
          >
            {selectedItem?.sectionName === "Top Banner" ? (
              // ✅ Top Banner → allow both
              <Select>
                <Select.Option value="image">Image</Select.Option>
                <Select.Option value="video">Video</Select.Option>
              </Select>
            ) : (
              // ✅ Other sections → only Image
              <Select disabled>
                <Select.Option value="image">Image</Select.Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item
            label="Upload"
            name="url"
            rules={[
              { required: true, message: "Please provide URL or upload file" },
            ]}
          >
            <>
              {/* IMAGE UPLOAD */}
              {form.getFieldValue("type") === "image" && (
                <>
                  <Upload
                    listType="picture-card"
                    customRequest={({ file, onSuccess }) => {
                      fileUpload(
                        { target: { files: [file] } },
                        selectedItem?._id,
                        (url) => {
                          form.setFieldsValue({ url });
                          onSuccess("ok");
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

                  {!isLoading && form.getFieldValue("url") && (
                    <img
                      src={form.getFieldValue("url")}
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
                </>
              )}

              {/* VIDEO UPLOAD */}
              {form.getFieldValue("type") === "video" && (
                <>
                  <Upload
                    customRequest={({ file, onSuccess }) => {
                      fileUpload(
                        { target: { files: [file] } },
                        selectedItem?._id,
                        (url) => {
                          form.setFieldsValue({ url });
                          onSuccess("ok");
                        }
                      );
                    }}
                    showUploadList={false}
                    maxCount={1}
                  >
                    <Button icon={<UploadOutlined />} loading={isLoading}>
                      Upload Video
                    </Button>
                  </Upload>

                  {isLoading && <p>Uploading...</p>}

                  {!isLoading && form.getFieldValue("url") && (
                    <video
                      src={form.getFieldValue("url")}
                      controls
                      style={{
                        width: "100%",
                        maxHeight: 180,
                        marginTop: 8,
                        borderRadius: 6,
                        background: "#000",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </>
              )}
            </>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default HomeSectionMedia;

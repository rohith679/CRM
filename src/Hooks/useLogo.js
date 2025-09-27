"use client";

import { useState, useEffect } from "react";
import ConfigAPIURL from "../../src/config/ConfigAPIURL";
import APIRequest from "../utils/APIRequest";
import useAlert from "./useAlert";
import { message } from "antd";

export default function useLogo() {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { publishNotification } = useAlert();

  // Fetch all logos
  const fetchLogos = async () => {
    try {
      setLoading(true);
      const response = await APIRequest.request("GET", ConfigAPIURL.ListLogos);
      if (response?.data?.responseCode === 109) {
        setLogos(response?.data?.logos || []);
      }
    } catch (err) {
      setError("Error fetching logos");
    } finally {
      setLoading(false);
    }
  };

  // Create logo
const createLogo = async (logoData) => {
  try {
    const response = await APIRequest.request(
      "POST",
      ConfigAPIURL.CreateLogo,
      JSON.stringify(logoData)
    );

    if (response?.data?.responseCode === 109) {
      const newLogo = response.data.logo;
      console.log("newLogo: ", newLogo);
      if (newLogo) {
        setLogos((prev) => [newLogo, ...prev]);
      }
      publishNotification("Logo created successfully", "success");
      fetchLogos(); // Refresh logos list after creation
      return true;
    } else {
      publishNotification("Failed to create logo", "error");
      return false;
    }
  } catch (err) {
    publishNotification("Error creating logo", "error");
    return false;
  }
};

// Update logo
const updateLogo = async (id, logoData) => {
  try {
    console.log("Sending update request:", { id, logoData }); // Log request payload

    const response = await APIRequest.request(
      "PUT",
      `${ConfigAPIURL.UpdateLogo}`,
      JSON.stringify({ id, ...logoData })
    );

    // Log the full response to see what is being returned
    console.log("API Response:", response);

    if (response?.data?.responseCode === 109) {
      const updated = response.data.logo;
      if (updated) {
        setLogos((prev) => prev.map((l) => (l._id === id ? updated : l)));
      }
      publishNotification("Logo updated successfully", "success");
      fetchLogos(); // Refresh the list after the update
      return true;
    } else {
      publishNotification("Failed to update logo", "error");
      return false;
    }
  } catch (err) {
    console.error("Error during logo update:", err);
    setError("Error updating logo");
    return false;
  }
};

// Form handlers for create and edit
const handleCreateSubmit = async (form, closeModal, setSubmitting) => {
  try {
    setSubmitting(true);
    const values = form.getFieldsValue(); // Get form values
    console.log("Form Values for Create:", values); // Debugging form values

    const payload = { imageUrl: values.imageUrl }; // Make sure 'imageUrl' is being passed

    const success = await createLogo(payload); // Send payload to the API
    if (success) {
      message.success("Logo created!");
      form.resetFields();
      closeModal();
    }
  } catch (err) {
    console.error("Validation failed:", err);
    message.error("Form validation failed. Please check the inputs.");
  } finally {
    setSubmitting(false);
  }
};

const handleEditSubmit = async (form, editingId, closeModal, setSubmitting) => {
  try {
    setSubmitting(true);
    const values = await form.validateFields(); // Ensure form.validateFields() is awaited
    console.log("Form Values for Edit:", values); // Debugging form values

    const payload = { imageUrl: values.imageUrl }; // Make sure 'imageUrl' is being passed

    const success = await updateLogo(editingId, payload);
    if (success) {
      message.success("Logo updated!");
      closeModal(); // Close modal after success
    } else {
      message.error("Failed to update logo");
    }
  } catch (err) {
    console.error("Validation failed:", err);
    message.error("Form validation failed. Please check the inputs.");
  } finally {
    setSubmitting(false);
  }
};

  const deleteLogo = async (id) => {
    try {
      const response = await APIRequest.request(
        "DELETE",
        `${ConfigAPIURL.DeleteLogo}?id=${id}`
      );
      if (response?.data?.responseCode === 109) {
        setLogos((prev) => prev.filter((l) => l._id !== id));
        publishNotification("Logo deleted successfully", "success");
        return true;
      }
      return false;
    } catch (err) {
      setError("Error deleting logo");
      return false;
    }
  };




  useEffect(() => {
    fetchLogos();
  }, []);

  return {
    logos,
    loading,
    error,
    createLogo,
    updateLogo,
    deleteLogo,
    fetchLogos,
    handleCreateSubmit,
    handleEditSubmit,
  };
}

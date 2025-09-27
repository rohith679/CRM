"use client";

import { useState, useEffect } from "react";
import ConfigAPIURL from "../../src/config/ConfigAPIURL";
import APIRequest from "../utils/APIRequest";
import useAlert from "./useAlert";
import { message } from "antd";

export default function useBanter() {
  const [banters, setBanters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { publishNotification } = useAlert();

  // Fetch all banters
  const fetchBanters = async () => {
    try {
      setLoading(true);
      const response = await APIRequest.request(
        "GET",
        ConfigAPIURL.ListBanters
      );
      if (response?.data?.responseCode === 109) {
        setBanters(response?.data?.banters || []);
      }
    } catch (err) {
      setError("Error fetching banters");
    } finally {
      setLoading(false);
    }
  };

  
  // Group banters by their section
  const groupBantersBySection = (banters) => {
    return banters.reduce((acc, banter) => {
      if (!acc[banter.section]) {
        acc[banter.section] = [];
      }
      acc[banter.section].push(banter);
      return acc;
    }, {});
  };

  // Group the fetched banters by section
  const groupedBanters = groupBantersBySection(banters);


  // Create new banter
  const createBanter = async (banterData) => {
    try {
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.CreateBanter,
        JSON.stringify(banterData)
      );

      if (response?.data?.responseCode === 109) {
        const newBanter = response.data.banter;
        if (newBanter) {
          setBanters((prev) => [newBanter, ...prev]);
        }
        publishNotification("Banter created successfully", "success");
        fetchBanters();
        return true;
      } else {
        publishNotification("Failed to create banter", "error");
        return false;
      }
    } catch (err) {
      publishNotification("Error creating banter", "error");
      return false;
    }
  };

  // Update banter
  const updateBanter = async (id, banterData) => {
    try {
      const response = await APIRequest.request(
        "PUT",
        `${ConfigAPIURL.UpdateBanter}`,
        JSON.stringify({ id, ...banterData })
      );

      if (response?.data?.responseCode === 109) {
        const updated = response.data.banter;
        if (updated) {
          setBanters((prev) => prev.map((b) => (b._id === id ? updated : b)));
        }
        publishNotification("Banter updated successfully", "success");
        fetchBanters();
        return true;
      } else {
        publishNotification("Failed to update banter", "error");
        return false;
      }
    } catch (err) {
      setError("Error updating banter");
      return false;
    }
  };

  // Delete banter
  const deleteBanter = async (id) => {
    try {
      const response = await APIRequest.request(
        "DELETE",
        `${ConfigAPIURL.DeleteBanter}?id=${id}`
      );
      if (response?.data?.responseCode === 109) {
        setBanters((prev) => prev.filter((b) => b._id !== id));
        publishNotification("Banter deleted successfully", "success");
        return true;
      }
      return false;
    } catch (err) {
      setError("Error deleting banter");
      return false;
    }
  };

  // Form handlers
const handleCreateSubmit = async (form, closeModal, setCreateSubmitting) => {
  try {
    setCreateSubmitting(true);

    // Validate form fields asynchronously
    const values = await form.validateFields();
    console.log("Form Values Before Submit:", values); // Debugging: Check form values

    // Ensure the image URL (field name should be 'image' as per your form definition)
    if (!values.image) {
      message.error("Please upload an image.");
      setCreateSubmitting(false);
      return;
    }

    console.log("Creating Banter with data:", values);

    // Call your createBanter API, assuming it's asynchronous
    const success = await createBanter({
      ...values,
      image: values.image, // Use 'image' here since it's the field in the form
    });

    if (success) {
      message.success("Banter created!");
      form.resetFields();
      closeModal();
    } else {
      message.error("Failed to create Banter.");
    }
  } catch (err) {
    console.error("Validation failed:", err);
    message.error("There was an error while creating the Banter.");
  } finally {
    setCreateSubmitting(false);
  }
};

  
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
      image: values.image, // Use 'image' here as it's the form field name
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



  useEffect(() => {
    fetchBanters();
  }, []);

  return {
    banters,
    loading,
    error,
    createBanter,
    updateBanter,
    deleteBanter,
    fetchBanters,
    handleCreateSubmit,
    handleEditSubmit,
    groupedBanters,
  };
}

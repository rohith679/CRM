"use client";

import { useState, useEffect } from "react";
import ConfigAPIURL from "../../src/config/ConfigAPIURL";
import APIRequest from "../utils/APIRequest";
import useAlert from "./useAlert";
import { message } from "antd";

export default function useQuickService() {
  const [quickServices, setQuickServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { publishNotification } = useAlert();

  // Fetch all quick services
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await APIRequest.request(
        "GET",
        ConfigAPIURL.ListQuickServices
      );
      if (response?.data?.responseCode === 109) {
        setQuickServices(response?.data?.requests || []);
      }
    } catch (err) {
      setError("Error fetching services");
    } finally {
      setLoading(false);
    }
  };

  // Create new service
  const createService = async (serviceData) => {
    try {
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.CreateQuickServices,
        JSON.stringify(serviceData)
      );
      if (response?.data?.responseCode === 109) {
        const newService = response.data.service;
        if (newService) {
          setQuickServices((prev) => [newService, ...prev]);
        }
        publishNotification("Service created successfully", "success");
        fetchServices();
        return true;
      }
      publishNotification("Failed to create service", "error");
      return false;
    } catch (err) {
      publishNotification("Error creating service", "error");
      return false;
    }
  };

  // Update service
  const updateService = async (id, serviceData) => {
    try {
      const response = await APIRequest.request(
        "POST",
        `${ConfigAPIURL.UpdateQuickServices}`,
        JSON.stringify({ id, ...serviceData })
      );
      if (response?.data?.responseCode === 109) {
        const updated = response.data.service;
        if (updated) {
          setQuickServices((prev) =>
            prev.map((s) => (s._id === id ? updated : s))
          );
        }
        fetchServices();

        publishNotification("Service updated successfully", "success");
        return true;
      }
      return false;
    } catch (err) {
      setError("Error updating service");
      return false;
    }
  };

  // Delete service
  const deleteService = async (id) => {
    try {
      const response = await APIRequest.request(
        "DELETE",
        `${ConfigAPIURL.DeleteQuickServices}?id=${id}`
      );
      if (response?.data?.responseCode === 109) {
        setQuickServices((prev) => prev.filter((s) => s._id !== id));
        publishNotification("Service deleted successfully", "success");
        return true;
      }
      return false;
    } catch (err) {
      setError("Error deleting service");
      return false;
    }
  };

  // Handlers for modals
  const handleCreateSubmit = (form, closeModal, setSubmitting) => {
    return async () => {
      try {
        setSubmitting(true);
        const values = await form.validateFields();
        const success = await createService(values);
        if (success) {
          message.success("Service created!");
          form.resetFields();
          closeModal();
        }
      } catch (err) {
        console.error("Validation failed:", err);
      } finally {
        setSubmitting(false);
      }
    };
  };

  const handleEditSubmit = (form, editingId, closeModal, setSubmitting) => {
    return async () => {
      try {
        setSubmitting(true);
        const values = await form.validateFields();
        const success = await updateService(editingId, values);
        if (success) {
          message.success("Service updated!");
          closeModal();
        }
      } catch (err) {
        console.error("Validation failed:", err);
      } finally {
        setSubmitting(false);
      }
    };
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    quickServices,
    loading,
    error,
    createService,
    updateService,
    deleteService,
    fetchServices,
    handleCreateSubmit,
    handleEditSubmit,
  };
}

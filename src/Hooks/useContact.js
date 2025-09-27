"use client";

import { useState, useEffect } from "react";
import ConfigAPIURL from "../../src/config/ConfigAPIURL";
import APIRequest from "../utils/APIRequest";
import useAlert from "./useAlert";
import { message } from "antd";

export default function useContact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false); // global loading
  const [error, setError] = useState(null);
  const { publishNotification } = useAlert();

  // Fetch all contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await APIRequest.request(
        "GET",
        ConfigAPIURL.ListContacts
      );
      if (response?.data?.responseCode === 109) {
        setContacts(response?.data?.contacts || []);
      }
    } catch (err) {
      setError("Error fetching contacts");
    } finally {
      setLoading(false);
    }
  };

  // Create new contact
  const createContact = async (contactData) => {
    try {
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.CreateContact,
        JSON.stringify(contactData)
      );

      if (response?.data?.responseCode === 109) {
        const newContact = response.data.contact;
        if (newContact) {
          setContacts((prev) => [newContact, ...prev]); // update immediately
        }
        publishNotification("Contact created successfully", "success");
        fetchContacts();
        return true;
      } else {
        publishNotification("Failed to create contact", "error");
        return false;
      }
    } catch (err) {
      publishNotification("Error creating contact", "error");
      return false;
    }
  };

  // Update contact
  const updateContact = async (id, contactData) => {
    try {
      const response = await APIRequest.request(
        "POST", // or PUT depending on backend
        ConfigAPIURL.UpdateContact,
        JSON.stringify({ id, ...contactData })
      );

      if (response?.data?.responseCode === 109) {
        const updated = response.data.contact;
        if (updated) {
          setContacts((prev) => prev.map((c) => (c._id === id ? updated : c)));
        }
        publishNotification("Contact updated successfully", "success");
        fetchContacts();
        return true;
      } else {
        publishNotification("Failed to update contact", "error");
        return false;
      }
    } catch (err) {
      setError("Error updating contact");
      return false;
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    try {
      const response = await APIRequest.request(
        "DELETE",
        `${ConfigAPIURL.DeleteContact}?id=${id}`
      );
      if (response?.data?.responseCode === 109) {
        setContacts((prev) => prev.filter((c) => c._id !== id));
        publishNotification("Contact deleted successfully", "success");
        return true;
      }
      return false;
    } catch (err) {
      setError("Error deleting contact");
      return false;
    }
  };

  // Handlers for forms
  const handleCreateSubmit = (form, closeModal, setSubmitting) => {
    return async () => {
      try {
        setSubmitting(true);
        const values = await form.validateFields();
        const success = await createContact(values);
        if (success) {
          message.success("Contact created!");
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
        const success = await updateContact(editingId, values);
        if (success) {
          message.success("Contact updated!");
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
    fetchContacts();
  }, []);

  return {
    contacts,
    loading,
    error,
    createContact,
    updateContact,
    deleteContact,
    fetchContacts,
    handleCreateSubmit,
    handleEditSubmit,
  };
}

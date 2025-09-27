"use client";

import { useState, useEffect } from "react";
import ConfigAPIURL from "../../../../config/ConfigAPIURL";
import APIRequest from "../../../../utils/APIRequest";
import useAlert from "../../../../Hooks/useAlert";
import { message } from "antd";

export default function useReviews() {
  const [reviews, setReviews] = useState([]);
  const [reviewsAgree, setReviewsAgree] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { publishNotification } = useAlert();

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(ConfigAPIURL.getReviews, { method: "GET" });
      const data = await res.json();
      if (res.ok) {
        setReviews(data?.data?.reviews || []);
      } else {
        setError(data.message || "Failed to fetch reviews");
      }
    } catch (err) {
      setError("Error fetching reviews");
    } finally {
      setLoading(false);
    }
  };

  // Fetch only agreed reviews
  const fetchReviewsAgree = async () => {
    try {
      setLoading(true);
      const res = await fetch(ConfigAPIURL.getReviewsAgree, { method: "GET" });
      console.log("res: ", res);
      const data = await res.json();
      if (res.ok) {
        setReviewsAgree(data?.data?.reviews || []);
      } else {
        setError(data.message || "Failed to fetch reviews");
      }
    } catch (err) {
      setError("Error fetching reviews");
    } finally {
      setLoading(false);
    }
  };

  // Create new review
  const createReview = async (reviewData) => {
    try {
      const res = await fetch(ConfigAPIURL.createReview, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
      const data = await res.json();
      if (res.ok) {
        publishNotification("Review created successfully", "success");
        if (data.review) {
          setReviews((prev) => [data.review, ...prev]);
        }
        fetchReviews();
        return { success: true, message: data.message, review: data.review }; // ✅ return full object
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      return { success: false, message: "Error creating review" };
    }
  };

  // Update review
  const updateReview = async (id, reviewData) => {
    try {
      const response = await APIRequest.request(
        "POST",
        `${ConfigAPIURL.updateReview}`,
        JSON.stringify({ id, ...reviewData })
      );
      if (response?.data?.responseCode === 109) {
        const updated = response.data.service;
        if (updated) {
          setQuickServices((prev) =>
            prev.map((r) => (r._id === id ? updated : r))
          );
        }
        fetchReviews();
        publishNotification("Service updated successfully", "success");
        return true;
      }
      return false;
    } catch (err) {
      setError("Error updating service");
      return false;
    }
  };

  // Delete review
  const deleteReview = async (id) => {
    try {
      const response = await APIRequest.request(
        "DELETE",
        `${ConfigAPIURL.deleteReview}?id=${id}`
      );
      if (response?.data?.responseCode === 109) {
        setReviews((prev) => prev.filter((r) => r._id !== id));
        return { success: true, message: "Review deleted successfully" };
      } else {
        return {
          success: false,
          message: response?.data?.message || "Failed to delete review",
        };
      }
    } catch (err) {
      return { success: false, message: "Error deleting review" };
    }
  };

  // Modal form handlers
  const handleCreateSubmit = (form, closeModal, setSubmitting) => {
    return async () => {
      try {
        setSubmitting(true);
        const values = await form.validateFields();
        const success = await createReview(values);
        if (success) {
          message.success("Review created!");
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
        const success = await updateReview(editingId, values);
        if (success) {
          message.success("Review updated!");
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
    fetchReviews();
  }, []);

  return {
    reviews,
    reviewsAgree,
    loading,
    error,
    fetchReviews,
    fetchReviewsAgree,
    createReview,
    updateReview,
    deleteReview,
    handleCreateSubmit,
    handleEditSubmit,
  };
}

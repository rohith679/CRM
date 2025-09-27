"use client";

import { useState, useEffect } from "react";
import ConfigAPIURL from "../../src/config/ConfigAPIURL";
import APIRequest from "../utils/APIRequest";
import useAlert from "./useAlert";

export default function useHomeSectionMedia() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { publishNotification } = useAlert();
  const [topBanner, setTopBanner] = useState([]);
  const [sectionsMap, setSectionsMap] = useState({});

  // ✅ Fetch all sections
  const fetchSections = async (banner) => {
    try {
      setLoading(true);
      const response = await APIRequest.request(
        "GET",
        `${ConfigAPIURL.fetchSections}?banner=${banner}`
      );
      if (response?.data?.responseCode === 109) {
        const arr = response?.data?.contacts || [];
        setSections(arr);

        // Build map { sectionName: url }
        const map = {};
        arr.forEach((s) => {
          map[s.sectionName] = {
            url: s.url,
            type: s.type, // ✅ store type
          };
        });
        setSectionsMap(map);
        console.log("arr: ", arr);
      }
    } catch (err) {
      console.error("Error fetching sections", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update a section
  const updateSection = async (id, sectionData) => {
    try {
      setLoading(true);
      const payload = { id, ...sectionData };
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.UpdateHomeSectionMedia,
        JSON.stringify(payload)
      );

      if (response?.data?.responseCode === 109) {
        publishNotification("Section updated successfully", "success");
        // update state
        setSections((prev) =>
          prev.map((s) => (s._id === id ? { ...s, ...sectionData } : s))
        );
        console.log("setSections: ", setSections);

        return true;
      } else {
        publishNotification("Failed to update section", "error");
        return false;
      }
    } catch (err) {
      publishNotification("Error updating section", "error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ✅ On mount, fetch data
  // useEffect(() => {
  //   fetchSections();
  // }, []);

  return {
    sections,
    loading,
    error,
    fetchSections,
    updateSection,
    topBanner,
    sectionsMap,
  };
}

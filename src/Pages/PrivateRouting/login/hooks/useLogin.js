"use client";

import { useState } from "react";
import ConfigAPIURL from "../../../../config/ConfigAPIURL";
import APIRequest from "../../../../utils/APIRequest"; // adjust path

import LocalStorage from "../../../../config/LocalStorage";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.login,
        JSON.stringify({ email, password })
      );

      if (response?.data?.token?.accessToken) {
        localStorage.setItem(
          "token",
          JSON.stringify(response?.data?.token?.accessToken)
        );
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        console.log(
          "JSON.stringify(response?.data?.user): ",
          JSON.stringify(response?.data?.user)
        );

        LocalStorage.userDetails = response?.data?.user;
        setUser(response?.data?.user);
        return { success: true, user: response.data.user };
      } else {
        setError(response.message || "Login failed");
        return { success: false, message: response.message };
      }
    } catch (err) {
      setError("Error logging in");
      return { success: false, message: "Error logging in" };
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, login };
}

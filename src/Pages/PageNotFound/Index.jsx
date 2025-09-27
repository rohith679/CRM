import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <h1 className="text-6xl font-bold text-purple-700">404</h1>
      <h2 className="text-2xl font-semibold mt-4 text-gray-800">
        Oops! Page Not Found
      </h2>
      <p className="mt-2 text-gray-600 text-center max-w-md">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 rounded-lg text-white font-semibold shadow-md transition"
        style={{
          background: "linear-gradient(90deg, #6A0DAD, #FF007F)", // your theme gradient
        }}
      >
        Go Back Home
      </button>
    </div>
  );
}

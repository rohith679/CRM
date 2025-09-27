import React from "react";
import { motion } from "framer-motion";

export default function PageLoader({ loading }) {
  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center bg-white z-[9999]"
    >
      <img
        src="https://dummy-testing123.s3.ap-south-1.amazonaws.com/1758698277689-Chakra%20Interior.png"
        alt=""
      />
      <motion.img
        src="/logo.png"
        alt="Loading..."
        className="h-20 w-20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
    </motion.div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { fadeIn, slideUp, scaleUp } from "./motionVariants"; // custom variants (optional)

function BrandCard({ desc, image }) {
  return (
    <motion.div
      variants={fadeIn} // 👈 choose fadeIn, slideUp, or scaleUp
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center hover:shadow-lg transition"
    >
      <motion.img
        src={image}
        alt={desc}
        className="h-25 w-25 object-contain"
        variants={scaleUp}
      />
      <motion.p className="text-gray-600 text-sm mt-2" variants={slideUp}>
        {desc}
      </motion.p>
    </motion.div>
  );
}

export default BrandCard;

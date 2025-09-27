import React from "react";
import { motion } from "framer-motion";

function HeroSection({
  title,
  subtitle,
 background = { 
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80", 
    type: "image" 
  },  overlay = "bg-black/40", // default dark overlay
  loading = false,
}) {
  return (
    <div className="relative h-72 flex items-center justify-center text-center text-white overflow-hidden">
      {/* ✅ Background Media */}
      {!loading && background?.url ? (
        background.type === "video" ? (
          <motion.video
            key={background.url}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={background.url} type="video/mp4" />
          </motion.video>
        ) : (
          <motion.div
            key={background.url}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${background.url})` }}
          />
        )
      ) : (
        <div className="absolute inset-0 bg-gray-300 animate-pulse" />
      )}

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlay}`} />

      {/* Content */}
      <div className="relative container mx-auto px-4">
        <motion.h1
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl font-extrabold drop-shadow-lg"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}

export default HeroSection;

"use client";

import { useContext, useEffect, useState } from "react";
import QuickServiceModal from "../../../../Component/QuickServiceModal";
import useHomeSectionMedia from "../../../../Hooks/useHomeMedia";
import { herosection as defaultHero } from "../Contant/contant";
import { Parallax } from "react-parallax";
import { motion } from "framer-motion";
import { ThemeContext } from "../../../../themes/ThemeProvider";
import { getGradient } from "../../../../themes/theme";
import FreeConsultationModal from "../../../../Component/FreeConsultationModal";

export default function HeroSection() {
  const [openService, setOpenService] = useState(false);
  const { sections, fetchSections } = useHomeSectionMedia();
  const theme = useContext(ThemeContext);

  useEffect(() => {
    fetchSections(false); // ✅ fetch only Top Banner
  }, []);

  // ✅ API data → fallback to constants
  const topBanner =
    sections.find((s) => s.sectionName === "Top Banner") || defaultHero;

  function handleSubmitService(data) {
    console.log("Service submitted", data);
  }

  return (
    <Parallax
      bgImage={topBanner?.bgImage || "https://via.placeholder.com/1200x800"}
      strength={600}
      blur={{ min: -2, max: 3 }}
      className="relative bg-fixed bg-center bg-cover min-h-screen flex items-center"
    >
      {/* ✨ Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />

      {/* 👇 Full-screen flexbox to center content */}
      <div className="relative flex items-center justify-center h-screen">
        <div className=" mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Animated Image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8, x: -60 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.img
              src={
                topBanner?.imageUrl ||
                "https://via.placeholder.com/500x500?text=Hero+Image"
              }
              alt={topBanner?.title || "Hero Illustration"}
              className="w-full h-full object-cover rounded-3xl shadow-7xl "
              // ✨ Floating animation
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              // ✨ Hover interaction
              whileHover={{
                scale: 1.05,
                rotate: 2,
                boxShadow: `0px 20px 40px ${theme.primary}55`, // semi-transparent glow
              }}
              whileTap={{ scale: 0.95 }}
            />
          </motion.div>

          {/* Right: Animated Text */}
          <motion.div
            className="text-white space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-5xl font-extrabold leading-tight drop-shadow-xl">
              {topBanner?.title || "Default Title"}
            </h1>

            <p className="text-base sm:text-lg md:text-xl drop-shadow-md max-w-xl mx-auto lg:mx-0">
              {topBanner?.description || "Default description goes here."}
            </p>

            {topBanner?.buttonText && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: getGradient(theme),
                  color: "#fff",
                }}
                onClick={() => setOpenService(true)}
                className="px-10 py-4 font-semibold rounded-xl shadow-xl hover:shadow-2xl transition"
              >
                {topBanner.buttonText}
              </motion.button>
            )}
          </motion.div>
        </div>
              <FreeConsultationModal open={openService} onClose={() => setOpenService(false)} />
        
        
      </div>
    </Parallax>
  );
}

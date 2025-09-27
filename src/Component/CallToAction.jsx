import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../themes/ThemeProvider";
import { getGradient } from "../themes/theme";
import { FaCalendar, FaBriefcase, FaPhone, FaEnvelope ,FaPhabricator } from "react-icons/fa"; 
import FreeConsultationModal from "./FreeConsultationModal";

// ✅ Dictionary of allowed icons
const icons = {
  calendar: FaCalendar,
  briefcase: FaPhabricator,
  phone: FaPhone,
  email: FaEnvelope,
};

export default function CallToAction({
  bgImage,
  title,
  subtitle,
  primaryButton,
  secondaryButton,
}) {
  const theme = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  // ✅ Resolve icons dynamically
  const PrimaryIcon = primaryButton?.icon ? icons[primaryButton.icon] : null;
  const SecondaryIcon = secondaryButton?.icon ? icons[secondaryButton.icon] : null;

  return (
    <section
      className="relative bg-fixed bg-center bg-cover min-h-[40vh] flex items-center justify-center py-10"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-3xl">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg mb-6 opacity-90"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {primaryButton && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(true)}
              className="px-6 py-3 rounded-full font-semibold shadow-md flex items-center justify-center gap-2"
              style={{
                background: getGradient(theme),
                color: "white",
              }}
            >
              {PrimaryIcon && <PrimaryIcon />} {primaryButton.text}
            </motion.a>
          )}

          {secondaryButton && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={secondaryButton.link}
              className="px-6 py-3 rounded-full font-semibold border-2 flex items-center justify-center gap-2"
              style={{
                borderColor: theme.primary,
                color: theme.primary,
                background: "transparent",
              }}
            >
              {SecondaryIcon && <SecondaryIcon />} {secondaryButton.text}
            </motion.a>
          )}
        </div>
      </div>

      <FreeConsultationModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

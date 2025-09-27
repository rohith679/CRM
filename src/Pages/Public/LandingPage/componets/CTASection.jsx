import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { getGradient } from "../../../../themes/theme";
import { ctaSection } from "../Contant/contant";
import { ThemeContext } from "../../../../themes/ThemeProvider";
import FreeConsultationModal from "../../../../Component/FreeConsultationModal";
import { UserStar } from "lucide-react";

export default function CTASection() {
  const theme = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  return (
    <section className="relative w-full py-20 text-center overflow-hidden">
      {/* Background */}
      {ctaSection.bgVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={ctaSection.bgVideo} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${ctaSection.bgImage})`,
          }}
        ></div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {ctaSection.title}
        </h2>
        <p className="text-white/90 mb-8">{ctaSection.subtitle}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Button 1 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg"
            style={{
              background: getGradient(theme),
              color: "white",
            }}
          >
            <i className="fas fa-calendar-alt"></i>
            {ctaSection.button1Text}
          </motion.button>

          {/* Button 2 */}
          <motion.a
            href={`tel:${ctaSection.phone}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full font-semibold border border-white text-white flex items-center gap-2 shadow-lg"
          >
            <i className="fas fa-phone"></i>
            {ctaSection.button2Text}: {ctaSection.phone}
          </motion.a>
        </div>
        <FreeConsultationModal open={open} onClose={() => setOpen(false)} />
      </div>
    </section>
  );
}

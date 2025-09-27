import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Parallax } from "react-parallax";
import { aboutSection } from "../Contant/contant";
import { ThemeContext } from "../../../../themes/ThemeProvider";
import { getGradient } from "../../../../themes/theme";

export default function AboutUsSection() {
  const theme = useContext(ThemeContext);

  return (
    <Parallax
      bgImage={aboutSection.bgImage}
      strength={400} // increase/decrease for more/less depth
      bgImageStyle={{ objectFit: "cover" }}
    >
      <section className="relative min-h-screen flex items-center py-20">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Image */}
          <motion.div
            className="rounded-2xl overflow-hidden shadow-2xl"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src={aboutSection.imageUrl}
              alt={aboutSection.sectionName}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              {aboutSection.title}
            </h2>
            <p className="text-lg md:text-xl max-w-lg">
              {aboutSection.description}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl font-semibold shadow-lg transition"
              style={{
                background: getGradient(theme),
                color: "white",
              }}
            >
              {aboutSection.buttonText}
            </motion.button>
          </motion.div>
        </div>
      </section>
    </Parallax>
  );
}

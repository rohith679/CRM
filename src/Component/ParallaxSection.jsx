import { Parallax } from "react-parallax";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../themes/ThemeProvider";

export default function ParallaxHero({
  title,
  description,
  buttonText,
  bgImage,
  imageUrl,
  reverse = false,
}) {
  return (
    <Parallax
      bgImage={bgImage}
      strength={500}
      blur={{ min: -2, max: 3 }}
      className="h-screen flex items-center"
    >
      <div
        className={`container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Left: Text */}
        <motion.div
          className="text-white space-y-6"
          initial={{ opacity: 0, x: reverse ? 100 : -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
            {title}
          </h1>
          <p className="text-lg md:text-xl drop-shadow-md">{description}</p>
          {buttonText && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
                color: "#fff",
              }}
              className="px-10 py-4 font-semibold rounded-xl shadow-xl hover:shadow-2xl transition"
            >
              {buttonText}
            </motion.button>
          )}
        </motion.div>

        {/* Right: Image */}
        {imageUrl && (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <img
              src={imageUrl}
              alt="Hero Illustration"
              className="w-80 h-80 md:w-[400px] md:h-[400px] object-cover rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        )}
      </div>
    </Parallax>
  );
}

import { motion } from "framer-motion";

const BrandsSection = ({ brands }) => {
  return (
    <div className="flex flex-wrap justify-center gap-10">
      {brands.map((brand, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: index * 0.2,
            duration: 0.7,
            ease: "easeOut",
          }}
          whileHover={{
            scale: 1.15,
            rotate: [0, -3, 3, -3, 0],
            transition: { duration: 0.6 },
          }}
          className="flex flex-col items-center group"
        >
          {/* Image Display */}
          <motion.div
            className="w-28 h-28 sm:w-40 sm:h-40 rounded-full bg-white shadow-lg flex items-center justify-center relative overflow-hidden"
            whileHover={{
              boxShadow: [
                "0 0 20px rgba(59,130,246,0.3)",
                "0 0 40px rgba(59,130,246,0.5)",
                "0 0 20px rgba(59,130,246,0.3)",
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {/* Image */}
            <img
              src={brand.image}
              alt={brand.title}
              style={{ maxWidth: brand.size || "70%", maxHeight: brand.size || "70%" }}
              className="object-contain"
            />
          </motion.div>

          {/* Title Display */}
          <p className="mt-4 text-base font-semibold text-gray-800 tracking-wide uppercase transition-colors duration-300 group-hover:text-blue-600">
            {brand.title} {/* Display the title */}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default BrandsSection;

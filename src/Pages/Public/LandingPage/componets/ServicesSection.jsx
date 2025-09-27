import React, { useContext } from "react";
import { motion } from "framer-motion";
import { servicesSection } from "../Contant/contant";
import { ThemeContext } from "../../../../themes/ThemeProvider";
import { getGradient } from "../../../../themes/theme";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";

export default function ServicesSection() {
  const theme = useContext(ThemeContext);
const navigate = useNavigate()
  // Parent container animation (stagger children)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 rounded-full opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            {servicesSection.sectionName}
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            {servicesSection.subtitle}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {servicesSection.services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="relative group bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transform transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
            >
              {/* Twinkle shine overlay */}
              <div className="pointer-events-none absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:translate-x-[-200%] group-hover:before:translate-x-[200%] before:skew-x-12 before:animate-shine"></div>

              {/* Image */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                {service.popular && (
                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                    Popular
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-semibold text-xl mb-3 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                  {service.description}
                </p>

                {/* Price & Timeline */}
                <div className="flex justify-between items-center mt-auto text-sm font-medium text-gray-700">
                  <span style={{ color: theme.primary }}>{service.price}</span>
                  <span className="text-gray-500">{service.timeline}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Button */}
        <div className="flex justify-center mt-14">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-white shadow-lg text-lg relative overflow-hidden"
            style={{ background: getGradient(theme) }}
            onClick={() => navigate("/services")}
          >
            {/* Shine effect */}
            <span className="absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:translate-x-[-200%] group-hover:before:translate-x-[200%] before:skew-x-12 before:animate-shine"></span>
            
            <span className="relative z-10">Explore All Services</span>
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="relative z-10"
            >
              <ArrowRightOutlined />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}

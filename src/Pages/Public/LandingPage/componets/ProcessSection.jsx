import React, { useContext } from "react";
import { motion } from "framer-motion";
import { processSteps } from "../Contant/contant";
import { getGradient } from "../../../../themes/theme";
import { ThemeContext } from "../../../../themes/ThemeProvider";

export default function ProcessSection() {
  const theme = useContext(ThemeContext);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {processSteps.sectionName}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          {processSteps.subtitle}
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {processSteps.steps.map((step, index) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center space-y-4"
            >
              {/* Circle with infinite rolling animation */}
              <motion.div
                className="w-16 h-16 flex items-center justify-center rounded-full text-white font-bold text-lg shadow-lg"
                style={{ background: getGradient(theme) }}
                animate={{ rotateX: 120 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {step.number}
              </motion.div>

              {/* Title */}
              <h3 className="font-semibold text-lg">{step.title}</h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

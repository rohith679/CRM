import React, { useContext } from "react";
import { Parallax } from "react-parallax";
import { motion } from "framer-motion";
import {
  Award,
  Clock,
  Shield,
  IndianRupee,
  Headphones,
  Box,
} from "lucide-react"; // icons
import { ThemeContext } from "../../../../themes/ThemeProvider";
import { getGradient } from "../../../../themes/theme";

const features = [
  {
    id: 1,
    icon: <Award size={24} />,
    title: "Award-Winning Designs",
    description: "Our innovative designs have won multiple industry awards and recognition.",
  },
  {
    id: 2,
    icon: <Clock size={24} />,
    title: "On-Time Delivery",
    description: "We respect your time and deliver projects within the promised timeline.",
  },
  {
    id: 3,
    icon: <Shield size={24} />,
    title: "Quality Guarantee",
    description: "Premium materials and craftsmanship with comprehensive warranty coverage.",
  },
  {
    id: 4,
    icon: <IndianRupee size={24} />,
    title: "Transparent Pricing",
    description: "No hidden costs. Clear, upfront pricing with flexible payment options.",
  },
  {
    id: 5,
    icon: <Headphones size={24} />,
    title: "24/7 Support",
    description: "Dedicated support team available throughout and after project completion.",
  },
  {
    id: 6,
    icon: <Box size={24} />,
    title: "3D Visualization",
    description: "See your space before it’s built with detailed 3D renders and virtual tours.",
  },
];

export default function WhyChooseUs() {
  const theme = useContext(ThemeContext);

  return (
    <Parallax
      blur={0}
      bgImage="https://images.unsplash.com/photo-1505691938895-1758d7feb511" // replace with your image
      bgImageAlt="interior background"
      strength={400}
    >
      <section className="py-20 bg-black/70 text-white relative">
        <div className="container mx-auto px-6 text-center">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Chakra Interiors?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-12">
            We deliver exceptional interior design experiences with unmatched quality and service.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center space-y-4"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-full shadow-lg"
                  style={{ background: getGradient(theme) }}
                >
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Parallax>
  );
}

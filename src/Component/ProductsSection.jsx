import { motion } from "framer-motion";

const ProductsSection = ({ title, productCategories, fadeUp }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-3xl font-bold mb-10 text-center text-gray-800"
      >
        {title}
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {productCategories.map((product, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 p-8 flex flex-col items-center text-center"
          >
            <motion.img
              src={product.img}
              alt={product.name}
              className="w-30 h-30 object-contain mb-6"
              whileHover={{ scale: 1.1, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <h3 className="text-lg font-semibold text-gray-700">
              {product.name}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductsSection;

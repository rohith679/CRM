import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "auto" });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // adjust duration if needed

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {loading && (
        <motion.div
          key="pageloader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 bg-white flex items-center justify-center z-[9999]"
        >
          <motion.img
            src="https://dummy-testing123.s3.ap-south-1.amazonaws.com/1758698277689-Chakra%20Interior.png"
            alt="Loading..."
            className="h-20 w-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </>
  );
}

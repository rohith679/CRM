import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../../themes/ThemeProvider";
import QuickServiceModal from "../../Component/QuickServiceModal";
import ReviewModal from "../../Pages/Public/LandingPage/componets/ReviewModal";
import { getGradient } from "../../themes/theme";
import { Star } from "lucide-react";
import FreeConsultationModal from "../../Component/FreeConsultationModal";

export default function Header() {
  const theme = useContext(ThemeContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const menuItems = [
    { label: "HOME", path: "/" },
    { label: "ABOUT", path: "/about" },
    { label: "SERVICES", path: "/services" },
    { label: "PORTFOLIO", path: "/portfolio" },
    { label: "CONTACT", path: "/contact" },
  ];

  return (
    <header className="bg-white/50 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="px-6">
        {/* Navbar */}
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="https://dummy-testing123.s3.ap-south-1.amazonaws.com/1758698277689-Chakra%20Interior.png" alt="Logo" className="h-12" />
            <span
              className="font-bold text-xl"
              style={{ color: theme.primary }}
            >
              CHAKRA INTERIORS
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-9 font-medium text-gray-800">
            {menuItems.map((item) => (
              <span
                key={item.label}
                onClick={() => handleNav(item.path)}
                className="cursor-pointer hover:opacity-80"
                style={{
                  color:
                    location.pathname === item.path
                      ? theme.primary
                      : theme.text,
                }}
              >
                {item.label}
              </span>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white px-6 py-2 rounded-lg font-semibold transition"
              style={{ background: getGradient(theme) }}
              onClick={() => setOpen(true)}
            >
              FREE CONSULTATION
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 shadow-lg"
              onClick={() => setOpenReview(true)}
            >
              Add Review
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              >
                <Star size={18} className="text-yellow-300" />
              </motion.span>
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="md:hidden p-2 border border-gray-300 rounded"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg p-6 space-y-6 z-50 md:hidden"
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-xl"
                onClick={() => setMobileOpen(false)}
              >
                ✖
              </button>

              {/* Links */}
              <div className="flex flex-col space-y-4 mt-10">
                {menuItems.map((item) => (
                  <span
                    key={item.label}
                    onClick={() => handleNav(item.path)}
                    className="block text-lg font-medium cursor-pointer"
                    style={{
                      color:
                        location.pathname === item.path
                          ? theme.primary
                          : theme.text,
                    }}
                  >
                    {item.label}
                  </span>
                ))}
              </div>

              {/* Mobile Buttons */}
              <div className="flex flex-col gap-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full text-white px-6 py-3 rounded-lg font-semibold shadow-md"
                  style={{ background: getGradient(theme) }}
                  onClick={() => {
                    setOpen(true);
                    setMobileOpen(false);
                  }}
                >
                  FREE CONSULTATION
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 shadow-lg"
                  onClick={() => {
                    setOpenReview(true);
                    setMobileOpen(false);
                  }}
                >
                  Add Review
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      ease: "linear",
                    }}
                  >
                    <Star size={18} className="text-yellow-300" />
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modals */}
        <ReviewModal
          open={openReview}
          onClose={() => setOpenReview(false)}
          onSubmit={() => {}}
        />
        {/* <QuickServiceModal
          open={openService}
          centered
          onClose={() => setOpenService(false)}
          onSubmit={() => {}}
        /> */}
      </div>
      <FreeConsultationModal open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

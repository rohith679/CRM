"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";
import { FaRegStar, FaRegEye } from "react-icons/fa6";
import { useEffect, useState } from "react";
import ReviewModal from "./ReviewModal";
import useReviews from "../hooks/ReviewHooks";
import { Modal } from "antd";
import { motion } from "framer-motion";

// ⭐ Animated Stars
function Stars({ count = 5 }) {
  return (
    <div className="flex items-center gap-1 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <FaStar className="text-yellow-400 drop-shadow" />
        </motion.div>
      ))}
    </div>
  );
}

// ⭐ Single Review Card
function ReviewCard({ review }) {
  const initials = review.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -10, scale: 1.02 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col h-80 transition-transform duration-300"
      >
        {/* Stars */}
        <Stars count={review.rating} />

        {/* Review text */}
        <p className="text-gray-700 leading-7 italic mb-4 line-clamp-3 flex-1">
          “{review.review || review.text}”
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-full bg-blue-600 text-white mr-3 flex items-center justify-center text-sm font-bold"
            >
              {initials}
            </motion.div>
            <div>
              <div className="font-semibold text-gray-900">{review.name}</div>
              <div className="text-sm text-gray-500">
                {review.organization || review.role}
              </div>
            </div>
          </div>

          {/* Expand Icon */}
          <button
            onClick={() => setOpen(true)}
            className="text-gray-500 hover:text-blue-600 transition"
          >
            <FaRegEye size={18} />
          </button>
        </div>
      </motion.div>

      {/* Full Review Modal */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        centered
        title={`${review.name} - ${review.organization || review.role}`}
      >
        <div className="mb-4">
          <Stars count={review.rating} />
        </div>
        <p className="text-gray-700 leading-7 italic">
          “{review.review || review.text}”
        </p>
      </Modal>
    </>
  );
}

// ⭐ Reviews Section
export default function Reviews() {
  const [open, setOpen] = useState(false);
  const {
    reviews,
    loading,
    error,
    reviewsAgree,
    createReview,
    fetchReviewsAgree,
  } = useReviews();

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  function handleSubmitReview(newReview) {
    createReview(newReview);
  }

  useEffect(() => {
    fetchReviewsAgree(); // 🔥 Load only agreed reviews when component mounts
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center mb-10 relative">
          What Our Customers Say
          <span className="block w-24 h-1 bg-blue-600 rounded-full mx-auto mt-2"></span>
        </h2>

        {loading ? (
          <p className="text-center">Loading reviews...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {reviewsAgree?.length >= 2 ? (
              <Slider {...settings}>
                {reviewsAgree.map((r, i) => (
                  <div key={i} className="px-4">
                    <ReviewCard review={r} />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="flex justify-center">
                {reviewsAgree.map((r, i) => (
                  <div key={i} className="px-4 lg:w-1/3">
                    <ReviewCard review={r} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Review Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-md bg-emerald-600 px-6 py-3 text-white shadow hover:bg-emerald-700"
        >
          <FaRegStar />
          Add Your Review
        </button>
      </div>

      {/* Review Modal */}
      <ReviewModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmitReview}
      />
    </section>
  );
}

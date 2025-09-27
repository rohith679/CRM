import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const items = [
    { key: "motors-pumps", label: "Motors & Pumps", path: "/product-pump" },
    {
      key: "wires-accessories",
      label: "Wires & Accessories",
      path: "/products/wires-accessories",
    },
    {
      key: "switches-accessories",
      label: "Switches & Accessories",
      path: "/products/switches-accessories",
    },
    {
      key: "lighting-solutions",
      label: "Lighting Solutions",
      path: "/products/lighting-solutions",
    },
    {
      key: "faucets-sanitarywares",
      label: "Faucets & Sanitarywares",
      path: "/products/faucets-sanitarywares",
    },
    {
      key: "plumbing-products",
      label: "Plumbing Products",
      path: "/products/plumbing-products",
    },
    { key: "appliances", label: "Appliances", path: "/products/appliances" },
    {
      key: "electrical",
      label: "Electrical Services",
      path: "/services/electrical",
    },
    { key: "plumbing", label: "Plumbing Services", path: "/services/plumbing" },
  ];
const logo = "https://dummy-testing123.s3.ap-south-1.amazonaws.com/1758698277689-Chakra%20Interior.png"
  return (
<footer className="bg-[#111827] text-white pt-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src={logo}
                // alt="Sri Murugan Enterprises Logo"
                className="h-12 w-20 object-contain"
              />
              <div className="ml-2">
                <div className="font-semibold text-lg">
                  CHAKRA INTERIORS
                </div>
                
              </div>
            </div>
            {/* <p className="text-white-400 mb-4">
              Your trusted partner for electrical and plumbing solutions.
              Quality products, professional services, and customer satisfaction
              guaranteed.
            </p> */}

            {/* Social Icons */}
            {/* <div className="flex space-x-3">
              <a
                href="#"
                className="bg-blue-600 p-2 rounded-full hover:bg-blue-500 transition"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="bg-pink-500 p-2 rounded-full hover:bg-pink-400 transition"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="bg-blue-700 p-2 rounded-full hover:bg-blue-600 transition"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="#"
                className="bg-green-500 p-2 rounded-full hover:bg-green-400 transition"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <span
                  onClick={() => navigate("/")}
                  className="text- hover:text-white cursor-pointer relative footer-link"
                >
                  Home
                </span>
              </li>
              <li>
                <span
                  onClick={() => navigate("/about")}
                  className="text-white-400 hover:text-white cursor-pointer relative footer-link"
                >
                  About Us
                </span>
              </li>
              <li>
                <span
                  onClick={() => navigate("/contact")}
                  className="text-white-400 hover:text-white cursor-pointer relative footer-link"
                >
                  Contact
                </span>
              </li>
            </ul>
          </div>

          {/* Products & Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products & Services</h3>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.key}>
                  <span
                    onClick={() => navigate(item.path)}
                    className="text-white-400 hover:text-white cursor-pointer relative footer-link"
                  >
                    {/* {item.label} */}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            {/* <div className="space-y-3 text-white-400">
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt text-blue-400 mt-1"></i>
                <p className="">
                  No. 8, D-Mundy Street, Near Traffic Police Station, <br />
                  Old Bus Stand, Vellore - 632004
                </p>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone text-blue-400"></i>
                <span className="">+91 9952638166, 9894588951</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope text-blue-400"></i>
                <span className="">srimuruganenterprisesvlr@gmail.com</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-clock text-blue-400"></i>
                <span className="">Mon - Sat: 9:00 AM – 7:00 PM</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 bg-gradient-to-br from-[#6A0DAD] to-[#FF007F] text-white py-6 px-6 rounded-2xl flex flex-col md:flex-row items-center justify-between">
          <h3 className="text-lg md:text-xl font-semibold text-center md:text-left">
            Need Help with ?
          </h3>
          <a
            href="tel:+919952638166"
            className="mt-4 md:mt-0 bg-white text-blue-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Call Us Now
          </a>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-white-400">
          <p>
            © 2025  CHAKRA INTERIORS. Developed & Maintained By {""}
            <a
              href="https://digitner.com" // 👉 replace with your actual company website
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-400 hover:text-white underline-offset-2 underline transition"
            >
              Digitner Tech Solutions Pvt Ltd
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

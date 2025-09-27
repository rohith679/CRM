// import React, { useEffect } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import useLogo from "../../../../Hooks/useLogo";
// // adjust the relative path if this file lives elsewhere
// import logo1 from "../../../../assets/logos/logo1.png";
// import logo2 from "../../../../assets/logos/logo2.png";
// import logo3 from "../../../../assets/logos/logo3.png";
// import logo4 from "../../../../assets/logos/logo4.png";
// import logo5 from "../../../../assets/logos/logo5.png";
// import logo6 from "../../../../assets/logos/logo6.png";
// import logo7 from "../../../../assets/logos/logo7.png";
// import logo8 from "../../../../assets/logos/logo8.png";
// import logo9 from "../../../../assets/logos/logo9.png";
// import logo10 from "../../../../assets/logos/logo10.png";
// import logo11 from "../../../../assets/logos/logo11.png";
// import logo12 from "../../../../assets/logos/logo12.png";
// import logo13 from "../../../../assets/logos/logo13.png";
// import logo14 from "../../../../assets/logos/logo14.png";
// import logo15 from "../../../../assets/logos/logo15.png";
// import logo16 from "../../../../assets/logos/logo16.png";
// import logo17 from "../../../../assets/logos/logo17.png";
// import logo18 from "../../../../assets/logos/logo18.png";
// import logo19 from "../../../../assets/logos/logo19.png";
// import logo20 from "../../../../assets/logos/logo20.png";
// import logo21 from "../../../../assets/logos/logo21.png";

// export const logos = [
//   logo1,
//   logo2,
//   logo3,
//   logo4,
//   logo5,
//   logo6,
//   logo7,
//   logo8,
//   logo9,
//   logo10,
//   logo11,
//   logo12,
//   logo13,
//   logo14,
//   logo15,
//   logo16,
//   logo17,
//   logo18,
//   logo19,
//   logo20,
//   logo21,
// ];

// export default function LogoCarousel() {
//     const { logos, loading, error } = useLogo(); // Fetch logos from the API
//  // Debugging logs to check the fetched logos
//   useEffect(() => {
//     console.log("Fetched logos:", logos);
//   }, [logos]);

//   const settings = {
//     infinite: true,
//     slidesToShow: 6,
//     slidesToScroll: 1,
//     autoplay: true,
//     speed: 3000,
//     autoplaySpeed: 0,
//     cssEase: "linear",
//     arrows: false,
//     pauseOnHover: true,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 4 } },
//       { breakpoint: 768, settings: { slidesToShow: 3 } },
//       { breakpoint: 480, settings: { slidesToShow: 2 } },
//     ],
//   };
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading logos: {error}</div>;
//   }
//   return (
//      <div className="bg-gradient-to-r from-gray-100 to-white py-6">
//       {/* Adding a key to force re-render of Slider when logos change */}
//       <Slider {...settings} key={logos.length}>
//         {logos.length === 0 ? (
//           <div>No logos found</div> // Add a fallback message if no logos are available
//         ) : (
//           logos.map((logo, index) => (
//             <div key={index} className="flex justify-center items-center">
//               <img
//                 src={logo.imageUrl} // Fetching the image URL from the API response
//                 alt={`Logo ${index + 1}`}
//                 className="h-16 object-contain"
//                 loading="lazy"
//                 draggable={false}
//                 onError={(e) => {
//                   e.currentTarget.style.visibility = "hidden"; // Hide image if it fails to load
//                   console.log("Error loading image", logo.imageUrl); // Log the image URL on error
//                 }}
//               />
//             </div>
//           ))
//         )}
//       </Slider>
//             </div>
//   );
// }

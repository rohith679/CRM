import React from "react";
import Header from "../../../layouts/headers";
import Footer from "../../../layouts/footer/Index";
import CommPanel from "./componets/CommPanel";
import HeroSection from "./componets/HeroSection";
// import LogoCarousel from "./componets/LogoCarousel";
import StatsSection from "./componets/StatsSection";
import AppLayout from "../../../layouts/Index";
import ProcessSection from "./componets/ProcessSection";
import AboutUsSection from "./componets/AboutUsSection";
import ServicesSection from "./componets/ServicesSection";
import WhyChooseUs from "./componets/WhyChooseUs";
import CTASection from "./componets/CTASection";
import CallToAction from "../../../Component/CallToAction";
export default function LandingPage({ children }) {
  return (
    <>
      <AppLayout>
        <HeroSection />
        <StatsSection />
        <ProcessSection />

        <AboutUsSection />
        <ServicesSection />
        <WhyChooseUs />
        <CallToAction
  bgImage="https://images.unsplash.com/photo-1503264116251-35a269479413"
  title="Ready to Transform Your Space?"
  subtitle="Get started with a free consultation and discover how we can bring your vision to life."
  primaryButton={{
    text: "Book Free Consultation",
    link: "/consultation",
    icon: "calendar", // 👈 maps to FaCalendar
  }}
  secondaryButton={{
    text: "Call Now",
    link: "/contact",
    icon: "briefcase", 
  }}
/>

    
        {/* <ProductsGrid /> */}
        {/* <ReviewCard /> */}
        {/* {children} */}
        {/* <Footer /> */}
      </AppLayout>
    </>
  );
}

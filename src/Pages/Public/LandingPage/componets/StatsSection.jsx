"use client";

import CountUp from "react-countup";
import { ThemeContext } from "../../../../themes/ThemeProvider";
import { useContext } from "react";

export default function StatsSection() {
  const stats = [
    { number: 15000, suffix: "+", label: "Satisfied Customers" },
    { number: 50, suffix: "+", label: "Brand Partners" },
    { number: 12, suffix: "+", label: "Years Experience" },
    { number: 24, suffix: "/7", label: "Emergency Service" },
  ];
  const theme = useContext(ThemeContext);

  return (
    <section className="py-12" style={{color:theme.primary}}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <div key={i} className="will-change-transform">
            <h2 className="text-3xl md:text-4xl font-bold">
              <CountUp
                end={s.number}
                duration={3}
                separator=","
                enableScrollSpy // starts when scrolled into view
                scrollSpyOnce // only once per page load
                smartEasingThreshold={1000} // smoother for large numbers
                smartEasingAmount={500}
              />
              {s.suffix}
            </h2>
            <p className="mt-2 text-black">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

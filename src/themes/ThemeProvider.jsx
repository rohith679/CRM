import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    primary: "#6A0DAD", // Purple (main brand / background gradient)
    secondary: "#FF007F",
    text: "#121212ff",
  });

  // useEffect(() => {
  //   const fetchTheme = async () => {
  //     try {
  //       const res = await fetch("https://api.example.com/theme");
  //       const data = await res.json();
  //       setTheme(data);
  //     } catch (err) {
  //       console.error("Failed to load theme:", err);
  //     }
  //   };

  //   fetchTheme();
  // }, []);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;

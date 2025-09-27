const token = {
  primary: "#FAB62D",
  secondary: "#781128",
  background: "#FBF4E4",
};

// src/utils/themeUtils.js
export const getGradient = (theme) =>
  `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`;

export const ANT_THEME = {
  token,
  components: {
    Checkbox: {
      colorPrimary: token.secondary,
      colorBorder: token.secondary,
      colorPrimaryHover: token.primary,
      controlInteractiveSize: 20,
    },
  },
  custom: {
    spacing: {
      xSmall: "4px",
      small: "8px",
      medium: "12px",
      large: "16px",
      XLarge: "24px",
      doubleLarge: "32px",
    },
    customColors: {
      greenGradient: "linear-gradient(120deg,rgba(126, 87, 194, 0.8), #fff)",
      orangeGradient: "linear-gradient(to right, #f7971e, #ffd200)",
      ongoingGradient: "linear-gradient(to right, #de6262, #ffb88c)",
      verifyPaymentGradient: "linear-gradient(to right, #d53369, #cbad6d)",
      deliveredGradient: "linear-gradient(to right, #a73737, #7a2828)",
      completedGradient: "linear-gradient(to right, #f857a6, #ff5858)",
      refundedGradient: "linear-gradient(to right, #4b6cb7, #182848)",
      cancelledGradient: "linear-gradient(to right, #fc354c, #0abfbc)",
    },
    topNavbar: {
      height: "3.125rem",
    },
  },
};

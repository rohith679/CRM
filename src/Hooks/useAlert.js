import React from "react";
import { enqueueSnackbar } from "notistack";
import { closeSnackbar } from "notistack";

const useAlert = () => {
  // accepts message and variant like success, error
  const publishNotification = (
    message = "",
    variant,
    duration = 2000,
    anchorOrigin = {}
  ) => {
    return enqueueSnackbar(message, {
      variant,
      autoHideDuration: duration,
      preventDuplicate: true,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
        ...anchorOrigin,
      },
    }); //always return id
  };
  return { publishNotification, closeSnackbar };
};

export default useAlert;

// utils/getLocation.js

export function getCurrentLocation(dispatch, setLocationAction) {
  // Avoid asking again if already stored
  const lat = localStorage.getItem("doctorLat");
  const long = localStorage.getItem("doctorLong");

  if (lat && long) {
    // Already stored: update Redux and skip asking again
    dispatch(setLocationAction({ latitude: lat, longitude: long }));
    return;
  }

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        localStorage.setItem("userLat", latitude.toString());
        localStorage.setItem("userLong", longitude.toString());

        // Dispatch to Redux
        dispatch(setLocationAction({ latitude, longitude }));

        console.log("Location stored:", latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  } else {
    console.error("Geolocation not supported by this browser.");
  }
}

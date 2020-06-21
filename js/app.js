if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) =>
      console.log("Service worker registered", registration)
    )
    .catch((error) => console.log("Service worker registration error", error));
}

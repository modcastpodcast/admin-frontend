if (typeof importScripts === "function") {
    importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js");
    if (workbox) {
        console.log("Workbox is loaded");
        workbox.core.skipWaiting();

        workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

        workbox.routing.registerRoute(
            new workbox.strategies.NetworkFirst({
                    cacheName: "PRODUCTION",
            })
        );
    } else {
        console.log("Workbox could not be loaded. No Offline support");
    }
}

const workboxBuild = require("workbox-build");

const buildSW = () => {
    workboxBuild
        .injectManifest({
            swSrc: "src/sw-template.js",
            swDest: "build/service-worker.js",
            globDirectory: "build",
            globPatterns: ["**/*.{jpg,png,ico}"],
        })
        .then(({ count, size, warnings }) => {
            warnings.forEach(console.warn);
            console.log(`${count} files will be precached, totaling ${size} bytes.`);
        })
        .catch(console.error);
};

buildSW();

module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: "wepipe-app",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js",
    },
    manifestOptions: {
      gcm_sender_id: "306009663971",
    },
  },
  transpileDependencies: ["vuetify"],
};

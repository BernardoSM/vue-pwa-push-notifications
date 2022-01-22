import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDywHV1rlKbO-H4Cu0tbGT8eeSDjJzdWA0",
  authDomain: "vue-pwa-service-worker.firebaseapp.com",
  projectId: "vue-pwa-service-worker",
  storageBucket: "vue-pwa-service-worker.appspot.com",
  messagingSenderId: "306009663971",
  appId: "1:306009663971:web:f5615358d6f33a606b18d6",
};

initializeApp(firebaseConfig);

import { getMessaging, getToken } from "firebase/messaging";
const messaging = getMessaging();
getToken(messaging, {
  vapidKey:
    "BKITM-LF0rRA0tOXIo121u5AA5U7c1gY8gS6WPamb-VbT30MsIv__buPein1CLDzDWqkUYIKn082byYF2xk_H70",
})
  .then((currentToken) => {
    if (currentToken) {
      document.querySelector("#register").innerHTML = currentToken;
      console.log(currentToken);
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

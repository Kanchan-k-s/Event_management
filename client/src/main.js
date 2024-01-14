import { createApp } from "vue";
import App from "./App.vue";

import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
// import "bootstrap-icons/font/bootstrap-icons.css";

import Toaster from "@meforma/vue-toaster";

const vuetify = createVuetify({
  components,
  directives,
});

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

createApp(App).use(vuetify).use(Toaster).use(router).mount("#app");

import { createApp } from "vue";
import { createAuth0 } from "@auth0/auth0-vue";

import App from "./App.vue";

const yoyo = createApp(App);
yoyo.use(
  createAuth0({
    domain: "auth.development.leibniz.lol",
    client_id: "vXUvZF4pL0wvPYoldqYARjKhpwNm2OYX",
    redirect_uri: window.location.origin
  })
);

yoyo.mount("#app");

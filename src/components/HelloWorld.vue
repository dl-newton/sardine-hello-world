<template>
  <div class="hello">
    <h1 v-if="!isAuthenticated" id="test">Session key: {{ uuid }}</h1>
    <button @click="login">Log in</button>
    <button @click="logout">Log out</button>
    <button @click="pleaseDaddy">Resend</button>
    <pre v-if="isAuthenticated">
        <code>{{ user }}</code>
    </pre>
  </div>
  <noscript>
    <img
      src="https://api.sandbox.sardine.ai/v1/a.png?clientId=4c1b1864-54e5-42af-9b77-76cfd8d33976&sessionKey=a3b83791-806e-4695-ab94-0cba53fbae63&flow=login&ns=1"
      style="display: none"
    />
  </noscript>
</template>

<script>
import {
  // eslint-disable-next-line no-unused-vars
  getSardineConfig,
  setupSardine,
  updateSardineConfig
} from "@sardine-ai/web-sdk";

// LOGIN
import { useAuth0 } from "@auth0/auth0-vue";
// LOGIN
import { v4 as uuidv4 } from "uuid";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  setup() {
    const auth0 = useAuth0();

    const sardineChildClientId = "2aa5cf34-04a3-4295-a905-74ee825ce14d";
    const sardineClientId = "4c1b1864-54e5-42af-9b77-76cfd8d33976";
    setupSardine({
      clientId: `${sardineClientId}`,
      environment: "sandbox"
    });
    const uuid = uuidv4();
    console.log(uuid);
    // console.log(getSardineConfig());

    var isSandbox = true;
    var sardineHost = isSandbox ? "api.sandbox.sardine.ai" : "api.sardine.ai"; //please set isSandbox to true in Sandbox
    let context;
    (function () {
      var loader = document.createElement("script");
      loader.type = "text/javascript";
      loader.async = true;
      loader.src = `https://${sardineHost}/assets/loader.min.js`;
      loader.onload = function () {
        context = window._Sardine.createContext({
          clientId: `${sardineChildClientId}`,
          sessionKey: uuid, // Please CHANGE this to  pass server side generated sessionKey and you will need this again for back-end  API call
          userIdHash: "72f19c5f-1c6e-4fb0-912a-4956ab28f9dd", //CHANGE this to pass internal userId or hash of email/phone. Dont pass it if its not available.
          flow: location.pathname,
          environment: isSandbox ? "sandbox" : "production",
          parentElement: document.body,
          // called when sardine generates/restores deviceID for given device.
          onDeviceResponse: function (data) {
            console.log(data);
          }
        });
        console.log(context);
      };
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(loader, s);
    })();

    return {
      login: () => {
        auth0.loginWithRedirect({
          session_key: uuid
        });
      },
      logout: () => {
        auth0.logout({ returnTo: window.location.origin });
      },
      user: auth0.user,
      isAuthenticated: auth0.isAuthenticated,
      isLoading: auth0.isLoading,
      uuid: uuid
    };
  },
  data() {
    return {
      post: {
        id: 1,
        myUuid: "My Journey with Vue"
      }
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    pleaseDaddy(event) {
      const uuid = uuidv4();
      const test = updateSardineConfig({
        customerId: "25d2d942-7272-42cb-bd29-56b3a0611216",
        sessionKey: uuid,
        flow: "login"
      });
      console.log(test);
      console.log(`uuid: ${uuid}`);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

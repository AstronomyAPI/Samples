<template>
  <div class="container">
    <h2>
      <img
        src="https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=1,format=auto/https%3A%2F%2F2229349915-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-MKQ7_I-c79Ln1c6Chop%252Favatar-1603563866478.png%3Fgeneration%3D1603563866686051%26alt%3Dmedia"
      />
      Astronomy API - Demo
    </h2>

    <div class="row">
      <div class="column column-25">
        <p>
          Copy your App Id and the App Secret from the
          <a href="https://astronomyapi.com/dashboard" target="_blank"
            >Astronomy API console</a
          >
          paste below to see the samples in action.
        </p>
        <form>
          <fieldset>
            <label>App Id</label>
            <input
              v-model="store.appId"
              @change="validateCredentials"
              type="text"
            />
            <label>App Secret</label>
            <input
              v-model="store.appSecret"
              @change="validateCredentials"
              type="password"
            />
          </fieldset>
        </form>

        <div v-bind:class="messageClass" v-if="status">{{ status }}</div>

        <p v-if="store.credentialsValid">Explore each endpoint below.</p>

        <ul v-if="store.credentialsValid">
          <li>
            <router-link to="/positions">Planetary Positions</router-link>
          </li>
          <li><router-link to="/star-chart">Star Charts</router-link></li>
          <li><router-link to="/moon-phase">Moon Phase</router-link></li>
          <li><router-link to="/search">Search</router-link></li>
        </ul>
      </div>
    </div>
    <div class="column column-75"></div>
  </div>
</template>

<script>
import { store } from "../store.js";
import axios from "axios";

export default {
  data() {
    return {
      store,
      status: "",
      messageClass: "",
    };
  },
  methods: {
    validateCredentials() {
      if (!store.appId || !store.appSecret) {
        return;
      }

      this.status = "Checking Credentials...";
      axios
        .get(`${store.apiEndpoint}/api/v2/bodies`, {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Basic ${btoa(`${store.appId}:${store.appSecret}`)}`,
          },
        })
        .then((response) => {
          console.log(response);

          this.status = "Credentials valid";
          this.messageClass = "success";
          this.store.credentialsValid = true;
        })
        .catch((e) => {
          console.log(e);

          this.status = "Credential validation failed";
          this.messageClass = "error";
        });
    },
  },
};
</script>

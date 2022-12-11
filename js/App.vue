<template>
  <div class="container">
    <h2>Astronomy API - Demo</h2>

    <div class="row">
      <div class="column column-25">
        <p>Copy your App Id and the App Secret from the <a href="https://astronomyapi.com/dashboard" target="_blank">Astronomy API console</a> paste below to see the samples in action.
        </p>
        <form>
          <fieldset>
            <label>App Id</label>
            <input v-model="store.appId" type="text" />
            <label>App Secret</label>
            <input v-model="store.appSecret" type="password" />
          </fieldset>
        </form>

        <p v-if="store.appId && store.appSecret">Explore each endpoint below.</p>

        <ul v-if="store.appId && store.appSecret">
          <li><router-link to="/positions">Planetary Positions</router-link></li>
          <li><router-link to="/star-chart">Star Charts</router-link></li>
          <li><router-link to="/moon-phase">Moon Phase</router-link></li>
          <li><router-link to="/search">Search</router-link></li>
        </ul>
      </div>
    </div>
    <div class="column column-75">
    </div>
  </div>
</template>

<script>
import { store } from './store.js'

export default {
  data() {
    return {
      store
    }
  }
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="column column-25">
        <GoBack></GoBack>
        <h3>Moon Phase</h3>
        <p>
          This demo page utilizes the `/v2/studio/moon-phase` endpoint to
          generate images.
        </p>
        <form>
          <fieldset>
            <label>Longitude</label>
            <input v-model="longitude" type="text" />
            <label>Latitude</label>
            <input v-model="latitude" type="text" />
            <label>Date</label>
            <input v-model="date" type="date" />
            <label>View Type</label>
            <select v-model="viewType">
              <option :value="key" v-for="(name, key) in viewTypes">{{
                name
              }}</option>
            </select>
            <label>Moon Style</label>
            <select v-model="style.moonStyle">
              <option :value="key" v-for="(name, key) in moonStyles">{{
                name
              }}</option>
            </select>
            <label>Background Style</label>
            <select v-model="style.backgroundStyle">
              <option :value="key" v-for="(name, key) in backgroundStyles">{{
                name
              }}</option>
            </select>
            <label>Background Color</label>
            <input type="color" v-model="style.backgroundColor" />
            <label>Heading Color</label>
            <input type="color" v-model="style.headingColor" />
            <label>Text Color</label>
            <input type="color" v-model="style.textColor" />
            <button @click="generate">Generate</button>
          </fieldset>
        </form>
      </div>
      <div class="column column-75">
        <div v-if="loading">{{ status }}</div>
        <div v-if="imageUrl"><img :src="imageUrl" /></div>
      </div>
    </div>
    <CodeView></CodeView>
  </div>
</template>

<script>
import GoBack from "./GoBack.vue";
import CodeView from "./CodeView.vue";
import mixins from "../mixins.js";
import { store } from "../store.js";

export default {
  mixins: [mixins],
  components: {
    GoBack: GoBack,
    CodeView: CodeView
  },
  data() {
    return {
      moonStyles: {
        default: "Default",
        sketch: "Sketch",
        shaded: "Shaded"
      },
      backgroundStyles: {
        stars: "Stars",
        solid: "Solid"
      },
      viewTypes: {
        "portrait-simple": "Portrait Simple",
        "landscape-simple": "Landscape Simple"
      },
      style: {
        moonStyle: "default",
        backgroundStyle: "stars",
        backgroundColor: "#000000",
        headingColor: "#ffffff",
        textColor: "#ffffff"
      },
      longitude: "-84.39733",
      latitude: "33.775867",
      date: moment().format("YYYY-MM-DD"),
      viewType: "portrait-simple",
      imageUrl: null,
      loading: true,
      status: 'Click the "Generate" button to load the image'
    };
  },
  methods: {
    generate() {
      this.loading = true;
      this.status = "Loading...";

      const url = `${store.apiEndpoint}/api/v2/studio/moon-phase`;

      const params = {
        style: this.style,
        observer: {
          latitude: parseFloat(this.latitude),
          longitude: parseFloat(this.longitude),
          date: moment(this.date).format("YYYY-MM-DD")
        },
        view: {
          type: this.viewType,
          parameters: {}
        }
      };

      const headers = {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Basic ${btoa(`${store.appId}:${store.appSecret}`)}`
      };

      this.setSnippetData("POST", url, params, headers);

      axios.post(url, params, { headers }).then(response => {
        this.imageUrl = response.data.data.imageUrl;
        store.response = JSON.stringify(response.data, null, 2);

        this.loading = false;
      });
    }
  }
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="column column-25">
        <GoBack></GoBack>
        <h3>Search Objects</h3>
        <p>
          This demo page utilizes the `/api/v2/search` endpoint to fetch and
          show data.
        </p>
        <form>
          <fieldset>
            <label>Term</label>
            <input @change="getData" v-model="term" type="text" />
            <label>Match Type</label>
            <select @change="getData" v-model="match_type">
              <option value="fuzzy">Fuzzy</option>
              <option value="exact">Exact</option>
            </select>
          </fieldset>
        </form>
      </div>
      <div class="column column-75">
        <span v-if="loading">Loading...</span>

        <table v-if="!loading">
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Sub Type</th>
            <th>Constellation</th>
            <th>Coordinates</th>
          </tr>
          <tr :key="i" v-for="(item, i) in data">
            <td>{{ item.name }}</td>
            <td>{{ item.type.name }}</td>
            <td><span v-if="item.subType">{{ item.subType.name }}</span></td>
            <td><span v-if="item.position.constellation">{{ item.position.constellation.name }}</span></td>
            <td>
              {{ item.position.equatorial.rightAscension.string }}
              {{ item.position.equatorial.declination.string }}
            </td>
          </tr>
        </table>
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
      store,
      term: "polaris",
      ra: null,
      dec: null,
      loading: true,
      match_type: "fuzzy"
    };
  },
  methods: {
    getData() {
      this.loading = true;

      const url = `${store.apiEndpoint}/api/v2/search`

      const params = {
        term: this.term,
        ra: this.ra,
        dec: this.dec,
        match_type: this.match_type
      }

      const headers = {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Basic ${btoa(`${store.appId}:${store.appSecret}`)}`
      }

      this.setSnippetData('GET', url, params, headers)

      axios.get(url, { params, headers }).then(response => {

        this.data = response.data.data;
        store.response = JSON.stringify(response.data, null, 2);

        this.loading = false;
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="column column-25">
        <GoBack></GoBack>
        <h3>Planetary Positions</h3>
        <p>
          This demo page utilizes the `/api/v2/bodies/positions` endpoint to
          fetch and show data in a table.
        </p>
        <form>
          <fieldset>
            <label>Longitude</label>
            <input @change="getData" v-model="longitude" type="text" />
            <label>Latitude</label>
            <input @change="getData" v-model="latitude" type="text" />
            <label>From Date</label>
            <input @change="getData" v-model="fromDate" type="date" />
            <label>To Date</label>
            <input @change="getData" v-model="toDate" type="date" />
            <label>Time</label>
            <input @change="getData" v-model="time" type="time" />
            <label>Coordinates</label>
            <input
              v-model="coordinates"
              value="equatorial"
              type="radio"
            />Equatorial
            <input
              v-model="coordinates"
              value="horizonal"
              type="radio"
            />Horizonal
          </fieldset>
        </form>
      </div>
      <div class="column column-75">
        <span v-if="loading">Loading...</span>
        <table border="1" v-if="data">
          <tr>
            <th></th>
            <th :key="di" v-for="(date, di) in data.table.header">
              {{ date }}
            </th>
          </tr>
          <tr :key="ri" v-for="(row, ri) in data.table.rows">
            <td>
              {{ row.entry.name }}
            </td>
            <td
              :key="ci"
              v-for="(cell, ci) in row.cells"
              v-if="coordinates == 'equatorial'"
            >
              RA {{ cell.position.equatorial.rightAscension.string }}<br />
              Dec
              {{
                decodeURIComponent(cell.position.equatorial.declination.string)
              }}
            </td>
            <td
              :key="ci"
              v-for="(cell, ci) in row.cells"
              v-if="coordinates == 'horizonal'"
            >
              Alt
              {{ decodeURIComponent(cell.position.horizonal.altitude.string)
              }}<br />
              Az
              {{ decodeURIComponent(cell.position.horizonal.azimuth.string) }}
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
      longitude: "-84.39733",
      latitude: "33.775867",
      elevation: 1,
      fromDate: moment().format("YYYY-MM-DD"),
      toDate: moment().format("YYYY-MM-DD"),
      time: moment().format("HH:mm:ss"),
      data: null,
      loading: true,
      coordinates: "equatorial"
    };
  },
  methods: {
    getData() {
      this.loading = true;

      const url = `${store.apiEndpoint}/api/v2/bodies/positions`;

      const params = {
        longitude: this.longitude,
        latitude: this.latitude,
        elevation: this.elevation,
        from_date: moment(this.fromDate).format("YYYY-MM-DD"),
        to_date: moment(this.toDate).format("YYYY-MM-DD"),
        time: moment(this.time, "HH:mm:ss").format("HH:mm:ss")
      };

      const headers = {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Basic ${btoa(`${store.appId}:${store.appSecret}`)}`
      };

      this.setSnippetData("GET", url, params, headers);

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

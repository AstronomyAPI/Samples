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
            <input @change="get_data" v-model="longitude" type="text" />
            <label>Latitude</label>
            <input @change="get_data" v-model="latitude" type="text" />
            <label>From Date</label>
            <input @change="get_data" v-model="fromDate" type="date" />
            <label>To Date</label>
            <input @change="get_data" v-model="toDate" type="date" />
            <label>Time</label>
            <input @change="get_data" v-model="time" type="time" />
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
              Dec {{ cell.position.equatorial.declination.string }}
            </td>
            <td
              :key="ci"
              v-for="(cell, ci) in row.cells"
              v-if="coordinates == 'horizonal'"
            >
              Alt {{ cell.position.horizonal.altitude.string }}<br />
              Az {{ cell.position.horizonal.azimuth.string }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import mixins from "../mixins.js";
  import GoBack from "./Goback.vue";

  export default {
    mixins: [mixins],
    components: {
      GoBack: GoBack,
    },
    data() {
      return {
        longitude: "-84.39733",
        latitude: "33.775867",
        elevation: 0,
        fromDate: moment().format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),
        time: moment().format("HH:mm:ss"),
        data: null,
        loading: true,
        coordinates: "equatorial",
      };
    },
    methods: {
      get_data() {
        this.loading = true;

        this._callApi("/api/v2/bodies/positions", {
          longitude: this.longitude,
          latitude: this.latitude,
          elevation: this.elevation,
          from_date: moment(this.fromDate).format("YYYY-MM-DD"),
          to_date: moment(this.toDate).format("YYYY-MM-DD"),
          time: moment(this.time, "HH:mm:ss").format("HH:mm:ss"),
        }).then((response) => {
          this.data = response.data.data;

          this.loading = false;
        });
      },
    },
    mounted() {
      this.get_data();
    },
  };
</script>

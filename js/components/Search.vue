<template>
    <div class="container">
        <div class="row">
            <div class="column column-25">
                <GoBack></GoBack>
                <h3>Search Objects</h3>
                <p>
                    This demo page utilizes the `/api/v2/search` endpoint to
                    fetch and show data.
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

                <table>
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
                        <td>{{ item.subType.name }}</td>
                        <td>{{ item.position.constellation.name }}</td>
                        <td>{{ item.position.equatorial.rightAscension.string }}
                            {{ item.position.equatorial.declination.string }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import GoBack from "./GoBack.vue";
import Config from "../config";

export default {
    components: {
        GoBack: GoBack,
    },
    data() {
        return {
            term: "polaris",
            ra: null,
            dec: null,
            loading: true,
            match_type: "fuzzy",
        };
    },
    methods: {
        getData() {
            this.loading = true;
            console.log(Config.apiEndpoint);

            axios
                .get(`${Config.apiEndpoint}/api/v2/search`, {
                    params: {
                        term: this.term,
                        ra: this.ra,
                        dec: this.dec,
                        match_type: this.match_type,
                    },
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        Authorization: `Basic ${btoa(
                            `${Config.appId}:${Config.appSecret}`
                        )}`,
                    },
                })
                .then((response) => {
                    this.data = response.data.data;

                    this.loading = false;
                });
        },
    },
    mounted() {
        this.getData();
    },
};
</script>

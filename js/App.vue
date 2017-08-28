<template>
    <table border="1" v-if="data">
        <tr>
            <th></th>
            <th v-for="date in data.table.header">{{ date }}</th>
        </tr>
        <tr v-for="row in data.table.rows">
            <td>
                {{ row.entry.name }}
            </td>
            <td v-for="cell in row.cells">
                RA {{ cell.position.ra_dec.ra.str }}</br>
                Dec {{ cell.position.ra_dec.dec.str }}
            </td>
        </tr>
    </table>
</template>

<script>
import mixins from './mixins.js';


console.log(mixins);

export default {
    mixins: [mixins],
    data() {
        return {
            data: null
        }
    },
    methods: {

    },
    mounted() {
        this._callApi().then(response => {
            console.log(response)
            this.data = response.data.data;
        })
    }
}
</script>
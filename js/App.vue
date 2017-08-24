<template>
   <table border="1">
        <tr>
            <th></th>
            <th v-for="date in data.dates.list">{{ date }}</th>
        </tr>
        <tr v-for="row in data.rows">
            <td>
                {{ row.columns[0].name }}
            </td>
            <td v-for="column in row.columns">
                RA {{ column.pos.radec.ra.str }}</br>
                Dec {{ column.pos.radec.dec.str }}
            </td>
        </tr>
   </table>
</template>

<script>
import mixins from './mixins.js';


console.log(mixins);

export default {
    mixins:[mixins],
    data() {
        return {
            data:null
        }
    },
    methods: {

    },
    mounted() {
        this._callApi().then(response => {
            this.data = response.data.data;
        })
    }
}
</script>
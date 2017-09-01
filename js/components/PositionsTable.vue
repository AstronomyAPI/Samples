<template>
    <div>
        <GoBack></GoBack>
        <input @change="get_data" v-model="fromDate" type="date">
        <input @change="get_data" v-model="toDate" type="date">
        <input @change="get_data" v-model="time" type="time">
        <span v-if="loading">Loading...</span>
        <table border="1" v-if="data">
            <tr>
                <th></th>
                <th :key="di" v-for="(date, di) in data.table.header">{{ date }}</th>
            </tr>
            <tr :key="ri" v-for="(row, ri) in data.table.rows">
                <td>
                    {{ row.entry.name }}
                </td>
                <td :key="ci" v-for="(cell, ci) in row.cells">
                    RA {{ cell.position.ra_dec.ra.str }}</br>
                    Dec {{ cell.position.ra_dec.dec.str }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import mixins from '../mixins.js';
import GoBack from './Goback.vue'

export default {
    mixins: [mixins],
    components: {
        GoBack: GoBack
    },
    data() {

        return {
            fromDate: moment().format('YYYY-MM-DD'),
            toDate: moment().format('YYYY-MM-DD'),
            time: moment().format('HH:mm:ss'),
            data: null,
            loading: true
        }
    },
    methods: {
        get_data() {
            this.loading = true;

            this._callApi('/positions', {
                lon: '-84.39733',
                lat: '33.775867',
                from_year: moment(this.fromDate).format('YYYY'),
                from_month: moment(this.fromDate).format('MM'),
                from_day: moment(this.fromDate).format('DD'),
                to_year: moment(this.toDate).format('YYYY'),
                to_month: moment(this.toDate).format('MM'),
                to_day: moment(this.toDate).format('DD'),
                hour: moment(this.time, 'HH:mm:ss').format('HH'),
                minute: moment(this.time, 'HH:mm:ss').format('mm')
            }).then(response => {

                this.data = response.data.data;

                this.loading = false;
            })
        }
    },
    mounted() {

        this.get_data()
    }
}
</script>
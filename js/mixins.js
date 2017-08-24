import Config from './config.json';

export default {
    data: {
        _jwt: null
    },
    methods: {
        _authenticate() {

            return new Promise((resolve, reject) => {

                return axios.get(`${Config.api_endpoint}/auth`, {
                    params: {
                        app_id: Config.app_id,
                        app_secret: Config.app_secret
                    }
                }).then(response => {

                    this._jwt = response.data.data.token;

                    resolve();
                })
            })
        },
        _callApi() {

            const ajaxPromise = axios.get(`${Config.api_endpoint}/rise_set_times`, {
                params: {
                    lon: '-84.39733',
                    lat: '33.775867',
                    from_year: '2016',
                    from_month: '12',
                    from_day: '20',
                    to_year: '2016',
                    to_month: '12',
                    to_day: '22'
                }
            });

            if (!this._jwt) {

                return this._authenticate().then(() => {

                    return ajaxPromise;
                })

            } else {

                return ajaxPromise;
            }

        }
    }
}
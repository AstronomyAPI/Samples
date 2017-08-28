import Config from './config.json';

export default {
    data() {
        return {
            _jwt: null
        }
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

                    resolve(this._jwt);
                })
            })
        },
        _callApi(endpoint, params) {

            const ajaxPromise = (token) => {

                return new Promise((resolve, reject) => {

                    axios.get(`${Config.api_endpoint}${endpoint}`, {
                        params: params,
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest',
                            'Authorization': `Bearer ${token}`
                        }
                    }).then(respose => {

                        resolve(respose)
                    })
                })
            };

            if (!this._jwt) {

                return this._authenticate().then((token) => {

                    return ajaxPromise(token);
                })

            } else {

                return ajaxPromise(this._jwt);
            }

        }
    }
}
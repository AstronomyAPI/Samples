import Routes from './routes.js';
import App from './App.vue';

const router = new VueRouter({
    routes: Routes
});

const app = new Vue({
    router: router,
    components: {
        App: App
    },
    el: '#app'
});

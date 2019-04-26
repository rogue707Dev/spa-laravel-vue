require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { routes } from './routes';
import StoreData from './store';
import MainApp from './components/MainComponent.vue';
import { initialize } from './helpers/general';

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store(StoreData);

const router = new VueRouter({
    routes,
    mode: 'history'
});

initialize(store, router);


window.Vue = require('vue');

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        MainApp
    }
});
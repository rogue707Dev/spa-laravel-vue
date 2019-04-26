require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { routes } from './routes';
import StoreData from './store';
import MainApp from './components/MainComponent.vue';


Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store(StoreData);

const router = new VueRouter({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    const requireAuth = to.matched.some(record => record.meta.requireAuth);
    const currentUser = store.state.currentUser;

    if (requireAuth && !currentUser) {
        next('/login');
    } else if (to.path == '/login' && currentUser) {
        next('/');
    } else {
        next();
    }
});

window.Vue = require('vue');

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        MainApp
    }
});
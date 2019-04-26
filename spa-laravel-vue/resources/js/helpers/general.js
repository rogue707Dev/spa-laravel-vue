export function initialize(store, router) {
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
    
    axios.interceptors.response.use(null, (error) => {
        if(error.response.status == 401) {
            store.commit('logout');
            router.push('/login');
        }

        return Promise.reject(error);
    });

    axios.defaults.headers.common["Authorization"] = `Bearer ${store.getters.currentUser.token}`
    
}
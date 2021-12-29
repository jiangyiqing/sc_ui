import Vue from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import router from "./router"
import store from "./store"
import OwUI from "overwatch-ui"
import "overwatch-ui/dist/overwatch-ui.css"
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(OwUI)
Vue.use(OwUI.plugins.$owAlert)
Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$api = process.env.VUE_APP_API_ENDPOINT;
Vue.use(VueAxios, axios);

new Vue({
  components: {
    ...OwUI.Components
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app")

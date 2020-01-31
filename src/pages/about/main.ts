import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import VueResource from "vue-resource"

import App from './App.vue'

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueResource);

new Vue({
  vuetify: new Vuetify(),

  data() {
    return {
      locale: "en"
    }
  },

  mounted() {
    const rus: string[] = ["ru", "be", "uk", "lt", "hy", "kk"];

    this.locale = rus.includes(navigator.language) ? "ru" : "en";
  },

  render: h => h(App)
})
.$mount("#app");

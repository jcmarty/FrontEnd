import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import vOutsideEvents from 'vue-outside-events';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/style.css';
import './assets/css/font-awesome.min.css';
import Vuelidate from 'vuelidate';


Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(vOutsideEvents);
Vue.use(Vuelidate);


new Vue({
  router,
  store,
  render: h => h(App),
  provide: function(){
    return{
      eventBus: new Vue()
    }
  }
}).$mount("#app");

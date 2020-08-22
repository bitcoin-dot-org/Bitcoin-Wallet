
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import '@spectrum-css/vars/dist/spectrum-global.css'
import '@spectrum-css/vars/dist/spectrum-medium.css'
import '@spectrum-css/vars/dist/spectrum-light.css'
import '@spectrum-css/page/dist/index-vars.css'
import '@spectrum-css/button/dist/index-vars.css'
import '@spectrum-css/card/dist/index-vars.css'
import '@spectrum-css/alert/dist/index-vars.css'
import '@spectrum-css/tags/dist/index-vars.css'
import '@spectrum-css/textfield/dist/index-vars.css'
import '@spectrum-css/tabs/dist/index-vars.css'
import '@spectrum-css/table/dist/index-vars.css'
import '@spectrum-css/pagination/dist/index-vars.css'
import '@spectrum-css/statuslight/dist/index-vars.css'
import '@spectrum-css/dialog/dist/index-vars.css'

import '@spectrum-web-components/dropdown/sp-dropdown.js'

import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';

Vue.use(VueAxios, axios)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
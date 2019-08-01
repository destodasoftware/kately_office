import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueBarcodeScanner from 'vue-barcode-scanner'
import vueDebounce from 'vue-debounce'

let options = {
  sound: true,
  soundSrc: '/static/sound.wav',
  sensitivity: 300
}

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(VueBarcodeScanner, options)
Vue.use(vueDebounce)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

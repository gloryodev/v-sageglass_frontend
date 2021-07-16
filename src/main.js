import Vue from 'vue'

import * as VueGoogleMaps from 'vue2-google-maps'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import ToggleButton from 'vue-js-toggle-button'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

import App from './App.vue'
import router from './router'
import store from './store'
// app.js

Vue.config.productionTip = false

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.use(ToggleButton)
Vue.use(VueMoment, {
  moment
})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDAjb-rBbnqQPZhcSlNlRz7_6p2CbgNJGk',
    libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
    // If you want to set the version, you can do so:
    // v: '3.26',
  }
  // If you intend to programmatically custom event listener code
  // (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  // instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  // you might need to turn this on.
  // autobindAllEvents: false,
  // If you want to manually install components, e.g.
  // import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  // Vue.component('GmapMarker', GmapMarker)
  // then disable the following:
  // installComponents: true,
})

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

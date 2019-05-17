
import Vue from 'vue'
import App from './App'
import router from './router.js'

import '@/style/flexable.less'

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 全局
import './styles/index.less'
// axios配置
import http from './utils/request'
Vue.use(ElementUI)
Vue.prototype.$http = http
// 事件总线
Vue.prototype.$eventBus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

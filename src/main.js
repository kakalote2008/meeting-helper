import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import addTime from './components/addTime.vue'
import show from './components/show.vue'
import predict from './components/predict.vue'


Vue.use(ElementUI,{ size: 'large' })
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.http.options.emulateJSON = true;

const routes = [
  { path: '/', component: addTime },
  { path: '/addTime', component: addTime },
  { path: '/show', component: show },
  { path: '/predict', component: predict }
]

//global.host = 'http://127.0.0.1:8081';
 global.host = 'http://118.190.90.35:8081';

const router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  router,  // 注入到根实例中
  render: h => h(App)
})


import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store';

Vue.config.productionTip = false

//App컴포넌트에서 store객체를 사용할 수 있도록 주입(injection)해주기
new Vue({
  render: h => h(App),
  store
}).$mount('#app')

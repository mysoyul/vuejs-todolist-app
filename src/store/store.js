import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import todo from './modules/todo';
import post from './modules/post';

//Vue에서 Vuex라는 외부라이브러리를 사용하겠다
Vue.use(Vuex);
//순서가 바뀌면 않됩니다
Vue.use(VueAxios, axios);

export const store = new Vuex.Store({
    modules:{
        todo,
        post        
    }
});

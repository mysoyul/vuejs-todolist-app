import Vue from 'vue';
import Vuex from 'vuex';

//Vue에서 Vuex라는 외부라이브러리를 사용하겠다
Vue.use(Vuex);

const storage = {
    fetch() {
        const arr = [];
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            }
        }
        return arr;
    },
};

export const store = new Vuex.Store({
    //상태변수선언
    state: {
        todoItems: storage.fetch()
    },
    //상태변수를 변경하는 setter method 선언
    mutations: {
        addTodo(state, todoItemText) {
            var obj = { completed: false, item: todoItemText };
            //JSON.stringify는 object를 json string 으로 변환
            localStorage.setItem(todoItemText, JSON.stringify(obj));
            state.todoItems.push(obj);
        },//addTodo
        removeTodo(state, payload) {
            const { todoItem, index } = payload;
            localStorage.removeItem(todoItem.item);
            state.todoItems.splice(index, 1);
        },

    },

});

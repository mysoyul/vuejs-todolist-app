import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

//Vue에서 Vuex라는 외부라이브러리를 사용하겠다
Vue.use(Vuex);
//순서가 바뀌면 않됩니다
Vue.use(VueAxios, axios);

const api_url = 'http://localhost:4500/api/todos';

export const store = new Vuex.Store({
    //상태변수선언
    state: {
        todoItems: []
    },
    //서버와 비동기 통신을 하는 method 선언
    actions: {
        loadTodoItems(context) {
            axios.get(`${api_url}`)
                .then(res => res.data)
                .then(todo_data => context.commit('setTodoItems', todo_data))
                .catch(error => console.log('Error occurred ' + error));
        },
        removeTodo(context, payload) {
            axios.delete(`${api_url}/${payload.id}`)
                .then(res => res.data)
                .then(todo_data => context.commit('setTodoItems', todo_data))
                .catch(error => console.log('Error occurred ' + error));
        },

    },
    //상태변수를 변경하는 setter method 선언
    mutations: {
        setTodoItems(state, items) {
            state.todoItems = items;
        },
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
        },//removeTodo
        toggleTodo(state, payload) {
            //객체 비구조화 할당(destructuring assignment)
            const { todoItem, index } = payload;
            const { item, completed } = todoItem;
            state.todoItems[index].completed = !completed;
            //localStorage에 updateItem 메서드가 없어서 removeItem하고 setItem 한다.
            localStorage.removeItem(item);
            localStorage.setItem(item, JSON.stringify(todoItem));
        },//toggleTodo
        clearTodo(state) {
            localStorage.clear();
            state.todoItems = [];
        },
    },//mutations
    //상태변수를 조회하는 getter method 선언
    getters: {
        getTodoItems(state) {
            return state.todoItems;
        }
    }//getters
});

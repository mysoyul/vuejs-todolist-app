import axios from 'axios';

const api_url = process.env.VUE_APP_APIURL;
const todo_url = `${api_url}/api/todos`;
//'http://localhost:4500/api/todos';

//상태변수선언
const state = {
    todoItems: []
};//state

//서버와 비동기 통신을 하는 method 선언
const actions = {
    loadTodoItems(context) {
        axios.get(`${todo_url}`)
            .then(res => res.data)
            .then(todo_data => context.commit('setTodoItems', todo_data))
            .catch(error => console.log('Error occurred ' + error));
    },
    removeTodo(context, payload) {
        axios.delete(`${todo_url}/${payload.id}`)
            .then(res => res.data)
            .then(todo_data => context.commit('setTodoItems', todo_data))
            .catch(error => console.log('Error occurred ' + error));
    },
    addTodo(context, payload) {
        axios.post(`${todo_url}`, payload)
            .then(res => res.data)
            .then(todo_data => context.commit('setTodoItems', todo_data))
            .catch(error => console.log('Error occurred ' + error));
    },//addTodo
    toggleTodo(context, payload) {
        axios.patch(`${todo_url}/${payload.id}`, payload)
            .then(res => res.data)
            .then(todo_data => context.commit('setTodoItems', todo_data))
            .catch(error => console.log('Error occurred ' + error));
    },//toggleTodo
    clearTodo(context) {
        axios.delete(`${todo_url}`)
            .then(res => res.data)
            .then(todo_data => context.commit('setTodoItems', todo_data))
            .catch(error => console.log('Error occurred ' + error));
    }
};//actions

//상태변수를 변경하는 setter method 선언
const mutations = {
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
};//mutations

//상태변수를 조회하는 getter method 선언
const getters = {
    getTodoItems(state) {
        return state.todoItems;
    }
};//getters

export default {
    state, actions, mutations, getters
};
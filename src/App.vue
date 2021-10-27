<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput @addEvent="addTodo"></TodoInput>
    <TodoList
      :todo-list="todoItems"
      @removeEvent="removeTodo"
      @toggleEvent="toggleTodo"
    ></TodoList>
    <TodoFooter @clearEvent="clearTodo"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
  },
  data() {
    return {
      todoItems: [],
    };
  },
  methods: {
    addTodo(todoItemText) {
      var obj = { completed: false, item: todoItemText };
      //JSON.stringify는 object를 json string 으로 변환
      localStorage.setItem(todoItemText, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeTodo(todoItem, index) {
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
    toggleTodo(todoItem, index) {
      //객체 비구조화 할당(destructuring assignment)
      const { item, completed } = todoItem;
      this.todoItems[index].completed = !completed;
      //todoItem.completed = !todoItem.completed;
      //localStorage에 updateItem 메서드가 없어서 removeItem하고 setItem 한다.
      localStorage.removeItem(item);
      localStorage.setItem(item, JSON.stringify(todoItem));
    },
    clearTodo() {
      localStorage.clear();
      this.todoItems = [];
    },
  },
  /* life cycle method */
  created() {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          //console.log(typeof localStorage.getItem(localStorage.key(i)));
          //console.log( JSON.parse(localStorage.getItem(localStorage.key(i))) );
          //JSON.parse()는 json string을 object로 변환
          const todoObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
          this.todoItems.push(todoObj);
        }
      }
    }
  },
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>

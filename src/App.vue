<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput></TodoInput>
    <TodoList
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

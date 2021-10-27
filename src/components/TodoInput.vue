<template>
    <div class="inputBox shadow">
        <input type="text" ref="newTodoItem" v-model="newTodoItem" v-on:keyup.enter="addTodo">
        <span class="addContainer" v-on:click="addTodo">
            <i class="fas fa-plus addBtn"></i>
        </span>
        <!-- <button @click="addTodo">add</button> -->
    </div>
</template>

<script>
export default {
    data:function() {
        return {
            newTodoItem: ""
        }
    },
    //LifeCycle Method
    //$refs는 document.getElementById(id) 함수처럼 html dom에 직접 접근할 때 사용되는 객체
    //ref="newTodoItem"의 ref 속성은 기존의 id 속성과 동일한 속성이다
    mounted() {
      this.$refs.newTodoItem.focus();
    },
    //사용자가 정의하는 메서드는 methods 속성의 객체 내부에 선언한다
    methods:{
        addTodo() {
            if (this.newTodoItem !== '') {
                this.$store.commit('addTodo', this.newTodoItem);
                this.clearInput();
            }
        },
        clearInput() {
            //addTodo() 함수에 있었지만 clearInput()함수로 이동            
            this.newTodoItem = '';
        }
    }
}
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 15px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478FB, #8763FB);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
</style>

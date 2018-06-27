// import Vue from 'vue'
// import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'

// import app from './modules/app'

// Vue.use(Vuex)

// const store = new Vuex.Store({
// 	strict: true,  // process.env.NODE_ENV !== 'development',
//   	actions,
//   	getters,
//   	modules: {
//     	app
//   	},
//   	mutations: {
//   	}
// })

// export default store

import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    todos:[],
  },

  getters:{
    todoCount(state){
      return state.todos.length;
    }
  },

  mutations:{
    addTodo(state, todo){
      state.todos.push(todo);
    },

    delTodo(state, index){
      state.todos.splice(index, 1);
    }
  },

  actions:{
    addTodo(context, todo){
      if(todo.value != ""){
        context.commit("addTodo", todo);
      }
    },

    //参数解构赋值
    delTodo({commit}, index){
      commit("delTodo", index);
    }
  },

  modules:{}
});

export default store;
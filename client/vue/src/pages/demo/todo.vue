<template>
    <div id="app">
		<h1>Todo</h1>z
		<todoInput />
		<todoList />
		<p>todo数量：{{todoCount}}</p>
    </div>
</template>

<script>
import todoInput from '../../components/input.vue';
import todoList from '../../components/list.vue';
import {mapGetters} from "vuex";
export default {
	name: 'app',

	components:{
	    todoInput,
	    todoList
	},

	data () {
	    return {

	    }
	},
	computed:{
	    ...mapGetters({
			todoCount:"todoCount"      //映射Getter
	    })
	}
  }
</script>
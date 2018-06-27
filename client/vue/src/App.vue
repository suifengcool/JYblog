<template>
    <div id="app">
        <Header v-if="showHeader"></Header>
		<router-view/>
    </div>
</template>

<script>
import Header from './components/Header'
export default {
    name: 'App',

    components: {
        Header
    },

    data() {
    	return{

    	}
    },

    computed: {
    	showHeader: function(){
    		let arr = ['/','/demo','/componet','/about','']
    		let showHeader = arr.indexOf(this.$route.path) >= 0 ? true : false
			return showHeader
    	}
    },

    created(){
    }
}
</script>

<style lang="sass" scoped>
    #app
        height: 100%
</style>

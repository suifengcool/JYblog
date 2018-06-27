<template>
    <div class="layoutHome">
        <NavBar></NavBar>
        <router-view></router-view>
    </div>
</template>

<script>
import NavBar from './NavBar.vue'
export default{
    name: 'layoutHome',
    components: { NavBar },
    data(){
        return {

        }    
    }
}
</script>

<style lang="sass" scoped>
.layoutHome
    position: absolute
    display: flex
    flex-direction: column
    width: 100%
    height: 100%
h3
    text-align: center
a 
    color: green
    padding: 30px
</style>
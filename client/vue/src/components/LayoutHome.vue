<template>
    <div class="layoutHome">
        <Header></Header>
        <router-view></router-view>
    </div>
</template>

<script>
import Header from './Header.vue'
export default{
    name: 'layoutHome',
    components: { Header }
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
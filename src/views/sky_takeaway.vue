<script setup>
import { ref } from 'vue'
import router from '@/router/index.js'


</script>


<template>
<div class="home">
    这是主页
    <router-link to='/ulogin'><button >点我去登陆</button></router-link>
    <router-link to='/menu'><button >点我去shopping</button></router-link>
    <router-link to='/cart'><button >点我去cart</button></router-link>
    <router-link to='/controller'><button >点我去个人中心</button></router-link>
</div>



</template>


<style scoped>
.home{

    position: relative;
    width: 100vh;
    left: 42vw;
    top: 40vh;
    background-color: antiquewhite;
}
</style>
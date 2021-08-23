<template>
  <div id="app">
    <div id="nav" class="bg-red-400 font-mono text-center p-8 mb-2">
      <p class="text-3xl inline-block m-2"><router-link to="/">網路點餐</router-link></p>
<!--      <p class="text-3xl inline-block m-1"><font-awesome-icon :icon="['fab', 'facebook']" /> | </p>-->
<!--      <p class="text-3xl inline-block m-1"><font-awesome-icon :icon="['fab', 'instagram']" /></p>-->
    </div>
    <router-view/>
  </div>
</template>
<script>
import {
  library
}
  from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faMinus, faPaperPlane
}
  from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook, faInstagram
} from '@fortawesome/free-brands-svg-icons'
library.add(faPlus, faMinus, faPaperPlane, faFacebook, faInstagram)
export default {
}
</script>
<style>
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*}*/

/*#nav {*/
/*  padding: 30px;*/
/*}*/

/*#nav a {*/
/*  font-weight: bold;*/
/*  color: #2c3e50;*/
/*}*/

/*#nav a.router-link-exact-active {*/
/*  color: #42b983;*/
/*}*/
/*#nav > * {*/
/*  font-size: 25px;*/
/*}*/
</style>

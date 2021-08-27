<template>
  <div class="flex flex-col justify-center items-center h-auto bg-gray-300	lg:flex-row">
    <button class="m-2 text-2xl p-1  lg:mx-10">
      <font-awesome-icon :icon="['fab', 'facebook']"/>
      <p>Facebook</p>
    </button>
    <button class="m-2 text-2xl p-1  lg:mx-10">
      <font-awesome-icon :icon="['fab', 'instagram']"/>
      <p>Instagram</p>
    </button>
    <button class="m-2 text-2xl p-1  lg:mx-10">
      <font-awesome-icon :icon="['fab', 'line']"/>
      <p>Line</p>
    </button>
    <button class="m-2 text-2xl p-1  lg:mx-10">
      <p class="text-black font-semibold">Uber</p>
      <p class="text-green-500 font-semibold">Eats</p>
    </button>
  </div>
</template>
<script>
import {
  library
}
  from '@fortawesome/fontawesome-svg-core'
import {
  faFacebook, faInstagram, faLine
} from '@fortawesome/free-brands-svg-icons'
library.add(faFacebook, faInstagram, faLine)

export default {
  name: "Footer.vue"
}
</script>

<style scoped>

</style>
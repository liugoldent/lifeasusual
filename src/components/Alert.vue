<template>
  <div class="fixed w-full h-full flex bg-opacity-90 items-center bg-blue-500 text-white text-sm font-bold justify-center z-20" role="alert">
    <div class="bg-white w-1/2 h-auto rounded-lg border flex flex-col justify-center items-center">
      <font-awesome-icon icon="check-circle" class="text-green-700 text-5xl m-3"/>
      <p class="text-center text-2xl m-2 text-black">{{ showMsg }}</p>
    </div>
  </div>
</template>
<script>

import {
  library
}
  from '@fortawesome/fontawesome-svg-core'
import {
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle)


export default {
  name: "Alert.vue",
  methods: {

  },
  props: {
    showMsg: String
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>

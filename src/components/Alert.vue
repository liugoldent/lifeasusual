<template>
  <div class="fixed w-full h-full flex bg-opacity-90 items-center bg-blue-500 text-white text-sm font-bold justify-center z-20" role="alert">
    <div class="bg-white w-1/2 h-auto rounded-lg border flex flex-col justify-center items-center">
      <font-awesome-icon v-if="alertIconPassOrNot" icon="check-circle" class="text-green-700 text-5xl m-3"/>
      <font-awesome-icon v-else icon="times-circle" class="text-red-700 text-5xl m-3"/>
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
  faCheckCircle, faTimesCircle
} from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle, faTimesCircle)


export default {
  name: "Alert.vue",
  methods: {

  },
  props: {
    showMsg: String,
    alertIconPassOrNot: Boolean
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>

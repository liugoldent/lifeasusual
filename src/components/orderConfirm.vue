<template>
  <div class="fixed w-full h-full bg-gray-500 bg-opacity-80 flex flex-col justify-center items-center z-20">
    <div class="bg-white w-1/2 h-auto rounded-lg">
      <div class="m-4">
        <p class="text-xl leading-6 font-medium text-gray-900">您訂購的餐點為</p>
      </div>
      <div class="m-4">
        <ul class="list-disc list-inside bg-rose-200">
          <li v-for="(item, index) in clientNeedOrderItems" class="m-2" :key="index">
            <p class="text-red-500 font-bold inline-block">{{ item.orderCount }}</p>
            <p class="text-red-500 font-bold inline-block">{{ item.unit }}</p> -
            <p class="text-blue-500 inline-block">{{ item.name }}</p>
          </li>
        </ul>
      </div>
      <div class="flex flex-row justify-center items-center m-3">
        <button
          class="mt-3 w-full inline-flex justify-center rounded-md border
          border-gray-300 shadow-sm px-4 py-2 bg-red-400 text-base font-medium text-gray-700
          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2
          focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="closeDialog('cancel')">
          取消
        </button>
        <button
          class="mt-3 w-full inline-flex justify-center rounded-md border
          border-gray-300 shadow-sm px-4 py-2 bg-green-400 text-base font-medium text-gray-700
          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2
          focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="closeDialog('ok')">
          確認
        </button>
      </div>
    </div>
  </div>
</template>
<script>

import {
  library
}
  from '@fortawesome/fontawesome-svg-core'
import {
  faExclamation
} from '@fortawesome/free-solid-svg-icons'

library.add(faExclamation)


export default {
  name: "orderConfirm.vue",
  methods: {
    closeDialog(msg) {
      this.$emit('closeDialog', msg)
    }
  },
  props:{
    clientNeedOrderItems: []
  },
  mounted(){
    console.log(this.clientNeedOrderItems)
  }
}
</script>

<style scoped>

</style>

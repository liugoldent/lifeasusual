<template>
  <div class="w-full bg-opacity-50 font-mono text-center p-8 mb-2" :class="bgColor">
    <p class="text-3xl inline-block m-2">
      {{ title }}
    </p>
  </div>
</template>

<script>
export default {
  name: "NavComp.vue",
  props: {
    title: String,
    bgColor: String
  }
}
</script>

<style scoped>

</style>
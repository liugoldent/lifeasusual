<template>
  <div id="app">
    <router-view v-if="isShow"/>
    <Footer/>
  </div>
</template>
<script>
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Footer
  },
  data() {
    return {
      isShow: true
    }
  },
  provide()
  {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload(){
      this.isShow = false
      this.$nextTick(()=>{
        this.isShow = true
      })
    }
  }
}
</script>
<style>
</style>

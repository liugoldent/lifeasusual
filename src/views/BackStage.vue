<template>
  <div class="flex flex-col justify-center items-center">
    <NavComp title="如常朝午食 餐點狀況" bgColor="bg-blue-600"></NavComp>
    <table class="table-fixed border-separate p-3">
      <thead>
      <tr>
        <th class="w-1/2 border border-green-600">Title</th>
        <th class="w-1/4 border border-green-600">Author</th>
        <th class="w-1/4 border border-green-600">Views</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="border border-green-600">Intro to CSS</td>
        <td class="border border-green-600">Adam</td>
        <td class="border border-green-600">858</td>
      </tr>
      <tr class="bg-emerald-200">
        <td class="border border-green-600">A Long and Winding Tour of the History of UI Frameworks and Tools and the
          Impact on Design
        </td>
        <td class="border border-green-600">Adam</td>
        <td class="border border-green-600">112</td>
      </tr>
      <tr>
        <td class="border border-green-600">Intro to JavaScript</td>
        <td class="border border-green-600">Chris</td>
        <td class="border border-green-600">1,280</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getGoogleSheetDataPublicJS } from '@/publicItemJS/getGoogleSheet'
import NavComp from '@/components/NavComp'
export default {
  name: "BackStage.vue",
  async mounted() {
    await this.getGoogleSheetData()
  },
  components: {
    NavComp
  },
  data(){
    return {
      itemStatus: {}
    }
  },
  methods: {
    /**
     * @description 得到google 雲端資料
     * @returns {Promise<void>}
     */
    async getGoogleSheetData(){
      this.setItemsToObj(await getGoogleSheetDataPublicJS())
    },
    /**
     * @description 將拿回來的資料轉成物件
     */
    setItemsToObj(cbData){
      console.log(cbData)
    }
  }
}
</script>

<style scoped>

</style>
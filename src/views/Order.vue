<template>
  <div class="flex flex-col bg-gradient-to-t from-gray-100 text-center">
    <loading :active="isLoading"
             :can-cancel="false"
             :on-cancel="onCancel"
             :is-full-page="true"/>
    <NavComp title="網路點餐" bgColor="bg-red-600"></NavComp>
    <!-- 客人資訊 -->
    <div class="flex lg:flex-row flex-col justify-center items-center">
      <div class="flex flex-col">
        <div class="m-2 lg:m-12">
          <p class="text-lg font-black text-blue-900">
            訂購人稱呼/訂購人姓名:
          </p>
          <input class="border placeholder-opacity-50 text-center" placeholder="先生/小姐" type="text" v-model="name"/>
        </div>
        <div class="m-2 lg:m-12">
          <p class="text-lg font-black text-blue-900">
            訂購人電話
          </p>
          <input class="border placeholder-opacity-50 text-center text-blue-900" placeholder="09123456789" type="text"
                 v-model="phone"/>
        </div>
      </div>

      <div class="m-2 lg:m-12">
        <p class="text-lg font-black text-blue-900">
          取餐日期
        </p>
        <div>
          <date-picker v-model="orderDate" mode="dateTime" :timezone="timeZone" is24hr/>
        </div>
      </div>

      <div class="m-2 lg:m-12">
        <p class="text-lg font-black text-blue-900">
          備註:
        </p>
        <input class="border placeholder-opacity-50 text-center" placeholder="去冰/醬少..." type="text" v-model="name"/>
      </div>
    </div>
    <!-- 商品頁面 -->
    <div class="w-screen flex flex-row justify-around flex-wrap">
      <div v-for="(item,index) in itemsContent" :key="index"
           class="w-auto lg:w-4/12 bg-gradient-to-t from-red-50 m-5 p-5 rounded-lg flex-col flex justify-center items-center">
        <!-- 圖片與敘述 -->
        <div v-if="item.img.length > 0" class="flex flex-col justify-center items-center">
          <img src="https://picsum.photos/800/500">
          <p class="m-1">
            {{ item.narrate }}
          </p>
        </div>
        <!-- 品名、價錢、點餐數量 -->
        <div class="flex flex-col items-center">
          <div>
            <p class="m-2 text-2xl">
              {{ item.name }}
            </p>
            <p class="m-2 text-2xl">
              NT：{{ item.price }}
            </p>
          </div>
          <div class="flex flex-row justify-center items-center w-full">
            <div v-if="item.soldOutStatus === 'v'">
              <button class="m-2 text-2xl" @click="orderDecrease(item,index)">
                <font-awesome-icon icon="minus"/>
              </button>
              <input class="rounded-lg h-9 m-2 text-center w-1/2 border-black border" :value="item.orderCount"/>
              <button class="m-2 text-2xl" @click="orderIncrease(item,index)">
                <font-awesome-icon icon="plus"/>
              </button>
            </div>
            <div v-else>
              <p class="m-2 text-4xl text-red-600	border-double border-4 border-blue-700 p-5 animate-pulse">Sold
                Out</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 送出按鈕 -->
    <div class="flex justify-around m-5">
      <button @click="openConfirmDialog()" class="h-auto w-auto bg-blue-50 rounded-lg text-4xl p-5">送出
        <font-awesome-icon icon="paper-plane"/>
      </button>
    </div>
    <!--    confirm 視窗-->
    <confirm v-if="confirmDialogStatus" @closeDialog="closeConfirm" :clientNeedOrderItems="clientOrderItems"/>
    <!--    alert 視窗-->
    <alert v-if="alertDialogStatus" :showMsg="alertMsg"/>
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
import $ from 'jquery'
import NavComp from '@/components/NavComp'


library.add(faPlus, faMinus, faPaperPlane)
import {getGoogleSheetDataPublicJS} from '@/publicItemJS/getGoogleSheet'

export default {
  name: "Order",
  async mounted() {
    this.isLoading = true
    await this.getGoogleSheetData()
    this.isLoading = false
  },
  data() {
    return {
      itemsContent: [], // 三明治的餐點
      orderDate: new Date(), // 點餐日期&時間
      timeZone: '', // 時區
      name: '', // 客戶名稱
      phone: '', // 客戶電話
      remark: '', // 客戶備註

      isLoading: false, // 是否正在loading
      soldOutStatus: [], // 售完狀況
      confirmDialogStatus: false, // 開關confirm的dialog
      clientOrderItems: [], // 客人想要點的餐點（陣列）
      alertDialogStatus: false, // alert 視窗 開啟
      alertMsg:'預定完成，我們將儘速為您準備餐點' // alert 訊息
    }
  },
  watch: {},
  components: {
    NavComp
  },
  methods: {
    /**
     * 發送資料給google excel
     */
    async postGoogleSheetData() {
      const self = this
      self.isLoading = true
      await $.ajax({
        type: "post",
        url: "https://script.google.com/macros/s/AKfycbytQm3cq7KYye607UbMzQzscAZFe0bvOvTEDlmu2JK8f1nh9anpIxcWaiFNPMLuniQbcw/exec",
        data: {
          order_time: 3,
          order_no: 2,
          order_pay: 4,
          order_name: 5,
          order_phone: 6,
          order_email: 7,
          order_address: 8,
          order_invoice: 9,
          order_ps: 90,
        },
        success: function (response) {
          if (response == "成功") {
            self.isLoading = false
            self.alertDialogStatus = true
          }
          setTimeout(()=>{
            self.alertDialogStatus = false
          },2000)
        },
      });
    },
    /**
     * 得到google的資料
     */
    async getGoogleSheetData() {
      this.setSoldOutStatus(await getGoogleSheetDataPublicJS())
    },
    /**x
     * 設定產品資訊（將string 轉成 array）
     */
    setSoldOutStatus(itemsFormat) {
      try {
        const startColumn = +itemsFormat.slice(2, 4) // 取出起始column
        const endRow = +itemsFormat.slice(4, 6) // 取出結束列
        const endColumn = +itemsFormat.slice(6, 8) // 取出結束行
        let lsItemsFormat = itemsFormat.substr(8, itemsFormat.length) // 將起始與結束列行的字串資料刪掉
        let laItemsFormat = lsItemsFormat.split(',') // 開始切字串(切成只有產品資訊)
        let itemArray = []
        for (let i = 1, len = endColumn - startColumn; i <= len; i++) {
          let tempObj = {}
          for (let j = 0, lenj = endRow; j < lenj; j++) {
            tempObj[laItemsFormat[endColumn * j]] = laItemsFormat[j * endColumn + i]
          }
          itemArray.push(tempObj)
        }
        this.itemsContent = Object.assign(itemArray)
      } catch (e) {
        console.log(e)
      }
    },
    /**
     * @description 點餐份數增加
     * @param item 點到的產品
     * @param index 點到的index
     */
    orderIncrease(item, index) {
      let cloneItem = item
      cloneItem.orderCount++
      this.$set(this.itemsContent, index, cloneItem)
    },
    /**
     * @description 點餐份數減少
     * @param item 點到的產品
     * @param index 點到的index
     */
    orderDecrease(item, index) {
      let cloneItem = item
      cloneItem.orderCount--
      if (cloneItem.orderCount < 0) {
        cloneItem.orderCount = 0
      }
      this.$set(this.itemsContent, index, cloneItem)
    },
    /**
     * @description 關閉confirm視窗
     */
    async closeConfirm(msg) {
      if (msg === 'ok') {
        await this.postGoogleSheetData()
      }
      this.confirmDialogStatus = false
    },
    onCancel() {
      console.log('User cancelled the loader.')
    },
    /**
     * @description 開啟confirm 視窗
     */
    openConfirmDialog() {
      this.clientOrderItems = this.itemsContent.reduce((accumulator, currentValue) => {
        if (+currentValue.orderCount > 0) {
          accumulator.push(currentValue)
        }
        return accumulator
      }, [])
      this.confirmDialogStatus = true
    }
  },
};

</script>

<template>

  <div class="flex flex-col bg-gradient-to-t from-gray-100 text-center">
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
      <div v-for="(item,index) in sandwichContent" :key="index"
           class="w-auto lg:w-4/12 bg-gradient-to-t from-red-50 m-5 p-5 rounded-lg flex-col flex justify-center items-center">
        <!-- 圖片與敘述 -->
        <div class="flex flex-col justify-center items-center">
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
          <div class="flex flex-row justify-center items-center">
            <div v-if="item.soldOutStatus === 'v'">
              <button class="m-2 text-2xl">
                <font-awesome-icon icon="minus"/>
              </button>
              <input class="rounded-lg h-9 m-2"/>
              <button class="m-2 text-2xl">
                <font-awesome-icon icon="plus"/>
              </button>
            </div>
            <div v-else>
              <p class="m-2 text-4xl text-red-600	border-double border-4 border-blue-500 p-5 animate-pulse">Sold Out</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 送出按鈕 -->
    <div class="flex justify-around m-5">
      <button @click="postGoogleSheetData()" class="h-auto w-auto bg-blue-50 rounded-lg text-4xl p-5">送出
        <font-awesome-icon icon="paper-plane"/>
      </button>
    </div>
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
import menu from '@/menu/menu.json'
import $ from 'jquery'

library.add(faPlus, faMinus, faPaperPlane)

export default {
  name: "Order",
  async mounted() {
    await this.getGoogleSheetData()
    this.setAllItemsOnView()
  },
  data() {
    return {
      orderPageMenu: {}, // 如常朝午食 餐點
      sandwichContent: [], // 三明治的餐點
      drinkContent: [], // 飲品的餐點
      orderDate: new Date(), // 點餐日期&時間
      timeZone: '', // 時區
      name: '', // 客戶名稱
      phone: '', // 客戶電話
      remark: '', // 客戶備註

      soldOutStatus: [] // 售完狀況
    }
  },
  components: {},
  methods: {
    /**
     * 發送資料給google excel
     */
    postGoogleSheetData() {
      $.ajax({
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
            alert("成功::::");
          }
        },
      });
    },
    /**
     * 得到google的資料
     */
    async getGoogleSheetData() {
      const self = this
      let parameter = {
        url: 'https://docs.google.com/spreadsheets/d/1pHB6t2SOqGyMf1S4rcmawDbGJ3MLliUAcRgGjPdIX44/edit#gid=0',
        name: '商品銷售狀況',
        startRow: 1,
        startColumn: 1
      };
      await $.get('https://script.google.com/macros/s/AKfycbytQm3cq7KYye607UbMzQzscAZFe0bvOvTEDlmu2JK8f1nh9anpIxcWaiFNPMLuniQbcw/exec', parameter, function (data) {
        if (!data) {
          console.log('無資料');
        } else {
          console.log(data)
          self.setSoldOutStatus(data)
        }
      });
    },
    /**
     * 設定售完資訊（將string 轉成 array）
     */
    setSoldOutStatus(itemsFormat) {
      let laItemsFormat = itemsFormat.split(',')
      const lnItemsLength =  laItemsFormat.length
      for(let i = 0 , len = lnItemsLength/2 ; i < len;  i++){
        this.soldOutStatus.push({
          name: laItemsFormat[i],
          soldOutStatus: laItemsFormat[i+len]
        })
      }
      console.log(laItemsFormat)
    },
    /**
     * 設定畫面上顯示的資料（包含sold out 資訊）
     */
    setAllItemsOnView(){
      this.orderPageMenu = menu
      this.sandwichContent = this.orderPageMenu['sandwich']
      this.drinkContent = this.orderPageMenu['drink']
      for(let i = 0 , len = this.sandwichContent.length ; i < len ; i++){
        for(let j = 0 , lenj = this.soldOutStatus.length ; j < lenj ; j++){
          if(this.sandwichContent[i].name === this.soldOutStatus[j].name){
            this.sandwichContent[i]['soldOutStatus'] = this.soldOutStatus[j]['soldOutStatus']
          }
        }
      }
    }
  },
};

</script>

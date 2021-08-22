

<template>

<div class="flex flex-col">
    <!-- 客人資訊 -->
    <div class="flex flex-col justify-center items-center">
        <div>

            <input />
        </div>

    </div>
    <!-- 商品頁面 -->
    <div class="w-screen flex flex-row justify-around flex-wrap">
        <div v-for="(item,index) in sandwichContent" :key="index" class="w-auto lg:w-4/12 bg-red-400 m-5 p-5 rounded-lg flex-col flex justify-center items-center">
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
                    <button class="m-2 text-2xl">
                        <font-awesome-icon icon="minus" />
                    </button>
                    <input class="rounded-lg h-9 m-2" />
                    <button class="m-2 text-2xl">
                        <font-awesome-icon icon="plus" />
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- 送出按鈕 -->
    <div class="flex justify-around m-5">
        <button @click="send()" class="h-auto w-auto bg-blue-400 rounded-lg text-4xl p-5">送出</button>
    </div>


</div>

</template>

<script>

import {
    library
}
from '@fortawesome/fontawesome-svg-core'
import {
    faPlus, faMinus
}
from '@fortawesome/free-solid-svg-icons'
import menu from '@/menu/menu.json'
import $ from 'jquery'
library.add(faPlus, faMinus)

export default {
    name: "Order",
    mounted() {
        console.log(menu)
        this.orderPageMenu = menu
        this.sandwichContent = this.orderPageMenu['sandwich']
        this.drinkContent = this.orderPageMenu['drink']
    },
    data() {
        return {
            orderPageMenu: {},
            sandwichContent: [],
            drinkContent: []
        }
    },
    components: {},
    methods: {
        send() {
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
                success: function(response) {
                    if (response == "成功") {
                        alert("成功::::");
                    }
                },
            });
        },
    },
};

</script>

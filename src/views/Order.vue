<template>
  <div class="about">
    <h1>This is an Order page</h1>
    <button @click="send()">Click</button>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: "Order",
  components: {},
  methods: {
    send() {
      $.ajax({
        type: "post",
        url:
          "https://script.google.com/macros/s/AKfycbytQm3cq7KYye607UbMzQzscAZFe0bvOvTEDlmu2JK8f1nh9anpIxcWaiFNPMLuniQbcw/exec",
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

<template>
  <div class="about">
    <h1>This is an Order page</h1>
    <button @click="send()">Click</button>
  </div>
</template>
<script>
export default {
  name: "Order",
  components: {},
  methods: {
    send() {
      console.log("send");

      this.axios
        .post(
          "https://script.google.com/macros/s/AKfycbytQm3cq7KYye607UbMzQzscAZFe0bvOvTEDlmu2JK8f1nh9anpIxcWaiFNPMLuniQbcw/exec",
          {
            method: "write",
            name: "Wayne",
            sex: "male",
            remark: "測試寫入功能",
          }
        )
        .then(function(response) {
          console.log("1");
          console.log(response);
        })
        .catch(function(error) {
          console.log("2");
          console.log(error);
        });
    },
  },
};
</script>

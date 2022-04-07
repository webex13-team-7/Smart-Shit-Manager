<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <button class="btn" v-on:click="toForm">シフト提出</button>
      </div>
      <div class="col">
        <button class="btn" v-on:click="toShift">シフト確認</button>
      </div>
      <div class="col"><button class="btn">勤怠情報</button></div>
    </div>
    <div class="row">
      <component v-bind:is="whichPage"></component>
    </div>
  </div>
</template>
<script>
import form from "@/components/UserForm.vue"
import shiftMade from "@/components/siftMade.vue"
export default {
  components: {
    Form: form,
    Shift: shiftMade,
  },
  data() {
    return {
      whichPage: "Shift",
    }
  },
  methods: {
    toForm() {
      this.whichPage = "Form"
    },
    toShift() {
      this.whichPage = "Shift"
    },
  },
}
</script>

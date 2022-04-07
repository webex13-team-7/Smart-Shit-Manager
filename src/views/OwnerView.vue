<template>
  <div class="container">
    <div class="row">
      <div class="col"><button class="btn">シフト作成</button></div>
      <div class="col"><button class="btn">店舗情報</button></div>
    </div>
    <div class="row"><SubmittedShiftsVue /></div>
  </div>
</template>
<script>
import SubmittedShiftsVue from "@/components/SubmittedShifts.vue"
export default {
  components: {
    SubmittedShiftsVue: SubmittedShiftsVue,
  },
}
</script>

<template>
  {{ job }}
  <div class="container pb-4 shadow">
    <div class="row bg-primary text-white">
      <div class="col fs-1">店舗情報入力</div>
    </div>
    <div class="row justify-content-center my-5">
      <div class="col-4">
        <label for="companyname">店舗名</label>
        <input
          type="text"
          id="companyname"
          class="form-control"
          v-model="companyName"
        />
      </div>
      <div class="row justify-content-center mt-5 mb-1">
        <div class="col-1 px-0 mx-0">
          <label for="start">始業時間</label>
          <select id="start" class="form-control" v-model="startTime">
            <option v-for="n in 24" v-bind:value="n">{{ n }}時</option>
          </select>
        </div>
        <div
          class="d-flex col-1 p-0 m-0 align-items-end justify-content-center fw-bold fs-4"
        >
          ~
        </div>
        <div class="col-1 px-0 mx-0">
          <label for="start">終業時間</label>
          <select id="start" class="form-control" v-model="endTime">
            <option v-for="n in 24" v-bind:value="n">{{ n }}時</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row mt-0 pt-0">
      <div class="col">
        <p class="fs-5">業務項目</p>
      </div>
    </div>
    <div
      class="row my-1 justify-content-center"
      v-for="(input, index) in this.inputs"
      :key="index"
    >
      <div class="col-2">
        <input type="text" class="form-control" v-model="job[input]" />
      </div>
    </div>
    <div class="row my-1">
      <div class="col">
        <button class="btn" v-on:click="addinputs">追加</button>
      </div>
    </div>
    <div class="row my-5">
      <div class="col">
        <button class="btn btn-primary" v-on:click="toOwner">登録</button>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "../firebase"
import { doc, setDoc } from "firebase/firestore"
export default {
  data() {
    return {
      companyName: "",
      startTime: 0,
      endTime: 0,
      inputs: [1],
      n: 1,
      job: {},
    }
  },
  methods: {
    toOwner() {
      setDoc(doc(db, "company", `${this.companyName}`), {
        companyName: this.companyName,
        startTime: this.startTime,
        endTime: this.endTime,
        job: this.job,
      })
      this.$router.push("owner")
    },
    addinputs() {
      this.n = this.n + 1
      this.inputs.push(this.n)
    },
  },
  created: function () {},
}
</script>

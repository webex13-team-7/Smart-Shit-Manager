<template>
  <div class="container pb-4 shadow">
    <div class="row bg-primary text-white">
      <div class="col fs-1">店舗情報入力</div>
    </div>

    <div class="carousel slide" id="carousel" data-bs-interval="false">
      <div class="caruousel-indicatiors">
        <button
          v-bind:class="
            btnC[0]
              ? ['btn', 'btn-outline-primary', 'm-2']
              : ['btn', 'btn-outline-primary', 'm-2', 'active']
          "
          id="btn1"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide-to="0"
          aria-label="Slide 1"
          aria-current="true"
          v-on:click="cc1()"
        ></button>
        <button
          v-bind:class="
            btnC[1]
              ? ['btn', 'btn-outline-primary', 'm-2']
              : ['btn', 'btn-outline-primary', 'm-2', 'active']
          "
          id="btn2"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
          v-on:click="cc2()"
        ></button>
        <button
          v-bind:class="
            btnC[2]
              ? ['btn', 'btn-outline-primary', 'm-2']
              : ['btn', 'btn-outline-primary', 'm-2', 'active']
          "
          id="btn3"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
          v-on:click="cc3()"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
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
              <div class="col-4 px-0 mx-0">
                <label for="shop-id">店舗ID</label>
                <input
                  type="text"
                  class="form-control"
                  id="shop-id"
                  v-model="shopId"
                />
              </div>
            </div>
            <div class="row justify-content-center mt-5 mb-1">
              <div class="col-4 px-0 mx-0">
                <label for="shop-password">店舗パスワード</label>
                <input
                  type="text"
                  class="form-control"
                  id="shop-password"
                  v-model="shopPasswprd"
                />
              </div>
            </div>
            <div class="row justify-content-center mt-5 mb-1">
              <div class="col-1 px-0 mx-0">
                <label for="start">始業時間</label>
                <select id="start" class="form-control" v-model="startTime">
                  <option
                    v-for="(n, index) in 24"
                    v-bind:value="n"
                    :key="index"
                  >
                    {{ n }}時
                  </option>
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
                  <option
                    v-for="(n, index) in 24"
                    v-bind:value="n"
                    :key="index"
                  >
                    {{ n }}時
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="row mt-0 pt-0">
            <div class="col">
              <p class="fs-5">管理者情報</p>
            </div>
          </div>
          <div
            class="row my-1 justify-content-center"
            v-for="(input, index) in this.inputs1"
            :key="index"
          >
            <div class="col-2">
              <label for="id">管理者名</label>
              <input
                type="text"
                class="form-control"
                v-bind:id="input"
                v-model="OwnerData[input].name"
              />
            </div>
            <div class="col-2">
              <label for="input">管理者メールアドレス</label>
              <input
                type="text"
                class="form-control"
                v-bind:id="input"
                v-model="OwnerData[input].email"
              />
            </div>
            <div class="col-2">
              <label for="input">管理者パスワード</label>
              <input
                type="text"
                class="form-control"
                v-bind:id="input"
                v-model="OwnerData[input].password"
              />
            </div>
          </div>
          <div class="row my-1">
            <div class="col">
              <button class="btn" v-on:click="addinputs1">追加</button>
            </div>
          </div>
          <div class="row mt-0 pt-0">
            <div class="col">
              <p class="fs-5">従業員情報</p>
            </div>
          </div>
          <div
            class="row my-1 justify-content-center"
            v-for="(input, index) in this.inputs2"
            :key="index"
          >
            <div class="col-2">
              <label for="id">従業員名</label>
              <input
                type="text"
                class="form-control"
                v-bind:id="input"
                v-model="OwnerData[input].name"
              />
            </div>
            <div class="col-2">
              <label for="input">従業員メールアドレス</label>
              <input
                type="text"
                class="form-control"
                v-bind:id="input"
                v-model="OwnerData[input].email"
              />
            </div>
            <div class="col-2">
              <label for="input">従業員パスワード</label>
              <input
                type="text"
                class="form-control"
                v-bind:id="input"
                v-model="OwnerData[input].password"
              />
            </div>
          </div>
          <div class="row my-1">
            <div class="col">
              <button class="btn" v-on:click="addinputs2">追加</button>
            </div>
          </div>
        </div>
        <div class="carousel-item">
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
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide="prev"
          v-on:click="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide="next"
          v-on:click="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
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
      btnC: [false, true, true],
      companyName: "",
      startTime: 0,
      endTime: 0,
      inputs: [1],
      inputs1: [1],
      inputs2: [1],
      n: 1,
      job: {},
      OwnerEmail: {},
      OwnerPassword: {},
      shopId: "",
      shopPassword: "",
      OwnerData: { 1: { email: "", password: "", name: "" } },
      StaffData: { 1: { email: "", password: "", name: "" } },
    }
  },
  methods: {
    cc1() {
      if (this.btnC[0] !== false) {
        this.btnC[0] = false
        this.btnC[1] = true
        this.btnC[2] = true
      }
    },
    cc2() {
      if (this.btnC[1] !== false) {
        this.btnC[1] = false
        this.btnC[0] = true
        this.btnC[2] = true
      }
    },
    cc3() {
      if (this.btnC[2] !== false) {
        this.btnC[2] = false
        this.btnC[1] = true
        this.btnC[0] = true
      }
    },
    prev() {
      let n = this.btnC.indexOf(false)
      if (n == 0) {
        this.btnC[2] = false
        this.btnC[1] = true
        this.btnC[0] = true
      } else {
        this.btnC[n - 1] = false
        this.btnC[n + 1] = true
        this.btnC[n] = true
      }
    },
    next() {
      let n = this.btnC.indexOf(false)
      if (n == 2) {
        this.btnC[0] = false
        this.btnC[1] = true
        this.btnC[2] = true
      } else {
        this.btnC[n - 1] = true
        this.btnC[n + 1] = false
        this.btnC[n] = true
      }
    },
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
    addinputs1() {
      this.n = this.n + 1
      this.inputs1.push(this.n)
      this.OwnerData[this.n] = { email: "", password: "" }
    },
    addinputs2() {
      this.n = this.n + 1
      this.inputs2.push(this.n)
      this.OwnerData[this.n] = { email: "", password: "" }
    },
  },
}
</script>

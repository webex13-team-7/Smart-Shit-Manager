<template>
  <div class="container m-5 p-4 shadow">
    <div class="row my-5">
      <div class="col">
        <h2>{{ siftStartMonth }}月{{ whichDay }}日のシフト</h2>
      </div>
    </div>
    <div class="row">
      <div
        class="col m-0 p-0"
        v-for="(day, index) in this.Days"
        v-bind:key="index"
      >
        <button class="btn" v-on:click="changeDay(day)">
          {{ siftStartMonth }}月{{ day }}日
        </button>
      </div>
    </div>
    <div class="row">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">名前</th>
            <th v-for="option in options" :key="option.id" scope="col">
              {{ option.id }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="onesData in schedules" :key="onesData">
            <td>
              {{ onesData.staffName }}
            </td>
            <td
              class="m-0 p-0"
              v-for="time in onesData.schedule"
              v-bind:key="time.id"
            >
              <div v-if="time.shift === true" class="bg-primary p-2 m-0 bg-gradient opacity-90">
                〇
              </div>
              <div v-else class="bg-light p-2 m-0">✕</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { db } from "../firebase"
import {
  getDocs,
  collection,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore"
export default {
  data() {
    return {
      options: [],
      options1: [],
      whichDay: 0,
      endTime: 0,
      startTime: 0,
      schedules: [],
      date: "", //今日の曜日
      youbi: ["日", "月", "火", "水", "木", "金", "土"], //曜日を格納する為の配列
      today: 1, //今日の日付
      Month: 2, //今日の月
      siftStartMonth: 1, //シフトの開始月
      siftStartday: 1, //シフトの開始日
      siftEndDay: 1, //シフトの終了日
      Days: [], //2週間分のシフトの日付（数字のみ）
      Days1: [], //Days+月日
    }
  },
  methods: {
    insertDay() {
      this.whichDay = this.siftStartday
    },
    changeDay(day) {
      this.whichDay = day
      this.schedules.length = 0
      getDocs(
        query(
          collection(db, "shifts"),
          where("date", "==", `${this.siftStartMonth}月${this.whichDay}日`)
        )
      ).then((snapshot) => {
        snapshot.forEach((doc) => {
          this.schedules = doc.get("shifts")
        })
      })
    },
    //日付を取得
    Calender() {
      this.Month = new Date().getMonth() + 1
      this.today = new Date().getDate()
      this.date = this.youbi[new Date().getDay()]
    },
    //現在の日付から提出するべきシフトの開始月、開始日を決定
    whenToStart() {
      if (this.today < 6 && this.today > 0) {
        this.siftStartMonth = this.Month
        this.siftStartday = 15
      } else if (this.today < 21 && this.today >= 6) {
        this.siftStartMonth = this.Month + 1
        this.siftStartday = 1
      } else if (this.today >= 21 && this.today < 31) {
        this.siftStartMonth = this.Month + 1
        this.siftStartday = 15
      }
    },
    //シフトの開始月から終了日を算出
    whenToEnd() {
      if (
        (this.siftStartMonth === 4 ||
          this.siftStartMonth === 6 ||
          this.siftStartMonth === 9 ||
          this.siftStartMonth === 11) &&
        this.siftStartday !== 1
      ) {
        this.siftEndDay = 30
      } else if (this.siftStartMonth === 2 && this.siftStartday !== 1) {
        this.siftEndDay = 28
      } else if (this.siftStartday !== 1) {
        this.siftEndDay = 31
      } else if (this.siftStartday === 1) {
        this.siftEndDay = 15
      }
    },
    //シフトの開始日から終了日までの日付を全て取得、フォームのデータに日付を追加。
    getDays() {
      for (let n = 0; n + this.siftStartday <= this.siftEndDay; n++) {
        this.Days.push(this.siftStartday + n)
        this.Days1.push(`${this.siftStartMonth}月${n + this.siftStartday}日`)
      }
    },
  },
  created: function () {
    this.Calender() //日付取得
    this.whenToStart() //シフト開始
    this.whenToEnd() //シフト終了
    this.getDays() //シフト期間
    this.insertDay()
    getDocs(
      query(
        collection(db, "shifts"),
        where("date", "==", `${this.siftStartMonth}月${this.whichDay}日`)
      )
    ).then((snapshot) => {
      snapshot.forEach((doc) => {
        this.schedules = doc.get("shifts")
      })
    })
    getDoc(doc(db, "company", "天下一品")).then((snapshot) => {
      this.endTime = Number(snapshot.get("endTime"))
      this.startTime = Number(snapshot.get("startTime"))
      for (let n = 0; n < this.endTime - this.startTime; n++) {
        let obj = {}
        const id = "id"
        const work = "work"
        obj[id] = `${this.startTime + n} ~ ${this.startTime + n + 1}`
        obj[work] = true
        this.options.push(obj)
        this.options1.push(`${this.startTime + n} ~ ${this.startTime + n + 1}`)
      }
    })
  },
}
</script>

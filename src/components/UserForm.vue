<template>
  <div class="container shadow p-5">
    <div class="row">
      <div class="col" v-if="siftStartday === 1">
        {{ siftStartMonth }}月前半のシフト
      </div>
      <div class="col" v-else>{{ siftStartMonth }}月後半のシフト</div>
    </div>
    <div class="row my-5">
      <div class="col-2 m-3" v-for="day in selections" :key="day.day">
        <div>{{ day.day }}</div>
        <div>
          <select multiple v-model="selection[day.day]" class="form-select">
            <option
              v-for="option in day.schedule"
              v-bind:key="option.id"
              v-bind:value="option.id"
            >
              {{ option.id }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-primary" v-on:click="submit">送信</button>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "../firebase"
import { getDoc, doc, addDoc, collection } from "firebase/firestore"
export default {
  data() {
    return {
      startTime: 0, //開店時間
      endTime: 0, //終了時間
      options: [], //workが全てtrueの選択肢
      false: [], //workが全てfalseの選択肢
      date: "", //今日の曜日
      youbi: ["日", "月", "火", "水", "木", "金", "土"], //曜日を格納する為の配列
      today: 1, //今日の日付
      Month: 2, //今日の月
      siftStartMonth: 1, //シフトの開始月
      siftStartday: 1, //シフトの開始日
      siftEndDay: 1, //シフトの終了日
      Days: [], //2週間分のシフトの日付
      Days1: [],
      selections: [], //workが全てtrueになっている
      selection: {}, //選んだ解答が格納
      time: [], //選択肢の時間
      answer: [], //cal()でselection変換したものの置き場
    }
  },
  methods: {
    //提出
    submit() {
      for (let n = 0; n < this.Days1.length; n++) {
        addDoc(collection(db, "schedules"), {
          schedule: this.answer[n].schedule,
          date: this.answer[n].day,
          staffName: "高真彦",
        })
      }
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
        let obj = {}
        let day = "day"
        obj[day] = `${this.siftStartMonth}月${n + this.siftStartday}日`
        this.selections.push(obj)
      }
    },
    //フォームのデータの各日付に選択肢の情報を付け加える
    makeArr() {
      this.selections.forEach((s) => {
        const key = "schedule"
        s[key] = this.options
      })
    },
    makeArr4() {
      let theAnswer = []
      for (let n = 0; n < this.Days1.length; n++) {
        let day = this.Days1[n]
        let Arr = []
        Arr = Object.keys(this.selection)
        if (Arr.includes(day)) {
          let obj = {}
          let key = "day"
          obj[key] = day
          let key1 = "schedule"
          obj[key1] = []
          let dairyschedule = obj[key1]
          this.time.forEach((t) => {
            if (this.selection[day].includes(t)) {
              let obj1 = {}
              let key = "id"
              let key1 = "work"
              let key2 = "shift"
              obj1[key] = t
              obj1[key1] = true
              obj1[key2] = false
              dairyschedule.push(obj1)
            } else {
              let obj1 = {}
              let key = "id"
              let key1 = "work"
              let key2 = "shift"
              obj1[key] = t
              obj1[key1] = false
              obj1[key2] = false
              dairyschedule.push(obj1)
            }
          })
          theAnswer.push(obj)
        } else {
          let obj = {}
          let key = "day"
          obj[key] = day
          let key1 = "schedule"
          obj[key1] = this.false
          theAnswer.push(obj)
        }
      }
      this.answer = theAnswer
    },
  },
  computed: {
    cal() {
      this.makeArr4()
      return this.answer
    },
  },
  created: function () {
    this.Calender() //日付取得
    this.whenToStart() //シフト開始
    this.whenToEnd() //シフト終了
    this.getDays() //シフト期間
    getDoc(doc(db, "company", "天下一品")).then((snapshot) => {
      //営業時間の算出
      this.endTime = Number(snapshot.get("endTime"))
      this.startTime = Number(snapshot.get("startTime"))
      for (let n = 0; n < this.endTime - this.startTime; n++) {
        let obj = {}
        let obj1 = {}
        const id = "id"
        const work = "work"
        const shift = "shift"
        obj[id] = `${this.startTime + n} ~ ${this.startTime + n + 1}`
        obj1[id] = `${this.startTime + n} ~ ${this.startTime + n + 1}`
        obj1[work] = false
        obj1[shift] = false
        this.options.push(obj)
        this.false.push(obj1)
        this.time.push(`${this.startTime + n} ~ ${this.startTime + n + 1}`)
      }
    })
    this.makeArr()
  },
}
</script>

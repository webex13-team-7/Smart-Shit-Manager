<template>
  <div class="container shadow">
    <div class="row bg-primary p-2 text-white">
      <p class="fs-4 p-0 m-0">従業員としてログイン</p>
    </div>
    <div class="row justify-content-center">
      <div class="col-4">
        <label for="email" class="form-label">メールアドレス</label>
        <input
          class="form-control"
          id="email"
          type="text"
          placeholder="メールアドレス"
          v-model="email"
        />
        <label for="pass" class="form-label">パスワード</label>
        <input
          class="form-control"
          id="pass"
          type="text"
          placeholder="パスワード"
          v-model="password"
        />
        <button class="btn" v-on:click="toMypage">ログイン</button>
      </div>
    </div>
  </div>
</template>
<script>
import { signInWithEmailAndPassword, getAuth } from "firebase/auth"
export default {
  data() {
    return {
      email: "",
      password: "",
      user: "",
      errorCode: "",
      errorMessage: "",
    }
  },
  methods: {
    toMypage() {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          this.user = userCredential.user
          alert("ログイン成功")
          this.$router.push("owner")
        })
        .catch((error) => {
          this.errorCode = error.code
          this.errorMessage = error.message
        })
    },
  },
}
</script>

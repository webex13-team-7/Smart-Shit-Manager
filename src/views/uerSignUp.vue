<template>
  <div class="container m-0 shadow">
    <div class="row justify-content-center">
      <div class="col-4 bg-primary">
        <p class="fs-3 text-white m-0 p-0">ユーザー情報登録</p>
      </div>
    </div>
    <div class="row">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-4">
            <label for="username">名前</label>
            <input
              id="username"
              class="form-control"
              type="text"
              v-model="username"
            />
          </div>
          <div class="row justify-content-center">
            <div class="col-4">
              <label for="mail">メールアドレス</label>
              <input
                id="mail"
                class="form-control"
                type="text"
                v-model="useremail"
              />
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-4">
              <label for="pass">パスワード</label>
              <input
                id="pass"
                class="form-control"
                type="text"
                v-model="password"
              />
            </div>
          </div>
          <div class="row justify-content-center mt-5">
            <h3>職務情報</h3>
            <div class="col-2">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Default checkbox
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn" v-on:click="toMypage">登録</button>
      </div>
    </div>
  </div>
  {{ useremail }}
  {{ user }}
  <br />
  {{ errorCode }}
  <br />
  {{ errorMessage }}
</template>
<script>
import { db } from "../firebase"
import { setDoc, doc } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
export default {
  data() {
    return {
      username: "",
      useremail: "",
      password: "",
      user: "",
      errorCode: "",
      errorMessage: "",
    }
  },
  methods: {
    toMypage() {
      setDoc(doc(db, "users", `${this.username}`), {
        staffName: this.username,
      })
      this.signUp()
    },
    signUp() {
      const Auth = getAuth()
      createUserWithEmailAndPassword(Auth, this.useremail, this.password)
        .then((userCredential) => {
          this.user = userCredential.user
        })
        .catch((error) => {
          this.errorCode = error.code
          this.errorMessage = error.message
        })
    },
  },
}
</script>

<template>
  <div class="container">
    <div class="row mb-5">
      <div class="col pull-left">
        <p class="text-start fw-bolder fs-1">シフト作成をもっとスマートに</p>
        <p class="text-start fw-bolder fs-2">Smart-Shift-Manager</p>
      </div>
      <div class="row mt-5 justify-content-around">
        <div class="col-5">
          <div class="mt-5">
            <h2>すまシフを始める</h2>
            <div class="my-5 px-5 d-flex justify-content-around">
              <button class="btn btn-primary opacity-5" v-on:click="toOwner">
                管理者として登録
              </button>
              <button class="btn btn-primary" v-on:click="toStaff">
                従業員として登録
              </button>
            </div>
          </div>
          <p>__________________________________________________________</p>
          <div class="mt-5">
            <h3>ログイン</h3>
            <div class="my-5 px-5 d-flex justify-content-around">
              <button class="btn btn-primary" v-on:click="toOwnerSignIn">
                管理者としてログイン
              </button>
              <button class="btn btn-primary" v-on:click="toUserSignIn">
                従業員としてログイン
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  methods: {
    toOwner() {
      this.$router.push("setup")
    },
    toStaff() {
      this.$router.push("usersignup")
    },
    toOwnerSignIn() {
      this.$router.push("ownersignin")
    },
    toUserSignIn() {
      this.$router.push("usersignin")
    },
  },
}
</script>

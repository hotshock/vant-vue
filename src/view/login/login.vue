<template>
  <van-cell-group>
    <van-field
      v-model="userName"
      required
      clearable
      label="用户名"
      right-icon="question-o"
      placeholder="请输入用户名"
      @click-right-icon="$toast('question')"
    />

    <van-field
      v-model="password"
      type="password"
      label="密码"
      placeholder="请输入密码"
      required
    />
    <van-button size="large" type="primary" @click="handleSubmit">提交</van-button>
  </van-cell-group>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit () {
      var userName = this.userName
      var password = this.password
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    }
  }
}
</script>

<style>

</style>

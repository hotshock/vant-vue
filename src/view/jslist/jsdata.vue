<template>
  <div>
    <van-nav-bar
    title="检索内容"
    left-text="返回"
    right-text=""
    left-arrow
    @click-left="onClickLeft"
    />
    <van-panel title="题目">
      <van-row v-html = "jsdata"></van-row>
    </van-panel>
  </div>
</template>

<script>
import {
  getJSDetail
} from '@/api/jslist'
export default {
  data () {
    return {
      jsdata: ''
    }
  },

  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  },
  created () {
    var dtid = this.$route.query.dtid
    var msg = this.$store.state.app.Globaltitle
    getJSDetail({ msg, dtid }).then(res => {
      this.jsdata = res.data
    })
  }
}
</script>

<style>
</style>

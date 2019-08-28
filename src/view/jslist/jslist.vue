<template>
  <div>
    <van-nav-bar
    title="检索列表"
    left-text="返回"
    right-text=""
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
    />
    <div>
    <van-row>
      <van-search placeholder="请输入搜索关键词" v-model="value" @search = "onsearch"/>
    </van-row>
    <van-row>
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          ref="mylist"
        >
          <van-cell
            v-for="item in datalist"
            :key="item.id"
            @click="showpage(item.id)" >
           <template slot="title">
              <span class="custom-title" v-html="item.title"></span>
           </template>
          </van-cell>
        </van-list>
      </van-row>
      </div>
    </div>


</template>

<script>
import {
  getJSDataCount,
  getJSData
} from '@/api/jslist'
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      isloading: false,
      zpageid: 0,
      pageid: 0,
      value: ''
    }
  },
  created () {
    this.value = this.$store.state.app.Globaltitle
    var msg = this.value
    getJSDataCount(msg).then(res => {
      this.zpageid = res.data
    })
  },
  watch: {
    value (newtitle) {
      this.$store.commit('setGlobaltitle', newtitle)
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {
      Toast('按钮')
    },
    onsearch () {
      var msg = this.value
      getJSDataCount(msg).then(res => {
        this.zpageid = res.data
        this.pageid = 0
        this.datalist = []
        this.loading = false
        this.finished = false
        this.$refs.mylist.check()
      })
    },
    onLoad () {
      var msg = this.value
      this.pageid += 1
      var pageid = this.pageid
      getJSData({ msg, pageid }).then(res => {
        for (var id in res.data) {
          this.datalist.push(res.data[id])
        }
        this.loading = false
        if (this.pageid >= this.zpageid){
          this.finished = true
        }
      })
    },
    showpage (id) {
      this.$router.push( {name: "jsdata", query: {dtid: id}} )
    }
  }
}
</script>

<style>
</style>

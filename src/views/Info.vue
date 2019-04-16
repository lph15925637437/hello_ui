<template>
  <div>
    <div>
      <el-row>
        <el-button type="primary" plain @click="buttonClick">点击显示test</el-button>
        <el-button type="primary" plain @click="getUser">获取用户信息</el-button>
      </el-row>
    </div>
    <div>
      <span v-if="state">this is test</span>
    </div>
  </div>
</template>

<script>
  import Core from '../../core/core'

  export default {
    name: 'Info',
    data () {
      return {
        state: false,
        user: {},
        user_id: 1,
        clickNum: 1
      }
    },
    mounted: function () {
    },
    methods: {
      buttonClick () {
        let num = ++this.clickNum
        if (num % 2 === 0) {
          this.state = true
        } else {
          this.state = false
        }
      },
      getUser () {
        Core.Api.User.userInfo(this.user_id)
          .then((data) => {
            console.info('返回的用户信息:{}', data)
          })
          .catch((err) => {
            console.error("err", err)
          })
      }
    }
  }
</script>

<style scoped>

</style>

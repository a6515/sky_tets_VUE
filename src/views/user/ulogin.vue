<script setup>
import { ulogin, register } from '@/api/user'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router/index.js'
import { useTokenStore } from '@/stores/token'
import useuserStore from '@/stores/user_info'
const userStore = useuserStore()
const tokenStore = useTokenStore()
const isLoginForm = ref(true)
const datas = ref({})
const form = ref({
  id: '',
  password: ''
})
const rform = ref({
  name: "",
  password: '',
  repassword: ''
})
const toggleForm = () => {
  isLoginForm.value = !isLoginForm.value;
}
async function go() {
  try {
    datas.value = await ulogin(form.value.id, form.value.password)
    if (datas.value.code === 0) {
      userStore.setInfo({id:form.value.id})
      form.value.id = ''
      form.value.password = ''
      tokenStore.setToken(datas.value.data)
      ElMessage.success({ message: '登陆成功', duration: 3000 })
      router.push('/controller')
    }
    console.log(datas.value)
    datas.value = {}

  } catch (error) {
    console.log(error)
  }

}

function gohome() {
  router.push('/sky_takeaway')
}

async function registers() {
  try {

    if (rform.value.name === '' || rform.value.password === '' || rform.value.name.length > 20 || rform.value.password.length < 1 || rform.value.password.length > 20
      || rform.value.repassword.length < 4 || rform.value.repassword.length > 20 || rform.value.password != rform.value.repassword
    ) {
      return
    }
    datas.value = await register(rform.value.name, rform.value.password)
    console.log(datas.value);
    alert("这是你的ID，务必谨记：" + datas.value.data)
    ElMessage.success({ message: '注册成功', duration: 1000 })
    userStore.setInfo({id:datas.value.data})
    datas.value = {}
    rform.name = ''
    rform.password = ''
    rform.repassword = ''
    setTimeout(() => {
      router.push('/sky_takeaway')
    }, 1000);
  } catch (error) {
    // 在这里处理异常
    console.error('注册异常:', error);
  }


};

</script>


<template>

  <div class="login-container">
    <!-- Left Section - Display Image -->
    <div class="left-section">
      <img src="../../images/背景1.png" style=" position: relative; width:50vw; height: 100vh" class="display-image">
    </div>

    <!-- Right Section - Login Form -->

    <div class="form-container">
      <h1 v-if="isLoginForm">登录</h1>
      <h1 v-else>注册</h1>

      <el-form :model="form" v-if="isLoginForm" @submit.prevent="go">
        <el-form-item label="用户ID:" prop="id">
          <el-input v-model="form.id" style="width: 255px" placeholder="请输入用户名"/>
        </el-form-item>

        <el-form-item label="密码:" prop="password">
          <el-input v-model="form.password" style="width: 255px" type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-button type="primary" native-type="submit">登录</el-button>
      </el-form>
      <el-form :model="rform" v-else @submit.prevent="registers">
        <el-form-item label="用户名:" prop="name">
          <el-input v-model="rform.name" style="width: 255px" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="rform.password" style="width: 255px" type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item label="确认密码:" prop="repassword">
          <el-input v-model="rform.repassword" style="width: 255px" type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-button type="primary" native-type="submit">注册</el-button>
      </el-form>
      <el-button @click="toggleForm">{{ isLoginForm ? '注册' : '返回登录' }}</el-button>

      <el-button type="info" @click="gohome">首页</el-button>
    </div>
  </div>



</template>


<style>
.login-container {
  display: flex;
}

.form-container {
  position: relative;
  top: 0;
  background-color: antiquewhite;

}

.left-section {
  position: relative;
  width: 50vw;
  height: 100vh;
}
</style>
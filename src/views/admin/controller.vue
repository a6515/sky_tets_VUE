<script setup>
import router from '@/router/index.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useTokenStore } from '@/stores/token'
import useuserStore from '@/stores/user_info'
const userStore = useuserStore()
const tokenStore = useTokenStore()
function handleCommand(command) {
    if (command === 'loginout') {
        ElMessageBox.confirm(
            '确认退出登录?',
            '警告',
            {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
            }
        ).then(() => {
            userStore.removeInfo()
            tokenStore.removeToken()
            ElMessage.success({ message: "token移除成功,token为:" + tokenStore.token, duration: 1500 })
            ElMessage.success({ message: "成功退出", duration: 1500 })
            setTimeout(() => {
                router.push('/sky_takeaway')
            }, 1700)
        }).catch(() => {
            ElMessage({
                type: 'info',
                message: '取消',
            })
        })


    }
    else {
        router.push(command)
    }

}
</script>


<template>
    <div class="common-layout">
        <el-container style="height: 100vh;">
            <el-aside width="200px" class="aside">菜单项
                <el-menu default-active="2" class="el-menu-vertical-demo" router="router">
                    <el-menu-item index="detial">
                        <el-icon>
                            <ChatLineSquare />
                        </el-icon>
                        <span>菜品详情</span>
                    </el-menu-item>
                    <el-menu-item index="setting">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>个人设置</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header class="head">用户编号:{{ userStore.info.id }}
                    <el-dropdown class="avatar_down" @command="handleCommand">
                        <span class="el-dropdown-link">
                            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="/sky_takeaway">首页</el-dropdown-item>
                                <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-header>
                <el-main class="main"><router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>

</template>


<style scoped>
.aside {
    background-color: white;
}

.head {
    background-color: rgba(220, 220, 220, 0.2);
}

.main {
    background-color: rgba(199, 170, 170, 0.6);
}

.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}

.avatar_down {
    position: relative;
    left: 72vw;
}
</style>
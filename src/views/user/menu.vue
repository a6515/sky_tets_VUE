<script setup>
import { ref, computed } from 'vue'
import { getDish, getCategory, addCart } from '@/api/user'
import useuserStore from '@/stores/user_info.js'
import { ElMessage } from 'element-plus'
const userStore = useuserStore()
console.log(userStore.info)
const menuItems = ref([])
const categories = ref([])
const selectedCategory = ref(null)
async function getCategorys() {
    categories.value = await (await getCategory()).data
    selectedCategory.value = categories.value[0].category_id
    console.log(categories.value)
    console.log(categories.value[0])
}
getCategorys().catch(err => { console.log(err) })


async function getDishs() {
    menuItems.value = await (await getDish()).data
    console.log(menuItems.value)
}
getDishs().catch(err => { console.log(err) })

const Dishs = computed(() => menuItems.value.filter(item => item.category_id === selectedCategory.value))
function selectCategory(item) {
    selectedCategory.value = item.category_id
    console.log(Dishs.value)
}

async function addCarts(menu_item) {
    try {
        await addCart(menu_item.dish_id, menu_item.dish_name, menu_item.price);
        ElMessage.success({ message: '添加成功', duration: 800 })


    } catch (error) {
        console.log(error)
    }

}

</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header class="header">菜系选择
                <router-link to='/cart'><button >点我去cart</button></router-link>
                <router-link to='/sky_takeaway'><button >点我去Home</button></router-link>
            </el-header>
            <el-container>
                <el-aside width="250px" class="aside">
                    <h3>菜系选择区</h3>
                    <ul>
                        <li v-for="item in categories" :key="item.category_id" @click="selectCategory(item)"
                            :class="{ selected: item.category_id === selectedCategory.value }">
                            {{ item.category_name }}
                        </li>
                    </ul>
                </el-aside>
                <el-main class="main">
                    <div v-if="Dishs.length === 0">
                        <p class="no-dishes">无菜品</p>
                    </div>
                    <div v-else class="dishes-container">
                        <div v-for="menu_item in Dishs" :key="menu_item.dish_id" class="dish-item">
                            <img :src="menu_item.picture" alt="菜品图片" class="item-image">
                            <div class="item-details">
                                <h3>{{ menu_item.dish_name }}</h3>
                                <p>价格：{{ menu_item.price }} 元</p>
                                <button @click="addCarts(menu_item)">添加到购物车</button>
                            </div>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.common-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.header {
    background-color: #f5f5f5;
    text-align: center;
    padding: 20px;
    font-size: 24px;
    font-weight: bold;
}

.aside {
    background-color: #f0f0f0;
    padding: 20px;
}

.aside h3 {
    margin-top: 0;
}

.aside ul {
    list-style: none;
    padding: 0;
}

.aside li {
    cursor: pointer;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    transition: background-color 0.3s;
}

.aside li:hover {
    background-color: #e0e0e0;
}

.aside li.selected {
    background-color: #d0d0d0;
    font-weight: bold;
}

.main {
    padding: 20px;
}

.no-dishes {
    text-align: center;
    color: #999;
    font-size: 18px;
}

.dishes-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.dish-item {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
    width: calc(33.333% - 20px);
    /* Three items per row with gaps */
}

.dish-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.item-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
}

.item-details {
    padding: 15px;
    text-align: center;
}

.item-details h3 {
    margin: 0 0 10px 0;
    font-size: 20px;
    color: #333;
}

.item-details p {
    margin: 0 0 15px 0;
    font-size: 16px;
    color: #666;
}

.item-details button {
    padding: 10px 20px;
    background-color: #42b983;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.item-details button:hover {
    background-color: #369870;
}
</style>

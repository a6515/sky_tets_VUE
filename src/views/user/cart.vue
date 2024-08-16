<script setup>
import { computed, ref } from 'vue'
import router from '@/router'
import { getCart, sub_item, add_item, pay, remove_item } from '@/api/user'

const cartItems = ref([])
const datas = ref([])
async function getCarts() {
    cartItems.value = (await getCart()).data
    console.log(cartItems.value)
}
getCarts().catch(err => { console.log(err) })

function go() {
    router.push('/menu')
}

async function decrementQuantity(item) {
    if (item.number > 1) item.number--
    await sub_item(item.dish_id)
}

async function incrementQuantity(item) {
    item.number++
    await add_item(item.dish_id)
}

async function removeItem(item) {
    try {
        // Call the API to remove the item from the backend
        await remove_item(item.dish_id);

        // Find the index of the item in the cartItems array
        const index = cartItems.value.findIndex(cartItem => cartItem.dish_id === item.dish_id);

        // Remove the item from the cartItems array
        if (index !== -1) {
            cartItems.value.splice(index, 1);
        }
    } catch (error) {
        console.log('Failed to remove item:', error);
    }
}


// 计算每个商品的总价
const calculateItemTotalPrice = (item) => {
    return item.number * item.unit_price
}

// 计算购物车内所有商品的总价
const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => total + calculateItemTotalPrice(item), 0)
})
console.log(totalPrice)

async function pays() {
    try {
        getCarts().catch(err => { console.log(err) })  //最后从数据库读取一遍，以防万一
        datas.value = cartItems.value
        await pay(datas.value)
        cartItems.value = []

    } catch (error) {
        console.log(error)
    }

}
</script>


<template>
    <div class="container">
        <!-- 导航条 -->
        <router-view></router-view>
    </div>

    <div class="cart-container">
        <h2>购物车</h2>
        <div v-if="cartItems.length === 0" class="empty-cart">
            <p>购物车是空的，赶快去选购您喜爱的美食吧！</p>
            <el-button type="primary" @click="go">Go</el-button>
        </div>
        <div v-else>
            <div class="cart-items">
                <div v-for="item in cartItems" :key="item.dish_id" class="cart-item">
                    <img :src="item.picture" alt="菜品图片" class="item-image">
                    <div class="item-details">
                        <h3>{{ item.dish_name }}</h3>
                        <p>价格：{{ calculateItemTotalPrice(item) }} 元</p>
                        <div class="item-controls">
                            <button @click="decrementQuantity(item)" :disabled="item.number === 1">-</button>
                            <span>{{ item.number }}</span>
                            <button @click="incrementQuantity(item)">+</button>
                            <button @click="removeItem(item)">移除</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cart-summary">
                <h3>购物车总计</h3>
                <p>总金额：{{ totalPrice }} 元</p>
                <el-button type="primary" @click="pays">结算</el-button>
            </div>
        </div>
    </div>
</template>


<style scoped>
.container {
    background-color: rgb(179, 158, 130);
    position: relative;
    font-family: Arial, sans-serif;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #21211e;
    padding: 10px 20px;
}

.nav-list {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
}

.navv-item {
    color: white;
    margin-right: auto;
}

.nav-items-right {
    display: flex;
    align-items: center;
}

.nav-item {
    color: white;
    margin: 0 30px;
    cursor: pointer;
}

.nav-item:hover {
    text-decoration: underline;
}

.cart-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.empty-cart {
    text-align: center;
    margin-top: 20px;
}

.btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    margin-top: 10px;
}

.cart-items {
    margin-top: 10px;
}

.cart-item {
    display: flex;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.item-image {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 10px;
}

.item-details {
    flex: 1;
}

.item-details h3 {
    margin-bottom: 5px;
}

.item-details p {
    margin-bottom: 5px;
}

.item-controls {
    margin-top: 10px;
}

.item-controls button {
    padding: 5px 10px;
    margin-right: 5px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.item-controls button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.overall-note {
    margin-top: 20px;
}

.overall-note textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    resize: vertical;
}
</style>

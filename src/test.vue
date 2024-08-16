<script setup>
import { ref, computed } from 'vue'

// 示例数据
const cartItems = ref([
    { dish_id: 1, dish_name: '宫保鸡丁', price: 25, quantity: 1, picture: 'https://via.placeholder.com/150' },
    { dish_id: 2, dish_name: '麻婆豆腐', price: 18, quantity: 2, picture: 'https://via.placeholder.com/150' },
    { dish_id: 3, dish_name: '红烧肉', price: 30, quantity: 1, picture: 'https://via.placeholder.com/150' }
])

// 更新菜品数量
function incrementQuantity(item) {
    item.quantity++
}

function decrementQuantity(item) {
    if (item.quantity > 1) {
        item.quantity--
    }
}

// 移除商品
function removeItem(item) {
    const index = cartItems.value.indexOf(item)
    if (index > -1) {
        cartItems.value.splice(index, 1)
    }
}

// 计算总价
const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})
</script>

<template>
    <div class="cart-layout">
        <el-container>
            <el-header class="header">购物车</el-header>
            <el-main class="main">
                <div v-if="cartItems.length === 0">
                    <p class="no-items">购物车中没有菜品</p>
                </div>
                <div v-else class="cart-container">
                    <div v-for="item in cartItems" :key="item.dish_id" class="cart-item">
                        <img :src="item.picture" alt="菜品图片" class="item-image">
                        <div class="item-details">
                            <h3>{{ item.dish_name }}</h3>
                            <p>价格：{{ item.price }} 元</p>
                            <div class="quantity-controls">
                                <button @click="decrementQuantity(item)">-</button>
                                <span>{{ item.quantity }}</span>
                                <button @click="incrementQuantity(item)">+</button>
                            </div>
                        </div>
                        <button @click="removeItem(item)" class="remove-button">移除</button>
                    </div>
                    <div class="total-price">
                        总价：{{ totalPrice }} 元
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>


<style scoped>
.cart-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: 'Arial', sans-serif;
    background-color: #f8f8f8;
}

.header {
    background-color: #2c3e50;
    color: #ecf0f1;
    text-align: center;
    padding: 20px;
    font-size: 24px;
    font-weight: bold;
}

.main {
    padding: 20px;
}

.no-items {
    text-align: center;
    color: #999;
    font-size: 18px;
}

.cart-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.cart-item {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
    transition: transform 0.3s, box-shadow 0.3s;
}

.cart-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.item-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 20px;
}

.item-details {
    flex: 1;
}

.item-details h3 {
    margin: 0;
    font-size: 20px;
    color: #333;
}

.item-details p {
    margin: 10px 0;
    font-size: 16px;
    color: #666;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 10px;
}

.quantity-controls button {
    padding: 5px 10px;
    background-color: #42b983;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.quantity-controls button:hover {
    background-color: #369870;
}

.remove-button {
    background-color: #e74c3c;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.remove-button:hover {
    background-color: #c0392b;
}

.total-price {
    text-align: right;
    font-size: 24px;
    font-weight: bold;
    margin-top: 20px;
    color: #2c3e50;
}
</style>

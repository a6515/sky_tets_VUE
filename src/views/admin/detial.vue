<script setup>
import {
    Delete,
    Edit
} from '@element-plus/icons-vue'
import { dish_count, dish } from '@/api/admin.js'
import { ref } from 'vue'
import { ElButton } from 'element-plus'
const tableData = ref([])
const list = ref({})
const totals = ref(99999)        //此为分页条的变量
const current_page = ref(1)
const page_sizes = ref([10, 20])
const page_size = ref(10)
const disabled = ref(false)    //此为分页条的变量
async function dishs_count() {
   totals.value=(await dish_count()).data
}
dishs_count()
dishs(10,1)
const handleSizeChange = () => {
    dishs(page_size.value, current_page.value)
}
const handleCurrentChange = () => {
    dishs(page_size.value, current_page.value)
}
async function dishs(limit,current) {
    tableData.value = (await dish(limit, current)).data  //此处切记把await dish作为一个整体
    console.log(list.value)
}
</script>


<template>
    <div>
        <el-card style="max-width: 85vw; height:85vh; overflow:auto">
            <template #header>
                <div class="card-header">
                    <span>菜品详情</span>
                </div>
            </template>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="dish_id" label="ID" width="180" />
                <el-table-column prop="dish_name" label="Name" width="180" />
                <el-table-column label="操作" width="180">
                    <template v-slot="scope">
                        <el-button type="success" :icon="Edit" circle />
                        <el-button type="danger" :icon="Delete" circle />
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="current_page" v-model:page-size="page_size" :page-sizes="page_sizes"
                :disabled="disabled" layout="jumper,total, sizes, prev, pager, next" :total="totals"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />

        </el-card>
    </div>
</template>



<style></style>

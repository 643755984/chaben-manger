<template>
    <el-dialog
        v-model="dialogVisible"
        title="添加专业"
        width="800px"
        @open="openCallBack"
        :before-close="close"
    >
        <div>
            <div class="handle-box">
                <div class="search">
                    <el-input v-model="page.majorName" placeholder="请输入专业名称" class="handle-input mr10"></el-input>
                    <el-select v-model="page.majorType" class="m-2" placeholder="请选择专业类型">
                        <el-option
                            v-for="item in majorTypeOptions"
                            :key="item.id"
                            :label="item.typeName"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                    <el-button class="search-btn" type="primary" icon="search" @click="handleSearch">搜索</el-button>
                </div>
            </div>
            <el-table
                border
                :data="majorList"
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" />
                <el-table-column label="专业类型">
                    <template #default="scope">{{scope.row.majorTypeInfo.typeName }}</template>
                </el-table-column>
                <el-table-column property="majorName" label="专业名称" />
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="page.pageNum"
                    :page-size="page.pageSize" :total="page.pageTotal" @current-change="changePage"></el-pagination>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">关闭</el-button>
                <el-button type="primary" @click="confirm">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref } from 'vue'
import majorListSetup from '@/setup/majorListSetup'
import { addMajorOnSchool } from '@/api/school'
import { ElMessage } from "element-plus"

const props = defineProps({
    schoolId: {
        type: String,
        require: true
    }
})
const emit = defineEmits(['updateMajorList'])
let {page, majorList, majorTypeOptions, handleSearch, changePage } = majorListSetup()
let majorSelection = ref([])
let dialogVisible = ref(false)

const handleSelectionChange = (val) => {
    majorSelection.value = val
}

const close = () => {
    dialogVisible.value = false
}

const openCallBack = () => {
    handleSearch()
}

const confirm = () => {
    let params = {
        schoolId: props.schoolId,
        majorIds: []
    }
    for(let i=0;i<majorSelection.value.length;i++) {
        params.majorIds.push(majorSelection.value[i].id)
    }

    addMajorOnSchool(params).then(res => {
        if(res.code === 200) {
            ElMessage.success('添加专业成功')
            emit('updateMajorList')
            close()
        }
    })
}

defineExpose({ dialogVisible })
</script>
<style lang="scss">
.handle-box {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    .search {
        display: flex;
        align-items: center;
        .handle-input {
            width: 300px;
        }
        .search-btn {
            margin-left: 10px;
        }
    }
}
.mr10 {
    margin-right: 10px;
}

</style>
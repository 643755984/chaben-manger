<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="container">
            <div class="handle-box">
                <div class="search">
                    <el-input v-model="page.typeName" placeholder="请输入专业类型名称" class="handle-input mr10"></el-input>
                    <el-button class="search-btn" type="primary" icon="search" @click="handleSearch">搜索</el-button>
                </div>
                <div>
                    <el-button type="primary" icon="CirclePlus" @click="handleAdd">新增专业</el-button>
                </div>
            </div>
            <el-table :data="majorTypeList" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column type="index" width="50" />
                <el-table-column prop="typeName" label="类型名称"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template #default="scope">
                        <el-button type="text" class="red"
                            @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="page.pageNum"
                    :page-size="page.pageSize" :total="page.pageTotal" @current-change="changePage"></el-pagination>
            </div>
        </div>
        
        <addMajorTypeDialog :dialogVisible="dialogVisible" @closeDialog="close" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import addMajorTypeDialog from './components/addMajorTypeDialog.vue'
import tableSetup from './setup/tableSetup'

let { page, majorTypeList, changePage, handleSearch, handleDelete } = tableSetup()
let dialogVisible  = ref(false)

// 新增
const handleAdd = () => {
    dialogVisible.value = true
}

const close = (isAdd) => {
    console.log(isAdd)
    if(isAdd === true) handleSearch()
    dialogVisible.value = false
}

</script>
<style lang="scss" scoped>
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
.table {
    width: 100%;
    font-size: 14px;
    .red {
        color: #ff0000;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
}

.mr10 {
    margin-right: 10px;
}

</style>
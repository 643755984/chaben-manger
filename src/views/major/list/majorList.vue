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
                    <el-input v-model="page.majorName" placeholder="请输入专业名称" class="handle-input mr10"></el-input>
                    <el-select v-model="page.majorType" placeholder="请选择专业类型">
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
                <div>
                    <el-button type="primary" icon="CirclePlus" @click="handleAdd">新增专业</el-button>
                </div>
            </div>
            <el-table :data="majorList" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column type="index" width="50" />
                <el-table-column prop="majorType" label="专业类型">
                    <template #default="scope">{{ scope.row.majorTypeInfo.typeName }}</template>
                </el-table-column>
                <el-table-column prop="majorName" label="专业名称"></el-table-column>
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

        <addMajorDialog :dialogVisible="dialogVisible" :majorTypeOptions="majorTypeOptions" @closeDialog="closeDialog" />

    </div>
</template>

<script setup>
import { ref } from 'vue'
import tableSetup from './setup/tableSetup'
import addMajorDialog from './components/addMajorDialog.vue'

let { page, majorList, majorTypeOptions, changePage, handleSearch, handleDelete } = tableSetup()
let dialogVisible = ref(false)

// 新增
const handleAdd = () => {
    dialogVisible.value = true
}

const closeDialog = (isAdd) => {
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
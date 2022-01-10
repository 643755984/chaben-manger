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
                <div>
                    <el-input v-model="page.schoolName" placeholder="学校名" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="handleSearch">搜索</el-button>
                </div>
                <div>
                    <el-button type="primary" icon="CirclePlus" @click="handleAdd">新增学校</el-button>
                </div>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column type="index" width="50" />
                <el-table-column prop="schoolName" label="学校名称"></el-table-column>
                <el-table-column prop="schoolType" label="学校类型"></el-table-column>
                <el-table-column prop="schoolLevel" label="学校等级"></el-table-column>
                <el-table-column prop="schoolAddress" label="学校地址"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template #default="scope">
                        <el-button type="text" @click="handleEdit(scope.row)">编辑
                        </el-button>
                        <el-button type="text" @click="handleDetail(scope.row)">详情
                        </el-button>
                        <el-button type="text" class="red"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="page.pageNum"
                    :page-size="page.pageSize" :total="page.pageTotal" @current-change="changePage"></el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
import { onBeforeMount } from "vue";
import tableSetup from './setup/tableSetup'
import usePageSetup from './setup/pageSetup'


export default {
    name: "schoolList",
    setup() {
        let { handleEdit, handleAdd, handleDelete, handleDetail } = tableSetup()
        let { page, changePage, tableData, handleSearch } = usePageSetup()
        
        onBeforeMount(() => {
            handleSearch()
        })

        return {
            tableData,
            page,
            handleDetail,
            handleDelete,
            handleEdit,
            handleAdd,
            changePage,
            handleSearch,
        };
    },
};
</script>
<style lang="scss" scoped>
.handle-box {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    .handle-input {
        width: 300px;
        display: inline-block;
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
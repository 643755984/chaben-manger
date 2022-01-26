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
                    <el-button type="primary" icon="CirclePlus" @click="handleAdd">新增院校</el-button>
                </div>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column type="index" width="50" />
                <el-table-column prop="schoolName" label="学校名称"></el-table-column>
                <el-table-column prop="schoolType" label="学校类型">
                    <template #default="scope">
                        <span>{{ setSchoolType(scope.row.schoolType) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="schoolLevel" label="学校等级">
                    <template #default="scope">
                        <span>{{ setSchoolLevel(scope.row.schoolLevel) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="schoolAddress" label="学校地址">
                    <template #default="scope">
                        <span class="ellipsis-line">{{ scope.row.schoolAddress }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="240" align="center">
                    <template #default="scope">
                        <el-button type="text" @click="releaseNotice(scope.row)">发布公告
                        </el-button>
                        <el-button type="text" @click="handleEdit(scope.row)">编辑
                        </el-button>
                        <el-button type="text" @click="handleDetail(scope.row)">详情
                        </el-button>
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

        <NoticeDialog :schoolId="schoolId" ref="noticeDialogRef" />
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue"
import tableSetup from './setup/tableSetup'
import schoolInfoSetup from '@/setup/schoolInfoSetup'
import NoticeDialog from '../components/noticeDialog.vue'

let { page, changePage, tableData, handleSearch, handleEdit, handleAdd, handleDelete, handleDetail } = tableSetup()
let { setSchoolType, setSchoolLevel } = schoolInfoSetup()
let noticeDialogRef = ref(null)
let schoolId = ref('')

onBeforeMount(() => {
    handleSearch()
})

const releaseNotice = (item) => {
    schoolId.value = item.schoolId
    noticeDialogRef.value.dialogVisible = true
}

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
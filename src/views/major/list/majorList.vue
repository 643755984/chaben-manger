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
                    <el-select v-model="page.majorType" class="m-2" placeholder="请选择专业类型">
                        <el-option
                            v-for="item in majorOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                    <el-button class="search-btn" type="primary" icon="search" @click="handleSearch">搜索</el-button>
                </div>
                <div>
                    <el-button type="primary" icon="CirclePlus" @click="handleAdd">新增专业</el-button>
                </div>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column type="index" width="50" />
                <el-table-column prop="majorName" label="专业名称"></el-table-column>
                <el-table-column prop="majorType" label="专业类型"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template #default="scope">
                        <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑
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

        <el-dialog
            v-model="dialogVisible"
            title="新增专业"
            width="50%"
            :before-close="handleClose"
        >
            <el-form ref="formRef" :model="form" label-width="120px" :rules="rules">
                <el-form-item label="专业名称" prop="majorName">
                    <el-input v-model="form.majorName"></el-input>
                </el-form-item>
                <el-form-item label="专业类型" prop="majorType">
                    <el-select v-model="form.majorType" class="m-2" placeholder="请选择专业类型">
                        <el-option
                            v-for="item in majorOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">关闭</el-button>
                    <el-button type="primary" @click="confirmAdd">新增</el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script>
import { onBeforeMount } from "vue";
import tableSetup from './composables/tableSetup'
import useAddMajor from './composables/addMajorSetup'


export default {
    name: "schoolList",
    setup() {
        let { page, tableData, changePage, handleSearch, handleDelete, handleDetail } = tableSetup()
        let { dialogVisible, form, majorOptions, rules, formRef, handleClose, confirmAdd, handleAdd} = useAddMajor()

        onBeforeMount(() => {
            handleSearch()
        })

        return {
            majorOptions,
            form,
            dialogVisible,
            tableData,
            page,
            rules,
            formRef,
            confirmAdd,
            handleDetail,
            handleDelete,
            handleAdd,
            changePage,
            handleSearch,
            handleClose
        };
    },
};
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
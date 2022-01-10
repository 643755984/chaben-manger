<template>
    <el-dialog
        v-model="props.dialogVisible"
        title="添加专业"
        width="800px"
        @open="openCallBack"
    >
        <div>
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
            </div>
            <el-table
                border
                :data="majorList"
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" />
                <el-table-column label="专业类型">
                    <template #default="scope">{{ getTypeLabel(scope.row.majorType) }}</template>
                </el-table-column>
                <el-table-column property="majorName" label="专业名称" />
            </el-table>
            <div class="page">
                <el-pagination background layout="prev, pager, next" :total="page.pageTotal"></el-pagination>
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
import addMajorSetup from './setup/majorListSetup'

let { majorList, page, majorOptions, handleSelectionChange, handleSearch, getTypeLabel} = addMajorSetup()
const props = defineProps({
  dialogVisible: {
      type: Boolean,
      require: true
  }
})
const emit = defineEmits(['closeDialog'])

const close = () => {
    emit('closeDialog')
}

const openCallBack = () => {
    handleSearch()
}

const confirm = () => {
    let params = {
    }
}

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
.page {
    margin-top: 10px;
    text-align: center;
}
</style>
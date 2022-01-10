<template>
    <div class="container">
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="w-900">
            <base-info :text="'基本信息'">
                <template v-slot:default>
                    <div class="line">
                        <div class="label">院校Logo</div>
                        <div class="value">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="setImgUrl(schoolInfo.schoolLogo)"
                                :fit="'contain'"
                            ></el-image>
                        </div>
                    </div>
                    <div class="line">
                        <div class="label">院校名称</div>
                        <div class="value">{{ schoolInfo.schoolName }}</div>
                    </div>
                    <div class="line">
                        <div class="label">院校类型</div>
                        <div class="value">{{ schoolInfo.schoolType }}</div>
                    </div>
                    <div class="line">
                        <div class="label">院校等级</div>
                        <div class="value">{{ schoolInfo.schoolLevel }}</div>
                    </div>
                    <div class="line">
                        <div class="label">院校Email</div>
                        <div class="value">{{ schoolInfo.schoolEmail }}</div>
                    </div>
                    <div class="line">
                        <div class="label">院校地址</div>
                        <div class="value">{{ schoolInfo.schoolAddress }}</div>
                    </div>
                </template>
            </base-info>
            <base-info :text="'专业信息'">
                <template v-slot:right>
                    <el-button type="primary" icon="CirclePlus" @click="addMajor">添加专业</el-button>
                </template>
                <template v-slot:default>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column type="index" width="50" />
                        <el-table-column prop="date" label="专业名称" />
                        <el-table-column prop="name" label="专业类型" />
                        <el-table-column label="操作" width="200" align="center">
                            <template #default="scope">
                                <el-button type="text" class="red"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </base-info>
        </div>
        
        <add-major-dialog :dialogVisible="addMajorDialogVisible" @closeDialog="addMajorDialogVisible = false" />

    </div>
</template>
<script setup>
import { ref } from "vue"
import setImgUrlSetup from '@/setup/setImgUrlSetup'
import schoolDetailSetup from './setup/schoolDetailSetup'
import baseInfo from './components/baseInfo.vue'
import addMajorDialog from './components/addMajor.vue'

const { setImgUrl } = setImgUrlSetup()
let { schoolInfo, tableData, handleDelete} = schoolDetailSetup()

let addMajorDialogVisible = ref(false)

const addMajor = () => {
    addMajorDialogVisible.value = true
}

</script>

<style lang="scss" scoped>
.line {
    display: flex;
    margin-bottom: 24px;
    color: #606266;
    .label {
        width: 120px;
        margin-right: 16px;
        text-align: right;
        flex-shrink: 0;
    }
}
</style>
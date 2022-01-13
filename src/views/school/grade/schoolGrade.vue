<template>
    <div class="container">
        <BaseInfo :text="'分数信息'">
            <template #right>
                <el-button type="primary" @click="handleAdd">新增分数</el-button>
            </template>
            <template #default>
                <el-timeline v-if="gradeList.length > 0">
                    <el-timeline-item 
                    v-for="(item, index) in gradeList" 
                    :key="index" 
                    :timestamp="item.year + '年'" 
                    placement="top">
                        <el-card>
                            <div class="card">
                                <div class="opera">
                                    <el-button size="small" type="primary" @click="handleEdit(item.id)">编辑</el-button>
                                </div>
                                <div class="main">
                                    <div class="item">
                                        <span class="label">最低分：</span>
                                        <span class="value">{{ item.minGrade }}</span>
                                    </div>
                                    <div class="item">
                                        <span class="label">平均分：</span>
                                        <span class="value">{{ item.averageGrade }}</span>
                                    </div>
                                    <div class="item">
                                        <span class="label">过线分：</span>
                                        <span class="value">{{ item.passGrade }}</span>
                                    </div>
                                    <div class="item">
                                        <span class="label">招生人数：</span>
                                        <span class="value">{{ item.recruitNumberPeople }}</span>
                                    </div>
                                    <div class="item">
                                        <span class="label">录取人数：</span>
                                        <span class="value">{{ item.admitNumberPeople }}</span>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
                <div v-else class="no-data">暂无数据</div>
            </template>
        </BaseInfo>
        
        <EditDradeDialog 
        :dialogVisible="editDradeDialogVisible"
        :mode="mode"
        :gradeId="gradeId"
        @closeDialog="close" />
    </div>
</template>
<script setup>
import { ref } from 'vue'
import BaseInfo from '@/components/baseInfo.vue'
import EditDradeDialog from './components/editDradeDialog.vue';
import gradeListSetup from './setup/gradeListSetup'

let { gradeList, setGradeList } = gradeListSetup()

const editDradeDialogVisible = ref(false)
let mode = ref(0)  // 0 新增 1 修改
let gradeId = ref(0)

const close = (isConfirm) => {
    editDradeDialogVisible.value = false
    if(isConfirm === true) setGradeList()
}

const handleEdit = (id) => {
    mode.value = 1
    gradeId.value = id
    editDradeDialogVisible.value = true
}

const handleAdd = () => {
    mode.value = 0
    editDradeDialogVisible.value = true
}

</script>
<style lang="scss">
.card {
    .opera {
        display: flex;
        justify-content: flex-end;
    }
    .main {
        display: flex;
        .item {
            width: 200px;
            .label {
                color: #303133;
            }
            .value {
                color: #606266;
            }
        }
    }
}
.no-data {
    text-align: center;
    font-size: 22px;
    color: #C0C4CC;
}
</style>
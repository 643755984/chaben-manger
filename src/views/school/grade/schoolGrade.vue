<template>
    <div class="container">
        <BaseInfo :text="'分数信息'">
            <template #right>
                <el-button type="primary" @click="handleAdd">新增分数</el-button>
            </template>
            <template #default>
                <el-timeline>
                    <el-timeline-item 
                    v-for="(item, index) in gradeList" 
                    :key="index" 
                    :timestamp="item.year" 
                    placement="top">
                        <el-card>
                            <div class="card">
                                <div class="opera">
                                    <el-button size="small" type="primary" @click="handleEdit">编辑</el-button>
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
            </template>
        </BaseInfo>
        
        <EditDradeDialog 
        :dialogVisible="editDradeDialogVisible"
        :mode="mode"
        @closeDialog="close" />
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute  } from 'vue-router'
import BaseInfo from '@/components/baseInfo.vue'
import EditDradeDialog from './components/editDradeDialog.vue';
import gradeListSetup from './setup/gradeListSetup'

const route = useRoute ()
const { schoolId, majorId } = route.query
let { gradeList } = gradeListSetup()

const editDradeDialogVisible = ref(false)
let mode = ref(0)  // 0 新增 1 修改

const close = () => {
    editDradeDialogVisible.value = false
}

const handleEdit = () => {
    mode.value = 1
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

</style>
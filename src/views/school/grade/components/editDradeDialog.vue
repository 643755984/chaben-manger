<template>
    <el-dialog
        v-model="props.dialogVisible"
        :title="title"
        width="600px"
        :before-close="close"
        @open="openCallBack"
    >
        <div class="form">
            <el-form ref="formRef" :model="form" label-width="90px">
                <el-form-item label="年份">
                    <el-date-picker v-model="form.year" type="year" placeholder="选择年份">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="录取最低分">
                    <el-input v-model="form.minGrade"></el-input>
                </el-form-item>
                <el-form-item label="录取平均分">
                    <el-input v-model="form.averageGrade"></el-input>
                </el-form-item>
                <el-form-item label="过线分">
                    <el-input v-model="form.passGrade"></el-input>
                </el-form-item>
                <el-form-item label="招生人数">
                    <el-input v-model="form.recruitNumberPeople"></el-input>
                </el-form-item>
                <el-form-item label="录取人数">
                    <el-input v-model="form.admitNumberPeople"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="confirm">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useRoute  } from 'vue-router'
import { ElMessage } from "element-plus"
import { addGrade } from '@/api/school'

const props = defineProps({
  dialogVisible: {
      type: Boolean,
      require: true
  },
  mode: {
      type: Number,
      require: true
  }
})
const emit = defineEmits(['closeDialog'])
const route = useRoute ()
const { schoolId, majorId } = route.query
let title = ref('新增分数')

const form = reactive({
    schoolId: schoolId,
    majorId: majorId,
    year: '',
    minGrade: '',
    averageGrade: '',
    passGrade: '',
    recruitNumberPeople: '',
    admitNumberPeople: ''
})

const close = (isConfirm = false) => {
    emit('closeDialog', isConfirm)
}

const openCallBack = () => {
    title.value = props.mode === 0 ? '新增分数' : '修改分数'
}

const confirm = () => {
    if(props.mode === 0) {
        addGrade(form).then(res => {
            if(res.code === 200) {
                ElMessage.success('添加分数成功')
                close(true)
            }
        })
    }
}
</script>
<style lang="scss">
.form {
    width: 400px;
}
</style>
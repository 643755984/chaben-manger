<template>
    <el-dialog
        v-model="props.dialogVisible"
        title="新增专业类型"
        width="50%"
        :before-close="close"
    >
        <el-form ref="formRef" :model="form" label-width="120px" :rules="rules">
            <el-form-item label="专业类型" prop="typeName">
                <el-input v-model="form.typeName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">关闭</el-button>
                <el-button type="primary" @click="confirmAdd">新增</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { addMajorType } from "@/api/majorType";
import { ElMessage } from "element-plus";

const props = defineProps({
    dialogVisible: {
        type: Boolean,
        require: true
    }
})

const formRef = ref(null)
const emit = defineEmits(['closeDialog'])
let form = reactive({
    typeName: ''
})

const rules = reactive({
    typeName: [
        { required: true, message: '专业类型不能为空', trigger: 'blur'}
    ]
})      


const confirmAdd = () => {
    formRef.value.validate((valid) => {
        if (valid) {
            addMajorType(form).then(res => {
                if(res.code === 200) {
                    ElMessage.success("新增专业成功")
                    close(true)
                }else {
                    ElMessage.error('新增专业失败')
                }
            })
        } else {
            return false
        }
    })
}

const close = (isConfirm = false) => {
    formRef.value.resetFields();
    emit('closeDialog', isConfirm)
}
</script>
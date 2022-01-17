<template>
    <el-dialog
        v-model="props.dialogVisible"
        title="新增专业"
        width="50%"
        :before-close="close"
    >
        <el-form ref="formRef" :model="form" label-width="120px" :rules="rules">
            <el-form-item label="专业名称" prop="majorName">
                <el-input v-model="form.majorName"></el-input>
            </el-form-item>
            <el-form-item label="专业类型" prop="majorType">
                <el-select v-model="form.majorType" class="m-2" placeholder="请选择专业类型">
                    <el-option
                        v-for="item in props.majorTypeOptions"
                        :key="item.id"
                        :label="item.typeName"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
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
import { addMajor } from "@/api/major";
import { ElMessage } from "element-plus";

const formRef = ref(null)
const props = defineProps({
    dialogVisible: {
        type: Boolean,
        require: true
    },
    majorTypeOptions: {
        type: Array,
        require: true
    }
})

let form = reactive({
    majorName: '',
    majorType: null
})


const rules = reactive({
    majorName: [
        { required: true, message: '专业名称不能为空', trigger: 'blur',},
    ],
    majorType: [
        { required: true, message: '专业类型不能为空', trigger: 'blur',},
    ]
}) 

const emit = defineEmits(['closeDialog'])

const confirmAdd = () => {
    formRef.value.validate((valid) => {
        if (valid) {
            addMajor(form).then(res => {
                if(res.code === 200) {
                    ElMessage.success("新增专业成功")
                    close(true)
                }else {
                    ElMessage.error('新增专业失败')
                }
            })
        } else {
            return false;
        }
    });
}

const close = (isConfirm = false) => {
    formRef.value.resetFields();
    emit('closeDialog', isConfirm)
}
</script>
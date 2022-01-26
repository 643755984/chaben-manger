<template>
	<el-dialog
		v-model="dialogVisible"
		title="公告发布"
		width="50%"
		@open="openCallback"
		:before-close="close"
	>
		<el-form ref="formRef" :model="form" label-width="120px" :rules="rules">
			<el-form-item label="标题" prop="title">
				<el-input v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="链接地址" prop="link">
				<el-input v-model="form.link"></el-input>
			</el-form-item>
			<el-form-item label="发布时间" prop="time">
				<el-date-picker 
				v-model="form.time" 
				type="date" 
				format="YYYY-MM-DD"
				value-format="YYYY-MM-DD" 
				placeholder="选择发布时间">
      			</el-date-picker>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="close">关闭</el-button>
				<el-button type="primary" @click="confirmAdd">发布</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { addNotice } from '@/api/school'
import { ElMessage } from "element-plus";

const props = defineProps({
    schoolId: {
        type: [String, Number],
        require: true
    }
})
const emit = defineEmits(['updateNoticeList'])

let form = reactive({
	title: '',
	link: '',
	time: '',
	schoolId: ''
})
const formRef = ref(null)
let dialogVisible = ref(false)
const rules = reactive({
    title: [
        { required: true, message: '标题不能为空', trigger: 'blur',},
    ],
    link: [
        { required: true, message: '链接地址不能为空', trigger: 'blur',},
    ],
	time: [
        { required: true, message: '发布时间不能为空', trigger: 'blur',},
    ]
}) 

const confirmAdd = () => {
	addNotice(form).then(res => {
		if(res.code === 200) {
			ElMessage.success('发布成功')
			emit('updateNoticeList')
			close()
		}
	})
}

const close = () => {
	formRef.value.resetFields()
	dialogVisible.value = false
}

const openCallback = () => {
	form.schoolId = props.schoolId
}

defineExpose({ dialogVisible })
</script>
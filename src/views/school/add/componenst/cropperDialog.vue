<template>
    <el-dialog
		v-model="dialogVisible"
		title="图片裁剪"
		width="700px"
	>
		<div class="cropper-content">
			<vue-cropper
				ref="cropper"
				:aspect-ratio="3 / 4"
				:src="imgUrl"
			/>
		</div>
		<template #footer>
		<span class="dialog-footer">
			<el-button @click="handleClose">取消</el-button>
			<el-button type="primary" @click="handleConfirm">确定</el-button>
		</span>
		</template>
  	</el-dialog>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
import VueCropper from 'vue-cropperjs'
import { ElMessage } from "element-plus"
import 'cropperjs/dist/cropper.css'
import { uploadImgInBase64 } from '@/api/common'

let props = defineProps({
	imgData: {
		type: Object,
		require: true
	}
})
const emit = defineEmits(['commitImgUrl'])
let dialogVisible = ref(false)
let imgUrl = ref('')
let cropper = ref(null)

watchEffect(() => {
	if(!props.imgData) return
	if (props.imgData.type.indexOf('image/') === -1) {
		ElMessage.error('请选择图片')
		return
	}

    if (typeof FileReader === 'function') {
        const reader = new FileReader()

        reader.onload = (event) => {
			imgUrl.value = event.target.result
			cropper.value.replace(event.target.result)
		}
		reader.readAsDataURL(props.imgData)
    }else {
		ElMessage.error('该环境不支持FileReader API')
    }
})

const handleClose = () => {
	dialogVisible.value = false
}

const handleConfirm = () => {
	let cropImg = cropper.value.getCroppedCanvas().toDataURL()

	let data = {
		img: cropImg
	}
	uploadImgInBase64(data).then(res => {
		if(res.code === 200) {
			ElMessage.success('上传成功')
			emit('commitImgUrl', res.data)
			dialogVisible.value = false
		}
	})
} 

defineExpose({
    dialogVisible
})
</script>
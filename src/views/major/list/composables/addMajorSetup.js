import { reactive, ref } from 'vue'
import { addMajor } from "@/api/major";
import { ElMessage } from "element-plus";

export default function useAddMajor() {
    const formRef = ref(null);
    let dialogVisible = ref(false)
    let form = reactive({
        majorName: '',
        majorType: null
    })

    const majorOptions = ref([
        {label: '文科', value: 0},
        {label: '理科', value: 1}
    ])

    const rules = reactive({
        majorName: [
            { required: true, message: '专业名称不能为空', trigger: 'blur',},
        ],
        majorType: [
            { required: true, message: '专业类型不能为空', trigger: 'blur',},
        ]
    })      
    // 新增
    const handleAdd = () => {
        dialogVisible.value = true
    }

    const confirmAdd = () => {
        formRef.value.validate((valid) => {
            if (valid) {
                addMajor(form).then(res => {
                    if(res.code === 200) {
                        ElMessage.success("新增专业成功")
                        dialogVisible.value = false
                    }else {
                        ElMessage.error('新增专业失败')
                    }
                })
            } else {
                return false;
            }
        });
    }

    return {
        dialogVisible,
        form,
        majorOptions,
        rules,
        formRef,
        confirmAdd,
        handleAdd
    }
}
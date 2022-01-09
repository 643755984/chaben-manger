import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { addSchool } from '@/api/school.js'
import { uploadFile } from '@/api/common.js'

export default function useNav(isEdit) {
    const rules = {
        schoolName: [
            { required: true, message: "请输入表单名称", trigger: "blur" },
        ],
        schoolType: [
            { required: true, message: "请选择学校类型", trigger: "blur" },
        ],
        schoolLevel: [
            { required: true, message: "请选择学校等级", trigger: "blur" },
        ],
    };
    const successText = isEdit ? '修改院校成功' : '新增院校成功'

    const uploadRef = ref(null)

    const form = reactive({
        schoolName: "",
        schoolType: "",
        schoolLevel: "",
        schoolAddress: '',
        schoolLogo: '',
        schoolEmail: ''
    });

    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const formRef = ref(null);

    // 提交
    const onSubmit = () => {
        // 表单校验
        formRef.value.validate((valid) => {
            if (valid) {
                addSchool(form).then(res => {
                    // console.log(res)
                    if(res.code === 200) {
                        ElMessage.success(successText)
                        store.commit("closeCurrentTag", {
                            $router: router,
                            $route: route
                        });
                    }else {
                        ElMessage.error(res.data)
                    }
                })
            } else {
                return false;
            }
        });
    };

    const uploadImg = (e) => {
        let formData = new FormData();
        formData.append("files", e.file);
        uploadFile(formData).then(res => {
            if(res.code === 200) {
                form.schoolLogo = res.data
            }
        })
    }

    const change = () => {
        uploadRef.value.submit();
    }

    return {
        uploadRef,
        formRef,
        rules,
        form,
        onSubmit,
        uploadImg,
        change
    }
}
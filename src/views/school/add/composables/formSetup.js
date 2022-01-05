import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { addSchool } from '@/api/school.js'

export default function useNav() {
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

    const form = reactive({
        schoolName: "",
        schoolType: "",
        schoolLevel: "",
        schoolAddress: '',
        schoolLogo: ''
    });

    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const formRef = ref(null);

    // 提交
    const onSubmit = (imgUrl) => {
        form.schoolLogo = imgUrl

        // 表单校验
        formRef.value.validate((valid) => {
            if (valid) {
                addSchool(form).then(res => {
                    // console.log(res)
                    if(res.code === 200) {
                        ElMessage.success("新增成功！")
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

    // 重置
    const onReset = () => {
        formRef.value.resetFields();
    };
    


    return {
        formRef,
        rules,
        form,
        onReset,
        onSubmit
    }
}
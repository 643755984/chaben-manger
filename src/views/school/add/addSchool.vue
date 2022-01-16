<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="container">
            <div class="form-box">
                <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="院校名称" prop="schoolName">
                        <el-input v-model="form.schoolName"></el-input>
                    </el-form-item>
                    <el-form-item label="院校类型" prop="schoolType">
                        <el-select v-model="form.schoolType" placeholder="请选择">
                            <el-option key="bbk" label="公办院校" value="1"></el-option>
                            <el-option key="xtc" label="民办院校" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学校等级" prop="region">
                        <el-select v-model="form.schoolLevel" placeholder="请选择">
                            <el-option key="bbk" label="普通院校" value="1"></el-option>
                            <el-option key="xtc" label="985院校" value="2"></el-option>
                            <el-option key="xtc" label="211院校" value="3"></el-option>
                            <el-option key="xtc" label="双一流" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="院校邮箱" prop="schoolEmail">
                        <el-input v-model="form.schoolEmail"></el-input>
                    </el-form-item>
                    <el-form-item label="院校地址" prop="schoolAddress">
                        <el-input v-model="form.schoolAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="Logo">
                        <el-upload
                            class="avatar-uploader"
                            action=""
                            ref="uploadRef"
                            :show-file-list="false"
                            :auto-upload="false"
                            :http-request="uploadImg"
                            :on-change="change"
                        >
                            <img v-if="form.schoolLogo" :src="setImgUrl(form.schoolLogo)" class="avatar" />
                            <el-icon v-else :size="20"><plus /></el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">{{ btnText }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex"
import { ElMessage } from "element-plus"
import setImgUrlSetup from '@/setup/setImgUrlSetup'
import { getSchoolInfo, updateSchool, addSchool } from '@/api/school'
import { uploadFile } from '@/api/common'

const { setImgUrl } = setImgUrlSetup()

const route = useRoute();
const router = useRouter();
const store = useStore();
const formRef = ref(null);
const schoolId = route.params.schoolId

let btnText = ref('新增院校')
let isEdit = ref(false)
const uploadRef = ref(null)

const form = reactive({
    schoolName: "",
    schoolType: "",
    schoolLevel: "",
    schoolAddress: '',
    schoolLogo: '',
    schoolEmail: ''
});

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

onMounted(() => {
    isEdit.value = schoolId ? true : false
    if(isEdit.value) {
        btnText.value = '修改院校'
        isEdit.value = true
        getSchoolInfo(schoolId).then(res => {
            if(res.code === 200) {
                Object.assign(form, res.data)
            }
        })
    }
})


 // 提交
const onSubmit = () => {
    // 表单校验
    formRef.value.validate((valid) => {
        if (valid) {
            if(isEdit.value) {
                updateSchoolFn()
            }else {
                addSchoolFn()
            }
        } else {
            return false;
        }
    });
};

const updateSchoolFn = () => {
    updateSchool(form).then(res => {
        if(res.code === 200) {
            ElMessage.success("修改成功")
            store.commit("closeCurrentTag", {
                $router: router,
                $route: route
            });
        }else {
            ElMessage.error(res.data)
        }
    })
}

const addSchoolFn = () => {
    addSchool(form).then(res => {
        if(res.code === 200) {
            ElMessage.success('新增成功')
            store.commit("closeCurrentTag", {
                $router: router,
                $route: route
            });
        }else {
            ElMessage.error(res.data)
        }
    })
}

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
</script>
<style lang="scss" scoped>
.lh-18 {
    line-height: 18px;
}
</style>

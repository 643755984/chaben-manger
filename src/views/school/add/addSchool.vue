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
                            <el-option 
                            v-for="(item, index) in schoolType" 
                            :key="index + 'type'"
                            :label="item.label" 
                            :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学校等级" prop="schoolLevel">
                        <el-select v-model="form.schoolLevel" placeholder="请选择">
                            <el-option 
                            v-for="(item, index) in schoolLevel" 
                            :key="index + 'level'"
                            :label="item.label"
                            :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="院校官网" prop="schoolEmail">
                        <el-input v-model="form.schoolWeb"></el-input>
                    </el-form-item>
                    <el-form-item label="院校电话" prop="schoolEmail">
                        <el-input v-model="form.schoolTel"></el-input>
                    </el-form-item>
                    <el-form-item label="院校地址" prop="schoolAddress">
                        <el-input v-model="form.schoolAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="Logo">
                        <el-upload
                            class="avatar-uploader"
                            action=""
                            ref="uploadLogoRef"
                            :show-file-list="false"
                            :auto-upload="false"
                            :http-request="uploadLogo"
                            :on-change="changeLogo"
                        >
                            <img v-if="form.schoolLogo" :src="setImgUrl(form.schoolLogo)" class="avatar" />
                            <el-icon v-else :size="20"><plus /></el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="封面图片">
                        <el-upload
                            class="pic-uploader"
                            action=""
                            ref="uploadPicRef"
                            :show-file-list="false"
                            :auto-upload="false"
                            :http-request="uploadPic"
                            :on-change="changePic"
                        >
                            <img v-if="form.schoolDetailPic" :src="setImgUrl(form.schoolDetailPic)" class="pic" />
                            <el-icon v-else :size="20"><plus /></el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">{{ btnText }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <CropperDialog
        ref="cropperRef"
        @commitImgUrl="setDetailPic"
        :imgData="imgData.data" />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex"
import { ElMessage } from "element-plus"
import CropperDialog from './componenst/cropperDialog.vue'
// api
import { getSchoolInfo, updateSchool, addSchool } from '@/api/school'
// setup
import setImgUrlSetup from '@/setup/setImgUrlSetup'
import schoolInfoSetup from '@/setup/schoolInfoSetup'
import uploadImgSetup from './setup/uploadImgSetup'

const { setImgUrl } = setImgUrlSetup()
const { schoolType, schoolLevel } = schoolInfoSetup()
const { uploadImg } = uploadImgSetup()

const route = useRoute();
const router = useRouter();
const store = useStore();
const formRef = ref(null);
const schoolId = route.params.schoolId

let btnText = ref('新增院校')
let isEdit = ref(false)
// let imgUrl = ref('')
const imgData = reactive({
    data: null
})
const uploadLogoRef = ref(null)
const uploadPicRef = ref(null)
const cropperRef = ref(null)

const form = reactive({
    schoolName: "",
    schoolType: "",
    schoolLevel: "",
    schoolAddress: '',
    schoolLogo: '',
    schoolEmail: '',
    schoolDetailPic: '',
    schoolWeb: '',
    schoolTel: ''
});

const rules = {
    schoolName: [
        { required: true, message: "请输入院校名称", trigger: "blur" },
    ],
    schoolType: [
        { required: true, message: "请选择院校类型", trigger: "blur" },
    ],
    schoolLevel: [
        { required: true, message: "请选择院校等级", trigger: "blur" },
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
            })
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
            })
        }
    })
}

const uploadLogo = (e) => {
    uploadImg(e).then(res => {
        form.schoolLogo = res
    })
}

const uploadPic = (e) => {
    uploadImg(e).then(res => {
        form.schoolDetailPic = res
    })
}

const changeLogo = () => {
    uploadLogoRef.value.submit();
}
const changePic = (e) => {
    imgData.data = e.raw
    cropperRef.value.dialogVisible = true
}

const setDetailPic = (val) => {
    form.schoolDetailPic = val
}

</script>
<style lang="scss" scoped>
.lh-18 {
    line-height: 18px;
}
</style>

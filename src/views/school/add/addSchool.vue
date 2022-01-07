<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
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
                        <el-button type="primary" @click="handleAdd">新增院校</el-button>
                        <el-button @click="onReset">重置表单</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>

import setImgUrlSetup from '@/setup/setImgUrlSetup'
import uploadImgSetup from './composables/uploadImgSetup'
import formSetup from './composables/formSetup'

export default {
    name: "baseform",
    setup() {
        const { setImgUrl } = setImgUrlSetup()
        const { uploadRef, imgUrl, formRef, change, uploadImg} = uploadImgSetup()
        const { rules, form, onReset, onSubmit } = formSetup()

        const handleAdd = () => {
            onSubmit(imgUrl.value)
        }

        return {
            formRef,
            rules,
            formRef,
            form,
            uploadRef,
            handleAdd,
            onReset,
            uploadImg,
            change,
            setImgUrl
        };
    },
};
</script>
<style lang="scss" scoped>
.lh-18 {
    line-height: 18px;
}

</style>

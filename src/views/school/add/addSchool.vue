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
                    <el-form-item label="学校名称" prop="schoolName">
                        <el-input v-model="form.schoolName"></el-input>
                    </el-form-item>
                    <el-form-item label="学校类型" prop="schoolType">
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
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item label="Logo">
                        <el-upload
                            class="avatar-uploader"
                            action=""
                            ref="uploadMutiple"
                            :show-file-list="false"
                            :auto-upload="false"
                            :http-request="uploadImg"
                            :on-change="change"
                        >
                            <img v-if="form.logo" :src="form.logo" class="avatar" />
                            <!-- <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon> -->
                            <i v-else class="el-icon-lx-add avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">新增学校</el-button>
                        <el-button @click="onReset">重置表单</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { uploadFile } from '@/api/common.js'
export default {
    name: "baseform",
    setup() {
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
        const formRef = ref(null);
        const uploadMutiple = ref(null)
        const form = reactive({
            schoolName: "",
            schoolType: "",
            schoolLevel: "",
            address: '',
            logo: ''
        });
        // 提交
        const onSubmit = () => {
            // 表单校验
            formRef.value.validate((valid) => {
                if (valid) {
                    ElMessage.success("提交成功！");
                } else {
                    return false;
                }
            });
        };
        // 重置
        const onReset = () => {
            formRef.value.resetFields();
        };

        const uploadImg = (e) => {
            let formData = new FormData();
            formData.append("files", e.file);
            uploadFile(formData).then(res => {
                console.log(res)
            })
        }

        const change = () => {
            uploadMutiple.value.submit();
        }

        return {
            rules,
            formRef,
            form,
            uploadMutiple,
            onSubmit,
            onReset,
            uploadImg,
            change
        };
    },
};
</script>
<style lang="scss" scoped>
.lh-18 {
    line-height: 18px;
}

</style>
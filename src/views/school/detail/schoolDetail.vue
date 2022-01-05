<template>
    <div class="container">
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="w-900">
            <div class="base-info">
                <div class="title">基本信息</div>
                <div class="line">
                    <div class="label">院校Logo</div>
                    <div class="value">
                        <el-image
                            style="width: 100px; height: 100px"
                            src="../../../assets/img/img.jpg"
                            :fit="fit"
                        ></el-image>
                    </div>
                </div>
                <div class="line">
                    <div class="label">院校名称</div>
                    <div class="value">嘉应学院</div>
                </div>
                <div class="line">
                    <div class="label">院校类型</div>
                    <div class="value">公办</div>
                </div>
                <div class="line">
                    <div class="label">院校等级</div>
                    <div class="value">普通本科</div>
                </div>
                <div class="line">
                    <div class="label">院校Email</div>
                    <div class="value">1654164@qq.com</div>
                </div>
                <div class="line">
                    <div class="label">院校地址</div>
                    <div class="value">份未发嗡嗡嗡我给</div>
                </div>
            </div>
            <div class="major-info">
                <div class="title">专业信息</div>
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column type="index" width="50" />
                    <el-table-column prop="date" label="专业名称" />
                    <el-table-column prop="name" label="专业类型" />
                    <el-table-column label="操作" width="200" align="center">
                        <template #default="scope">
                            <el-button type="text" class="red"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>    
    </div>
</template>
<script>
export default {
    name: "schoolDetail",
    setup() {
        const tableData = [
            {
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
        ]

        const handleDelete = () => {

        }

        return {
            tableData
        };
    },
};
</script>
<style lang="scss" scoped>
.title {
    position: relative;
    padding-left: 20px;
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: bold;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 10px;
        height: 100%;
        border-radius: 4px;
        background: #20a0ff;
    }
}
.line {
    display: flex;
    margin-bottom: 24px;
    color: #606266;
    .label {
        width: 120px;
        margin-right: 16px;
        text-align: right;
        flex-shrink: 0;
    }
}
</style>
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
            <base-info :text="'基本信息'">
                <template v-slot:default>
                    <div class="line">
                        <div class="label">院校Logo</div>
                        <div class="value">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="setImgUrl(schoolInfo.schoolLogo)"
                                :fit="'contain'"
                            ></el-image>
                        </div>
                    </div>
                    <div class="line">
                        <div class="label">院校名称</div>
                        <div class="value">{{ schoolInfo.schoolName }}</div>
                    </div>
                    <div class="line">
                        <div class="label">院校类型</div>
                        <div class="value">{{ setSchoolType(schoolInfo.schoolType) }}</div>
                    </div>
                    <div class="line">
                        <div class="label">院校等级</div>
                        <div class="value">{{ setSchoolLevel(schoolInfo.schoolLevel) }}</div>
                    </div>
                    <div class="line">
                        <div class="label">院校Email</div>
                        <div class="value">{{ schoolInfo.schoolEmail }}</div>
                    </div>
                    <div class="line">
                        <div class="label">院校地址</div>
                        <div class="value">{{ schoolInfo.schoolAddress }}</div>
                    </div>
                    <div class="line">
                        <div class="label">院校官网</div>
                        <div class="value">{{ schoolInfo.schoolWeb }}</div>
                    </div>
                    <div class="line">
                        <div class="label">院校电话</div>
                        <div class="value">{{ schoolInfo.schoolTel }}</div>
                    </div>
                    <div class="line">
                        <div class="label">院校详情图</div>
                        <div class="value">
                            <el-image
                                :src="setImgUrl(schoolInfo.schoolDetailPic)"
                                :fit="'contain'"
                            ></el-image>
                        </div>
                    </div>
                </template>
            </base-info>
            <base-info :text="'专业信息'">
                <template v-slot:right>
                    <el-button type="primary" icon="CirclePlus" @click="addMajor">添加专业</el-button>
                </template>
                <template v-slot:default>
                    <el-table :data="schoolMajorList" border style="width: 100%">
                        <el-table-column type="index" width="50" />
                        <el-table-column prop="name" label="专业类型">
                            <template  #default="scope">
                                <span>{{ scope.row.majorInfo.majorTypeInfo.typeName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="date" label="专业名称">
                            <template  #default="scope">
                                <span>{{ scope.row.majorInfo.majorName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200" align="center">
                            <template #default="scope">
                                <el-button type="text" @click="openGradePage(scope.row)">分数管理</el-button>
                                <el-button type="text" class="red" @click="handleDelete(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background layout="total, prev, pager, next" :current-page="page.pageNum"
                            :page-size="page.pageSize" :total="page.pageTotal" @current-change="changePage"></el-pagination>
                    </div>
                </template>
            </base-info>
            <base-info :text="'公告信息'">
                <template v-slot:right>
                    <el-button type="primary" icon="CirclePlus" @click="releaseNotice">发布公告</el-button>
                </template>
                <template v-slot:default>
                    <el-table :data="noticelist" border style="width: 100%">
                        <el-table-column type="index" width="50" />
                        <el-table-column prop="title" label="标题">
                        </el-table-column>
                        <el-table-column prop="link" label="链接地址"></el-table-column>
                        <el-table-column label="操作" width="200" align="center">
                            <template #default="scope">
                                <el-button type="text" class="red" @click="deleteNotice(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background layout="total, prev, pager, next" :current-page="noticePage.pageNum"
                            :page-size="noticePage.pageSize" :total="noticePage.pageTotal" @current-change="changeNoticePage"></el-pagination>
                    </div>
                </template>
            </base-info>
        </div>

        <AddMajorForSchoolDialog
        ref="majorDialogRef"
        :schoolId="schoolId"
        @updateMajorList="handleSearch" />

        <NoticeDialog
        ref="noticeDialogRef"
        :schoolId="schoolId"
        @updateNoticeList="getNoticeListFn" />

    </div>
</template>
<script setup>
import { ref } from "vue"
import { useRoute } from 'vue-router'
import setImgUrlSetup from '@/setup/setImgUrlSetup'
import schoolDetailSetup from './setup/schoolDetailSetup'
import schoolMajorListSetup from './setup/schoolMajorListSetup'
import noticeSetup from './setup/noticeSetup'
import schoolInfoSetup from '@/setup/schoolInfoSetup'
import baseInfo from '@/components/baseInfo.vue'
import AddMajorForSchoolDialog from './components/addMajorForSchoolDialog.vue'
import NoticeDialog from '../components/noticeDialog.vue'

const route = useRoute()
const schoolId = route.params.schoolId
const { setImgUrl } = setImgUrlSetup()
let { schoolInfo } = schoolDetailSetup()
let { schoolMajorList, page, handleDelete, changePage, handleSearch, openGradePage } = schoolMajorListSetup(schoolId)
let { noticePage, noticelist, deleteNotice, changeNoticePage, getNoticeListFn } = noticeSetup(schoolId)
const { setSchoolType, setSchoolLevel } = schoolInfoSetup()

let majorDialogRef = ref(null)
let noticeDialogRef = ref(null)

const addMajor = () => {
    majorDialogRef.value.dialogVisible = true
}

const releaseNotice = () => {
    noticeDialogRef.value.dialogVisible = true
}

</script>

<style lang="scss" scoped>
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
.red {
    color: #ff0000;
}
</style>
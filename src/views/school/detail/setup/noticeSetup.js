import { ref, reactive, onMounted } from "vue";
import { getNoticeList, deleteSchoolMajor } from '@/api/school'
import { ElMessage } from "element-plus"

export default function useNav(schoolId) {
    
    let noticePage = reactive({
        schoolId: '',
        pageNum: 1,
        pageSize: 10,
        pageTotal: 12
    });
    noticePage.schoolId = schoolId

    let noticelist = ref([])

    const changeNoticePage  = (index) => {
        noticePage.pageNum = index
        handleSearch()
    }

    const deleteNotice = (item) => {
        deleteSchoolMajor(item.id).then(res => {
            if(res.code === 200) {
                ElMessage.success('删除成功')
                getNoticeListFn()
            }
        })
    }

    onMounted(() => {
		getNoticeListFn()
    })

    const getNoticeListFn = () => {
        getNoticeList(noticePage).then(res => {
            if(res.code === 200) {
                noticelist.value = res.data.rows
                noticePage.pageTotal = res.data.count
            }
        })
    }

    return {
        noticePage,
        noticelist,
		getNoticeListFn,
        deleteNotice,
        changeNoticePage
    }
}
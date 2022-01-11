import { ref, reactive, onMounted } from "vue";
import { getSchoolMajorList, deleteSchoolMajor } from '@/api/school'
import { useRoute } from 'vue-router'
import { ElMessage } from "element-plus"

export default function useNav() {
    const route = useRoute()
    const schoolId = route.params.schoolId
    let page = reactive({
        schoolId: '',
        pageNum: 1,
        pageSize: 10,
        pageTotal: 12
    });
    page.schoolId = schoolId

    let schoolMajorList = ref([])

    const changePage  = (index) => {
        page.pageNum = index
        handleSearch()
    }

    const handleDelete = (item) => {
        deleteSchoolMajor(item.id).then(res => {
            if(res.code === 200) {
                ElMessage.success('删除成功')
                handleSearch()
            }
        })
    }

    onMounted(() => {
        handleSearch()
    })

    const handleSearch = () => {
        getSchoolMajorList(page).then(res => {
            if(res.code === 200) {
                schoolMajorList.value = res.data.rows
                page.pageTotal = res.data.count
            }
        })
    }

    return {
        page,
        schoolMajorList,
        handleDelete,
        changePage,
        handleSearch
    }
}
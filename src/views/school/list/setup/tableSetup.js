import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { deleteSchool, getSchoolList  } from '@/api/school'
import { ElMessage } from "element-plus"

export default function useNav() {
    const router = useRouter()
    const page = reactive({
        schoolName: "",
        pageNum: 1,
        pageSize: 10,
        pageTotal: 12
    });

    const tableData = ref([]);

    const handleSearch  = () => {
        getSchoolList(page).then(res => {
            if(res.code === 200) {
                tableData.value = res.data.rows
                page.pageTotal = res.data.count
            }
        })   
    }

    const changePage  = (index) => {
        page.pageNum = index
        handleSearch()
    }

    // 编辑
    const handleEdit = (item) => {
        router.push({name: 'schoolEdit', params: { schoolId: item.schoolId}})
    }
    // 新增
    const handleAdd = () => {
        router.push({name: 'schoolAdd'})
    }

    // 删除操作
    const handleDelete = (item) => {
        deleteSchool(item.schoolId).then(res => {
            if(res.code === 200) {
                ElMessage.success("删除成功")
                handleSearch()
            }
        })
    };

    const handleDetail = (item) => {
        router.push({name: 'schoolDetail', params: { schoolId: item.schoolId}})
    }

    return {
        tableData,
        page,
        handleEdit,
        handleAdd,
        handleDelete,
        handleDetail,
        changePage,
        handleSearch
    }
}
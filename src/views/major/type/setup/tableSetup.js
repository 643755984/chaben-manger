import { onMounted, reactive, ref } from 'vue'
import { deleteMajorType, getMajorTypeList } from "@/api/majorType";
import { ElMessage } from "element-plus";

export default function useNav() {
    let page = reactive({
        typeName: '',
        pageNum: 1,
        pageSize: 10,
        pageTotal: 12
    });

    let majorTypeList = ref([])

    const handleSearch = () => {
        getMajorTypeList(page).then(res => {
            if(res.code === 200) {
                majorTypeList.value = res.data.rows
                page.pageTotal = res.data.count
            }
        })
    }

    // 删除操作
    const handleDelete = (item) => {
        deleteMajorType(item.id).then(res => {
            if(res.code === 200) {
                ElMessage.success("删除专业成功")
            }else {
                ElMessage.error("删除专业失败")
            }
            handleSearch()
        })
    }

    const changePage  = (index) => {
        page.pageNum = index
        handleSearch()
    }

    onMounted(() => {
        handleSearch()
    })
    

    return {
        page,
        majorTypeList,
        handleDelete,
        changePage,
        handleSearch
    }
}
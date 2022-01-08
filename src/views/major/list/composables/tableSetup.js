import { ref, reactive } from "vue";
import { majorList, deleteMajor } from "@/api/major";
import { ElMessage } from "element-plus";

export default function useNav() {
    const page = reactive({
        majorType: '',
        majorName: '',
        pageNum: 1,
        pageSize: 10,
        pageTotal: 12
    });

    const tableData = ref([]);

    // 删除操作
    const handleDelete = (item) => {
        deleteMajor(item.id).then(res => {
            if(res.code === 200) {
                ElMessage.success("删除专业成功")
            }else {
                ElMessage.error("删除专业失败")
            }
            handleSearch()
        })
    };

    const handleSearch  = () => {
        majorList(page).then(res => {
            if(res.code === 200) {
                tableData.value = res.data.rows
                page.pageTotal = res.data.count
                handleSearch()
            }
        })   
    }

    const changePage  = (index) => {
        page.pageNum = index
        handleSearch()
    }

    return {
        page,
        tableData,
        handleDelete,
        changePage,
        handleSearch
    }
}
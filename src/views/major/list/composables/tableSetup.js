import { ref, reactive } from "vue";
import { useRouter } from 'vue-router'
import { majorList } from "@/api/major";

export default function useNav() {
    const router = useRouter();
    const page = reactive({
        majorType: '',
        majorName: '',
        pageNum: 1,
        pageSize: 10,
        pageTotal: 12
    });

    const tableData = ref([]);

    // 删除操作
    const handleDelete = (index) => {
    };

    const handleDetail = (item) => {
        console.log(item.schoolId)
        router.push({name: 'schoolDetail', params: { schoolId: item.schoolId}})
    }

    const handleSearch  = () => {
        majorList(page).then(res => {
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

    return {
        page,
        tableData,
        handleDelete,
        handleDetail,
        changePage,
        handleSearch
    }
}
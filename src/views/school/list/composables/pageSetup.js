import { reactive, ref } from 'vue'
import { schoolList } from '@/api/school';

export default function useNav() {
    const page = reactive({
        schoolName: "",
        pageNum: 1,
        pageSize: 10,
        pageTotal: 12
    });

    const tableData = ref([]);



    const handleSearch  = () => {
        schoolList(page).then(res => {
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
        changePage,
        handleSearch
    }
}
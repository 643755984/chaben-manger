import { reactive } from 'vue'

export default function useNav() {
    const page = reactive({
        pageNum: 1,
        pageSize: 10,
        pageTotal: 12
    });

    
    const changePage  = (index) => {
        page.pageNum = index
    }

    return {
        page,
        changePage
    }
}
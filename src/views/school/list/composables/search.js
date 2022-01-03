import { ref, reactive } from 'vue'

export default function useNav() {
    const query = reactive({
        schoolName: "",
        pageNum: 1,
        pageSize: 10,
    });

    const pageTotal = ref(0);

    const tableData = ref([
        { schoolName: '嘉应学院', schoolType: '国办院校', schoolLevel: '普通本科', schoolAddress: '梅州市'}
    ]);

    const handleSearch  = () => {
            
    }

    const handlePageChange = (val) => {
    };

    return {
        query,
        tableData,
        pageTotal,
        handleSearch,
        handlePageChange
    }
}
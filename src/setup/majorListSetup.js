import { ref, reactive, onMounted } from "vue";
import { getMajorList, getMajorTypeList } from '@/api/major'

export default function majorList() {

    let majorTypeOptions = ref([])
    let page = reactive({
        majorType: '',
        majorName: '',
        pageNum: 1,
        pageSize: 10,
        pageTotal: 12
    });
    let majorList = ref([])

    onMounted(() => {
        getMajorTypeListFn()
    })

    const handleSearch = () => {
        getMajorList(page).then(res => {
            if(res.code === 200) {
                majorList.value = res.data.rows
                page.pageTotal = res.data.count
            }
        })  
    }

    const getMajorTypeListFn = () => {
        getMajorTypeList({ pageNum: 1, pageSize: 50 }).then(res => {
            if(res.code === 200) {
                majorTypeOptions.value = res.data.rows
            }
        })
    }

    const changePage  = (index) => {
        page.pageNum = index
        handleSearch()
    }

    return {
        page,
        majorList,
        majorTypeOptions,
        handleSearch,
        changePage
    }
}